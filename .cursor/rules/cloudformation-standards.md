# CloudFormation (CFN) Standards

## Overview
Standards and best practices for creating and maintaining AWS CloudFormation templates to ensure consistency, portability, and security across deployments.

## Resource Naming

### Name Property Usage
- **Avoid** adding explicit `Name` property to resources unless absolutely required
- Let CloudFormation generate resource names automatically using stack names and logical IDs
- This prevents naming conflicts and enables easier stack replication

**Why:**
- Enables multiple stack deployments in the same region
- Prevents resource name collisions
- Facilitates stack updates and rollbacks

**Exceptions (when Name is required):**
- IAM roles/policies referenced by external systems
- S3 buckets with specific naming requirements
- Resources referenced by hardcoded names in legacy systems

### Examples

**Incorrect:**
```yaml
MyS3Bucket:
  Type: AWS::S3::Bucket
  Properties:
    BucketName: my-hardcoded-bucket-name  # Avoid this
```

**Correct:**
```yaml
MyS3Bucket:
  Type: AWS::S3::Bucket
  Properties:
    Tags:
      - Key: Name
        Value: !Sub '${AWS::StackName}-data-bucket'
```

## Mappings for Cross-Region Portability

### Regional Configuration
Always create mappings to enable easy porting across AWS Regions without template modifications.

**Required Mappings:**
- AMI IDs per region
- Availability Zone configurations
- Region-specific endpoints
- VPC and subnet configurations
- Regional service limits or quotas

### Example

```yaml
Mappings:
  RegionConfig:
    us-east-1:
      AMI: ami-0c55b159cbfafe1f0
      AvailabilityZones: ['us-east-1a', 'us-east-1b']
    us-west-2:
      AMI: ami-0d1cd67c26f5fca19
      AvailabilityZones: ['us-west-2a', 'us-west-2b']
  
Resources:
  MyEC2Instance:
    Type: AWS::EC2::Instance
    Properties:
      ImageId: !FindInMap [RegionConfig, !Ref 'AWS::Region', AMI]
```

## IAM Security Standards

### Least Privilege Access
Always implement least privileged access through IAM Roles and Resource Policies.

**Requirements:**
1. Create specific IAM roles for each service/function
2. Grant only the minimum permissions required
3. Use resource-level permissions where possible
4. Avoid wildcard (*) permissions unless absolutely necessary
5. Use conditions to further restrict access

### IAM Role Template

```yaml
MyLambdaExecutionRole:
  Type: AWS::IAM::Role
  Properties:
    AssumeRolePolicyDocument:
      Version: '2012-10-17'
      Statement:
        - Effect: Allow
          Principal:
            Service: lambda.amazonaws.com
          Action: sts:AssumeRole
    ManagedPolicyArns:
      - arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole
    Policies:
      - PolicyName: SpecificResourceAccess
        PolicyDocument:
          Version: '2012-10-17'
          Statement:
            - Effect: Allow
              Action:
                - s3:GetObject
                - s3:PutObject
              Resource: !Sub '${MyBucket.Arn}/*'
            - Effect: Allow
              Action:
                - dynamodb:Query
                - dynamodb:GetItem
              Resource: !GetAtt MyTable.Arn
```

### Resource Policy Example

```yaml
MyBucketPolicy:
  Type: AWS::S3::BucketPolicy
  Properties:
    Bucket: !Ref MyBucket
    PolicyDocument:
      Statement:
        - Effect: Allow
          Principal:
            AWS: !GetAtt MyLambdaExecutionRole.Arn
          Action:
            - s3:GetObject
            - s3:PutObject
          Resource: !Sub '${MyBucket.Arn}/*'
```

## Best Practices

### Template Organization
1. Use nested stacks for complex architectures
2. Separate infrastructure into logical components
3. Use parameters for environment-specific values
4. Output resource ARNs and references for cross-stack usage

### Security Checklist
- [ ] All IAM roles use least privilege permissions
- [ ] No hardcoded credentials in templates
- [ ] Secrets managed via AWS Secrets Manager or Parameter Store
- [ ] Resource policies restrict access appropriately
- [ ] Encryption enabled for data at rest and in transit
- [ ] CloudTrail logging enabled for audit trails

### Portability Checklist
- [ ] No hardcoded region-specific values
- [ ] Mappings created for regional resources
- [ ] Parameters used for environment differences
- [ ] No explicit resource names (unless required)
- [ ] Stack can be deployed to any region

## Common Patterns

### Parameter Store Integration
```yaml
Parameters:
  DatabasePassword:
    Type: AWS::SSM::Parameter::Value<String>
    Default: /myapp/database/password
    NoEcho: true
```

### Cross-Stack References
```yaml
Outputs:
  VPCId:
    Description: VPC ID for network stack
    Value: !Ref VPC
    Export:
      Name: !Sub '${AWS::StackName}-VPC-ID'
```

### Conditional Resources
```yaml
Conditions:
  IsProduction: !Equals [!Ref Environment, 'production']

Resources:
  ProdOnlyResource:
    Type: AWS::S3::Bucket
    Condition: IsProduction
```

## Validation

Before deploying templates:
1. Run `cfn-lint` to validate syntax and best practices
2. Use `cfn_nag` to check for security vulnerabilities
3. Test in non-production environment first
4. Review IAM permissions for least privilege
5. Verify cross-region portability

---

**Last Updated:** 2025-11-07  
**Version:** 1.0

