---
title: "Replacement for Alt-tab on the Kinesis Advantage 2"
date: 2020-04-19T13:27:27-07:00
draft: false
---

I’ve been looking for a convenient way to switch windows, ever since making the [Kinesis Advantage 2](https://kinesis-ergo.com/shop/advantage2/) my main keyboard. I used to use `alt` + `tab` but the unconventional shape of the Kinesis caused me to stop. It required my hand to contort too much. Recently, I found an alternative that I even prefer to `alt` + `tab`.

[Rofi](https://github.com/davatorium/rofi) is a Window Switcher for Ubuntu. Its key feature is that it allows you to use fuzzy searching to select the window you want. As an example, if I had Google Chrome, Terminal and VS Code open. And I wanted to open Google Chrome. I could run Rofi, search for `goo`, and hit enter. This would switch my window to the program whose name most closely matched the token `goo`. In this example, it is Google Chrome like I desired.

![Rofi Usage](/rofi_use.gif)

It may sound harder to have to search for the program you want, but this is exactly the reason I prefer Rofi. With `alt`+`tab` you always need to be cognizant of how recently you used a window. This determines where `alt`+`tab` orders it. With Rofi you avoid this unnecessary mental overhead and can always use the same method to pull up a window. To open Google Chrome I search `goo`, to open Terminal I search `term` etc. The extra keystrokes required are far and away made up for by the flexibility and consistency that Rofi provides.


To launch Rofi you need to run `rofi -show window` in a terminal. It wouldn't be helpful if every time I wanted to switch a window I had to open a terminal and run a command. To get around this on Ubuntu you can add a custom shortcut in the `Settings > Devices > Keyboard` menu. I mapped `CTRL` + `Space` to run the command because on the Kinesis this allows me to use both my thumbs to activate it - a very comfortable movement.

![Rofi Settings](/rofi_settings.png)

I highly recommend trying this setup for window switching. Rofi has changed the way I work and I don’t think I can go back to using `alt` + `tab`.
