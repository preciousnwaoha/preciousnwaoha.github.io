---
title: I Built a No-Code AI Pipeline Builder (And It's Open Source)
description: A visual tool for chaining LLMs, web search, RAG, and more into real AI workflows — no code required to run them.
date: 2026-05-04
tags:
  - ai
  - llm
  - open-source
  - pipeline
  - engineering
cover: /assets/blog/cover-1.jpg
slug: i-built-a-no-code-ai-pipeline-builder
readtime: 3
---

**TL;DR:** i built a visual drag-and-drop tool for building AI automation workflows. connect nodes on a canvas, wire them together, run them. no boilerplate. the whole thing is open source.

## what it is

it is a pipeline builder for AI workflows.

you drag nodes onto a canvas, connect them, and run the pipeline with one click.

nodes can be things like:
- an LLM call (OpenAI, Anthropic, Gemini, OpenRouter)
- a web search
- a document or PDF reader
- a RAG retrieval from a knowledge base
- a text splitter
- an API call
- a sub-workflow
- an input and an output

wire them together, pass variables between nodes using `{{ nodeId.field }}` syntax, and you have a working AI system.

## why i built it

i have been building AI products for a while.

and every time i prototype something new, there is the same setup cost:

- set up the project,
- connect the providers,
- write the prompt plumbing,
- wire up retrieval,
- hook up the output.

it is not hard, but it is slow. and it does not need to be.

i wanted something that lets me test an idea in minutes, not hours.

and i wanted something where non-engineers could inspect and adjust the logic without touching code.

so i built it.

## what it looks like in practice

you open the app, drag an Input node, a Web Search node, an LLM node, and an Output node onto the canvas.

you connect them.

you set the LLM prompt to something like:

`using this context: {{ webSearch.results }}, answer: {{ input.query }}`

you click run.

the pipeline executes node by node, streaming the LLM response in real time, and shows you the output.

that is it.

## what it can actually do

- multi-provider LLM calls with streaming
- web search with Exa, Tavily, or Brave
- RAG pipelines with knowledge base management
- file ingestion — PDF, CSV, plain text
- YouTube transcript extraction
- API calls to external services
- sub-workflow execution (pipelines inside pipelines)
- workflow save, load, and run history

## where to find it

it is open source and on GitHub.

the backend is FastAPI + Python. the frontend is React + React Flow.

you can run it locally with one LLM provider key and no other setup.

## final thought

i did not build this to replace LangChain or n8n.

i built it because i wanted something simple, visual, and mine.

something i can extend, break, and rebuild.

if you are building AI systems and want a faster way to prototype and inspect them, this might be useful for you too.

check it out. contributions welcome.
