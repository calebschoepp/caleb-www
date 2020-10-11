---
title: "Nanosleep Error: Storage Size Isn't Known"
date: 2020-10-10T00:28:03-06:00
draft: false
---

Compiling a C program that used `nanosleep` turned out to be quite the thorn in my side. I'm documenting this here for anyone else facing the same issues.

**TL;DR** — Try compiling your program with a GNU standard e.g. `gcc -std=gnu11 ...`

# Debugging

Here's a simplified version of what I was trying to compile.

```c
// Compiled via: gcc -std=c99 main.c
#include <time.h>

int main() {
    struct timespec sleep;
    sleep.tv_sec = 0;
    sleep.tv_nsec = 50000000;
    nanosleep(&sleep, NULL);
}
```

I kept getting the following error and warning.

```
main.c: In function ‘main’:
main.c:4:21: error: storage size of ‘sleep’ isn’t known
     struct timespec sleep;
                     ^~~~~
main.c:7:5: warning: implicit declaration of function ‘nanosleep’ [-Wimplicit-function-declaration]
     nanosleep(&sleep, NULL);
     ^~~~~~~~~
```

My initial googling only turned up the suggestion to define a POSIX source macro[^1] at the start of the file. This didn't work for me.

Inspired by some obscure forum posts, I noticed that the program compiled when I removed the `-std=c99` GCC option. Peculiar, why was that making it fail? To dig in I inspected the preprocessor output.

```bash
$ gcc -std=c99 -E main.c | grep timespec
    struct timespec sleep;
$ gcc -E main.c | grep timespec
struct timespec
    struct timespec it_interval;
    struct timespec it_value;
extern int nanosleep (const struct timespec *__requested_time,
        struct timespec *__remaining);
...
```

A grep of the C99 standard output only turned up the instance of `timespec` used in `main.c`. The default standard output had a `timespec` struct, a `nanosleep` declaration, and even more I've left out. These declarations resolved both the error and warning I was encountering.

# Going Further

A fix, hooray! But, this left me with more questions than answers. First off, what standard does GCC use by default when we don't select one? My machine is running GCC `v7.5.0` and thanks to this [helpful Stackoverflow answer](https://stackoverflow.com/a/44057210) we can see that GCC is defaulting to the GNU11 standard. So apparently `time.h` from the GNU11 standard's gives us what we need where as the `time.h` from the C99 standard does not.

This begs the question of what other standards work. I tested a few of the common options and have placed the results below.

## GNU89 / GNU99 / GNU11

No issues here. The `nanosleep` function works flawlessly with all these standards.

## C89 / C99

Both fail to compile with the all too familiar "storage size isn't known error". Neither standards include `struct timespec` or `nanosleep`. A fun tidbit is that the C89 standard does not trigger a warning for the implicit declaration of a function — this wasn't part of the C language yet.

## C11

C11 is something of an anomaly. It compiles successfully but still throws the implicit declaration error. However, we can quench this error by defining the POSIX source macro[^1] I mentioned earlier.

[^1]: `#define _POSIX_C_SOURCE 199309L`
