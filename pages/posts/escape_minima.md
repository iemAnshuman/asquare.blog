---
title: "Simulated Annealing for the Mind: How to Escape Local Minima"
date: 2026-01-04
type: post
---

I felt stuck this week.

Not the "I don't know what to do" stuck, but the "I am doing the same thing every day and it works but I hate it" stuck. It’s a comfortable stuck. It’s a rut.

I was looking at an optimization problem, trying to find the lowest point on a curve, and I realized that my brain uses the wrong algorithm.

Most of us run on **Gradient Descent**. We look at our feet, find the steepest slope downwards, and take a step. If a decision makes us feel better (lower cost) immediately, we take it. If it makes us feel worse (higher cost), we reject it.

This sounds smart, it’s "rational", but it’s fatal.

If you only take steps that improve your immediate situation (greedy algorithm), you will inevitably get trapped in a **Local Minimum**. You will find a small valley that is "good enough," and because every step away from it feels "uphill" (worse), you will never leave. You will never find the Global Minimum, the deepest valley, the true optimal state.

To find the best life, you have to be willing to make your life worse. Temporarily.

### The Temperature of Thought

There is an algorithm called **Simulated Annealing**. It’s based on metallurgy, how you cool molten metal to make it strong.

It introduces a variable: $T$ (Temperature).

When $T$ is high, the system is "hot." It acts crazy. It makes random jumps. Crucially, **it accepts moves that are worse.**

If the algorithm is at a high temperature, and it sees a move that increases the cost (a bad move), it might take it anyway.

$$P(\text{accept}) = e^{-\frac{\Delta E}{T}}$$

Why? Because taking a bad step—quitting a job, moving to a new city, starting a hard project—is the only way to climb out of a Local Minimum. You have to go uphill to cross the ridge and find the next valley.

### Don't Cool Down Too Fast

I think childhood is just a high-temperature search. Kids try everything, fail constantly, look stupid, and they learn fast. They are bouncing all over the loss landscape.

Adulthood is cooling. We lower our $T$. We stop accepting "worse" states. We stop taking risks because "we have too much to lose." We become "greedy" algorithms. We find a decent job, a decent routine, and we sit there. We optimize for comfort.

I realized I’ve been cooling down too fast. I’ve been optimizing for short-term wins—easy commits, easy reading—instead of the deep work that feels painful at first.

I wrote a small script to remind myself how it works.

```python
import math
import random

def should_accept(current_cost, new_cost, temperature):
    if new_cost < current_cost:
        return True

    delta = new_cost - current_cost
    probability = math.exp(-delta / temperature)

    return random.random() < probability

```

If you are feeling stuck, it’s not because you are making bad decisions. It’s because you are making _good_ decisions. You are hill-climbing perfectly into a hole.

You need to inject some noise. You need to raise the temperature. You need to do something that makes no sense on paper, something that looks like a regression, because that’s the only way to see what’s on the other side of the hill.
