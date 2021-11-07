---
title: "You can understand cryptography"
date: 2021-11-06
draft: false
---

TODO: Really emphasize that this is just meant to whet their appetite

ACTUALLY TODO: I'm probably better off just framing this as a book review i.e. I read this book and it really improved my mental model for crypto. What follows is a quick summary of the things I learned from the book. If it whet's your appetite than I suggest you read the book.

Cryptography has a reputation for being complex and difficult to work with. While this reputation is often well deserved — or in other words think very carefully before you roll your own cryptography implementation — I have discovered that understanding the basics of cryptography is very achievable.

I've come to this realization after reading Real-World Cryptography by David Wong. This book presents a framework for how to think about cryptography, gives a taste of the theoretical underpinnings, and presents practical tips for the application of cryptography.

In this post I want to summarize in my own words what I learned from this book. This will be a very short overview of the topic and is only intended to whet your appetite. If what you read here piques you interest I strongly suggest that you read [Real-World Cryptography](https://www.manning.com/books/real-world-cryptography).

# Overview

The first step to making cryptography approachable is understanding the difference between primitives and protocols. Primitives are the basic building blocks of cryptography and include things like hashes, key exchanges, encryption and more. Each of these is an algorithm that does a very specific thing under very specific conditions. Protocols are made by composing a number of primitives together and are typically how we interact with cryptography. Examples of protocols include TLS, user authentication, crypto currencies, and more.

Let's use an analogy. Primitives are like ingredients and protocols are like recipes. Imagine that you were making an omelette. You would need a number of ingredients: eggs, ham, cheese etc. Each ingredient by itself is okay, but when combined in a precise manner according to a recipe they make something better. Primitives and protocols relate in the same way.

First, we'll cover some of the most important cryptography primitives and how they work. Then, we will explore how these primitives are composed into the protocols that we use everyday. Once again, these will be very brief introductions. For more details please go read Real-World Cryptography.

# Primitives

What does it do?
How does it do?
Algorithms?
Security properties?

## Hash Functions

Hash functions help us by mapping arbitrarily sized data to fixed sizes. This is typically done by heuristic methods that iterate over the input data shifting and combining it into the output (digest). A good hash function makes sure that an attacker can't figure out the input given a digest, and that no two inputs map to the same digest[^1]. **SHA-2** and **SHA-3** are common and secure implementations.

For more specific use cases there are variants on the traditional has function. Extendable output functions (XOFs) like **Shake** and **cShake** provide digests of arbitrary length. **TupleHash** makes securely hashing lists a breeze. Password hash functions like **Argon2** make hashing expensive so that if data is compromised it can't easily be brute-forced.

## Message Authentication Codes

Message authentication codes (MACs) let anyone who shares the same secret (key) verify that a message has not been tampered with. Each person can verify a message they receive by recomputing it's MAC and then comparing it to the MAC that was sent along with the message. If the MAC's do not match then the message was tampered with.

MACs are effectively just hash functions combined with secret keys. Popular implementations include **HMAC** and **KMAC**.

## Authenticated Encryption

## Key Exchanges

## Asymmetric Encryption & Hybrid Encryption

## Signatures and Zero-Knowledge Proofs

## Randomness and Secrets

# Protocols

[^1]: I'm actually being sloppy here. This is actually two properties that are slightly different: Collision resistance and second pre-image resistance. See Real-World Cryptography for the details.
