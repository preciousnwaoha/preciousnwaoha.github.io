---
title: Control AI With Custom Mouse Gestures
description: I built mouse gesture control into Velin AI — draw an S, Circle, or Triangle with your mouse to trigger AI actions invisibly and hands-free.
date: 2026-02-06
tags:
  - ai
  - product
  - velin-ai
cover: /assets/blog/cover-1.jpg
slug: control-ai-with-mouse-gestures
readtime: 4
---

** TL;DR: there's an undetectable real-time AI desktop app you can full control using customizable mouse gestures. I built it, they say it's insane.

Yes, it's exacltly what i said it is.

I mean you can draw and "S", a "Trangle", or maybe "Infinity" sign, with your mouse and those trigger actions in an invisible AI app, like giving you responses, switching context, reading your screen and more. You choose what gestures you want, and you assign actions to each gesture.

## A little Context
I shipped Velin AI a month ago, an undetectable AI desktop app, that can see your screen, and listen to conversation (only live mode is active), and give you real-time answers during meetings, live interviews or online tests. I had one goal building Velin AI; make the app undeniably better than anything in the category out there. So it had to be smarter and faster than anything out there, and it got to be completely undetectable in every way, on every platform. The app could be controlled with untracable customizable keyboard shortcuts, which was enough, but that also meant you have to constantly press keys for answers. If i could remove that blocker such that just moving your mouse in special paths controls the ai app, then that would be a feature unseen before.


## Mouse Gestures in Velin AI
When you start the Velin AI app, mouse gestures are enabled by default, go to settings > mouse gestures to see all. it's a pro feature though. You can pick a gesture like Circle, and you'll see actions to select, select capture and from that instant, once you draw an Oon the screen with the Velin app open, it captures the Screen, ready to analyse and solve. You can draw an "S" to solve and customize from up to 16 unique mouse gestures: S-shape, Circle, C-Shape, Triangle, Diamond, Figure-8, Infinity, Spiral-inward, n-Shape, Tick, Horizontal Zigzag, Virtical ZigZag, Stair Step, Flipped C, L-Shape, U-shape.

Free users can only use one mouse gesture (S to solve), and cannot change/customize.


Since Velin AI app is clickthrough, hideable,transparent, onfocusable, and never becomes active window, a mouse gesture feature is more useful as the app is mostly hidden on the screen, even to the user, and that's how it should be, so you can just make a drawing to show it and see an answer, and another drawing to hide it.

## Engineering Mouse Gestures,
Fundamentally, I mouse gestures for AI control in three different components;
1. Gesture & Action Definitions/Configuration
1. Gesture Recognition
3. Gesture Action Handlers
2. Gesture to Action Mapping (Customization)
4. State Storage, Limits Checks & Fallbacks
5. Gesture Gaurds

## What Mouse Gestures mean for Velin AI and other AI apps.
Mouse gestures as proven to be one of the defining unique features of Velin AI, the idea you are getting correct answers from an invisible AI assistant, and the interviewer or test platform can't see that you typed anything, is insane. Its no longer about hidden that your are typing or cliking, you really arent, you're just drawing things like "L-shape" with your mouse, no clicks, and the ai responds accordingly. That is peak undetectability.

Aside the very direct use case with Velin AI, I personally have not seen another app that allows full control using mouse gestures, and honestly i think it's a really cool gimic that users would love. some time there's things that make your user experience feel wonderful, this is one of them.



Okay so that's it, checkout my app Velin AI, Available on MacOS and Windows
