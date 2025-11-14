# SAM Deployment Standards

## Overview
Standards for deploying AWS Serverless Application Model (SAM) applications with required tags and configurations.

## Required Tags

### Standard Deployment Tags
For all SAM deployments, always include the following tags in the `sam deploy` command's `--tags` argument.

**Required Tags:**
```
sensitive-data=transit-rest
application=aosprocessorapi
dr-tier=0
team=originations
application-id=9999
decom-after=never
cost-center=originations
```

### SAM Deploy Command Template

```bash
sam deploy \
  --stack-name my-application-stack \
  --template-file template.yaml \
  --capabilities CAPABILITY_IAM \
  --parameter-overrides Environment=prod \
  --tags \
    sensitive-data=transit-rest \
    application=aosprocessorapi \
    dr-tier=0 \
    team=originations \
    application-id=9999 \
    decom-after=never \
    cost-center=originations
```

## Tag Descriptions

| Tag | Value | Description |
|-----|-------|-------------|
| `sensitive-data` | `transit-rest` | Indicates data is sensitive in transit and at rest |
| `application` | `aosprocessorapi` | Application identifier for AOS Processor API |
| `dr-tier` | `0` | Disaster recovery tier (0 = highest priority) |
| `team` | `originations` | Owning team responsible for the application |
| `application-id` | `9999` | Internal application tracking ID |
| `decom-after` | `never` | Decommission schedule (never = permanent infrastructure) |
| `cost-center` | `originations` | Cost center for billing allocation |

## Deployment Configurations

### Environment-Specific Deployments

```bash
# Development
sam deploy \
  --stack-name aos-processor-dev \
  --template-file template.yaml \
  --capabilities CAPABILITY_IAM \
  --parameter-overrides \
    Environment=dev \
    LogLevel=DEBUG \
  --tags \
    sensitive-data=transit-rest \
    application=aosprocessorapi \
    dr-tier=0 \
    team=originations \
    application-id=9999 \
    decom-after=never \
    cost-center=originations \
    environment=dev

# Production
sam deploy \
  --stack-name aos-processor-prod \
  --template-file template.yaml \
  --capabilities CAPABILITY_IAM \
  --parameter-overrides \
    Environment=prod \
    LogLevel=INFO \
  --tags \
    sensitive-data=transit-rest \
    application=aosprocessorapi \
    dr-tier=0 \
    team=originations \
    application-id=9999 \
    decom-after=never \
    cost-center=originations \
    environment=prod
```

### Using samconfig.toml

Standardize deployment configuration using `samconfig.toml`:

```toml
version = 0.1

[default]
[default.global.parameters]
stack_name = "aos-processor-api"

[default.deploy]
[default.deploy.parameters]
capabilities = "CAPABILITY_IAM"
confirm_changeset = true
resolve_s3 = true
s3_prefix = "aos-processor-api"
region = "us-east-1"
tags = [
  "sensitive-data=transit-rest",
  "application=aosprocessorapi",
  "dr-tier=0",
  "team=originations",
  "application-id=9999",
  "decom-after=never",
  "cost-center=originations"
]

[dev]
[dev.deploy.parameters]
stack_name = "aos-processor-api-dev"
parameter_overrides = ["Environment=dev", "LogLevel=DEBUG"]

[prod]
[prod.deploy.parameters]
stack_name = "aos-processor-api-prod"
parameter_overrides = ["Environment=prod", "LogLevel=INFO"]
```

**Deploy with samconfig.toml:**
```bash
# Development
sam deploy --config-env dev

# Production
sam deploy --config-env prod
```

## Additional SAM Best Practices

### Capabilities
Always specify required capabilities explicitly:
- `CAPABILITY_IAM` - For creating IAM roles
- `CAPABILITY_NAMED_IAM` - For creating IAM roles with custom names
- `CAPABILITY_AUTO_EXPAND` - For nested stacks with transforms

### S3 Bucket Management
```bash
sam deploy \
  --s3-bucket my-deployment-bucket \
  --s3-prefix aos-processor-api \
  --tags sensitive-data=transit-rest application=aosprocessorapi dr-tier=0 team=originations application-id=9999 decom-after=never cost-center=originations
```

### Guided Deployment (First Time)
```bash
sam deploy --guided \
  --tags sensitive-data=transit-rest application=aosprocessorapi dr-tier=0 team=originations application-id=9999 decom-after=never cost-center=originations
```

### Validation Before Deployment
```bash
# Validate template
sam validate

# Build application
sam build

# Deploy with confirmation
sam deploy --confirm-changeset
```

## CI/CD Integration

### GitHub Actions Example

```yaml
name: Deploy SAM Application

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - uses: aws-actions/setup-sam@v2
      
      - name: SAM Build
        run: sam build
      
      - name: SAM Deploy
        run: |
          sam deploy \
            --stack-name aos-processor-api-prod \
            --capabilities CAPABILITY_IAM \
            --no-confirm-changeset \
            --no-fail-on-empty-changeset \
            --tags \
              sensitive-data=transit-rest \
              application=aosprocessorapi \
              dr-tier=0 \
              team=originations \
              application-id=9999 \
              decom-after=never \
              cost-center=originations
        env:
          AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
          AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          AWS_DEFAULT_REGION: us-east-1
```

### GitLab CI Example

```yaml
deploy:
  stage: deploy
  image: public.ecr.aws/sam/build-provided.al2:latest
  script:
    - sam build
    - |
      sam deploy \
        --stack-name aos-processor-api-prod \
        --capabilities CAPABILITY_IAM \
        --no-confirm-changeset \
        --tags \
          sensitive-data=transit-rest \
          application=aosprocessorapi \
          dr-tier=0 \
          team=originations \
          application-id=9999 \
          decom-after=never \
          cost-center=originations
  only:
    - main
```

## Tag Compliance Verification

### Verify Stack Tags
```bash
# Get stack tags
aws cloudformation describe-stacks \
  --stack-name aos-processor-api-prod \
  --query 'Stacks[0].Tags'

# Expected output should include all required tags
```

### Automated Tag Validation Script

```python
#!/usr/bin/env python3
"""Validate SAM stack has all required tags"""

import boto3
import sys

REQUIRED_TAGS = {
    'sensitive-data': 'transit-rest',
    'application': 'aosprocessorapi',
    'dr-tier': '0',
    'team': 'originations',
    'application-id': '9999',
    'decom-after': 'never',
    'cost-center': 'originations'
}

def validate_stack_tags(stack_name: str) -> bool:
    """Validate that stack has all required tags with correct values"""
    cfn = boto3.client('cloudformation')
    
    response = cfn.describe_stacks(StackName=stack_name)
    stack_tags = {tag['Key']: tag['Value'] for tag in response['Stacks'][0]['Tags']}
    
    missing_tags = []
    incorrect_values = []
    
    for key, expected_value in REQUIRED_TAGS.items():
        if key not in stack_tags:
            missing_tags.append(key)
        elif stack_tags[key] != expected_value:
            incorrect_values.append(f"{key}: expected '{expected_value}', got '{stack_tags[key]}'")
    
    if missing_tags:
        print(f"ERROR: Missing required tags: {', '.join(missing_tags)}")
    
    if incorrect_values:
        print(f"ERROR: Incorrect tag values: {', '.join(incorrect_values)}")
    
    if missing_tags or incorrect_values:
        return False
    
    print(f"SUCCESS: Stack {stack_name} has all required tags with correct values")
    return True

if __name__ == '__main__':
    if len(sys.argv) != 2:
        print("Usage: validate_tags.py <stack-name>")
        sys.exit(1)
    
    stack_name = sys.argv[1]
    if not validate_stack_tags(stack_name):
        sys.exit(1)
```

## Deployment Checklist

Before deploying with SAM:
- [ ] All required tags included in deployment command
- [ ] Tag values match standard requirements
- [ ] `samconfig.toml` configured with standard tags (if using)
- [ ] Stack name follows naming convention
- [ ] Environment parameter set correctly
- [ ] Capabilities specified appropriately
- [ ] S3 bucket configured for deployment artifacts
- [ ] Changeset reviewed before execution
- [ ] Post-deployment tag validation performed

## Common Issues

### Missing Tags Error
```bash
# Error: Required tags not applied to stack
# Solution: Add all required tags to --tags argument
```

### Incorrect Tag Format
```bash
# Incorrect (space after =)
--tags sensitive-data= transit-rest

# Correct (no space)
--tags sensitive-data=transit-rest
```

### Tags Not Applied to Resources
```
# Issue: Tags in --tags only apply to stack, not all resources
# Solution: Add tags in template.yaml for resource-level tags
```

## Resource-Level Tagging

For resources that require tags beyond stack-level tags:

```yaml
# template.yaml
Resources:
  MyFunction:
    Type: AWS::Serverless::Function
    Properties:
      Tags:
        sensitive-data: transit-rest
        application: aosprocessorapi
        dr-tier: "0"
        team: originations
        application-id: "9999"
        decom-after: never
        cost-center: originations
```

---

**Last Updated:** 2025-11-07  
**Version:** 1.0

