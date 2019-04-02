---
template: post
title: Meteor Settings on the Client-Side
draft: false
date: 2019-04-01T23:39:51.560Z
description: >-
  Meteor settings in the public key-space may be computed at run-time during
  server bootstrap and pushed to the client.
category: Meteor
tags:
  - javascript
  - meteor
---
The Meteor object provided by the framework has a property named `settings` which is populated from the file `settings.json`, specified on the command-line when the server is started. There are two main sub-keys:

* `private`: server-only namespace
* `public`: key-space published to the client

It's worth noting that the settings may be modified at run-time, during server bootstrap. Most notably, those modifications affecting the `public` key-space **will be pushed to the client**, allowing to compute properties at run-time.

One plausible use-case is the forwarding of environment variables from the server to the client.
