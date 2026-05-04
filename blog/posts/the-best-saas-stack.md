---
title: My $0 Stack for Building SaaS and AI Products
description: The stack i keep coming back to when i want to ship fast, keep costs low, and still build something serious.
date: 2026-04-27
tags:
  - saas
  - ai
  - startup
  - indie-hacker
  - stack
cover: /assets/blog/cover-1.jpg
slug: my-free-saas-stack
readtime: 6
---

**TL;DR:** for most SaaS products, including AI products, i like a simple stack that gives me speed, support, and almost no monthly cost at the start: Next.js + Tailwind for web, React Native for mobile, Electron for desktop, Vercel for hosting, Supabase for db and auth, Resend for emails, PostHog for analytics, Sentry for errors, and Coolify + Hetzner when i want to self-host properly.

That is not me trying to be fancy. That is just the stack that keeps letting me ship.

## why i like this stack

when you are building SaaS, especially as a solo founder or a small team, the problem is not just “can i build it?”

the real question is:

- can i ship it fast?
- can i support it properly?
- can i keep the costs at $0 or near $0 for as long as possible?
- can i still make the product feel premium?

that is the balance i care about.

i do not want a stack that is cheap but fragile.

i do not want a stack that is powerful but expensive from day one.

i want something in the middle, something that lets me move fast, keep quality high, and only start paying more when the product actually grows.

## web: next.js + tailwind css

for web, i keep coming back to **Next.js** and **Tailwind CSS**.

i like Next.js because it gives me a clean path for:
- landing pages,
- dashboards,
- auth flows,
- blog pages,
- admin tools,
- SEO pages,
- and product UI.

it is one of those frameworks that just makes sense for SaaS.

Tailwind, on the other hand, helps me move quickly without turning every component into a styling project. i can build clean UI fast, keep things consistent, and not fight the stylesheet all day.

for me, that is a huge win.

if i want to ship a proper SaaS frontend without overthinking the stack, this is usually where i start.

## app: react native

for mobile, i like **React Native**.

not because it is perfect, but because it lets me stay close to the same mental model i already use for web.

that matters a lot.

if i already know React, i do not want to restart from zero just to support mobile. i want to reuse the same logic, same product thinking, same speed.

React Native is good when:
- i want a companion app,
- i want notifications,
- i want mobile access to the product,
- or i need a real app without building two separate codebases from scratch.

for SaaS, mobile is not always the first thing i build, but when i do need it, React Native is usually my preferred path.

## desktop: electron

for desktop apps, especially when i am building something like Velin AI, i use **Electron**.

Electron is not the lightest thing in the world, but it is extremely practical.

it gives me:
- cross-platform support,
- faster shipping,
- access to system-level behavior,
- and a good path for macOS and Windows from the same codebase.

that is a big deal for AI desktop products.

a lot of tools in my space need to run on the desktop, stay accessible, and integrate with user workflows. Electron helps me do that without rebuilding the app twice.

if the product is desktop-first, Electron still makes a lot of sense to me.

## hosting: vercel

for hosting, **Vercel** is still one of my default choices.

especially for:
- landing pages,
- SaaS dashboards,
- frontend apps,
- docs,
- and blog content.

the reason i like Vercel is simple: it reduces friction.

i can deploy fast, preview changes quickly, and focus on the product instead of infrastructure drama.

when i want the frontend to just work, Vercel is usually the easiest answer.

## database: supabase

for the database, i usually reach for **Supabase**.

for most projects, it gives me enough power without making the early setup annoying.

i like it because it gives me:
- Postgres,
- auth,
- storage,
- and a very practical developer workflow.

for a lot of SaaS products, that is enough.

if a project gets too complex, or the architecture needs more control, then i may move closer to direct Postgres management or a different setup. but for most early products, Supabase is a great place to start.

it is one of those tools that saves me from building too much infrastructure too early.

## auth: supabase auth or clerk

for authentication, my first choice is usually **Supabase Auth**.

i like keeping auth close to the database and the rest of the product when i can.

it is simple, it is practical, and it fits the rest of the stack well.

that said, **Clerk** is also great.

if the product needs a smoother auth experience out of the box, Clerk is a very strong option. i do not see this as a religion thing. i just pick what makes the product easier to ship and support.

my rule is simple:
- if i want fewer moving parts, Supabase Auth,
- if i want a more polished auth layer quickly, Clerk.

## emails: resend

for emails, **Resend** is one of my favorites.

email is not just notifications. for SaaS, email is:
- onboarding,
- abandoned checkout,
- lifecycle messages,
- account updates,
- support,
- product reminders,
- and recovery.

so i need something that is reliable and easy to use.

Resend gives me that.

it is one of the cleanest email tools i have used for product work, and it fits well with both transactional email and the lifecycle system i like to build into products.

for me, email is not extra. it is part of the product.

## analytics: posthog

for analytics, i like **PostHog**.

i do not want to guess what users are doing.

i want to see:
- where they drop off,
- what they click,
- which features they use,
- and what actually matters in the funnel.

PostHog helps me do that without making analytics feel like a giant enterprise project.

that matters because a lot of early products die from confusion, not from lack of effort.

if i can understand the user flow clearly, i can make better product decisions faster.

## errors and production: sentry

for production errors, **Sentry** is one of the most useful tools i use.

this is especially true for desktop apps and AI apps, where bugs can be hard to reproduce.

i want to know:
- what broke,
- where it broke,
- what device it happened on,
- which version the user had,
- and what the stack trace looked like.

Sentry gives me that.

that means i can fix real problems faster, instead of waiting for users to explain them badly in support messages.

for serious SaaS, i think error tracking is not optional.

## blog: md / mdx or sanity

for the blog, i usually do one of two things:

- write **md / mdx** files directly in the website and parse them into `/blog`
- or use **Sanity** when i want a more flexible content workflow

i like md/mdx because it is simple and fast.

i like Sanity when i want a content system that is easier to manage from a CMS perspective.

for a personal site or founder blog, md/mdx is often enough.

for something more content-heavy, Sanity can be a better fit.

## what i like most about this stack

the best thing about this stack is not just that it is cheap.

it is that it gives me a clean path to build a real product without paying for everything upfront.

that matters because in the beginning, most products are not infrastructure problems.

they are product problems.

you want to:
- validate the idea,
- ship the MVP,
- support users,
- fix bugs,
- and learn quickly.

this stack supports that.

## when i self-host, i like hetzner + coolify

if i want to self-host properly, i like using a **Hetzner** server with **Coolify**.

that gives me a lot more control without forcing me to do every devops task manually.

Coolify helps me manage deployments, services, and the server in a much more practical way. Hetzner gives me good compute for the money.

for products that need more serious hosting, this combo is one of my favorite ways to keep costs down while still staying in control.

## everything here can start at $0

that is one reason i like this stack so much.

in the beginning, a lot of the tools can be free:
- Vercel,
- Supabase,
- Resend,
- PostHog,
- Sentry,
- and even your blog setup if you keep it simple.

that means you can ship something real without immediately taking on a bunch of monthly bills.

and that is important.

because a product that has not proven itself should not behave like a giant company yet.

## my simple rule

i try to pay only when the product needs it.

not before.

if a tool helps me ship faster, support better, or stay reliable, i use it.

if it is just adding cost and complexity, i keep it free, simple, or self-hosted.

that mindset has saved me a lot of money, and it has helped me move much faster too.

## final thought

there are many good stacks out there.

this is just the one i keep returning to because it gives me the best mix of:
- speed,
- support,
- low cost,
- and room to grow.

for SaaS, and especially for AI products, that combination matters a lot.

i do not want the fanciest stack.

i want the stack that lets me ship, learn, and keep going.

and this one does that for me.