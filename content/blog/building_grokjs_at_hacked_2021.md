---
title: "Building GrokJS at HackED 2021"
date: 2021-01-22
draft: true
---
This past weekend I participated in [HackED 2021](https://hacked-2021.devpost.com/), the annual hackathon put on by the U of A Computer Engineering Club. I wanted to take some time to reflect on the experience.

Unlike previous hackathons I have attended, I came into this hackathon with a clear picture of a problem I wanted to solve. Thankfully, when I pitched the idea to my team before the hackathon, they liked it. I think this early clarity around our idea helped us place as well as we did.

I intend to write more on this topic so I will keep the explanation of the problem brief. When working with new programming languages syntax is often a stumbling block. Understanding what all the characters in your editor represent is step one to understanding what the code is doing. Unfortunately, the state of the world isn't great for googling about unfamiliar syntax. In all likelihood Google will just show you documentation for the methods and functions you are using.

![Trouble Googling Syntax](/googling_syntax.png)

We set out to solve this problem by building a VS Code extension called [GrokJS](https://marketplace.visualstudio.com/items?itemName=grokjs.grok-js). The extension helps you learn JavaScript syntax directly inside your editor. Walking through an example is the easiest way to explain how it works. Imagine you encounter the following JavaScript and can't tell what it is doing:


```js
let myArray = [...[1, 2, 3], ...[4, 5, 6]];
```

With GrokJS installed you start by highlighting a confusing section. For example you could highlight `...[1, 2, 3]` to try and understand what it does. Once you have this highlighted, the editor will show an inline hint of what it is — in this case it is an Object Pattern. But just the name of the syntax element isn't enough to understand, so for more details you can hover over what you've highlighted. This will show a popup box with a description of what the syntax does and a link to documentation on it. By allowing programmers to highlight confusing syntax and get answers directly in the editor we avoid the difficult step of trying to google for an explanation.

![GrokJS demo](/grokjs_demo.gif)

When we started to build the extension it was clear that were going to be two parts to it. A front-end that was in charge of interacting with VS Code and a backend that was in charge of parsing the code for insights. In addition to these, for the first few hours of the hackathon we deluded ourselves into thinking that we needed to use the [Language Server Protocol](https://microsoft.github.io/language-server-protocol/) as an intermediary between the two parts. LSP is great but was total overkill for what we were trying to do. We were dealing with a 1 editor by 1 language problem. LSP is necessary when dealing with an n editors by n languages problem.

I wasn't directly involved with the front-end of the plugin, but from what I understand the VS Code extension API is relatively pleasant to work with. The front-end was responsible for feeding the source code and the currently highlighted text to the backend. The backend would then respond with a syntax type for example `Spread Element`. This type was then used to index into a big JSON document that mapped between syntax types and documentation. These documentation mappings were built with some hand-crafted scrapers and a lot of manual labor.

![GrokJS design](/grokjs_design.png)

I spent a long time consternating over how the back-end should be implemented. But, in the end it was remarkably simple. First, the source code was parsed into an abstract syntax tree with the npm package [acorn](https://github.com/acornjs/acorn)[^1]. Then I used the [acorn-walk](https://github.com/acornjs/acorn/tree/master/acorn-walk) package to find the subtree of the AST that most closely resembled what was highlighted. Finally, the type of this subtree is returned e.g. `Spread Element`.

We managed to get the extension almost fully working by 4:30 AM. This let us grab a few hours of sleep before regrouping to polish and publish the extension. Later that afternoon we presented to the judges. At the closing ceremonies we learned that our project had finsiehd in the top 6.

This was the first remote hackathon I've attended. Like everything remote over this past year I missed the in person interactions, but regardless I had a great time. I'm sure it helped that I've been working with my team remotely on other school projects for months now. The organizers also did a great job putting it together.


[^1]: Our implementation re-parsed the AST everytime something changed. We had worried that parsing an AST multiple times a second might introduce performance issues. Turned out to not be a problem. In our tests, Acorn could parse ~5000 lines of JavaScript in under 10 ms. Call me impressed.