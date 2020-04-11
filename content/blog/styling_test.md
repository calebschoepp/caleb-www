---
title: "Styling Test"
date: 2020-03-14T21:22:14-07:00
draft: true
---

This is a blog post. It has some long paragraphs like this one with the repeated statement. Hello my name is caleb and this is my blog. Hello my name is caleb and this is my blog. Hello my name is caleb and this is my blog. Hello my name is caleb and this is my blog. Hello my name is caleb and this is my blog. Hello my name is caleb and this is my blog. Hello my name is caleb and this is my blog.

It also has short paragraphs like this [something](www.calebschoepp.com).

## Sub header could go right here buddy

Hello this is another short paragraph yay

There will be snippets of code within the paragraphs like so: `func (s *Server) run() (error)` Wow wasn't that cool.

There will also be blocks of code like the following:

```python {linenos=false ,hl_lines=["3-4"],linenostart=1}
# Adds two numbers together and returns the result
def add(a, b):
    return a + b.add()

def subtract(a - b):
    return a -b
```
![asdf](/download.jpeg)
``` go
package main

import (
	"github.com/xyproto/splash"
	"io/ioutil"
)

func main() {
	// Read "input.html"
	inputHTML, err := ioutil.ReadFile("input.html")
	if err != nil {
		panic(err)
	}

	// Highlight the source code in the HTML document with the monokai style
	outputHTML, err := splash.Splash(inputHTML, "monokai")
	if err != nil {
		panic(err)
	}

	// Write the highlighted HTML to "output.html"
	if err := ioutil.WriteFile("output.html", outputHTML, 0644); err != nil {
		panic(err)
	}
}
```

I can imagine using lists of all sorts:

- Item X
- Item Y
- Item Z

1. Item 1
2. Item 2
3. Item 3

> I can image using lists of all sorts:

# Header 1
## Header 2

Maybe I would even want to link to [something](www.calebschoepp.com)

Hell, I could even insert an image:

![Alternate text goes here](/baby-yoda.jpeg)
