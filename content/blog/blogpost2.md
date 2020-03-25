---
title: "Blogpost2"
date: 2020-03-14T01:18:13-07:00
draft: true
---

- Hitting DB everytime for API key so we need to build a cache
- Need to solve this problem but also be extensible
- Decided on using Bigcache for x, y, z reasons (ristretto, state of caching blog)
- Bigcache only offers a []byte interface - for extensibilty reasons we wanted to offer an interface{}
- Maybe talk about the things I tried
- Explain why `encoding/gob` works
- Code I should show
    - serialize/deserialize
    - Bigcache get/set/new that satisfies a cache interface
    - Very brief part of cache interface
