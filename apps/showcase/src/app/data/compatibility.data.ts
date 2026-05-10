/**
 * Package compatibility data.
 *
 * Add a new entry here whenever a release targets a new Angular major or introduces
 * breaking peer-dependency changes. The compatibility page and the root documentation
 * file both derive their content from this single source of truth.
 *
 * ## Versioning Scheme
 *
 * All four packages use Angular-aligned versioning:
 *   MAJOR = Angular major version (20 → Angular 20, 21 → Angular 21, …)
 *   MINOR = new features within that Angular major (backward-compatible)
 *   PATCH = bug fixes (backward-compatible)
 *
 * This mirrors the convention used by Angular Material / CDK. The package version
 * number itself communicates Angular compatibility at a glance.
 */

export interface CompatibilityEntry {
  /** Semver range for the four published packages (all move in lockstep). */
  readonly packageVersion: string;
  /** Angular version range that this release supports. */
  readonly angularVersion: string;
  /** TypeScript version range required. */
  readonly typescriptVersion: string;
  /** Node.js minimum version required. */
  readonly nodeVersion: string;
  /** zone.js version range. */
  readonly zoneJsVersion: string;
  /** Whether this entry is the current stable release. */
  readonly isLatest: boolean;
  /** Release notes or GitHub release URL (optional). */
  readonly releaseUrl?: string;
}

/**
 * All known compatibility entries, ordered newest-first.
 *
 * Packages released together: `@mfontecchio/components`, `@mfontecchio/theming`,
 * `@mfontecchio/shared`, `@mfontecchio/theme-builder`.
 */
export const COMPATIBILITY_MATRIX: CompatibilityEntry[] = [
  {
    packageVersion: '20.x',
    angularVersion: '20.3.x',
    typescriptVersion: '5.8.x',
    nodeVersion: '24+',
    zoneJsVersion: '0.15.x',
    isLatest: true,
    releaseUrl: 'https://github.com/mFontecchio/ui-component-suite/releases/tag/v20.0.0',
  },
];

/** The four packages that share a version and are always released together. */
export const PUBLISHED_PACKAGES = [
  '@mfontecchio/components',
  '@mfontecchio/theming',
  '@mfontecchio/shared',
  '@mfontecchio/theme-builder',
] as const;
