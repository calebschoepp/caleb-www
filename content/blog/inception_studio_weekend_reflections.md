---
title: "Inception Studio Weekend Reflections"
date: 2022-11-26
draft: false
---

**TODO fix publish date**

I recently spent a weekend in California at an Inception Studio event. For three days I hacked on large language model (LLM) ideas with some really smart people. I learned so much from the experience that I wanted to write down some of my biggest learnings.

## Life

### Take more risk

At this time in my life I should take as much risk as I can fathom. Taking large risks early in life means you have a longer time to compound the successful outcomes of these risks. I also have multiple factors that make me very resilient to failure:

- No dependents to support.
- A stable family to catch me if I fail.
- Pedigree from a Computer Engineering degree.
- Work experience and connections making it highly likely I could find work.

### The value of regular therapy or life coaching

I've seen therapists in acute contexts and it has been transformational. Correspondingly I've become a big advocate for therapy. However, I've always tied it to acute issues in my life. What if I integrated it more regularly into my life? This could be hugely beneficial since a programmer spends most of the day inside their own head. Speaking from personal experience I can say that dips in my mental health can wreak havoc on my productivity (not mentioning its effects on the rest of my life). It only makes sense that mental health should be regularly cared for like physical health.[^1]

### The importance of low ego

A big ego is like a bubble around you that keeps people from getting close. Keep your ego low and you'll find building relationships, seeking advice, and asking favors all easier.

## Career

### Prioritize working with smart people

Perhaps my favorite part of the weekend was being surrounded by so many smart and motivated people. Rubbing shoulders with people smarter than me drastically accelerated my learning. I want to optimize for having more opportunities to surround myself with people like this.

Hackathons are the most obvious way to inject more of this into my life. As I exit my undergrad I'll have to be more intentional about seeking these opportunities. A variation on this would be to throw mini hackathons with friends I know. Another thing I want to explore are [digital nomad groups](https://www.remoteyear.com/). Combining traveling the world with meeting cool people sounds great.

### The moral imperative to have the difficult conversation

When I asked one of attendees for advice on being an engineer manager I was given some advice that I thought was very profound.

Imagine that one of your direct reports is doing something problematic. In your gut you know you should have a conversation with them and bring up the issue. However, this requires some confrontation and isn't easy to do. You take the easy way out and don't say anything. Naturally the problem persists and gets worse over time. As the months pass the problem grows into something that can no longer be ignored. You need to fire this employee because of the problem. When you go to fire them they of course ask you why. You explain that, "it is because of the problem", to which they say, "why didn't you tell me about the problem?!"

The point of the story is that you have a moral imperative as a manager to have these difficult conversations early. Not doing so is just setting up everyone for more pain and difficulty.

### A mental model for entrepreneurship

Only two things matter in entrepreneurship: product market fit and founder product fit.

Product market fit means that you are providing value to the world by filling a real market demand. To find it you need to iterate on the cycle of building things and talking to customers. Both elements are critical. But, it doesn't really matter where you start so long as you keep iterating as quickly as you can.

Found product fit means that you love the problem space you're working in. This ensures that you'll have the intensity and longevity necessary to find product market fit. To find founder product fit you need to try and build a lot of things and see what resonates with you.

Put more simply the most important element of entrepreneurship is taking action.

### Knowing when you have product market fit

If it isn't completely obvious to you that you have it then you don't have it. It should feel like you're being pulled out to ocean by a riptide.

I've never experienced true product market fit with anything I've built. The closest experience I've had is when one of my [posts](/blog/2022/productivity-porn/) went to #2 on Hacker News. In the span of a week more than 60k people read my post, aggregators around the internet were picking it up, and I received numerous emails from people with personal heartfelt messages. It felt like I was just along for the ride.

Ultimately when I'm building something the goal is product market fit. Remembering this feeling of being pulled vs. pushed will help me know when I've found product market fit and when I should keep looking.

## LLM's

### New mental models for LLM's

Each of these mental models are too simple but this is exactly what makes them useful shorthands for understanding LLM's.

An LLM is a compression function run across the entire internet. When you ask GPT-3 a question you're really just asking that question to the mean of the internet.

An LLM is like an axe. The size of the axe head is the size of the model; GPT-2 is a hatchet; GPT-3 is a standard axe. Fine tuning is like sharpening your axe. How you prompt the LLM is like how you wield your axe. As you try to chop through tougher wood (thornier problems) you either need a bigger axe head, a sharper blade, or better technique -- or all of the above.

An LLM is like an alien species who has landed on earth and we can ask questions of. They are vastly more intelligent than us. But, they are also communicate in a completely different paradigm. If we spend time learning how to ask them the right questions we can unlock their vast intelligence.

### The LLM space needs more tooling

I think that the LLM space is in massive need of more/better tooling. Prompt engineering feels distinct from software engineering and machine learning engineering. As such it needs its own tools for testing, debugging, editing, and deploying LLM's. One example of a gap is the core loop of prompt engineering: modifying a prompt to see if you can produce better results. It felt like I was flying completely blind here. I would make a change and have no way to tell if the change I made was actually an improvement beyond manually looking at an output or two.

### The future of LLM's is very exciting

This weekend has gotten me very excited for the future of LLM's. I didn't pay much attention when GPT-3 came out but you can be sure that I'll be on the edge of my seat for the release of GPT-4. I think that it is going to display some emergent properties that are hard to fathom right now. Another way to think about this is that we are somewhere near the start of an innovation s-curve -- a very exciting place to be indeed. I have lots of questions about the future of LLM's that I look forward to getting answers to:

- Will future models like GPT-4 become prohibitively expensive as they get increasingly larger?
- Will LLM's turn into commodities like cloud computing did?
- How truly capable are LLM's? To what extent are we hitting fundamental limitations vs. just failing to properly prompt them?
- How far will the transform architecture take us? Is attention truly all we need? 😉

### Respect the LLMs

Andy Chou kept reminding me that we needed to, "respect the LLM's more." Kind of a silly thing to say but the message really resonated with me. LLM's are more capable than we think and when I "respected" the model I was amazed at the results it was able to achieve.

---

_Special thanks to Andy, Ian, Greg, Brian, and Oliver for some of these insights._

[^1]: I was also exposed to a really interesting [blog](http://neuroticgradientdescent.blogspot.com/2021/03/threefold-training.html) about mental health that I intend to read a lot more.
