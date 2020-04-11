---
title: "Storing Empty Interfaces in BigCache"
date: 2020-04-11T14:12:50-07:00
draft: false
---

Recently at work I was tasked with adding some caching to one of our Golang services. The particular service required incoming requests to provide an API key for authentication. So on every request the service was making an extra round trip to the database to verify the API key even though it was usually the same key. Not great. Implementing the cache ended up being much harder than I thought it would be.

After some research and exhaustive debate among the engineers, we decided that [BigCache](https://github.com/allegro/bigcache) fit our needs best.

Here’s the catch. The signature for the set method in BigCache is `Set(key string, entry []byte) error`. It expects you to store a byte slice. But, we wanted to store a struct with multiple fields that represented the API key. We might have been able to just store the bytes of the actual key this time. But this would just be putting off solving the problem. We needed a signature more like those found in other Golang cache implementations, `Set(key, entry interface{})`. This would let us store anything we wanted.

The obvious solution to this problem is serialization. If we could serialize an arbitrary struct into a byte slice, then we could store anything. To actually use the struct we stored, we could just deserialize the byte slice we get from the cache. Serializing the struct is as easy as importing any number of available encoding libraries in Golang. But now comes the headache. When we deserialize the bytes, how will the language know the shape of the struct to put the data in? Turns out `encoding/gob`, the Golang specific serialization library, has this capability.

I highly recommend you go read the [blog post](https://blog.golang.org/gob) by Rob Pike that talks all about Gob; it’s a great read. In short, Gob is a Go native way of serializing data and it also comes with the ability to serialize interface types. To enable this you need to register your type with the aptly named [register function](https://golang.org/pkg/encoding/gob/#Register) before serializing it. I ended up getting stuck here, because any code sample for `register()` I found would always register a singular concrete struct or interface; I needed it to register an arbitrary `interface{}` type. With a little messing around in the Go playground I discovered it can do that too.

```go
// What most code samples did
type foo struct {
    bar string
}

gob.register(foo{})

// What I needed and discovered is possible
var type interface{} // Could be anything

gob.register(type)
```

# Putting It All Together

With the problem of storing an arbitrary struct as bytes solved, I'll show you how I put it all together. First we want an interface for the cache that the rest of the system can interact with. For a simple cache we don’t need much more than get and set methods.

```go
type Cache interface {
    Set(key, value interface{}) error
    Get(key interface{}) (interface{}, error)
}

```

Now let’s define the BigCache implementation that will fulfill the above interface. First we need a struct that holds the cache and can have methods added to it. You could also build other things like metrics into this struct.

```go
type bigCache struct {
    cache *bigcache.BigCache
}
```

Next are the implementations of the get and set methods. Both methods assert the key is a string. From there, get and set are contrapositives of each other. One serializes a value and stores it. The other retrieves a value and deserializes it.

```go
func (c *bigCache) Set(key, value interface{}) error {
    // Assert the key is of string type
    keyString, ok := key.(string)
    if !ok {
        return errors.New("a cache key must be a string")
    }

    // Serialize the value into bytes
    valueBytes, err := serialize(value)
    if err != nil {
        return err
    }

	return c.cache.Set(keyString, valueBytes)
}

func (c *bigCache) Get(key interface{}) (interface{}, error) {
    // Assert the key is of string type
    keyString, ok := key.(string)
    if !ok {
        return nil, errors.New("a cache key must be a string")
    }

    // Get the value in the byte format it is stored in
    valueBytes, err := c.cache.Get(keyString)
    if err != nil {
        return nil, err
    }

    // Deserialize the bytes of the value
    value, err := deserializeGOB(valueBytes)
    if err != nil {
        return nil, err
    }

    return value, nil
}

```

Finally the `encoding/gob` serialization logic. Beyond the use of `register()` this is the fairly standard way to serialize things in Go.

```go
func serialize(value interface{}) ([]byte, error) {
    buf := bytes.Buffer{}
    enc := gob.NewEncoder(&buf)
    gob.Register(value)

    err := enc.Encode(&value)
    if err != nil {
        return nil, err
    }

    return buf.Bytes(), nil
}

func deserialize(valueBytes []byte) (interface{}, error) {
    var value interface{}
    buf := bytes.NewBuffer(valueBytes)
    dec := gob.NewDecoder(buf)

    err := dec.Decode(&value)
    if err != nil {
        return nil, err
    }

    return value, nil
}
```

And with all of that we’ve managed to store `interface{}` values in BigCache. Now my team's service is a bit more efficient. Pretty cool! If you are looking for a more comprehensive implementation, checkout my [gist](https://gist.github.com/calebschoepp/0165d92de412e288aa7441e792d0aa3a).
