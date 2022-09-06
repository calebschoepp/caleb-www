---
title: "Todo"
date: 2022-09-06
draft: false
---

**TODO fix title**

**TODO fix publish date**

**TODO fix filename**

**TODO proper ordering of footnotes**

**Do I need to make this more generic than just what Fermyon does? What a programmer do?**

I recently signed an offer to start working full-time with [Fermyon](https://fermyon.com) in early 2023. Given this new development in my life I've been spending a lot of time explaining what Fermyon does to my non-technical family and friends. It's been very difficult. In particular I've struggled to strike the right level of detail. Just saying that Fermyon is in "cloud computing" is accurate but too vague an answer. Any further attempt at a detailed explanation usually leaves my audience in a dazed state as I bombard them with technical terms that they don't understand.

My hope with this post is to demystify for my non-technical audience what Fermyon does. More broadly I hope to also explain from first principles what I do as a programmer. To do so we're going to build up from the basics. If you are reading this there is a good chance I told you a simplistic answer about what I'm working on and sent you here for more details. Great, welcome! If something doesn't make sense to you please reach out to me. I'm happy to explain it to you and then perhaps I can improve this post.

Are you technical? Great, you're welcome too! Please keep in mind this post isn't written for you -- although I hope you still find it a compelling read. In particular please spare me some liberties in simplifying these concepts.

The very first thing you'll read on [Fermyon's website](https://fermyon.com) is that they are "Pioneering the next wave of cloud computing." This probably raises more questions for you then it answers. What is cloud computing? It has waves? What is the wave you're working on and why is it different? Fear not, by the end of our time together this will all make sense. Once you can understand this pithy tagline you will understand what Fermyon is doing. But, before we can make sense of it all I think it is helpful to to go way back and understand a bit about the roots of computing.

## We Tricked a Rock Into Thinking For Us

What is a program? You interact with them thousands of times a day but it is unlikely you've ever stopped to actually think about this. The simplest way to describe a program is that it is a set of instructions that are executed by a computer to create a desired result. The instructions that a computer can understand are incredibly simple: add these two numbers together; store this number in memory here; jump to this instruction. The instructions are so simple because we literally tricked a rock into thinking for us. Rocks aren't very smart. Because the instructions are so simple you would think that we wouldn't be able to achieve very much but this obviously isn't the case. What gives? Turns out while rocks are dumb they also think really fast. Really fast! Billions of instructions per second fast. A smart program can emerge from dumb instructions executed quickly.

In the early days of computing programmers would directly write their programs with these simple instructions. Another name for these programs of simple instructions is assembly language. Nowadays, almost no programmers work in assembly language because it is difficult and cumbersome. Instead we use high level languages where each instruction does more: print this text; ask the user for some information; draw something on the screen. Then we use another program called a compiler to translate these high level instructions into low level instructions automatically for us[^2].

We can summarize the process of making a program with the following diagram:

**DIAGRAM: Programmer -Editor-> Code -Compiler-> Program -Computer/OS-> Something happens**

TODO: Explain diagram.

## The Evolution of Computing

As computers have gotten better programs have gotten more complex and where/how they run has changed. The first programs were simple calculations that would run on room sized computers. Next were more complex business data crunching batch jobs running on big bulky mainframes. Eventually computers got small enough that individuals could have their own personal computer (PC). Thanks to Moore's law even though the computers were getting smaller they were still getting better. PC's started running programs like spreadsheets and video games. And then came along the internet and a new client/server paradigm for programs was introduced[^3].

To begin to understand the client/server paradigm we can think about what is actually happening when you use a website.

TODO Improve this... In this paradigm one

---

1. Understand software life cycle
2. Understand more about how websites and internet and cloud work
3. Understand the waves of cloud
4. Understand new wave of cloud

5. Computer is a rock that can do dumb stuff really quick. Diagram of running program. Example of desktop software. Or other use cases.
6. Internet was a thing and that allowed client/server model.
7. On premise solutions
8. VMs
9. Containers

What really is a program?
How are programs made?
How do these website things work (client/server, internet enabled, APIs as alternative client)?
First there was on premise solutions
VMs better than on premise b/c X, Y, Z
Containers better than VMs b/c X, Y, Z
Wasm better than containers b/c X, Y, Z

[^2]: Not all high level languages use a compiler. Some languages are interpreted. I'll leave it at that but if you're interested in all the nuance here let's chat and I'll talk your ear off.
[^3]: This is actually a lie. The client/server paradigm was a thing before the internet too. It is relevant anytime two programs are communicating regardless of whether or not the internet is the medium. In fact the programs can even be running on the same computer in this paradigm. I'm just using the "introduced" wording as it simplifies things.
