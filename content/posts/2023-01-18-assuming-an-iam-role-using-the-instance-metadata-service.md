---
template: post
title: Assuming an IAM role using the Instance MetaData Service
draft: true
date: 2023-01-18T21:41:58.245Z
description: I﻿n AWS, one often needs to access certain resources, like S3 or
  SQS, from an EC2 instance. There are several methods to get the credentials to
  access those resources one of which is the Instance MetaData Service.
category: devops
tags:
  - AWS
  - Elastic Beanstalk
  - EC2
  - IAM role
---
 The AWS CLI or SDK can use several methods to get credentials that allows the EC2 instance where it's running to use resorces, like S3 buckets. One of which is the Instance Metadata Services (IMDS). Currentl, the last version is `v2,` the main difference being that v2 requires a token to be requested before other endpoints may be called.

F﻿or instance, lets ask for a token from the IMDSv2 that is valid for 5 minutes:

```shell
TOKEN=$(curl -X PUT "http://169.254.169.254/latest/api/token" \
        -H "X-aws-ec2-metadata-token-ttl-seconds: 300")
```

T﻿his `PUT` call allows the caller to get the token that will be used in other endpoint calls.