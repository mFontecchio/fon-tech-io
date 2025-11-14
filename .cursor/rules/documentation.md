# Documentation & Changelog Management Rules

## Documentation Directory Structure

When generating or updating any documentation, plans, or summaries:

1. **All documentation files** must be saved in `/documentation/` at the project root
2. **All plans and plan summaries** must be saved in `/documentation/plan/`
3. **Automatically create** these folders if they do not exist before saving files
4. **Plans include:**
   - Project plans
   - Implementation plans
   - Feature plans
   - Plan summaries
   - Any file containing a "Plan:" or "Summary:" header
5. **Do NOT save** plans or documentation in other directories (e.g., `/src`, `/docs`, `/notes`)
6. **Preserve existing files** and overwrite only when explicitly instructed

## Changelog Maintenance Rules

### Changelog Structure
- Maintain `CHANGELOG.md` files at appropriate levels of the project
- For monorepos or multi-component projects, maintain separate changelogs per major component
- Always have a root-level `/CHANGELOG.md` for project-wide changes

### Changelog Format
- Follow [Keep a Changelog](https://keepachangelog.com/en/1.0.0/) format
- Use [Semantic Versioning](https://semver.org/spec/v2.0.0.html)
- All dates in YYYY-MM-DD format
- Professional tone, no emojis or informal language

### Changelog Categories
- `Added` - New features
- `Changed` - Changes in existing functionality
- `Deprecated` - Soon-to-be removed features
- `Removed` - Removed features
- `Fixed` - Bug fixes
- `Security` - Security vulnerability fixes

### When to Update Changelog
**ALWAYS** update the appropriate CHANGELOG.md when:
- Adding new features or components
- Modifying existing functionality
- Fixing bugs
- Updating dependencies
- Changing API endpoints or contracts
- Modifying database schemas
- Updating configuration or infrastructure
- Making breaking changes

### Changelog Entry Format
```markdown
### [Unreleased]

#### Added
- New feature description with relevant file/component references

#### Changed
- Modified functionality with specific details

#### Fixed
- Bug fix description with issue reference if applicable
```

## Documentation Update Rules

### Automatic Documentation Updates
When making code changes, automatically identify and update related documentation in `/documentation/`

**Trigger documentation updates when:**
- Adding/modifying/removing public APIs or endpoints
- Changing data schemas or contracts
- Modifying authentication/authorization logic
- Adding new modules, services, or major components
- Changing configuration requirements
- Modifying deployment or infrastructure
- Updating architecture or design patterns

### Documentation Update Process
- **Before completing any code change**, check if documentation needs updating
- **List affected documentation files** in the response
- **Show the specific documentation updates** needed
- Update documentation to reflect current state, not just the changes
- Keep documentation clear, concise, and accurate
- Maintain professional tone throughout all documentation

### Common Documentation Files
Typical documentation structure (adapt to project needs):
- `/documentation/README.md` - Project overview
- `/documentation/ARCHITECTURE.md` - System architecture
- `/documentation/API_OVERVIEW.md` or `/API_ENDPOINTS.md` - API documentation
- `/documentation/DEPLOYMENT_GUIDE.md` - Deployment instructions
- `/documentation/DEVELOPMENT_GUIDE.md` - Developer setup
- `/documentation/TECHNOLOGY_STACK.md` - Tech stack and dependencies
- `/documentation/TROUBLESHOOTING.md` - Known issues and solutions
- `/documentation/SECURITY.md` - Security considerations

### API Documentation Standards
When documenting APIs:
- Include endpoint/method path and HTTP method
- Document purpose and use cases
- Document all request parameters and body schemas
- Document response schemas and status codes
- Include example requests and responses
- Note authentication/authorization requirements
- Document error responses

### Documentation Review Checklist
When completing any code change, verify:
- CHANGELOG.md is updated with this change
- Affected APIs/endpoints are documented
- New components/services are documented
- Configuration changes are documented
- Breaking changes are clearly marked
- Examples are updated to reflect changes
- Diagrams or architecture docs reflect changes

## Workflow Integration

When making changes to the codebase:

1. **Make the code change**
2. **Update the appropriate CHANGELOG.md** with an entry under `[Unreleased]`
3. **Identify affected documentation** in `/documentation/`
4. **Update documentation** to reflect the changes
5. **Mention in the response**: "Updated CHANGELOG.md and [list of doc files]"

## Professional Standards

**ALWAYS maintain professional standards:**
- Use clear, professional language in all documentation
- **NO emojis, emoticons, or informal expressions**
- Use proper technical terminology
- Maintain consistency in formatting and style
- Follow enterprise documentation standards
- Write for a professional enterprise audience
- Use active voice and clear, concise sentences
- Include code examples where appropriate
- Keep documentation DRY (Don't Repeat Yourself) - reference other docs when needed

## Language and Tone Guidelines

**Professional Writing Standards:**
- Use formal business language
- Avoid slang, colloquialisms, or casual phrases
- Write in active voice when possible
- Be precise and specific
- Use industry-standard terminology
- Avoid humor, sarcasm, or personality in technical docs
- Focus on clarity and accuracy over creativity

**Formatting Standards:**
- Use consistent heading levels
- Use bullet points for lists
- Use code blocks for code examples
- Use tables for structured data
- Include table of contents for long documents
- Use meaningful link text (not "click here")