---
template: post
title: Raw JSON query on Gatsby
draft: false
date: 2019-04-14T13:56:38.658Z
description: >-
  The
  [`gatsby-transformer-rawjson`](https://github.com/diegonc/gatsby-transformer-rawjson)
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

The [`gatsby-transformer-rawjson`](https://github.com/diegonc/gatsby-transformer-rawjson) plugin allows to publish top-level properties of a JSON node in raw form using the JSON GraphQL scalar type.

Once added the plugin is added to the `gatsby-config.js` file, and assuming the above snippet is available in a MessagesJson resource, the raw item may be accessed using the following query:

```
{
  allMessagesJson {
    childRawMessageJson {
      text
    }
  }
}
```

Without specifying any particular language, the page will get every translation available for the property `text`.

---

DISCLAIMER: currently the plugin has a very narrow set of features:
  * It will pick JSON nodes only if the are named `*Json`
  * It will not allow to filter the properties to be exported as a scalar. All top-level properties but `id`, `parent`, `children` or `internal` are exposed.
