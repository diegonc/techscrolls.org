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
The AWS CLI or SDK can use several methods to get credentials that allows the EC2 instance where it's running to use resources, like S3 buckets. One of which is the Instance Metadata Services (IMDS). Currently, the last version is `v2,` the main difference being that v2 requires a token to be requested before other endpoints may be called.

F﻿or instance, lets ask for a token from the IMDSv2 that is valid for 5 minutes:

```shell
    TOKEN=$(curl -X PUT "http://169.254.169.254/latest/api/token" \
                 -H "X-aws-ec2-metadata-token-ttl-seconds: 300")
```

T﻿his `PUT` call allows the caller to get the token that will be used in other endpoint calls.

N﻿ow, to assume the role of the EC2 instance and get temporary credentials like the secret access key and  the access key, the following call, provided with the `TOKEN` value, shall be executed:

```shell
    curl -X GET "http://169.254.169.254/latest/meta-data/iam/security-credentials/${AWS_ROLE_NAME}" \
         -H "X-aws-ec2-metadata-token: $TOKEN"

    {
      AccessKeyId: '...',
      SecretAccessKey: '...',
      Token: '...'
    }
```

O﻿ne thing to keep in mind is that these endpoints have a default hop limit of one, meaning it will only work directly from the EC2 instance and not from a docker container, for instance. When the `curl` commands are executed from the docker instance it must hop one time to the EC2 instance running the container and then another time to the IMDS server and, as the hop limit is one, the request will be rejected.

T﻿his behaviour is particularly troublesome when our application is running in Elastic Beanstalk with the ECS multi-container docker platform. To circumvent the hop limit, a file can be placed in the `.ebextensions` folder which gets executed when building the environment. Let's say it's called `.ebextensions/hop-limit.config`, the file must have the following content:

```﻿shell
    files:
      "/tmp/set-hop-limit.sh":
        mode: "000755"
        content: |
          #!/bin/bash
          TOKEN=$(curl -s -X PUT -H 'X-aws-ec2-metadata-token-ttl-seconds:60' 'http://169.254.169.254/latest/api/token')
          INSTANCE_ID=$(curl -s -H "X-aws-ec2-metadata-token:$TOKEN" 'http://169.254.169.254/latest/meta-data/instance-id')
          aws ec2 modify-instance-metadata-options --region us-west-2 --instance-id "$INSTANCE_ID" --http-put-response-hop-limit 2 --http-endpoint enabled

    commands:
      0_set-hop-limit:
        command: /bin/bash -x /tmp/set-hop-limit.sh || true
```

T﻿his script uses the aws CLI tool to modify the instance metadata options of the EC2 instance to allow a hop limit of up to two hops. It also uses the IMDSv2 server to get the instance ID before calling the aws CLI command.

O﻿ne last thing to note is that the role of the EC2 instance must have the right permissions to be able to modify the instance metadata options. So, head to the IAM section of the Amazon console and modify the EBS role to add the `EC2ModifyInstanceMetadataOptions` permission.