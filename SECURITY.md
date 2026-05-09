# Security Policy

## Supported Versions

Security fixes are applied to the latest published version only.

| Version | Supported |
|---|---|
| Latest | Yes |
| Older versions | No |

## Reporting a Vulnerability

**Do not report security vulnerabilities through public GitHub Issues.**

Please use GitHub's [private vulnerability reporting](https://github.com/mFontecchio/fon-tech-io/security/advisories/new) feature. This allows you to submit a report confidentially to the maintainer without public disclosure.

Include as much of the following as possible:

- A description of the vulnerability and its potential impact
- The component or module affected
- Steps to reproduce or a proof-of-concept
- Any suggested remediation

You will receive a response within **7 days**. If the vulnerability is confirmed, a fix will be prioritized and a security advisory published once a patched release is available.

## Scope

This project is a UI component library. The primary security concerns are:

- **Cross-site scripting (XSS)** via unsafe template bindings or innerHTML usage
- **Dependency vulnerabilities** in published npm packages
- **Supply-chain risks** in GitHub Actions workflows

## Out of Scope

- Vulnerabilities in consuming applications that result from misuse of this library
- Issues in `devDependencies` that do not affect published packages
- Social engineering attacks

## Disclosure Policy

We follow coordinated disclosure. Once a fix is released, a GitHub Security Advisory will be published with full details.
