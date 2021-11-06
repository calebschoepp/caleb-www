---
title: "Approachable Cryptography"
date: 2021-11-05
draft: false
---

Cryptography has a reputation for being complex and difficult to work with. While this reputation is often well deserved — or in other words think very carefully before you roll your own cryptography implementation — I have discovered that understanding the basics of cryptography is very achievable.

I've come to this realization after reading Real-World Cryptography by David Wong. This book presents a framework for how to think about cryptography, gives a taste of the theoretical underpinnings, and presents practical tips for the application of cryptography.

In this post I want to summarize in my own words what I learned from this book. This will be a very short overview of the topic and is only intended to whet your appetite. If what you read here piques you interest I strongly suggest that you read [Real-World Cryptography](https://www.manning.com/books/real-world-cryptography).

# Overview

The first step to making cryptography approachable is understanding the difference between primitives and protocols. Primitives are the basic building blocks of cryptography and include things like hashes, key exchanges, encryption and more. Each of these is an algorithm that does a very specific thing under very specific conditions. Protocols are made by composing a number of primitives together and are typically how we interact with cryptography. Examples of protocols include TLS, user authentication, crypto currencies, and more.

Let's use an analogy. Primitives are like ingredients and protocols are like recipes. Imagine that you were making an omelette. You would need a number of ingredients: eggs, ham, cheese etc. Each ingredient by itself is okay, but when combined in a precise manner according to a recipe they make something better. Primitives and protocols relate in the same way.

First, we'll cover some of the most important cryptography primitives and how they work. Then, we will explore how these primitives are composed into the protocols that we use everyday. Once again, these will be very brief introductions. For more details please go read Real-World Cryptography.

# Primitives

## Hash Functions

## Message Authentication Codes

## Authenticated Encryption

## Key Exchanges

## Asymmetric Encryption & Hybrid Encryption

## Signatures and Zero-Knowledge Proofs

## Randomness and Secrets

# Protocols
