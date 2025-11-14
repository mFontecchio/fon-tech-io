# Parsing Standards

## Overview
Standards for parsing data and conforming to JSON schema standards to ensure consistency and data integrity across systems.

## JSON Schema Compliance

### Local Schema Standards
Always conform to local JSON schema standards for data types and structure when parsing to canonical JSON.

**Requirements:**
1. Follow defined JSON schemas for all data structures
2. Validate parsed data against schemas before processing
3. Maintain type safety throughout parsing pipeline
4. Document schema deviations with justification
5. Keep schemas versioned and documented

## Data Type Standards

### Type Mapping
Ensure correct type conversion when parsing data from various sources.

**Standard Type Mappings:**

| Source Type | JSON Type | Validation |
|------------|-----------|------------|
| String | `string` | Non-empty, trimmed |
| Integer | `number` (integer) | No decimals |
| Decimal/Float | `number` | Valid numeric |
| Boolean | `boolean` | true/false only |
| Date | `string` (ISO 8601) | YYYY-MM-DD |
| DateTime | `string` (ISO 8601) | YYYY-MM-DDTHH:mm:ssZ |
| Currency | `number` | 2 decimal places |
| Null/None | `null` | Explicit null |
| Array | `array` | Validated elements |
| Object | `object` | Nested validation |

### Example Schema

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "LoanApplication",
  "type": "object",
  "required": ["applicationId", "applicantName", "loanAmount", "submissionDate"],
  "properties": {
    "applicationId": {
      "type": "string",
      "pattern": "^[A-Z]{2}\\d{8}$",
      "description": "Unique application identifier"
    },
    "applicantName": {
      "type": "string",
      "minLength": 1,
      "maxLength": 100
    },
    "loanAmount": {
      "type": "number",
      "minimum": 0,
      "maximum": 1000000,
      "multipleOf": 0.01
    },
    "submissionDate": {
      "type": "string",
      "format": "date-time"
    },
    "isApproved": {
      "type": ["boolean", "null"],
      "default": null
    },
    "documents": {
      "type": "array",
      "items": {
        "type": "object",
        "required": ["documentId", "documentType"],
        "properties": {
          "documentId": {
            "type": "string"
          },
          "documentType": {
            "type": "string",
            "enum": ["paystub", "w2", "taxReturn", "bankStatement"]
          }
        }
      }
    }
  }
}
```

## Parsing Implementation

### Python Implementation

```python
from datetime import datetime
from decimal import Decimal
from typing import Any, Optional
from pydantic import BaseModel, Field, validator
import jsonschema


class Document(BaseModel):
    """Document model matching JSON schema"""
    document_id: str = Field(alias="documentId")
    document_type: str = Field(alias="documentType")
    
    class Config:
        populate_by_name = True


class LoanApplication(BaseModel):
    """Loan application model matching JSON schema"""
    application_id: str = Field(alias="applicationId", regex=r"^[A-Z]{2}\d{8}$")
    applicant_name: str = Field(alias="applicantName", min_length=1, max_length=100)
    loan_amount: Decimal = Field(alias="loanAmount", ge=0, le=1000000)
    submission_date: datetime = Field(alias="submissionDate")
    is_approved: Optional[bool] = Field(alias="isApproved", default=None)
    documents: list[Document] = Field(default_factory=list)
    
    class Config:
        populate_by_name = True
        json_encoders = {
            datetime: lambda v: v.isoformat(),
            Decimal: lambda v: float(v)
        }
    
    @validator('loan_amount')
    def validate_loan_amount(cls, v):
        """Ensure loan amount has at most 2 decimal places"""
        if v.as_tuple().exponent < -2:
            raise ValueError('Loan amount must have at most 2 decimal places')
        return v


def parse_loan_application(raw_data: dict[str, Any]) -> dict[str, Any]:
    """Parse raw data to canonical JSON format conforming to schema.
    
    Args:
        raw_data: Raw input data from various sources
        
    Returns:
        Validated canonical JSON conforming to schema
        
    Raises:
        ValidationError: If data doesn't conform to schema
    """
    # Parse and validate using Pydantic model
    application = LoanApplication(**raw_data)
    
    # Convert to canonical JSON (camelCase)
    return application.model_dump(by_alias=True, mode='json')
```

### TypeScript Implementation

```typescript
import Ajv from 'ajv';
import addFormats from 'ajv-formats';

interface Document {
  documentId: string;
  documentType: 'paystub' | 'w2' | 'taxReturn' | 'bankStatement';
}

interface LoanApplication {
  applicationId: string;
  applicantName: string;
  loanAmount: number;
  submissionDate: string;
  isApproved?: boolean | null;
  documents?: Document[];
}

const loanApplicationSchema = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  type: 'object',
  required: ['applicationId', 'applicantName', 'loanAmount', 'submissionDate'],
  properties: {
    applicationId: {
      type: 'string',
      pattern: '^[A-Z]{2}\\d{8}$'
    },
    applicantName: {
      type: 'string',
      minLength: 1,
      maxLength: 100
    },
    loanAmount: {
      type: 'number',
      minimum: 0,
      maximum: 1000000,
      multipleOf: 0.01
    },
    submissionDate: {
      type: 'string',
      format: 'date-time'
    },
    isApproved: {
      type: ['boolean', 'null']
    },
    documents: {
      type: 'array',
      items: {
        type: 'object',
        required: ['documentId', 'documentType'],
        properties: {
          documentId: { type: 'string' },
          documentType: {
            type: 'string',
            enum: ['paystub', 'w2', 'taxReturn', 'bankStatement']
          }
        }
      }
    }
  }
};

const ajv = new Ajv();
addFormats(ajv);
const validateLoanApplication = ajv.compile(loanApplicationSchema);

export function parseLoanApplication(rawData: any): LoanApplication {
  /**
   * Parse raw data to canonical JSON format conforming to schema
   * 
   * @param rawData - Raw input data from various sources
   * @returns Validated canonical JSON conforming to schema
   * @throws Error if data doesn't conform to schema
   */
  const valid = validateLoanApplication(rawData);
  
  if (!valid) {
    throw new Error(`Validation failed: ${JSON.stringify(validateLoanApplication.errors)}`);
  }
  
  return rawData as LoanApplication;
}
```

## Field Name Conventions

### CamelCase for JSON
All JSON field names must use camelCase convention.

**Conversion Rules:**

```python
def to_camel_case(snake_str: str) -> str:
    """Convert snake_case to camelCase"""
    components = snake_str.split('_')
    return components[0] + ''.join(x.title() for x in components[1:])

# Examples:
# application_id -> applicationId
# loan_amount -> loanAmount
# is_approved -> isApproved
# submission_date -> submissionDate
```

### Internal vs External Representations

```python
# Internal (Python): snake_case
application_id: str
loan_amount: Decimal
submission_date: datetime

# External (JSON): camelCase
{
  "applicationId": "LA12345678",
  "loanAmount": 250000.00,
  "submissionDate": "2025-11-07T10:30:00Z"
}
```

## Data Validation

### Required Validations
1. **Type validation** - Ensure correct data types
2. **Range validation** - Check min/max values
3. **Format validation** - Validate patterns (regex, dates, emails)
4. **Required fields** - Ensure mandatory fields present
5. **Business rules** - Apply domain-specific validations

### Validation Example

```python
from datetime import datetime
from pydantic import BaseModel, Field, validator


class LoanApplication(BaseModel):
    """Loan application with comprehensive validation"""
    
    application_id: str = Field(alias="applicationId")
    loan_amount: float = Field(alias="loanAmount", gt=0, le=1000000)
    submission_date: datetime = Field(alias="submissionDate")
    credit_score: Optional[int] = Field(alias="creditScore", ge=300, le=850, default=None)
    
    @validator('application_id')
    def validate_application_id(cls, v):
        """Validate application ID format"""
        if not v.startswith('LA') or len(v) != 10:
            raise ValueError('Application ID must start with LA and be 10 characters')
        return v
    
    @validator('submission_date')
    def validate_submission_date(cls, v):
        """Ensure submission date is not in the future"""
        if v > datetime.now():
            raise ValueError('Submission date cannot be in the future')
        return v
    
    @validator('loan_amount')
    def validate_loan_amount_precision(cls, v):
        """Ensure loan amount has at most 2 decimal places"""
        if round(v, 2) != v:
            raise ValueError('Loan amount must have at most 2 decimal places')
        return v
```

## Error Handling

### Parsing Error Responses

```python
from typing import Any
from pydantic import ValidationError


def safe_parse(data: dict[str, Any], model_class) -> tuple[Optional[BaseModel], Optional[list]]:
    """Safely parse data with detailed error reporting.
    
    Args:
        data: Raw data to parse
        model_class: Pydantic model class to parse into
        
    Returns:
        Tuple of (parsed_model, errors)
    """
    try:
        parsed = model_class(**data)
        return parsed, None
    except ValidationError as e:
        errors = [
            {
                'field': '.'.join(str(loc) for loc in error['loc']),
                'message': error['msg'],
                'type': error['type']
            }
            for error in e.errors()
        ]
        return None, errors


# Usage
application, errors = safe_parse(raw_data, LoanApplication)
if errors:
    return {
        'status': 'error',
        'message': 'Validation failed',
        'errors': errors
    }
```

## Best Practices

### Schema Management
1. **Version schemas** - Track changes over time
2. **Document schemas** - Include descriptions and examples
3. **Validate on boundaries** - Parse/validate at system boundaries
4. **Centralize schemas** - Single source of truth
5. **Generate code from schemas** - Use tools to generate models

### Performance Considerations
1. Cache compiled validators
2. Use efficient parsing libraries
3. Validate early in the pipeline
4. Batch validations when possible
5. Profile parsing performance

### Testing

```python
import pytest
from pydantic import ValidationError


class TestLoanApplicationParsing:
    """Tests for loan application parsing"""
    
    def test_valid_application_parsed_successfully(self):
        """Test parsing valid application data"""
        data = {
            'applicationId': 'LA12345678',
            'applicantName': 'John Doe',
            'loanAmount': 250000.00,
            'submissionDate': '2025-11-07T10:30:00Z'
        }
        result = parse_loan_application(data)
        assert result['applicationId'] == 'LA12345678'
        assert result['loanAmount'] == 250000.00
    
    def test_invalid_application_id_raises_error(self):
        """Test that invalid application ID raises validation error"""
        data = {
            'applicationId': 'INVALID',
            'applicantName': 'John Doe',
            'loanAmount': 250000.00,
            'submissionDate': '2025-11-07T10:30:00Z'
        }
        with pytest.raises(ValidationError):
            parse_loan_application(data)
    
    def test_camel_case_output(self):
        """Test that output uses camelCase"""
        data = {
            'applicationId': 'LA12345678',
            'applicantName': 'John Doe',
            'loanAmount': 250000.00,
            'submissionDate': '2025-11-07T10:30:00Z'
        }
        result = parse_loan_application(data)
        assert 'applicationId' in result
        assert 'application_id' not in result
```

## Checklist

Before deploying parsing code:
- [ ] JSON schema defined and documented
- [ ] All data types correctly mapped
- [ ] Field names use camelCase in JSON output
- [ ] Validation rules implemented
- [ ] Error handling comprehensive
- [ ] Tests cover valid and invalid cases
- [ ] Performance acceptable for expected load
- [ ] Schema versioning in place

---

**Last Updated:** 2025-11-07  
**Version:** 1.0

