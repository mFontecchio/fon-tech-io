@title PROJECTKEY-123 - Cursor Shared Knowledge Rule
@created 2025-10-31
@last_modified 2025-10-31
@tags #shared-knowledge #writing-guidelines #team-practices
@version 1.0

---

# PROJECTKEY-123 - Cursor Shared Knowledge Rule

## Purpose
We commit to maintaining clear, consistent, and meaningful shared-knowledge entries (the “cursor” of what everyone knows) so that our team stays aligned, onboarding is smoother, and future readers benefit from rich context.

---

## The Seven Rules of a Great Shared Knowledge Entry

1. **Separate the summary from the body with a blank line**  
   Provide a short, one-line summary of the update, then a blank line, then the full explanation.

2. **Limit the summary line to ~50 characters**  
   Keeping the summary brief ensures clarity and readability.

3. **Capitalize the summary line**  
   Start the summary with a capital letter.

4. **Do not end the summary line with a period**  
   The summary is a headline, not a sentence.

5. **Use the imperative mood in the summary line**  
   Write as if instructing: “Add caching guideline” rather than “Added caching guideline”.

6. **Wrap the body at ~72 characters**  
   Improve readability in different contexts and editors by wrapping longer lines at around 72 characters.

7. **Use the body to explain what changed and why — not how**  
   The code or system will show you *how* things changed; here focus on *what* was changed and *why* it was changed for shared knowledge.

---

## Template for a New Entry

    <Summary line of ~50 characters>

    <Blank line>

    What changed and why:
    - Brief bullet or paragraph explaining the update.
    - Include necessary context for readers, e.g. “Before this change the team …”, “After this change …”.
    - Reference related issues, decisions, or docs if relevant.

    Related links:
    - Issue/Decision: <link or id>
    - Doc: <link>

---

## Why This Rule Matters
- Shared knowledge entries serve as the collective *cursor* of what our team knows.  
- Consistent formatting means people can quickly scan summaries and dive deeper when needed.  
- Good entries help onboarding, audits, and future decision-making: the difference between “Why did we do this?” and “I’m not sure”.

---

## When to Use It
- Whenever you update or add to the shared knowledge base (e.g., architecture decisions, process changes, major bug summaries, onboarding steps).  
- Whenever a change is significant enough that someone new (or you in 6 months) would benefit from the *why* behind it.

---

## Example

    Add caching guideline for user session data

    We previously stored session data in memory only, which scaled poorly
    when the team expanded. Now we recommend using Redis with a 5-minute
    TTL for session keys. This improves resilience and lets us horizontally
    scale the web tier without losing session state.

    Related links:
    - Decision doc: /docs/decisions/session-cache.md
    - Issue: #234

---

## Attribution
Based on [Chris Beams’ “How to Write a Git Commit Message”](https://chris.beams.io/posts/git-commit/) and adapted for shared knowledge curation.