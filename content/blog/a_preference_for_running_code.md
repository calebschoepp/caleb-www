---
title: "A preference for running code"
date: 2020-03-14T01:18:08-07:00
draft: true
---

It seems to me that every programmer has an innate desire to rip everything out and rebuild the system from scratch "the right way". I'm fascinated by the psychology behind this. More often than not I catch myself thinking like this and it rarely gives me the results I thought it would. Instead of the overall improvement I was expecting when starting fresh, there ends up a set of new bugs and technical debts that reignite this vicious cycle. I think I might have some insight into why this happens.

# The mountain of abstractions

My favorite thing about software engineering is abstraction. What a beautiful concept. Nothing makes you feel more powerful than building a new abstraction that didn't exist before.

So why do software engineers use abstraction - to fight complexity. Imagine trying to program in assembly, sounds painful. But wait, assembly is an abstraction on top of raw machine code. Imagine trying to program in that, terrifying. But wait, raw machine code is just an abstraction on top of turing complete hardware. Imagine trying to program by building custom hardware, soul sucking. And on and on this goes. So instead of spending the rest of their lives soldering engineers started forming abstractions that they could use like little building blocks. With those simple abstractions even better abstractions could be built. In other words, abstraction allows complex things to be done in simple ways. Or put another way, abstraction allows complex things to be thought about in simple ways.

Now that we've thought about why we use abstraction, let's think about where that leaves us today. We are sitting on gigantic mountain of abstractions. By the very nature of abstraction this is an incredibly complex mountain, yet we view it as if it were a simple construct. This makes us both highly effective and also slightly naive to our true situation. The naivete is key.

So why do programmers always want to rip everything out and start from fresh. It's simple. Our picture of the system we are working on is a simple one. It's an abstraction. We don't have an intuitive sense for how much complexity is actually underlying what we are working. So when there is a flaw, it is only natural that we would think the easiest fix would be to start over, it's a really simple thing right? In reality starting over is like bulldozing the mountain you are living atop. You lose everything and have to build it up again inevitably reintroducing new flaws.

The core problem here is that we need to keep building up the abstractions to do our work, but we need to avoid succumbing to the naive temptation to tear it all down.

# A preference for running code

At work, my team was working to build some significant new functionality into our existing systems. The decision with every new piece of functionality was to find ways to integrate it into our currently existing systems. This was very surprising to me. From my perspective the new requirements were orthogonal to what we already had and so they belonged in there own services where they could be scaled and maintained independently. When I brought up my concerns the senior engineers kept stating, "We have a preference for running code", meaning not starting over but rather molding what they already have. At the time I don't think I appreciated how wise that statement is, but in the light of what I've observed above it makes total sense.

This mantra is a way of staying away from the dangers of starting over. For the senior engineers on my team this was probably hard fought for, but now it can guide me too. When I see a problem and think the fix is starting over, now I'll know to be extra careful. There in fact may be a better way that leverages what I already have. I'll remember to "have a preference for running code".
