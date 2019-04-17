---
template: post
title: Raw JSON query on Gatsby
draft: true
date: 2019-04-14T13:56:38.658Z
description: >-
  The
  [`gatsby-transformer-rawjson`](https://github/diegonc/gatsby-transformer-rawjson)
  plugin allows to publish the properties of a JSON node in raw form using the
  JSON GraphQL scalar type.
category: gatsby
tags:
  - javascript
  - gatsby
---
Querying a JSON resource (created by `gatsby-transformer-json`) requires knowledge of the fields that are part of the resource. For instance, a resource may define a localised text message like below.

```
{
  "text": {
    "en": "...",
    "es": "...",
    ...
  }
}
```

A page using this resource needs to know exactly which languages are available to include them in the page query.

The [`gatsby-transformer-rawjson`](https://github/diegonc/gatsby-transformer-rawjson) plugin allows to publish the properties of a JSON node in raw form using the JSON GraphQL scalar type.
