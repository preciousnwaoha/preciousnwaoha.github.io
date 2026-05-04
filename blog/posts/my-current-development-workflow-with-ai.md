---
title: My Current Develoment Workflow With AI
description: How I built my personal site and added a blog.
date: 2026-02-06
tags:
  - claude
  - web
  - seo
cover: /assets/blog/cover-1.jpg
slug: my-current-development-workflow-with-ai
youtube: https://www.youtube.com/embed/dQw4w9WgXcQ
readtime: 4
---

** TL;DR: Warp Terminal + VS Code + Claude Code + Minimal Tooling = maximum productivity. [Less is more](https://github.com/preciousnwaoha/humanjobhunter).

Here is the intro.

It's time for an update on my workflow, which keeps evolving.

After going all-in on Cursor, I went fully back to VS Code for my main coding editor and view, when i realized that the real power was not in tab completions or editor side bars, but on the terminal. Currently using Warp, but will likely switch to Ghostty soon as i've heard and seen good things. I tried a bunch of tools like Zed, but it just wasn't fun for me.

Super happy with my Macbook M1 Pro - 16inch 3456×2234 makes 4-6 apps no lag on tasks, and I can edit my 4k videos with Capcut without lag and full power.

VS Code's terminal weaks me sometimes, forgets or mixes histroy, and isn't built for the current large text terminal prompting/debugging world. Nothing beats Warp and Ghosty (See difference).

You can also embed video directly:


## Tools and Their Reality
ChatGPT models weems to be better are reviewing, and edge-case identification compared to Gemini. So i'm using it more an more for planning, However, In my expereince Gemini 3 models are better at code implementation and debugging, It also features more recent data even in older models due to a more capable web search tool.

But that is as far as chat interfaces are concerned, when it comes to agentic coding Claude code still tops everything, but it can make a huge mess if theres no proper context and constraints in the request. It is especially great at refactoring, updates, and cleanup.

I personally fined tools like Cursor with auto AI tab completions, useless when there's terminal based tools like Claude Code. So i've stopped my Cursor Subscrition in place of Copilot in VS Code. I didn't look back.

## Me as a dependency
Having the experience now means being able to identify when there is a wrong assumtion or misguided decision in AI implementation. Thanks to my years of expereince, I've directly used pretty much every stack element that could be suggested for projects I work on. But in cases where the choice is more blurry, I find the fastest way to get up to speed with the current and best answer for you solution, is to make an argument with two models. E,g 

### Anti Coding Brain Rot
I have one rule, if it's not something I've done so many times myself. I would code it myself. For example Velin AI is 95% no AI code, because it was my first Desktop app.

## Planning and Context Management
Believe me when I say, this is everything. Spending time to use your brain in thinking about the new feature or code change doesn't just save me from "coding brain rot", but it helps me, implement.

Using plan mode is a must. I repeat it's a must. Patch tasks are simple enough for me to quickly fix, bigger changes, I write a long detailed prompt with plan mode, and review.

For major changes, I always create md documentation with guidelines, arch definitions, and mental models, with GPT-5 before starting any coding.

Running a plan reviewing agent helps a ton.


## The Hard Parts
The hardest part is distributed system design, picking the right dependencies, platforms and a forward-thinking database schema.

I’ve been building an incredible amount of custom infra, admin pages, CLIs to help both me and the agents and that work did speed me up so much. Would have never done that with the old ways.



## Testing Strategy
Bigger changes always get tests. Automated ones usually aren’t great, but the model almost always finds issues when you ask it to write tests IN THE SAME CONTEXT. Context is precious, don’t waste it.

## One At A Time
If you want to cry, or want to know what extra usage is, then don't break down tasks. Sometimes Claude will do the absolute unnessary or forget it's priorities, expecially when context is maxed out. 

## Results and Comparisons
The quality of my output has greatly increased, I get an insane amount of tasks done with this setup. 

## What I'm currently Exploring
### Terminal
Many friends have recommended Ghostty Terminal for me, so i've installed it. quite happy with warp so i don't see what it's gonna offer me aside simplicity and lightweight.  i'm currently checking it.

### Vibe Designing
Okay this one isn't really gonna be an exploration, already in my workflow. Claude Design is simply the best design tool out there right now, period. Cursor is expensive and does nothing Cluad


<iframe
  width="560"
  height="315"
  src="https://www.youtube.com/embed/dQw4w9WgXcQ"
  title="YouTube video player"
  frameborder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
  allowfullscreen>
</iframe>