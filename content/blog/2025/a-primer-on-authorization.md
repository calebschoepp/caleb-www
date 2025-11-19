---
title: "A Primer on Authorization"
date: 2025-11-19
draft: false
isFavorite: false
categories: ["programming"]
---

Software applications need to secure themselves by authenticating and authorizing requests that they receive. Authentication (authN) is the process of verifying a user's identity — who they are. Authorization (authZ) is the process of verifying a user's scope of access — what they can do. This blog post will help you build a mental model for how authorization is modeled and the spectrum of possible implementations.

## Authorization Models

Fundamentally authorization is a question of the following form: Can `subject` perform `action` against `object`. Here are some example subject-action-object "triples".

- Can `subject:user` perform `action:edit` against `object:document`?
- Can `subject:service_account` perform `action:delete` against `object:database`?

You get the idea. A variety of authorization models exist which take different approaches to tracking these triples.

### ACLs

ACLs (access control lists) directly track each triple for every possible combination of access you need to provide. This is straight forward but gets out of hand quickly because it grows `O(n^3)`.

### RBAC

RBAC (role-based access control) introduces the concept of a role which adds indirection to the `subject`. For example you could create a role called editor which has permissions to edit and delete documents. Then you could assign users to that role and they would transitively have those permissions. This drastically reduces the number of triples you need to manage. More advanced forms of RBAC introduce basic hierarchies or domains.

### ABAC

ABAC (attribute-based access control) takes a different approach and uses attributes of the subject, action, and/or object to control access. Rather than storing triples you define policies for the attributes you expect on a triple e.g. `subject == object.owner`. This means you don't need to store triples, but it means you need to send the relevant attributes every time you make a decision.

### ReBAC

ReBAC (relationship-based access control) models relationships using a graph to answer complex transitive relationship. For example it could answer the question can `subject:user` perform `action:edit` against `object:document` by tracing that the user is a member of a team which is a part of an organization which has access to edit the document. This provides indirection similar to RBAC, but to arbitrary levels of depth.[^1]

## Authorization Implementations

Once you've chosen an authorization model that fits your use case you need an implementation of it. This can cover the spectrum from hand rolling it to going full zanzibar[^2]. Implementations vary on a number of aspects:

- Authorization models supported.
- Complexity.
- Scalability.

<img src="/authz-spectrum.png" width="500px">

The input to an authorization implementation is subject-action-object triple and the output is an allow or deny decision.

<img src="/authz-impl.png" width="400px">

This input and output is informed by an implementation's schema and data. The schema is dependent on your authorization model. In RBAC the schema is the roles you define; in ABAC it is the attributes you want to match on; in ReBAC it is the relationships between different entities; ACLs are effectively schemaless. The data is the actual triples that you're storing. Typically you would create this data when other events happen in your application. For example if a new user is created in your application in addition to creating that user in the application database you would create all the necessary triples to represent that users scope of authorization.

### Hand Rolled

Lots of projects start with a hand rolled authorization setup. Typically the schema is hardcoded and the data lives in the application database.

**Authorization models supported:** It's easy enough to hand roll basic ACLs, RBAC, or even ABAC. But, the devil is in the details and there are subtle things you can get wrong. Don't expect advanced RBAC or ReBAC.

**Complexity:** There is limited operational overhead because it lives in your application and uses your application database (you can use transactions). Expect technical debt from maintaining the authorization logic yourself though.

**Scalability:** Scales as far as your application will scale — which granted is probably pretty far. However, if you have other micro-services or clients that need to make authorization decisions they'll need to call home to your application which is a scaling bottle neck.

**Use this if:** You probably just shouldn't hand roll your own authorization code. Focus on what [makes your beer taste better](https://podup.substack.com/p/jeff-bezoss-beer-tasting-analogy).

### Casbin

An authorization framework allows you to avoid hand rolling the implementation while still embedding the authorization decisions in your application. [Casbin](https://casbin.org/) is an example of this kind of framework. You write the schema of your authorization model in a config file that Casbin loads at startup. The data lives in the application database.

**Authorization models supported:** Casbin supports ACLs, RBAC, ABAC, ReBAC, and a [lot more](https://casbin.org/docs/supported-models). However, it's ReBAC support is more primitive than some of the other offerings on the spectrum.

**Complexity:** Operational costs are very low. You write your schema in an existing DSL and your data lives in the application database (you can use transactions).

**Scalability:** Same scaling as hand rolled which is to say as far as you can scale a single application. If you have other micro-services or clients that need to make authorization decisions they'll need to call home to your application which is a scaling bottle neck. It's worth noting that Casbin does support coordinating between multiple replicas of a single application.

**Use this if:** This should be your default implementation. Reach for more advanced implementations when you have a specific need.

### OpenFGA

The next step up is to run a dedicated authorization service outside of your application. OpenFGA is an example of such a service. These types of services are typically based on the Google [Zanzibar paper](https://research.google/pubs/zanzibar-googles-consistent-global-authorization-system/). OpenFGA is a moderately faithful re-implementation of Zanzibar. Again you write the schema of your authorization model in a config file that OpenFGA loads at startup. However, now the data lives in a separate database from your application database.

Now that we're trying to atomically write to our application database and the authorization database we have a [dual-write problem](https://authzed.com/blog/the-dual-write-problem). Give the linked article a read for a good description of the possible solutions.

It's worth noting that OpenFGA can run embedded in your application as a framework, but this defeats most of its benefits.

**Authorization models supported:** Everything.

**Complexity:** You now need to maintain a separate service and you have to contend with the dual-write problem.

**Scalability:** Any micro-services or clients doing authorization talk to OpenFGA which can scale independently of your application.

**Use this if:** You think you'll have lots of micro-services/clients that need to make authorization decisions or you're worried about scaling.

### Open Policy Agent

Open Policy Agent takes a similar place to OpenFGA in the spectrum of implementations. However, OPA is tailored for ABAC and expects that all relevant data for an authorization decision is sent along with the input. It does have support for storing data, but only by asynchronously long polling your application for this data.

**Authorization models supported:** Primarily ABAC and RBAC.

**Complexity:** You now need to maintain a separate service and potentially have to manage long polling for data.

**Scalability:** Any micro-services or clients doing authorization talk to OPA which can scale independently of your application.

**Use this if:** You primarily care about ABAC and need some scaling.

### SpiceDB

SpiceDB is our final stop and is the most faithful open source Zanzibar re-implementation[^3]. Similar to OpenFGA you have the dual-write problem. SpiceDB offers two improvements over OpenFGA: First, it protects against the [new enemy problem](https://authzed.com/docs/spicedb/concepts/zanzibar#new-enemy-problem) with [ZedTokens](https://authzed.com/docs/spicedb/concepts/consistency#zedtokens) (zookies). Second, it supports multiple region deployments when backed by something like CockroachDB.

**Authorization models supported:** Everything.

**Complexity:** You need to to maintain a separate service and globally distributed database, properly use ZedTokens, and contend with the dual-write problem.

**Scalability:** This is about as good as it gets. SpiceDB copied a lot of the [performance](https://authzed.com/docs/spicedb/ops/performance) improvements from the original Zanzibar paper.

**Use this if:** You need global scaling and perfect consistency with ZedTokens.

[^1]: ReBAC is capable of modelling most other authorization models.
[^2]: I'll be describing the spectrum of implementations with descriptions of specific projects. These projects are illustrative of a part of the spectrum, but are not the only project that exists on that part of the spectrum. I chose these projects through a mix of popularity, familiarity, and uniqueness.
[^3]: There are a number of Zanzibar-a-likes out there https://authzed.com/blog/zanzibar-implementations.
