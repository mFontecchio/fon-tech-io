## Plan: GitHub Pages + Package Publishing

Host showcase on GitHub Pages (repo subpath) and publish packages from GitHub Actions to npmjs.org on GitHub Release tags. Use phased rollout: deploy showcase first, then package build/publish pipeline, then CI safeguards.

**Steps**
1. Phase 1: GitHub Pages deploy path hardening
2. Update showcase build config to support repo subpath base href (depends on step 1).
3. Add GitHub Actions workflow to build showcase and deploy dist/apps/showcase/browser to Pages on main (depends on step 2).
4. Configure repository Pages settings to use GitHub Actions source and verify live route refresh behavior (depends on step 3).
5. Phase 2: Library packaging readiness
6. Add/normalize Nx build targets for theming/shared/theme-builder/components so all publishable libs produce distributable outputs (parallel across libraries, then aggregate validation).
7. Define package metadata strategy: either one package per library or umbrella package with subpath exports; prefer one package per library for clean versioning and consumption (depends on step 6).
8. Update package manifests and publishConfig for npmjs public publishing, align scoped package names and files included in dist artifacts (depends on step 7).
9. Phase 3: Automated publish and release controls
10. Add publish workflow triggered by GitHub Release tag to install deps, build libs in dependency order, authenticate with NPM_TOKEN, and publish only changed/new versions (depends on step 8).
11. Add CI workflow for lint/build/test gates on PR/main to prevent broken publish/deploy pipelines (parallel with step 10 after step 6).
12. Add changelog/version policy (manual semver or changesets/nx-release) and dry-run publish checks (depends on step 10).

**Relevant files**
- c:/projects/UI/ui-component-suite/apps/showcase/src/index.html — remove hardcoded base href assumptions.
- c:/projects/UI/ui-component-suite/apps/showcase/project.json — add production baseHref/deployUrl strategy for Pages subpath.
- c:/projects/UI/ui-component-suite/package.json — publishing metadata, scripts, private/public posture.
- c:/projects/UI/ui-component-suite/libs/components/project.json — confirm distributable build target.
- c:/projects/UI/ui-component-suite/libs/theming/project.json — add missing build target.
- c:/projects/UI/ui-component-suite/libs/shared/project.json — add missing build target.
- c:/projects/UI/ui-component-suite/libs/theme-builder/project.json — add missing build target.
- c:/projects/UI/ui-component-suite/.github/workflows/deploy-showcase.yml — Pages deployment automation.
- c:/projects/UI/ui-component-suite/.github/workflows/publish-packages.yml — npm publish automation.
- c:/projects/UI/ui-component-suite/.github/workflows/build-and-test.yml — CI quality gate workflow.
- c:/projects/UI/ui-component-suite/CHANGELOG.md — release notes/version tracking updates.

**Verification**
1. Run local production showcase build with repo-style base href and confirm static assets resolve correctly.
2. Validate deployed Pages URL (username.github.io/repo) for deep-link refresh and client-side navigation.
3. Run full library build pipeline in dependency order and confirm expected dist outputs for each publishable package.
4. Execute npm publish dry-run for each target package and verify package contents, entry points, and types.
5. Trigger release-tag workflow in test mode and confirm publish gating (no duplicate version publish, clear failure logs).
6. Run CI workflow on PR to confirm lint/build/test pass and caching behavior.

**Decisions**
- Registry: npmjs.org public.
- Publish trigger: GitHub Release tag.
- Showcase host path: GitHub Pages repo subpath (username.github.io/repo).
- Included scope: GitHub-hosted showcase + GitHub Actions package build/publish automation.
- Excluded scope: custom domain/DNS setup, non-GitHub hosting platforms, private registry-only rollout.

**Further Considerations**
1. Versioning tool choice: manual semver tags vs changesets vs nx-release. Recommendation: changesets for multi-package monorepo reliability.
2. Package model choice: one package per library vs monolithic package. Recommendation: one package per library.
3. Release provenance/signing: enable npm provenance with GitHub OIDC for stronger supply-chain trust.