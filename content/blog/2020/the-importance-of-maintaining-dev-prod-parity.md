---
title: "The Importance of Maintaining Dev/Prod Parity"
date: 2020-05-12T22:17:40-07:00
draft: false
categories: ["programming"]
---

One of my side projects recently died on the vine and it didn’t have to.

The project was a web service to convert an email newsletter into a PDF for offline reading where all the links would still work. This was done by pre-rendering the content of the links into the PDF.

Generating the PDF required a plethora of tools. I used [Puppeteer](https://github.com/puppeteer/puppeteer) to render links as HTML documents and convert them to PDFs; a mix of the Python PDF libraries [PyMuPDF](https://pymupdf.readthedocs.io/en/latest/) and [PyPDF4](https://github.com/claird/PyPDF4) to merge and link the generated PDFs; and [GhostScript](https://www.ghostscript.com/) to compress the final result.

## A World Without

At the start, I hacked together a mess of Python, Node.js, and Bash scripts to prove I could get it to work. When it came time to try and deploy it in a more robust fashion, I had three obvious choices for hosting — a VPS like Digital Ocean, a PaaS like Heroku, or something serverless like AWS Lambda.

Right out of the gate I knew Heroku wasn’t going to be an option. The process I had developed required using Puppeteer, which is really just a JavaScript wrapper around a Chromium binary. PaaS offerings are generally too sandboxed to allow you to run arbitrary binaries alongside your code. I learned this the hard way at a previous internship where I spent an entire week trying to run [Google Lighthouse](https://developers.google.com/web/tools/lighthouse) on Azure’s PaaS. Suffice to say I was not successful.

The remaining options were to use a VPS or serverless. I knew a VPS would have been more simple to deploy to. A task queue and worker model would have let me use what I already had. It could even run on one machine. Dirt simple.

Instead, the allure of the sub-second billing and “infinite scale” tempted me to use a serverless offering. Both these reasons shouldn’t have mattered to my zero-user side project. Regardless, I chose to use the [Serverless Framework](https://www.serverless.com/) hosted on [AWS Lambda](https://aws.amazon.com/lambda/). I came to regret it.

Things went okay at first. Spinning up a few Lambdas with the Serverless Framework is a breeze. But the deployment rapidly grew in complexity. First, my build step needed a bespoke docker plugin so that I could use one of my PDF libraries. Next, I had to find a way to package in binaries with my deployment so that my Lambdas could use them. Once I had the individual functions working I realized I would need to coordinate them somehow so that I could robustly handle failures. No trouble, just add a plugin to start using AWS Step Functions.

I added all these tools/plugins/shims to be able to solve my problem, but they were starting to become a problem. My deployment times had grown to be as long as 10-15 minutes because the build step was so bloated. This alone isn’t terrible, but the straw that broke the camels back was that I couldn’t test my changes locally.

Without the ability to test locally, development ground to a halt. Every syntax error, typo, and silly accident was locked behind 15 minutes of waiting. So much for rapid iteration. Over time, I lost interest and the project died.

## Dev/Prod Parity

If I had been able to test my project locally it wouldn’t have died. Testing changes locally would have shortened my feedback loop. 30 seconds is much more manageable than 15 minutes. In other words, what killed my project was a failure to maintain Dev/Prod parity.

Dev/Prod parity is the idea that your local testing environment should be as close to identical to your production environment as possible. I like the description of it from the [Twelve-Factor App](https://12factor.net/dev-prod-parity). If you aren’t already familiar with the idea of a Twelve-Factor App, you should go check it out - it’s great.

My failed side project is an extreme example of losing environment parity; in fact, by the end, there was no parity. The only working environment was prod. But even in less extreme cases, differences in environments can start to cause big problems.

## Key Takeaways

It’s clear to me now why Dev/Prod parity is so valuable. There are two ways it will change how I work on future projects.

First, I’m going to be more cognizant of how new features break Dev/Prod parity. When differences arise, I shouldn’t rush ahead with the feature anyway. My story is a clear example of how pushing the fix off can snowball and cause real problems. Instead, I should find a way to implement the feature without breaking parity. If this isn’t possible, it’s time to reassess how important the feature is. I want to work in a world where saying, “It runs on my machine”, also means that it runs on the production machine.

Second, I need to start thinking about Dev/Prod parity from the very start of the project. Even before I write the first line of code. In hindsight, choosing to use AWS Lambda was a mistake for my particular situation. The tooling for doing advanced workflows with AWS Lambda is still very nascent and set me up for failure. Sure it’s easy to locally emulate a simple CRUD app with only a few functions. But local emulation is untenable once you need binaries, Step Functions, and Docker build steps.

My side project died on the vine, but yours doesn’t have to. With the discipline to maintain Dev/Prod parity, you can avoid the issues I had.
