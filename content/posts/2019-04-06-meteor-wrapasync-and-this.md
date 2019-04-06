---
template: post
title: Meteor wrapAsync and `this`
draft: false
date: 2019-04-06T15:00:03.030Z
description: >-
  Calling `wrapAsync` on a function will not propagate the value of `this` from
  the resulting function to the wrapped function. But the behaviour may be
  emulated by transforming it into an actual parameter.
category: meteor
---
Calling `wrapAsync` on a function will not propagate the value of `this` from the resulting function to the wrapped function. But the behaviour may be emulated by transforming it into an actual parameter.

The emulation procedure involves transforming `this` into a parameter, then calling `wrapAsync` and finally moving the parameter back to the function context. The mentioned process can be achieved with the following composing of functions:

```
compose(
  thisToParam,
  Meteor.wrapAsync,
  paramToThis
);
```
There are a couple of complementary functions to define before the composing function may be used, namely `thisToParam` and `paramToThis`. The respective implementations are shown below.

```
function thisToParam(targetFn) {
  return function (...args) {
    return targetFn(this, ...args);
  };
}
```

```
function paramToThis(targetFn) {
  return function (_this, ...args) {
    return targetFn.apply(_this, args);
  };
}
```
