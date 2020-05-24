---
title: "Building_objects_with_closures"
date: 2020-05-24T10:31:38-07:00
draft: true
---

TODO is there a better name then 'object system'
TODO make sure I'm using meta-programming right
TODO make sure I'm talking about lisp and s-expressions to DSLs right

- Bla di da, some sort of intro
   - Closures are cool
   - Closures are powerful
   - Were going to do an exercise as practice
   - Probably not production code but is a good learning experience
   - Try something different out today

-- MEH --
A fascinating thing about programming languages is that you can hack on them and make them your own. Macros, lisps, DSLs etc. Some of these are more powerful and allow you to actually modify the syntax - others are less powerful and only let you build new semantic constructs. I love this about programming languages.

I'm going to walk through how you can build an object system in JavaScript without using any of the traditional syntax. Instead, we'll implement it only using functions and closures.
-- MEH --

There is a long and rich history of modifying programming languages to better suit the needs of a particular use-case. This looks like writing gnarly macros. Or crafting custom DSLs in Lisp with S-expressions. Meta-programming is a very fascinating topic. But you if you get a little bit crafty, you don't even need macros to modify your language.

TODO tie this together better here

Let's walkthrough building an alternate object system within JavaScript. I can't recommend actually using this code in production. For that you are much better off using the more robust object system built in to JavaScript. Think of this as a thought exercise and a chance to flex your programming muscles.

First things first, what's expected of an object system. This is actually a bigger question then it appears to be - there is no one clear definition. Every OOP language is a little bit different. At high level, there are a few key expectations of an object system.

1. Group behaviour and data
2. Polymorphism
3. Encapsulation
4. Mutability?
5. Inheritance

Another word for what we just listed out, is the semantics of an object system.

Beyond the basics object systems vary on three key dimensions:

Syntax - the actual language you use to work with the object system. Do you define o ...............

Semantics - the behavior the object system allows.

Implementation - the process of translating syntax into semantics. 
