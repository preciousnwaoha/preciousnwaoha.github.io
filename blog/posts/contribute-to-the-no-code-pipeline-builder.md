---
title: Contribute to the No-Code AI Pipeline Builder — What You'll Build and Learn
description: An open invitation to developers who want real AI engineering experience — how to contribute, what skills you'll gain, and what the project still needs.
date: 2026-05-04
tags:
  - open-source
  - ai
  - engineering
  - contribute
  - llm
cover: /assets/blog/cover-1.jpg
slug: contribute-to-the-no-code-pipeline-builder
readtime: 5
---

**TL;DR:** this is an open source AI pipeline builder with a clean architecture, real engineering problems, and a clear path for contributors. if you want hands-on experience with LLM engineering, RAG systems, streaming APIs, or visual tooling — this is a real project to build on, not a tutorial.

## why contribute to this project

a lot of "starter" projects for AI developers are toy apps.

they are single-file scripts, hardcoded to one provider, with no real architecture.

this project is different.

it has:
- a real execution engine with topological sort and variable resolution
- a multi-provider LLM layer with streaming and cost tracking
- a RAG pipeline with pluggable vector store backends
- a config-driven node system
- a FastAPI backend with proper separation of concerns
- real tests

if you contribute here, you are working on something that has actual engineering depth.

## what kind of experience you will get

depending on what you build, you could come away with real, practical experience in:

**LLM engineering**
- building provider adapters for new models
- streaming token-by-token responses through async generators
- cost estimation, token tracking, and model routing logic

**RAG and retrieval**
- embedding pipelines and vector store backends
- document ingestion, chunking strategies, and semantic search
- knowledge base management APIs

**backend engineering**
- async Python with FastAPI
- execution engine design — graph algorithms, variable resolution
- SQLAlchemy ORM, migrations, API design

**frontend engineering**
- React Flow for canvas-based UIs
- config-driven component rendering
- streaming SSE events in real time

that is a real, practical list. not a vague "you will learn AI."

## how the codebase is organized

the backend follows a clear separation:

- `domain/nodes/executors/` — one file per node type, no business logic leaks out
- `domain/execution/engine.py` — the topological execution engine
- `integrations/llm/` — provider adapters behind a single interface
- `integrations/vector/` — vector store backends (ChromaDB, pgvector, Pinecone)
- `api/routes/` — thin HTTP handlers, no logic

the frontend is equally structured:

- `nodeConfigs/` — one config file per node type, defines all fields declaratively
- `components/` — reusable React components

if you understand those two structures, you can navigate the whole project.

## the easiest ways to start contributing

**add a new LLM provider**

if a provider supports an OpenAI-compatible API or has a Python SDK, adding it takes one new file in `integrations/llm/` and a few lines in the router.

good candidates right now:
- Mistral
- Cohere
- Together AI
- Groq

**add a new node type**

every node type is self-contained:
1. a `NodeSpec` in `domain/nodes/specs.py`
2. an executor file in `domain/nodes/executors/`
3. a frontend config in `frontend/src/nodeConfigs/`
4. a registration in `registry.py` and `index.js`

good candidates:
- a code execution node (Python sandbox)
- a data transformation node (JSON manipulation, filtering)
- a conditional routing node (if/else branching)
- an email or webhook sender node

**improve the vector store backends**

the pgvector and Pinecone backends are implemented. there is room for:
- Weaviate support
- Qdrant support
- better chunk metadata filtering

**write tests**

the test coverage is real but not complete. adding focused tests for executors, the engine, and provider adapters is a meaningful and practical contribution.

## what the project still needs

honestly:
- more node types
- more LLM providers
- better error messages when things go wrong
- retry and fallback logic in the engine
- conditional branching (if/else routing between nodes)
- a proper node output inspector in the UI
- better variable autocomplete in text fields

none of those are hard to add individually. they just need someone to do them.

## how to get started

1. clone the repo
2. `cd backend && pip install -r requirements.txt`
3. add an LLM provider key to `.env`
4. `uvicorn app.main:app --reload`
5. open the frontend and run a workflow

once you have it running, the architecture will make sense quickly.

read `backend/docs/node-contracts.md` before adding a node type. read `backend/docs/llm-integrations.md` before adding a provider. the docs are written to actually help.

## final thought

open source is one of the best ways to build real engineering experience.

not tutorials. not courses. actual code that runs, breaks, gets reviewed, and ships.

this project is genuinely useful and genuinely open.

if you are building your skills in AI engineering and want something real to contribute to — come build.
