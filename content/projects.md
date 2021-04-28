---
title: "Projects"
date: 2020-03-18T23:24:21-07:00
draft: false
layout: "alternating_img_rows"
---

{{% img_row_left src="/grok_js.png" alt="GrokJS Logo" %}}
  Working with new programming languages is difficult and making sense of
  unfamiliar syntax is a big part of that. At
  [HackED 2021](https://hacked-2021.devpost.com/) I set out with a team
  to solve this problem for **JavaScript**. We made a VS Code extension
  called [GrokJS](https://marketplace.visualstudio.com/items?itemName=grokjs.grok-js)
  that helps users understand JavaScript syntax by directly annotating the
  source code with descriptions and links to documentation. With the help of
  the wonderful [Acorn](https://github.com/acornjs/acorn)
  parser this project was quite doable in 24 hours.
{{% /img_row_left %}}

{{% img_row_right src="/spotify_queue_shuffler.png" alt="Spotify Queueu Shuffler Logo" %}}
  Spotify has shuffle functionality, but it only works for playlists and
  albums. [qShuffle.com](https://qshuffle.com)
  allows you to shuffle the songs lined up in your queue. I wrote it in
  **React.js** and used the Spotify Web **API** to actually shuffle the
  queue. For authentication I implemented a client-side **OAuth** implicit
  grant flow. Finally, with the help of
  [Create React App](https://create-react-app.dev/docs/getting-started/)
  I turned it into a PWA so that it can be installed to users devices.
{{% /img_row_right %}}

{{% img_row_left src="/mixtape_manager.png" alt="MixtapeManager Logo" %}}
  Building Spotify playlists by hand can get pretty tedious — so I set out to
  make it easier — enter [MixtapeManager](https://mixtapemanager.ca). This was
  a super fun project to work on and I loved the tech stack I
  chose; a **Go** and **PostgreSQL** backend serving static **HTML**,
  styled via **Tailwind.css**, with a touch of vanilla **JS** here and
  there for some interactivity. Throw it up on **Heroku** and you've got a
  fully functioning website in a jiffy. I also had some fun designing it in
  **Figma**.
{{% /img_row_left %}}

{{% img_row_right src="/nqq_icon.png" alt="NQQ Logo" %}}
  During the Spring of 2020 I read through the fantasic book
  [Crafting Interpreters](https://craftinginterpreters.com/)
  that takes you from zero to programming language hero. In the book you
  implement an interpreted language called Lox. After finishing the book I
  continued to improve my implementation that I was calling
  [NQQ](https://github.com/calebschoepp/nqq). Notably, I added list and map
  data structures to the language. I even wrote a
  [post](https://calebschoepp.com/blog/2020/adding-a-list-data-type-to-lox/)
  about the process on my blog. This project taught me so much about
  programming!
{{% /img_row_right %}}
