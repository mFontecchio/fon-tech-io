# Coding Standards

## Overview
General programming standards to ensure code quality, maintainability, performance, and consistency across all projects.

## Style and Consistency

### Programming Paradigms
Always maintain a consistent style and approach to programming paradigms when creating new code or updating existing code.

**Guidelines:**
- Follow the existing codebase patterns and conventions
- Do not mix paradigms without clear architectural reasoning
- If the project uses OOP, continue with OOP
- If the project uses functional programming, maintain that approach
- Document any paradigm shifts with clear justification

**Example:**
```python
# If existing code uses classes
class DataProcessor:
    def process(self, data):
        return self._transform(data)
    
    def _transform(self, data):
        # Continue with class-based approach
        pass

# Don't suddenly introduce functional style without reason
# Inconsistent:
# def process_data(data):
#     return transform(data)
```

## Documentation Requirements

### Docstrings
Always add docstrings and document every function, class, and module.

**Python Example (Google Style):**
```python
def calculate_loan_payment(principal: float, rate: float, term: int) -> float:
    """Calculate the monthly payment for a loan.

    Args:
        principal: The loan principal amount in dollars
        rate: The annual interest rate as a decimal (e.g., 0.05 for 5%)
        term: The loan term in months

    Returns:
        The monthly payment amount in dollars

    Raises:
        ValueError: If any input value is negative or zero

    Example:
        >>> calculate_loan_payment(100000, 0.05, 360)
        536.82
    """
    if principal <= 0 or rate < 0 or term <= 0:
        raise ValueError("All values must be positive")
    
    monthly_rate = rate / 12
    return principal * (monthly_rate * (1 + monthly_rate) ** term) / \
           ((1 + monthly_rate) ** term - 1)
```

**TypeScript Example (TSDoc):**
```typescript
/**
 * Fetches user data from the API
 * 
 * @param userId - The unique identifier for the user
 * @param includeDetails - Whether to include extended user details
 * @returns A promise that resolves to the user object
 * @throws {ApiError} If the user is not found or API request fails
 * 
 * @example
 * ```typescript
 * const user = await fetchUser('123', true);
 * console.log(user.email);
 * ```
 */
async function fetchUser(userId: string, includeDetails: boolean = false): Promise<User> {
    // Implementation
}
```

## Testing Requirements

### Unit Testing
Always add or run unit tests after every major change.

**Requirements:**
1. Write tests before or immediately after code changes
2. Test happy paths and edge cases
3. Test error conditions and exceptions
4. Use descriptive test names
5. Follow AAA pattern (Arrange, Act, Assert)

### Code Coverage
Always create unit tests and maintain **90% code coverage** minimum.

**Coverage Targets:**
- Line coverage: ≥90%
- Branch coverage: ≥85%
- Function coverage: ≥90%

**Measuring Coverage:**
```bash
# Python
pytest --cov=src --cov-report=html --cov-fail-under=90

# JavaScript/TypeScript
jest --coverage --coverageThreshold='{"global":{"lines":90}}'
```

### Test Example

```python
import pytest
from myapp.calculator import calculate_loan_payment

class TestLoanPayment:
    """Tests for loan payment calculation"""
    
    def test_calculate_loan_payment_standard(self):
        """Test standard loan payment calculation"""
        # Arrange
        principal = 100000
        rate = 0.05
        term = 360
        
        # Act
        payment = calculate_loan_payment(principal, rate, term)
        
        # Assert
        assert payment == pytest.approx(536.82, rel=0.01)
    
    def test_calculate_loan_payment_zero_principal_raises_error(self):
        """Test that zero principal raises ValueError"""
        # Arrange & Act & Assert
        with pytest.raises(ValueError, match="All values must be positive"):
            calculate_loan_payment(0, 0.05, 360)
    
    def test_calculate_loan_payment_negative_rate_raises_error(self):
        """Test that negative rate raises ValueError"""
        with pytest.raises(ValueError):
            calculate_loan_payment(100000, -0.05, 360)
```

## Performance Optimization

### Optimization Principles
Always optimize code to be as fast as possible, but do not sacrifice human readability for overly clever performance gains.

**Guidelines:**
1. Write clear, readable code first
2. Measure performance before optimizing
3. Optimize only proven bottlenecks
4. Document why optimizations are necessary
5. Prefer standard library optimizations over custom implementations

**Good Optimization:**
```python
# Clear and fast - using built-in functions
def process_large_dataset(data: list[dict]) -> list[dict]:
    """Process dataset using efficient built-in operations"""
    return [item for item in data if item['status'] == 'active']
```

**Bad Optimization:**
```python
# Overly clever, hard to understand
def process_large_dataset(data: list[dict]) -> list[dict]:
    """Process dataset - optimized but unclear"""
    return list(filter(lambda x: x.__getitem__('status').__eq__('active'), data))
```

## Python-Specific Standards

### PEP 8 Compliance
All Python code must conform to PEP 8 standards.

**Key Requirements:**
- 4 spaces for indentation (no tabs)
- Maximum line length: 88 characters (Black formatter standard)
- Two blank lines between top-level functions/classes
- One blank line between methods
- Imports grouped: standard library, third-party, local
- Use snake_case for functions and variables
- Use PascalCase for classes
- Use UPPER_CASE for constants

**Example:**
```python
"""Module for processing loan applications."""

import os
import sys
from typing import Optional

import requests
from pydantic import BaseModel

from myapp.utils import validate_ssn


MAX_LOAN_AMOUNT = 500000
DEFAULT_TERM = 360


class LoanApplication(BaseModel):
    """Represents a loan application."""
    
    applicant_name: str
    loan_amount: float
    term_months: int
    
    def validate(self) -> bool:
        """Validate the loan application."""
        return self.loan_amount <= MAX_LOAN_AMOUNT


def process_application(application: LoanApplication) -> Optional[str]:
    """Process a loan application and return approval status.
    
    Args:
        application: The loan application to process
        
    Returns:
        Approval status or None if validation fails
    """
    if not application.validate():
        return None
    
    return "approved"
```

### PEP 8 Validation
```bash
# Check with flake8
flake8 src/ --max-line-length=88

# Auto-format with black
black src/

# Check with pylint
pylint src/
```

## JSON Standards

### Response Format
All JSON responses must use camelCase for property names.

**Correct:**
```json
{
  "userId": "12345",
  "firstName": "John",
  "lastName": "Doe",
  "emailAddress": "john.doe@example.com",
  "accountBalance": 1000.50,
  "isActive": true
}
```

**Incorrect:**
```json
{
  "user_id": "12345",
  "first_name": "John",
  "last_name": "Doe"
}
```

### Python JSON Serialization

```python
from pydantic import BaseModel, Field


class UserResponse(BaseModel):
    """User response model with camelCase serialization"""
    
    user_id: str = Field(alias="userId")
    first_name: str = Field(alias="firstName")
    email_address: str = Field(alias="emailAddress")
    
    class Config:
        populate_by_name = True
        by_alias = True


# Usage
user = UserResponse(user_id="123", first_name="John", email_address="john@example.com")
json_response = user.model_dump(by_alias=True)
# Output: {"userId": "123", "firstName": "John", "emailAddress": "john@example.com"}
```

## Deprecation Management

### Detecting Deprecations
Detect and fix deprecation warnings in code proactively.

**Process:**
1. Run tests with deprecation warnings enabled
2. Monitor logs for deprecation warnings
3. Update code to use new APIs before old APIs are removed
4. Document migration path for breaking changes

**Python Example:**
```python
# Enable deprecation warnings
import warnings
warnings.filterwarnings('default', category=DeprecationWarning)

# Run tests
pytest -W default::DeprecationWarning
```

**Handling Deprecations:**
```python
# Old (deprecated)
from collections import Mapping  # DeprecationWarning

# New
from collections.abc import Mapping
```

## Lambda-Specific Standards

### No Mock Testing Information
Do not add mock testing or local testing information to Lambda functions.

**Guidelines:**
- Lambda code should be production-ready
- Testing logic belongs in test files, not Lambda code
- No test fixtures or mock data in deployed code
- Use environment variables for configuration differences

**Incorrect:**
```python
# lambda_function.py
def lambda_handler(event, context):
    # DO NOT include this in Lambda code
    if os.getenv('ENV') == 'local':
        return mock_response()
    
    return real_implementation(event)
```

**Correct:**
```python
# lambda_function.py
def lambda_handler(event, context):
    """Production Lambda handler"""
    return process_event(event)


# test_lambda_function.py (separate test file)
def test_lambda_handler():
    """Test Lambda handler with mock data"""
    event = {'test': 'data'}
    response = lambda_handler(event, None)
    assert response['statusCode'] == 200
```

## Code Review Checklist

Before submitting code:
- [ ] Code follows consistent style and paradigms
- [ ] All functions have docstrings
- [ ] Unit tests added/updated
- [ ] Code coverage ≥90%
- [ ] Python code passes PEP 8 validation
- [ ] Performance optimized without sacrificing readability
- [ ] JSON responses use camelCase
- [ ] Deprecation warnings addressed
- [ ] No test/mock code in production Lambda functions

---

**Last Updated:** 2025-11-07  
**Version:** 1.0

