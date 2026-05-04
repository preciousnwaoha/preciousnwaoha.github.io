---
title: Building a No-Code AI Pipeline Builder — Architecture and Decisions
description: How I designed the execution engine, node system, variable resolution, and streaming for a visual AI workflow tool.
date: 2026-05-04
tags:
  - ai
  - engineering
  - backend
  - fastapi
  - open-source
cover: /assets/blog/cover-1.jpg
slug: building-a-no-code-ai-pipeline-builder
readtime: 6
---

**TL;DR:** the hard parts were the execution engine (topological sort + variable resolution), the config-driven node system that keeps frontend and backend in sync, and making streaming work cleanly through SSE. everything else followed from getting those three right.

## the core problem

a pipeline builder is basically a graph executor.

you have nodes. you have edges. you have variables that flow between them.

the challenge is not the UI. React Flow handles the canvas well.

the real challenge is:
- how do you determine execution order when dependencies can come from edges *and* variable references?
- how do you resolve `{{ nodeId.field }}` before a node runs?
- how do you stream results back to the browser while execution is still in progress?
- how do you keep the frontend node config in sync with what the backend actually expects?

those four questions shaped everything.

## execution order: topological sort

every workflow is a DAG — a directed acyclic graph.

to execute it correctly, i need to run each node only after its dependencies have finished.

that is a topological sort.

but there is a catch: dependency edges can come from two places:
- explicit edges drawn on the canvas
- variable references in node fields, like `{{ webSearch.results }}`

so the sort has to consider both.

the engine builds an adjacency graph from edges *and* scans every string field for variable patterns. both sources contribute to the in-degree count.

if the sort produces fewer nodes than the workflow has, there is a cycle. the validator catches that before execution starts.

## variable resolution

once execution order is determined, the engine resolves variables before each node runs.

a variable like `{{ llm.response }}` gets replaced with the actual output from the LLM node that already ran.

the resolver handles a useful edge case: if the entire value is a single variable reference, it preserves the original type — a list stays a list, a number stays a number. only inline variables inside a larger string force a string conversion.

that matters for nodes that expect structured inputs.

## the node system

every node type has two representations.

**backend: NodeSpec**
defines what fields the node accepts, what outputs it produces, and what validations run before execution.

**frontend: nodeConfig**
defines how the node renders — labels, field types (text, dropdown, slider, switch), default values, and which fields are half-width.

these two stay in sync by contract. if a new field is added to the backend spec, the frontend config gets the matching UI field, and vice versa.

that is enforced by convention, not by code generation. it is manual but simple.

the node executor is a separate file per node type. it takes a context object with the resolved inputs and returns a dict of outputs. no side effects beyond that.

## streaming with SSE

the frontend connects to a single `/run` endpoint over Server-Sent Events.

the backend runs the workflow and yields events as it goes:
- `run_started`
- `node_started`
- `llm_token` (one per streamed token)
- `node_completed`
- `run_failed` or `run_completed`

each event is a JSON dict.

the LLM node has a streaming toggle. when enabled, the executor yields tokens one by one and the frontend renders them in real time. when disabled, the full response arrives in one `node_completed` event.

SSE is the right transport here. it is simpler than WebSockets for a one-direction stream, and it works well with FastAPI's `StreamingResponse`.

## validation before execution

the engine never runs an invalid workflow.

before any node executes, the validator checks:
- the graph has no cycles
- all variable references point to real nodes and real output fields
- required fields are not empty
- every referenced node exists

if validation fails, the run returns a clear error message. execution never starts.

## what i would do differently

the main thing i would revisit is the node spec sync between frontend and backend.

right now it is manual — you add a field to the backend, you add it to the frontend config separately.

a better approach would be a single schema that generates both. that is the kind of thing worth building once the node types stabilize.

## final thought

the interesting engineering in a tool like this is not the UI.

it is the execution layer:
- ordering correctly,
- resolving variables reliably,
- streaming without blocking,
- and failing clearly.

get those right, and the rest is just adding new node types.

that is the part i found genuinely fun to build.
