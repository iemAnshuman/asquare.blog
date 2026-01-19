---
title: "The 100-Hour Rule: How to Absorb a New Tech Stack"
date: 2026-01-20
type: post
---

I feel different than I did in November.

I look at my GitHub contribution graph and it looks like a solid block of green (somewhat). I spent the last month living in the terminal, mostly with C++, Python, and Triton.

A friend asked me yesterday how I learned Triton so fast. "Did you find a good course?"

I realized I didn't take a course. I didn't watch a YouTube playlist. I didn't look for a "roadmap."

Roadmaps are procrastination (trust me). They are a way to feel like you are learning without doing the scary thing.

### The Immersion Protocol

I have a theory (borrowed) that you can learn _anything_ in computer science in 100 hours if you do it right. But it has to be a specific kind of 100 hours.

It can't be 1 hour a day for 100 days. That doesn't work. The context switching kills you. You spend 20 minutes remembering what you did yesterday, 20 minutes working, and 20 minutes checking your phone.

It has to be **immersion**.

For the last month, I did 10-12 hours a day.

When you do that, something strange happens to your brain around hour 40. You stop translating. You stop thinking "How do I do a for-loop in Triton?" and you just see the grid. The syntax fades away and you start thinking in the concepts of the system.

### Read the Source, Not the Docs

The biggest mistake I used to make was reading documentation.

Documentation is a sales pitch. It tells you how the tool is _supposed_ to work. It rarely tells you how it _actually_ works.

When I was stuck on the Ring All-Reduce simulation, the docs were useless. They just said "synchronizes data." That means nothing.

So I opened the source code.

It hurts at first. Reading other people's code is painful. It’s dense, it’s messy, it uses variable names you don't understand. It feels like staring into the sun.

But if you stare _long long_ enough, your eyes adjust.

I learned more about GPU architecture by reading the OpenAI Triton compiler source code for 2 days than I did in 3 years of university classes.

### Build to Throw Away

I wrote five different versions of my Softmax kernel. The first four were garbage. They segfaulted, they were slow, they were ugly.

And I deleted them.

That’s the other secret. You have to be willing to write code that you know you will throw away. (Imo throwing away your codes is really stress relieving, like throwing your burning rug instead of putting off fire kind of relief). You aren't building a product yet. You are building a mental model. The code is just the scaffolding for your understanding.

I’m tired. My eyes hurt. I guess it's time for an existential crisis or just a burnout time. but atleast it feels great!

```

```
