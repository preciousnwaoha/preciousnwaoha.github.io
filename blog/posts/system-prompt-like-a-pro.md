---
title: System Promt Like a Pro - My Prompt Engineering Process in LLM Apps
description: How I build prompts in real products, and why structure, context, rules, and reminders improve output quality a lot.
date: 2026-04-27
tags:
  - ai
  - llm
  - prompt-engineering
  - rag
  - engineering
cover: /assets/blog/cover-1.jpg
slug: my-prompt-engineering-style
readtime: 4
---

**TL;DR:** i do not think of prompts as one big block of text. i think of them as a system: role, context, task, input, output, constraints, style, reminders, and tools. when you build prompts this way, the product becomes more reliable, easier to steer, and much easier to improve.

## how i think about prompting

my prompt formula is basically:

**Prompt = System Prompt + Context Prompt**

and inside that, i usually want:
- role and identity
- context
- task
- input
- output format
- constraints, refusals, and rules
- behavioral or style context
- tool descriptors and reminders

that is the shape i like.

not because it sounds nice, but because it works better in production.

## why this matters

when prompts are messy, the model becomes messy too.

you get:
- weaker answers,
- inconsistent tone,
- bad formatting,
- hallucinations,
- unnecessary refusals,
- and output that changes too much from one request to the next.

but when the prompt is structured, the model has a better chance of staying on target.

that matters a lot in real products.

## what i use prompts for

i have used this style in products like **Velin AI** and at **Pharmora**.

in both cases, the goal was not just to get “a response.”

the goal was to get:
- the right response,
- in the right tone,
- with the right boundaries,
- using the right context,
- and in a format the product can actually use.

that is a huge difference.

## the pieces i care about

### 1. role and identity
this tells the model what it is supposed to be doing.

not just “answer the user,” but things like:
- what kind of assistant it is,
- what domain it belongs to,
- what it should never pretend to be,
- and what kind of judgment it should apply.

### 2. context
this is where the model gets the situation.

context can include:
- user profile,
- product state,
- history,
- past actions,
- session details,
- retrieved documents,
- or domain-specific facts.

this is where RAG becomes useful.

## RAG, and why i like it

i like retrieval because it stops the model from guessing as much.

instead of expecting the model to remember everything, i give it the relevant context at the right time.

that helps with:
- accuracy,
- specificity,
- long documents,
- product knowledge,
- support workflows,
- and domain-heavy apps.

for me, RAG is not just a fancy AI term. it is a way to keep the model grounded.

## reminders and rules

i also like reminders.

sometimes the model knows the rule, but still drifts.

so i repeat important things like:
- stay concise,
- use the right language,
- prefer structured output,
- do not guess,
- do not invent facts,
- ask one question at a time,
- or escalate when needed.

that kind of repetition is not wasteful to me. it is stabilizing.

## output shape matters a lot

if the app needs JSON, tables, summaries, decisions, or special formatting, i make that explicit.

because the model is not just writing for a human. it is often writing for the product too.

that is why output constraints matter.

the more precise the output format, the easier the app becomes to consume downstream.

## why i split problems and solutions

in some products, i separate the prompt into stages.

for example:
- first identify the problem,
- then produce the solution.

that helps when the input is messy, broad, or incomplete.

it also makes the system easier to debug because i can see where the failure happened:
- in understanding,
- in reasoning,
- or in final response generation.

## the real benefit

the biggest benefit of structured prompting is not just better answers.

it is **controllability**.

you can guide the model without constantly fighting it.

that means:
- fewer regressions,
- better consistency,
- easier testing,
- better support for edge cases,
- and a stronger product experience overall.

## what i have learned

after building this way for a while, i do not see prompts as “just text.”

i see them like product infrastructure.

if the prompt is clean, the app becomes easier to trust.

if the context is good, the model becomes more useful.

if the rules are clear, the output becomes safer.

if the reminders are strong, the system stays aligned longer.

that is the part people miss.

## final thought

a strong AI product is not only about the model.

it is about the whole prompt system around it:
- context,
- retrieval,
- rules,
- reminders,
- output shape,
- and how all of that fits the user’s task.

that is the style i use.

and in my experience, it drastically improves product quality.