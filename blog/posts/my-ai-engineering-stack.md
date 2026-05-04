---
title: My AI Engineering Stack
description: The stack I use to build AI products that are fast, reliable, and actually shippable.
date: 2026-02-06
tags:
  - ai
  - llm
  - engineer
  - backend
  - evals
cover: /assets/blog/cover-1.jpg
slug: my-ai-engineering-stack
youtube: https://www.youtube.com/embed/dQw4w9WgXcQ
readtime: 5
---

**TL;DR:** NestJS/Node.js or FastAPI on the backend, WebSockets or LiveKit for live sessions, multiple LLM providers for reliability and cost control, vector storage where it makes sense, and a real eval process so the system does not just feel smart, but stays good after every change.

That is the stack.

Not because it is trendy, but because it works.

## Let's talk ideology

A lot of people ask for an “AI stack” like there is one perfect answer.

There is not.

What matters is whether you can build something that is:
- fast enough,
- reliable enough,
- cheap enough,
- and easy enough to improve without breaking everything.

That is the real game.

For AI products, the stack is not just about frameworks, it is about how you move from prompt, to retrieval, to model choice, to live delivery, to evaluation, without losing control.

## My backend choice

For backend, I usually reach for one of two paths:

- **NestJS / Node.js**
- **FastAPI / Python**

### NestJS / Node.js
I like NestJS when I want structure, maintainability, and a strong TypeScript workflow.

It is a good fit when the product has:
- a lot of APIs,
- event-driven workflows,
- queues,
- sockets,
- user accounts,
- billing,
- and orchestration logic.

For products like Velin AI, Node.js also fits well because I can keep the frontend and backend mindset closer together, especially when the whole app is already TypeScript-heavy.

### FastAPI / Python
I use FastAPI when the AI side is more Python-friendly, or when I want to move quickly on model-related APIs, experiments, or internal services.

FastAPI is especially nice when:
- I need a clean API layer,
- I want Python libraries,
- I am working closer to AI tooling,
- or I need something lightweight and simple.

My rule is simple: use the backend that keeps the product moving, not the one that looks best in a diagram.

## Live sessions need live infrastructure

If the product is real-time, then the architecture has to be real-time too.

That is where I use:
- **WebSockets**
- **LiveKit**
- or a mix of both

### WebSockets
WebSockets are great for:
- live text responses,
- streaming updates,
- state sync,
- lightweight real-time events,
- and interactive UI feedback.

For AI apps, they are often enough for a lot of the live experience.

### LiveKit
When I need audio or video session support, LiveKit becomes more interesting.

It is useful for:
- live interviews,
- meetings,
- conversation workflows,
- voice-based features,
- and anything that needs strong media infrastructure.

The main point is this: if the product promises real-time interaction, the transport layer has to feel instant. If it feels slow or shaky, the magic disappears.

## I do not trust one model provider alone

This is one of the most important parts of my stack.

I like having an **agnostic LLM setup**.

That means I can combine:
- **OpenAI**
- **Gemini**
- **Claude**
- **OpenRouter**

depending on the task.

### Why I do this
Because different models are good at different things.

Some are better for:
- reasoning,
- coding,
- speed,
- cost,
- context handling,
- or fallback reliability.

If one provider is slow, expensive, rate-limited, or not giving the result I want, I can switch.

That gives me:
- better resilience,
- better cost control,
- and better quality per task.

This is a big deal in production.

I do not want one provider failure to become a product failure.

## My AI routing logic

In practice, I like to think of the system as a router, not a single model call.

The router decides:
- which model to use,
- when to fall back,
- when to retry,
- when to compress context,
- and when to use retrieval instead of raw generation.

That is how you avoid a fragile LLM app.

The app should not just “call AI.”

It should know **which AI to call, why, and when not to call it at all**.

## Retrieval and embeddings

For long-term memory, context, search, or document grounding, I use vector storage where it makes sense.

That can be:
- **Pinecone**
- **pgvector**
- or another vector layer depending on the product

### Pinecone
I use Pinecone when I want a managed vector database and I do not want to spend time building vector infrastructure myself.

It is useful for:
- retrieval,
- semantic search,
- document lookup,
- and memory-style workflows.

### pgvector
I like pgvector when I want to keep things simple and close to Postgres.

That is often enough for:
- smaller products,
- lean systems,
- and apps where I do not want another service just for vectors.

### The real point
Not every AI product needs a giant retrieval architecture.

Sometimes the right answer is:
- store a few embeddings,
- retrieve only what matters,
- and keep the rest in normal structured DB tables.

That is usually cleaner than overengineering.

## LangChain and LangGraph

I use tools like **LangChain** and **LangGraph** when the app needs orchestration, chaining, routing, or multi-step flows.

They are useful for:
- structured AI workflows,
- branching logic,
- memory flows,
- agent-style systems,
- and repeatable pipelines.

But I do not use them blindly.

If the app is simple, I keep it simple.

If the app needs control, tracing, and multiple steps, then those tools become more useful.

The real skill is not using the framework.

The real skill is knowing when the framework is worth the complexity.

## Where the data lives

I keep important things in the database.

Not everything should be hidden inside prompts.

I store things like:
- prompts,
- JSON formats,
- provider settings,
- model limits,
- routing rules,
- feature flags,
- and configuration.

That way, the system is editable without a full rewrite every time I want to improve something.

The database should hold the truth, not just the user data.

## Evaluation is the part people ignore

This is the part I care about a lot.

A lot of people talk about AI stacks, but the real question is:

**Did this change make the system better, worse, or riskier?**

That is what evaluation is for.

## My eval philosophy

I do not think you need a giant “eval stack” to be serious.

What matters is having a repeatable way to answer:
- did the new prompt improve quality,
- did the model swap make things worse,
- did retrieval help,
- did latency get better,
- did we introduce a new failure mode,
- did the product feel more reliable or less reliable?

If you can answer those questions consistently, you already have the important part.

## What my eval process looks like

My eval process usually includes:

- a set of real prompts or real user examples,
- manual review of bad outputs,
- comparisons before and after changes,
- checking edge cases,
- measuring success on the task that matters,
- and watching for regressions.

That is enough to catch most problems before they become product issues.

The important thing is that evals are tied to shipping decisions.

Not just “did the output look nice,” but:
- should this model go live,
- should this prompt ship,
- should this retrieval change stay,
- should this fallback be enabled,
- should this feature be blocked until the failure is fixed.

That is real eval discipline.

## The difference between intuition and systems

There is a big difference between:
- changing things based on vibes,
- and changing things based on evidence.

A lot of teams, especially early on, operate on intuition.

That works until it does not.

The better path is to create a small but real system:
- test set,
- comparisons,
- human review,
- simple scoring,
- and deployment checks.

You do not need a huge dashboard to start.

You just need enough structure to know whether the product got better.

## Why this stack works for me

This stack works because it balances:
- speed,
- reliability,
- cost,
- flexibility,
- and control.

I can build fast without locking myself into one provider, one framework, or one workflow.

That matters a lot when you are shipping AI products in production, especially if the product is real-time, user-facing, and expensive to get wrong.

## Final thought

The best AI engineering stack is not the fanciest one.

It is the one that helps you ship, measure, improve, and keep control.

For me, that means:
- NestJS or FastAPI,
- WebSockets or LiveKit,
- multiple LLM providers,
- vector storage where needed,
- structured DB storage,
- and a real eval process.

Simple enough to move fast, strong enough to survive production.