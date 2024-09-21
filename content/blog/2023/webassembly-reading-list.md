---
title: "WebAssembly Reading List"
date: 2023-10-27
draft: false
categories: []
---

I'm giving a talk titled "What Actually Is WebAssembly" at Cloud Native Rejekts 2023. As part of my talk I want to help people further explore the world of WebAssembly. This is a list of blog posts, documentation, and videos that I think might be interesting to someone who is learning about WebAssembly. I'll do my best to keep this up to date. Without further ado here is my WebAssembly reading list.

### [Mozilla Developer Network WebAssembly Docs](https://developer.mozilla.org/en-US/docs/WebAssembly)

These are the gold standard of entry-level WebAssembly documentation. It's particularly useful if you're interested in using Wasm in the browser or if you're interested in learning about the WebAssembly text format in depth.

### [Standardizing WASI: A system interface to run WebAssembly outside the web](https://hacks.mozilla.org/2019/03/standardizing-wasi-a-webassembly-system-interface/)

WASI is exciting because it is bringing so much functionality to WebAssembly. This blog post is a great introduction to WASI and why it is important. If you like Lin Clark's comic style explainers I recommend you check out all of [her work](https://code-cartoons.com/).

### [Luke Wagner on the WebAssembly Component Model](https://www.youtube.com/watch?v=tAACYA1Mwv4)

Luke Wagner gave a great talk at WasmCon 2023 about what the WebAssembly component model is. He's a fantastic speaker and the component model has the potential to rethink how we write software.

{{< youtube tAACYA1Mwv4 >}}

### [The WebAssembly Specification](https://webassembly.github.io/spec/core/)

Don't let the fact that this is a technical specification scare you. It is really well written and quite a short read if you skip all the formal notation. There's nothing quite like going to the primary source.

### [Fermyon Guide to WebAssembly Languages](https://www.fermyon.com/wasm-languages/webassembly-language-support)

Fermyon[^1] maintains a fantastic resource outlining support for WebAssembly across the top 20 programming languages.

[^1]: Full disclosure I work at Fermyon.
