---
title: "The Right Way to Build Web Apps"
date: 2022-03-21
draft: false
---

**TODO fix title**

**TODO fix publish date**

**TODO fix filename**

What follows is an _extremely_ opinionated take on what I think is the right way to build web apps[^1]. If you think I'm off my rocker than you're probably either working under different assumptions[^2] or best moving along to your next internet watering hole.

These opinions were formed from years of making shoddy technical decisions while building web apps. I'd like to think I've learned a thing or two along the way. I'm sure that in a couple years I'll look back at this and disagree with a good portion of it, but, that's okay. Changing your mind is important.

## You don't need a SPA dummy

Much ink has been spilled over the issues of building single-page applications (SPAs). I tend to agree with most of it.

When you're starting to build a new web app sit yourself down and take a good hard look in the mirror. There's like a 9/10 chance that you don't actually need what a SPA is offering and you're just hearing the siren call of the latest JS hotness.

Even if there is a portion of your app that requires loads of interactivity without page reloads — it's just that — a portion. The other 12 pages of your app are going to be basic CRUD forms and you'll be tearing your hair out as you fight `useReducer` hooks to just change the fucking name of a widget. Save yourself the pain and just serve up something like a React app on the one page where it is actually needed.

So if you're not going to build your web app with the JS framework of the week, then what should you use? Three words: Ruby on Rails. Let's breakdown both parts because frankly they're quite distinct.

We'll start with the Rails because it is the more important of the two. Rails is the best MVC web framework ever written, full stop. Fight me. If you don't know Rails yet stop reading this guide and go learn it, then come back here. I seriously feel that strong about it.

Everything about Rails is meant to save you time while maintaining quality. The mantra of convention over configuration keeps you from wasting time bike-shedding[^3]. The `rails generate` utilities get you 90% of the way to where you need to go at the cost of typing like 20 characters. The actual usage of Rails reads like a DSL for the web which saves you from having to translate between the world of your interpreter and the world of the web.

Ruby is merely a prerequisite for the greatness that is Rails. It is the extreme expressiveness of Ruby that allows Rails to act as a DSL for the web. If I'm being honest the typing story isn't quite where I would like it to be but at least it's not PHP.

## Only choose the shiniest gems

Now that we're on the Ruby on Rails train it is time to grab some shiny [gems](https://rubygems.org/) to take along for the ride. The ecosystem of gems for web development is Rails goes from great to the best.

You're going to want to authenticate your users so go grab the [`devise`](https://github.com/heartcombo/devise) gem. Don't listen to anyone who tells you to roll your own authentication solution. People will cite two reasons to roll your own authentication: it's a good learning experience and customizing `devise` is too hard. They're wrong on both counts.

Security is the wrong place for a "learning experience" since the little things matter — one subtle mistake and your web app is no longer secure. Go read a blog post or the `devise` source code if you want to learn how authentication works.

Customizing `devise` may not be trivial, but, it is possible which is what matters. Besides, you shouldn't be modifying your auth flow for quite awhile anyways. Odds are your app isn't a special snowflake that needs a special authentication flow.

## Other things I guess I need to have opinions on

- Testing
- devise
- rolify
- pundit
- postgres
- heroku
- redis
- tailwind
- daisyUI
- stripe
- rails_admin
- figaro
- stimulus and react if necessary
- Use freaking linters
- sidekiq
- overall theme of power laws in development

[^1]: I'm kinda picking fights for no good reason. Charicature of how strongly I feel. Written this way to make it more exciting. Screw nuance
[^2]: TODO: Move fast, side projects, low traffic and if they ever get traffic fix it later. Few people working on projects. SaaS.
[^3]: Albeit at the cost of a steeper learning curve.
