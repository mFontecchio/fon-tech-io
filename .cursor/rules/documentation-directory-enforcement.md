# Documentation and Plans Directory Enforcement

## Overview
All documentation and plan files must be stored in standardized directories within the project root to maintain consistency across the team.

## Directory Structure

```
/documentation/           # All general documentation files
/documentation/plan/      # All plans and plan summaries
```

## Rules

### 1. Documentation Files Location
All documentation files (`.md`, `.txt`) must be saved in:
```
/documentation/
```

**Applies to:**
- General documentation
- README files
- Technical specifications
- Architecture documents
- API documentation
- Any other markdown or text documentation

### 2. Plans and Summaries Location
All plans and plan summaries must be saved in:
```
/documentation/plan/
```

**Applies to:**
- Project plans
- Implementation plans
- Feature plans
- Plan summaries
- Any file containing "plan" or "summary" in the filename
- Files with "Plan:" or "Summary:" headers

### 3. Automatic Folder Creation
If the required folders do not exist, automatically create them before saving files:
- Create `/documentation/` if missing
- Create `/documentation/plan/` if missing

### 4. File Identification
A file is considered a "plan" if it meets any of these criteria:
- Filename contains "plan" (case-insensitive)
- Filename contains "summary" (case-insensitive)
- Content contains "Plan:" header
- Content contains "Summary:" header

## Enforcement

### When Creating New Files
Before saving any documentation or plan file:
1. Check if file is documentation-related (`.md`, `.txt`)
2. Determine if file is a plan or summary
3. Ensure correct folder exists
4. Save to appropriate location

### Do Not
- Save documentation in `/src/` directory
- Save documentation in `/docs/` directory (use `/documentation/` instead)
- Save plans in root directory
- Save documentation in `/notes/` or other custom folders

### Exceptions
None. All documentation and plans must follow this structure without exception.

## Examples

### Correct Placement
```
✓ /documentation/API_GUIDE.md
✓ /documentation/TROUBLESHOOTING.md
✓ /documentation/plan/feature-implementation-plan.md
✓ /documentation/plan/sprint-summary.md
✓ /documentation/plan/migration-plan.txt
```

### Incorrect Placement
```
✗ /docs/API_GUIDE.md
✗ /src/plan.md
✗ /feature-plan.md
✗ /notes/documentation.md
```

## Workflow Integration

When generating or updating any documentation:
1. Identify file type (documentation vs plan)
2. Create required folders if missing
3. Save to correct location
4. Confirm location in response to user

## Benefits
- Consistent file organization across all projects
- Easy to locate documentation and plans
- Prevents scattered documentation files
- Facilitates team collaboration and onboarding
- Simplifies documentation maintenance

---

**Last Updated:** 2025-11-07  
**Version:** 1.0

