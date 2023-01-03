---
title: "How to Organize Your Code"
date: 2020-05-31T16:52:17-06:00
draft: false
---

When I first started programming, I struggled a lot with how I should organize all my code. I needed an orderly way to keep track of the tutorials, code snippets, and side-projects I was rapidly accumulating. It's definitely a tough problem.

Thank you to Dan Fletcher for his [blog post](http://www.danfletcherblog.ca/2017/01/beginners-tip-organize-coding-projects/) on this very topic. He helped me figure this out when I was starting out. The following is a summary and rehashing of his fantastic ideas.

## Don't

**Make heavy use of nesting:** At first, it seems like nesting is the key to good organization. This is wrong for two main reasons. First, nesting makes long filepaths which makes navigation with the command-line inconvenient. Second, deeply nested directories impose too brittle of a hierarchy. Eventually you will have files that can live in multiple places within the hierarchy. Then the hierarchy becomes inconsistent and loses its value. Keep things simple and avoid nesting too deeply.

```text
nesting
└── 2020
    ├── feb
    │   ├── big-projects
    │   │   └── project-1
    │   └── small-projects
    │       └── project-2
    └── mar
        ├── big-projects
        │   └── project-3
        └── small-projects
            └── project-4
```

**Organize by language:** For simpler projects, this is a logical conclusion. But, as projects grow in complexity they will start to make use of many languages. It is not uncommon for my projects to involve 3-4 different languages. This makes it impossible to know which directory a project should live under.

```text
by-language
├── go
│   └── project-1
├── javascript
│   ├── project-2
│   └── project-3
└── python
    └── project-4
```

## Do

**Keep everything in one place:** I have a single directory on my computer that all my programming work lives under. Get creative with the name! I call mine the `batcave`. What would you call yours?

**Use a flat structure:** Use a single directory for every project. Each directory contains everything that the project needs. These project directories are the level at which I like to track things with Git i.e. every project directory would be its own GitHub repository.

**Keep the odds and ends together:** I like to group the really small stuff together. I'm talking about the code snippets and the tiny test scripts. For example, when I started learning JavaScript I made a directory called `javascript-snippets`. Anytime I wanted to quickly try something out I could make a file and toss it in that directory.

```text
batcave
├── javascript-snippets
├── project-1
├── project-2
├── project-3
└── project-4
```

Sticking to these do's and don'ts will go a long way to keeping your code organized. Remember though, these are only guidelines — sometimes it will make sense to break them. Now go forth and code!
