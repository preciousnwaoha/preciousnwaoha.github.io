---
title: LLM Engineering Inside a Pipeline Builder
description: How I built the multi-provider LLM layer — routing, streaming, token tracking, cost estimation, and why abstraction matters more than people think.
date: 2026-05-04
tags:
  - llm
  - ai
  - engineering
  - streaming
  - open-source
cover: /assets/blog/cover-1.jpg
slug: llm-engineering-inside-a-pipeline-builder
readtime: 5
---

**TL;DR:** the LLM layer is a router, not a direct model call. every provider gets an adapter that conforms to one interface. the executor talks to the router, not the provider. that one decision makes everything — streaming, fallback, cost tracking, and adding new models — much easier to manage.

## why abstraction matters here

the obvious way to add LLM support to a project is to call the OpenAI SDK directly.

that works.

until you want Anthropic. or Gemini. or OpenRouter. or until OpenAI changes their API.

then you are refactoring call sites everywhere.

the better approach is a single interface that every provider implements:
- `complete(request) → response`
- `stream(request) → async generator of chunks`

the executor calls the interface. the router decides which provider handles the call based on the model name.

that is the whole design.

## the provider layer

each provider gets its own file: `openai.py`, `anthropic.py`, `gemini.py`, `openrouter.py`.

each one implements the same base class:
- `complete()` for non-streaming calls
- `stream()` for streaming — yields `LLMStreamChunk` objects, one per token

the router maps model names to provider instances. `gpt-4o` goes to OpenAI. `claude-sonnet-4-6` goes to Anthropic. `gemini-2.5-flash` goes to Gemini. anything with the `or/` prefix goes to OpenRouter.

adding a new provider means adding one file and one line in the router. nothing else changes.

## streaming in practice

streaming is the part that requires the most care.

the interface is an async generator. the LLM node executor iterates it and yields events upstream to the execution engine, which then yields SSE events to the browser.

the chain is:

`provider.stream()` → `executor.stream_execute()` → `engine.run_streaming()` → SSE response → browser

each step is an async generator yielding dicts. no shared state. no callbacks.

the final chunk from the provider includes the full response text and token usage. the executor captures that and emits a `done` event with outputs. the engine then emits `node_completed`.

the key design decision: streaming is opt-in per node. there is a switch in the LLM node config. when disabled, the executor calls `complete()` instead, and the response arrives in a single event. that is useful when downstream nodes need the full text before they can run, or when streaming latency is not worth the overhead.

## token tracking and cost estimation

every response includes input and output token counts.

the cost estimator multiplies those by a per-model price table.

the price table is just a dict. it is not clever. it is easy to update when providers change pricing.

token counts and cost are included in the `node_completed` event so the frontend can display them per node.

that matters in practice. when you are running a workflow repeatedly, you want to know which nodes are expensive before they run up a real bill.

## what the executor actually does

the LLM node executor:
1. reads `provider` and `model` from the resolved node config
2. reads `system`, `prompt`, `temperature`, `maxTokens`, and `stream`
3. constructs an `LLMRequest`
4. calls `router.get_provider(model).stream()` or `.complete()`
5. returns a dict with `response`, `usage_input_tokens`, `usage_output_tokens`, `cost_estimate`, plus internal metadata fields

that is the whole executor. it does not touch provider SDKs directly. it does not know which HTTP library any provider uses.

that separation is what keeps the executor testable and the providers swappable.

## adding a new model or provider

to add a new model to an existing provider, you update one list in the provider file and add its pricing to the price table.

to add a new provider entirely:
1. create a new file in `integrations/llm/`
2. implement `BaseLLMProvider` — `complete()` and `stream()`
3. add the model prefix or model names to the router
4. add price entries to the pricing table
5. add the model options to the frontend node config

that is five steps. it is not complicated because the abstraction is clean.

## what i have learned from this

the thing that saves the most time in LLM engineering is not picking the right model.

it is not being locked into one.

having a clean provider layer means:
- you can benchmark providers against each other easily
- you can fall back when one is slow or rate-limited
- you can route tasks to cheaper models when quality is not the bottleneck
- you can add new models when they ship without touching the rest of the app

that is the real payoff.

## final thought

a lot of LLM apps are just one provider, one model, hardcoded.

that works for demos.

for anything that runs in production, or for a tool like this where the model choice is the user's decision, the abstraction is not optional.

build the router. keep the providers behind an interface. the rest becomes much easier to change.
