---
title: How I Save on DevOps, Cloud, and Tooling Costs While Shipping SaaS for $0
description: The stack I use to keep infra and tooling costs near zero while still shipping real products.
date: 2026-02-06
tags:
  - saas
  - devops
  - cloud
  - startup
  - indie-hacker
cover: /assets/blog/cover-1.jpg
slug: how-i-save-on-devops-cloud-and-tooling-costs
readtime: 6
---

**TL;DR:** You do not need a huge cloud bill to ship a serious product.

Over time, I have learned a simple rule: **spend money only where it directly removes pain or unlocks growth**. Everything else should be free, cheap, self-hosted, or automated.

That is how I keep shipping Velin AI and other products without letting infrastructure eat the business alive.

## The mindset

When you are building as a solo founder or a small startup, cloud costs can quietly become a second business.

A few dollars here, a few more there, and suddenly:
- hosting is expensive,
- logs are expensive,
- emails are expensive,
- analytics are expensive,
- CI/CD is expensive,
- and every “small” tool becomes another monthly bill.

I do not like that.

My goal is not just to build products. My goal is to **ship quality products while keeping fixed costs extremely low**.

## My default stack for cheap, solid infrastructure

Here is the stack I keep coming back to:

- **Coolify** for self-hosted DevOps and deployment management
- **Hetzner** or **AWS startup credits** for servers
- **Render** for simpler projects or smaller workloads
- **Vercel** for frontend hosting
- **Supabase** or Postgres on a server for databases
- **Resend** for transactional and lifecycle emails
- **PostHog** for analytics
- **Sentry** for error tracking
- **GitHub Actions** for CI, builds, and automation
- **cron-job.org** for free cron jobs

That combination has saved me a lot of money.

## Coolify changed how I think about DevOps

Coolify is one of the biggest cost-saving tools I have used.

In simple terms, it lets you self-host and manage deployments without making everything feel like manual Ubuntu suffering. You can deploy:
- frontend apps,
- backend apps,
- Postgres,
- Redis,
- and other services

from one dashboard.

If you already have a server from Hetzner, AWS, or somewhere else, you can install Coolify and suddenly deployments become much easier.

That is the real value.

It gives you most of the benefits people usually pay a platform for, while still letting you stay in control.

### Why I like it

I do not want to spend my time buried in server maintenance.

I want to ship.

Coolify helps me do that by making self-hosting feel more like product work and less like punishment.

It also keeps memory-related issues more manageable when you use it with the right plan and server setup.

## Why Hetzner is one of my favorite cost-saving moves

If I want a server that feels powerful without costing a fortune, Hetzner is usually one of the first places I look.

A lot of the time, the same level of compute that costs much more on AWS can be dramatically cheaper there. That matters when you are running real workloads and not just a tiny landing page.

For the kind of products I build, especially when I need decent CPU and memory, Hetzner often gives me a much better value.

## AWS credits are still very useful

AWS can still be a great option if you can get startup credits.

I have used AWS startup credits to cover servers for projects where I needed serious infra without paying out of pocket immediately.

That works especially well when:
- you are early,
- you need time to validate,
- and you do not want infra costs blocking the build.

I would not use AWS blindly for everything, because costs can grow fast. But with credits, it can buy you a lot of breathing room.

## Render is good when you want simple

If I have a smaller project or something that does not need heavy custom infra, Render is still a great option.

It is one of the easiest ways to get a backend or service online without turning deployment into a project of its own.

For smaller workloads, that simplicity is worth a lot.

## Vercel is still my go-to for web hosting

For frontend and web apps, Vercel remains one of my favorite options.

It is especially strong if you are using Next.js, which is still my personal favorite for building web products.

For a lot of projects, Vercel gives me exactly what I need:
- fast deployment,
- easy previews,
- good developer experience,
- and a very low-friction workflow.

If the frontend is mostly web-based, Vercel is hard to beat.

## GitHub Actions saves me more time than people realize

I almost forgot to mention this, but GitHub Actions is a huge part of how I keep costs down.

I use it for:
- builds,
- checks,
- cross-platform automation,
- and shipping Velin AI for both macOS and Windows.

That matters a lot because it lets me automate work I would otherwise have to do manually or pay someone else to manage.

In practice, GitHub Actions helps me:
- build releases automatically,
- run tests,
- package desktop builds,
- and keep the shipping process consistent.

That is one of those tools that quietly replaces paid automation and a lot of manual effort.

## My email stack stays cheap too

For emails, I like **Resend**.

It has been a great fit for transactional emails and lifecycle emails, and the free tier is generous enough to support real use for early products.

That is important because email is not optional.

If you are building a SaaS, you need:
- signup emails,
- password emails,
- onboarding emails,
- abandoned checkout emails,
- lifecycle emails,
- and support emails.

If you can keep that layer cheap and reliable, you protect margin from day one.

## Lifecycle emails are worth automating

I use lifecycle emails to recover abandoned checkouts, re-engage old users, and keep users moving through the product.

A simple trigger email can do a lot:
- bring back someone who almost paid,
- help someone finish onboarding,
- recover an old beta user,
- or simply remind people that your product is still alive and improving.

For Velin AI, this has already helped me bring users back.

For implementation, I like the idea of a simple cron job that checks user activity and sends the right email at the right time.

You can use free cron tooling like **cron-job.org** to trigger those jobs without paying for another service.

## PostHog gives me useful analytics without a big bill

I like PostHog because it gives me useful product analytics without making me feel trapped in a giant enterprise stack.

For an early product, I care about:
- what users are doing,
- where they drop off,
- what they click,
- and what actually leads to conversion.

That is enough to make good decisions.

You do not need the most expensive analytics platform to understand your users.

## Sentry is one of the highest-ROI tools I use

Sentry has saved me a lot of time.

For desktop apps especially, it is very useful because it helps me catch real production issues fast.

When a user hits an error, I want to know:
- who it happened to,
- what version they were on,
- what device they used,
- what the error was,
- and where in the code it came from.

That is how I can fix issues quickly instead of guessing.

For me, Sentry is one of those tools that feels optional until you actually need it. Then it becomes essential.

## What this has done for my products

Using this stack, I have been able to:
- ship faster,
- keep fixed costs low,
- reduce infra stress,
- stay in control,
- and avoid paying for things I can automate or self-host.

I have used this approach across multiple products, including Velin AI and other systems where reliability matters.

It is not about being cheap for the sake of it.

It is about spending money where it matters and cutting everything else.

## The real lesson

You do not need the most expensive stack to build something serious.

You need:
- a clear product,
- a reliable deployment path,
- good automation,
- sane email infrastructure,
- tracking that tells the truth,
- and error monitoring that keeps you honest.

Everything else is optional.

That is how I think about SaaS now.

If a tool can be free, self-hosted, or replaced with automation, I try to do that first.

If a tool truly removes pain or saves time, I pay for it.

That balance is what lets me keep shipping.

## Final thought

A lot of builders assume “better product” means “more expensive stack.”

I have found the opposite to be true.

If you are careful, you can ship quality software, move quickly, and keep your infra and tooling costs close to zero for much longer than people think.

That is not a hack.

That is just good founder discipline.