/**
 * Theming Guide Page
 *
 * Covers how themes work, how to create themes programmatically,
 * and how to export and import themes via the Theme Builder.
 */

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent, CodeBlockComponent } from '@mfontecchio/components';

@Component({
  selector: 'app-theming-guide',
  standalone: true,
  imports: [CommonModule, CardComponent, CodeBlockComponent],
  template: `
    <div class="doc-page">
      <h1>Theming</h1>
      <p class="lead">
        The component library is built on a three-tier design token system backed by CSS custom
        properties. Themes are structured as families with explicit light and dark variants.
        <code>ThemeService</code> manages active state reactively via Angular signals and persists
        user preference across page reloads.
      </p>

      <!-- ─── How Themes Work ─────────────────────────────────────────────── -->
      <section>
        <h2>How Themes Work</h2>
        <p>
          Every visual property in the library is derived from one of three token tiers. Tokens flow
          from primitive raw values through semantic purpose-driven aliases down to
          component-specific variables. Component CSS files reference only the component tier,
          ensuring a single token change propagates consistently across the entire UI.
        </p>

        <div class="token-tiers">
          <fui-card class="tier-card">
            <div class="tier-label tier-1">Tier 1</div>
            <h3>Primitive Tokens</h3>
            <p>
              Raw design values: color palettes (50–950 shades), a 4 px spacing scale, typography
              sizes, border radii, and shadow definitions.
            </p>
            <fui-code-block
              [code]="primitiveTokenExample"
              language="css"
              [title]="'Primitive tokens (CSS)'"
            />
          </fui-card>

          <fui-card class="tier-card">
            <div class="tier-label tier-2">Tier 2</div>
            <h3>Semantic Tokens</h3>
            <p>
              Purpose-driven aliases that reference primitive tokens. They express intent rather
              than value, so swapping a theme only requires changing this layer.
            </p>
            <fui-code-block
              [code]="semanticTokenExample"
              language="css"
              [title]="'Semantic tokens (CSS)'"
            />
          </fui-card>

          <fui-card class="tier-card">
            <div class="tier-label tier-3">Tier 3</div>
            <h3>Component Tokens</h3>
            <p>
              Component-specific variables consumed directly in component stylesheets. They
              reference semantic tokens and can be overridden per theme without touching component
              CSS.
            </p>
            <fui-code-block
              [code]="componentTokenExample"
              language="css"
              [title]="'Component tokens (CSS)'"
            />
          </fui-card>
        </div>

        <fui-card>
          <h3>Theme Families and Modes</h3>
          <p>
            A <strong>theme family</strong> bundles a coordinated light variant and dark variant
            under shared metadata. Switching mode within a family preserves all brand colors and
            spacing while adapting surface and text contrasts for the target luminance.
            High-contrast mode is a standalone accessibility theme available regardless of the
            active family.
          </p>
          <fui-code-block
            [code]="themeFamilyStructure"
            language="typescript"
            [title]="'ThemeFamily structure'"
          />
        </fui-card>

        <fui-card>
          <h3>ThemeService Reactivity</h3>
          <p>
            <code>ThemeService</code> exposes computed signals for the active theme, mode, and
            family. Inject it anywhere in the application to read or update theming state. The
            service applies tokens to <code>document.documentElement</code> via CSS custom
            properties and writes the selection to <code>localStorage</code> automatically.
          </p>
          <fui-code-block
            [code]="serviceBasicsExample"
            language="typescript"
            [title]="'ThemeService basics'"
          />
        </fui-card>
      </section>

      <!-- ─── Creating a Theme ─────────────────────────────────────────────── -->
      <section>
        <h2>Creating a Theme</h2>
        <p>
          There are two approaches to creating a custom theme: authoring one programmatically in
          TypeScript, or using the visual Theme Builder application and exporting the result.
        </p>

        <fui-card>
          <h3>Programmatic Theme Creation</h3>
          <p>
            Construct a <code>Theme</code> object, register it with <code>ThemeService</code>, and
            activate it. At minimum, populate the <code>metadata</code> block and override only the
            tokens that differ from a base theme.
          </p>
          <fui-code-block
            [code]="programmaticThemeExample"
            language="typescript"
            [title]="'Standalone custom theme'"
          />
        </fui-card>

        <fui-card>
          <h3>Creating a Theme Family</h3>
          <p>
            For full light/dark support, create a <code>ThemeFamily</code> with paired variants. Use
            <code>setCustomThemeFamily</code> to register and activate in one call. The current mode
            signal determines which variant is applied automatically.
          </p>
          <fui-code-block
            [code]="themeFamilyExample"
            language="typescript"
            [title]="'Custom theme family'"
          />
        </fui-card>

        <fui-card>
          <h3>Creating a Theme from a Preset</h3>
          <p>
            The <code>&#64;ui-suite/theme-builder</code> package ships named presets (Material,
            Bootstrap, Ocean, Sunset, and more). Use <code>convertPresetToThemeFamily</code> to
            produce a fully structured <code>ThemeFamily</code> from any preset, then register it
            with the service.
          </p>
          <fui-code-block
            [code]="presetThemeExample"
            language="typescript"
            [title]="'Theme from preset'"
          />
        </fui-card>
      </section>

      <!-- ─── Export and Import via Theme Builder ──────────────────────────── -->
      <section>
        <h2>Exporting and Importing Themes via the Builder</h2>
        <p>
          The Theme Builder application provides a visual editor for all three token tiers with
          real-time component previews and WCAG contrast validation. Themes created there can be
          exported as JSON and consumed directly in application code.
        </p>

        <div class="content-grid">
          <fui-card>
            <h3>Starting the Theme Builder</h3>
            <p>Run the dedicated application from the repository root:</p>
            <fui-code-block
              [code]="startBuilderCommand"
              language="bash"
              [title]="'Start Theme Builder'"
            />
            <p>
              Open <code>http://localhost:4200</code> in a browser. The builder loads the active
              theme family and renders every library component in real time as tokens are adjusted.
            </p>
          </fui-card>

          <fui-card>
            <h3>Exporting a Theme</h3>
            <p>
              After customising colors, typography, and spacing, use the
              <strong>Export</strong> button in the builder toolbar. Two formats are available:
            </p>
            <ul>
              <li>
                <strong>JSON</strong> — a portable <code>ThemeFamilyTokenBundle</code> that can be
                checked into source control or shared across teams.
              </li>
              <li>
                <strong>TypeScript</strong> — a ready-to-paste <code>ThemeFamily</code> object for
                direct inclusion in an Angular project.
              </li>
            </ul>
          </fui-card>
        </div>

        <fui-card>
          <h3>Importing a JSON Theme Bundle</h3>
          <p>
            Load an exported JSON file and pass the parsed bundle through
            <code>convertPresetToThemeFamily</code> (or reconstruct the
            <code>ThemeFamily</code> manually) before registering it with <code>ThemeService</code>.
          </p>
          <fui-code-block
            [code]="importJsonThemeExample"
            language="typescript"
            [title]="'Consuming an exported JSON theme'"
          />
        </fui-card>

        <fui-card>
          <h3>Saving and Loading Themes in the Builder</h3>
          <p>
            The builder persists themes to browser <code>localStorage</code> automatically. The
            <code>&#64;ui-suite/theme-builder</code> package also exports storage utilities for
            programmatic access to the saved theme store.
          </p>
          <fui-code-block
            [code]="storageUtilsExample"
            language="typescript"
            [title]="'Theme storage utilities'"
          />
        </fui-card>

        <fui-card>
          <h3>Sharing Themes via URL</h3>
          <p>
            The Theme Builder encodes the active theme as a compressed query parameter so a full
            configuration can be shared as a URL. Visiting the link automatically restores the
            encoded theme in the recipient's builder session — no file transfer required.
          </p>
        </fui-card>
      </section>

      <!-- ─── Best Practices ───────────────────────────────────────────────── -->
      <section>
        <h2>Best Practices</h2>
        <div class="content-grid">
          <fui-card>
            <h3>Token Authoring</h3>
            <ul>
              <li>
                Reference component and semantic tokens in component CSS — never hardcode hex values
                or pixel sizes.
              </li>
              <li>
                Override at the lowest tier needed: prefer component tokens for isolated overrides,
                semantic tokens for brand-wide changes, and primitive tokens only when the entire
                scale must change.
              </li>
              <li>
                Use <code>var(--animation-duration-normal)</code> and
                <code>var(--animation-easing-default)</code> for transitions rather than literal
                values.
              </li>
            </ul>
          </fui-card>
          <fui-card>
            <h3>Accessibility</h3>
            <ul>
              <li>
                Validate every color pairing against WCAG AA (4.5:1 for normal text, 3:1 for large
                text) before shipping a theme.
              </li>
              <li>
                Use the built-in contrast checker in the Theme Builder to identify failing pairs
                before export.
              </li>
              <li>
                Always verify light, dark, and high-contrast behavior in the showcase after
                modifying theme data.
              </li>
            </ul>
          </fui-card>
        </div>
      </section>
    </div>
  `,
  styles: [
    `
      .doc-page {
        padding: var(--primitive-spacing-8);
        max-width: 960px;
        margin: 0 auto;
        display: grid;
        gap: var(--primitive-spacing-10);
      }

      h1 {
        font-size: 2.5rem;
        margin-bottom: var(--primitive-spacing-2);
        color: var(--semantic-text-primary);
      }

      h2 {
        font-size: var(--primitive-font-size-2xl, 1.5rem);
        margin-bottom: var(--primitive-spacing-4);
        color: var(--semantic-text-primary);
      }

      h3 {
        font-size: var(--primitive-font-size-lg);
        margin-bottom: var(--primitive-spacing-3);
        color: var(--semantic-text-primary);
      }

      section {
        display: grid;
        gap: var(--primitive-spacing-6);
      }

      section > h2 {
        margin-bottom: 0;
        padding-bottom: var(--primitive-spacing-3);
        border-bottom: 1px solid var(--semantic-border-default);
      }

      .lead {
        color: var(--semantic-text-secondary);
        font-size: var(--primitive-font-size-lg);
        line-height: 1.6;
        margin-bottom: 0;
      }

      .content-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
        gap: var(--primitive-spacing-6);
      }

      .token-tiers {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: var(--primitive-spacing-6);
      }

      .tier-label {
        display: inline-block;
        font-size: 0.7rem;
        font-weight: 700;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        padding: 2px var(--primitive-spacing-2);
        border-radius: var(--primitive-border-radius-sm);
        margin-bottom: var(--primitive-spacing-2);
      }

      .tier-1 {
        background: var(--semantic-feedback-info, #dbeafe);
        color: color-mix(in srgb, var(--semantic-text-link, #1d4ed8) 10%, white);
      }

      .tier-2 {
        background: var(--semantic-state-selected, #ede9fe);
        color: #5b21b6;
      }

      .tier-3 {
        background: #d1fae5;
        color: #065f46;
      }

      p,
      li {
        color: var(--semantic-text-secondary);
        line-height: 1.6;
      }

      ul {
        margin: var(--primitive-spacing-2) 0 0;
        padding-left: 1.25rem;
        display: grid;
        gap: var(--primitive-spacing-1);
      }

      code {
        font-family: var(--primitive-font-family-mono, monospace);
        font-size: 0.875em;
        background: var(--semantic-surface-background-secondary, #f1f5f9);
        padding: 1px 5px;
        border-radius: var(--primitive-border-radius-sm);
      }

      @media (max-width: 768px) {
        .doc-page {
          padding: var(--primitive-spacing-6);
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThemingComponent {
  // ── How Themes Work ────────────────────────────────────────────────────────

  protected readonly primitiveTokenExample = `/* libs/theming/src/lib/tokens/primitive-tokens.ts (generated CSS) */
--primitive-primary-500: #3b82f6;
--primitive-spacing-4:   1rem;
--primitive-font-size-base: 1rem;
--primitive-border-radius-md: 0.375rem;`;

  protected readonly semanticTokenExample = `/* libs/theming/src/lib/tokens/semantic-tokens.ts (generated CSS) */
--semantic-brand-primary:        var(--primitive-primary-500);
--semantic-surface-card:         var(--primitive-neutral-0);
--semantic-text-primary:         var(--primitive-neutral-900);
--semantic-border-focus:         var(--primitive-primary-500);`;

  protected readonly componentTokenExample = `/* libs/theming/src/lib/tokens/component-tokens.ts (generated CSS) */
--component-button-filled-background: var(--semantic-brand-primary);
--component-button-border-radius:     var(--primitive-border-radius-md);
--component-input-padding-x:          var(--primitive-spacing-3);`;

  protected readonly themeFamilyStructure = `import { ThemeFamily } from '@mfontecchio/theming';

// A ThemeFamily bundles light and dark variants under shared metadata.
const family: ThemeFamily = {
  metadata: {
    id: 'my-brand',
    name: 'My Brand',
    description: 'Corporate brand theme',
    version: '1.0.0',
  },
  light: { /* Theme — mode: 'light' */ },
  dark:  { /* Theme — mode: 'dark'  */ },
};`;

  protected readonly serviceBasicsExample = `import { Component, effect, inject } from '@angular/core';
import { ThemeService } from '@mfontecchio/theming';

@Component({
  selector: 'app-shell',
  standalone: true,
  template: \`
    <button (click)="toggleDark()">Toggle dark mode</button>
    <button (click)="enableA11y()">High contrast</button>
  \`,
})
export class ShellComponent {
  private readonly themeService = inject(ThemeService);

  constructor() {
    // Reactive signal — runs whenever the active theme changes.
    effect(() => {
      const theme = this.themeService.currentTheme();
      console.log('Active theme:', theme.metadata.id);
    });
  }

  // Computed signals available on ThemeService:
  //   currentTheme()        — full Theme object
  //   currentThemeMode()    — 'light' | 'dark' | 'high-contrast'
  //   isDarkMode()          — boolean
  //   currentThemeFamilyId()— string | null
  //   availableFamilies()   — Map<string, ThemeFamily>

  protected toggleDark(): void {
    this.themeService.toggleDarkMode();
  }

  protected enableA11y(): void {
    this.themeService.setThemeMode('high-contrast');
  }
}`;

  // ── Creating a Theme ───────────────────────────────────────────────────────

  protected readonly programmaticThemeExample = `import { Component, inject } from '@angular/core';
import { ThemeService, Theme, lightTheme } from '@mfontecchio/theming';

// Start from a base theme and override only what changes.
const corporateTheme: Theme = {
  ...lightTheme,
  metadata: {
    id:          'corporate-light',
    name:        'Corporate Light',
    description: 'Brand theme for corporate applications',
    mode:        'light',
    version:     '1.0.0',
  },
  primitive: {
    ...lightTheme.primitive,
    colors: {
      ...lightTheme.primitive.colors,
      primary: {
        ...lightTheme.primitive.colors.primary,
        500: '#0066cc', // Override brand color only
        600: '#0052a3',
        700: '#003d7a',
      },
    },
  },
};

@Component({ /* ... */ })
export class AppComponent {
  private readonly themeService = inject(ThemeService);

  applyCorpTheme(): void {
    // registerCustomTheme stores the theme without activating it.
    // setTheme activates by ID.
    this.themeService.registerCustomTheme(corporateTheme);
    this.themeService.setTheme('corporate-light');
  }
}`;

  protected readonly themeFamilyExample = `import { Component, inject } from '@angular/core';
import { ThemeService, ThemeFamily, lightTheme, darkTheme } from '@mfontecchio/theming';

const brandFamily: ThemeFamily = {
  metadata: {
    id:      'brand',
    name:    'Brand',
    version: '1.0.0',
  },
  light: {
    ...lightTheme,
    metadata: { ...lightTheme.metadata, id: 'brand-light', name: 'Brand Light', mode: 'light' },
    // token overrides …
  },
  dark: {
    ...darkTheme,
    metadata: { ...darkTheme.metadata, id: 'brand-dark', name: 'Brand Dark', mode: 'dark' },
    // token overrides …
  },
};

@Component({ /* ... */ })
export class AppComponent {
  private readonly themeService = inject(ThemeService);

  applyBrandFamily(): void {
    // Registers and activates the family; mode follows the current mode signal.
    this.themeService.setCustomThemeFamily(brandFamily);
  }
}`;

  protected readonly presetThemeExample = `import { Component, inject } from '@angular/core';
import { ThemeService } from '@mfontecchio/theming';
import {
  THEME_PRESETS,
  convertPresetToThemeFamily,
} from '@mfontecchio/theme-builder';

@Component({ /* ... */ })
export class AppComponent {
  private readonly themeService = inject(ThemeService);

  constructor() {
    // Available preset IDs: 'material', 'bootstrap', 'ocean', 'sunset',
    // 'dark-pro', 'minimal', and more — inspect THEME_PRESETS for the full list.
    const oceanPreset  = THEME_PRESETS.find(p => p.id === 'ocean')!;
    const oceanFamily  = convertPresetToThemeFamily(oceanPreset);

    this.themeService.setCustomThemeFamily(oceanFamily);
  }
}`;

  // ── Export and Import ──────────────────────────────────────────────────────

  protected readonly startBuilderCommand = `# From the repository root
pnpm start:theme-builder

# Open http://localhost:4200 in a browser`;

  protected readonly importJsonThemeExample = `import { Component, inject } from '@angular/core';
import { ThemeService } from '@mfontecchio/theming';
import {
  convertPresetToThemeFamily,
  normalizeImportedThemeData,
} from '@mfontecchio/theme-builder';

// Option A: import the exported JSON bundle directly (TypeScript resolveJsonModule).
import exportedBundle from './my-brand-theme.json';

// Option B: fetch at runtime (lazy-loaded configuration).
// const exportedBundle = await fetch('/assets/themes/my-brand.json').then(r => r.json());

@Component({ /* ... */ })
export class AppComponent {
  private readonly themeService = inject(ThemeService);

  constructor() {
    // 1. Normalise the raw JSON into a typed ThemeFamilyTokenBundle.
    //    normalizeImportedThemeData accepts any unknown JSON shape and
    //    handles legacy single-token-map files as well as full light/dark bundles.
    const bundle = normalizeImportedThemeData(exportedBundle);

    // 2. Map the bundle onto a ThemePreset shape, then convert to ThemeFamily.
    //    This is the same two-step process used internally by the Theme Builder
    //    when loading a saved or imported theme file.
    const family = convertPresetToThemeFamily({
      id:          bundle.metadata.id,
      name:        bundle.metadata.name,
      description: bundle.metadata.description ?? '',
      author:      bundle.metadata.author      ?? 'UI Suite',
      light:       bundle.light,
      dark:        bundle.dark,
      tokens:      bundle.light,
    });

    this.themeService.setCustomThemeFamily(family);
  }
}`;

  protected readonly storageUtilsExample = `import {
  saveTheme,
  getSavedThemes,
  deleteTheme,
  ThemeFamilyTokenBundle,
} from '@mfontecchio/theme-builder';

// Persist a theme bundle to localStorage.
saveTheme('My Brand', bundle);

// Retrieve all previously saved bundles.
const saved: Record<string, { name: string; family: ThemeFamilyTokenBundle }> = getSavedThemes();

// Remove a saved theme by name.
deleteTheme('My Brand');`;
}
