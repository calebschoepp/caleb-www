---
title: "Wrapping Bigcache With a Generic Interface"
date: 2020-03-21T17:18:59-07:00
draft: false
---

Recently at work I was tasked with adding some caching to one of our Golang services. As it turns out, the offending service was hitting our database on every request to validate lots of duplicate API keys - not great. This fix ended up being much harder than I thought it would be.

After some research and withering debate among the engineers (I shouldn’t have been surprised that computer science folk have strongly held opinions about what a good cache looks like), we decided that [BigCache](https://github.com/allegro/bigcache) fit our needs best.

Here’s the catch. The signature for the set method in BigCache is `Set(key string, entry []byte) error`. It expects the value to be a byte slice. But, we wanted to store a struct with multiple fields that represented the API key. Sure we might have been able to just store the bytes of the actual key, but what if we wanted to reuse the cache in the future for some other struct? We’re screwed. We needed a signature more like those found in other Golang cache implementations, `Set(key string, entry interface{})`. This would let us store anything we wanted.

The obvious solution to this problem is serialization. If we could serialize the arbitrary struct we want to store into a bunch of bytes then we could store that. To actually use the value we just get the byte slice from the cache and deserialize it back into a struct. Serializing the struct is as easy as importing something like `encoding/json` or `encoding/gob`. But now comes the headache. When we deserialize the bytes, how will the statically typed language know the shape of the struct to put the data in?

There are two nasty ways to solve this problem, and a cleaner third option I discovered. The first approach you could take is to perform runtime reflection on the values to gain the necessary typing information. It's best to avoid this when you can. The second approach would be to force the caller of the cache to preemptively declare the types they will store before using the cache. This 
