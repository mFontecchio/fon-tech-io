/**
 * Type definitions for component metadata used in API documentation
 */

/**
 * Component input/property metadata
 */
export interface InputMetadata {
  name: string;
  type: string;
  description: string;
  defaultValue?: string;
  required?: boolean;
}

/**
 * Component output/event metadata
 */
export interface OutputMetadata {
  name: string;
  type: string;
  description: string;
}

/**
 * Component method metadata
 */
export interface MethodMetadata {
  name: string;
  parameters: string;
  returnType: string;
  description: string;
}

/**
 * Code example metadata
 */
export interface ExampleMetadata {
  title: string;
  description: string;
  typescript?: string;
  template?: string;
  styles?: string;
}

/**
 * Keyboard navigation item
 */
export interface KeyboardNavigationItem {
  key: string;
  description: string;
}

/**
 * Accessibility metadata
 */
export interface AccessibilityMetadata {
  ariaSupport: string[];
  keyboardNavigation: KeyboardNavigationItem[];
  screenReaderNotes: string;
}

/**
 * A named content projection slot or native attribute passthrough surface.
 *
 * Use `type: 'slot'` for Angular content projection areas (`<ng-content select="...">`).
 * Use `type: 'passthrough'` for native HTML attributes that the component forwards to the
 * underlying element (e.g. an input component that surfaces type, autocomplete, etc.).
 */
export interface PassthroughMetadata {
  name: string;
  type: 'slot' | 'passthrough';
  /**
   * CSS attribute selector used in `<ng-content select="...">`, e.g. `[header]`, `[footer]`,
   * or the attribute name for native passthrough inputs.
   */
  selector: string;
  description: string;
  /** Whether this slot/passthrough surface is optional. Defaults to true. */
  optional?: boolean;
}

/**
 * A single design token used by the component.
 */
export interface ThemeTokenMetadata {
  /**
   * CSS custom property name, e.g. `--component-card-border-radius`.
   * Use the three-tier prefix: `--primitive-*`, `--semantic-*`, or `--component-*`.
   */
  token: string;
  description: string;
}

/**
 * Component theming documentation — tokens used and safe customisation guidance.
 */
export interface ThemingMetadata {
  /** Design tokens the component references in its CSS. */
  tokens: ThemeTokenMetadata[];
  /**
   * Free-text guidance on the safe, supported way to override appearance.
   * Reinforce the no-`::ng-deep` rule and point to the token-override approach.
   */
  customizationNotes?: string;
}

/**
 * Standalone import and minimal setup documentation shown at the top of Overview.
 */
export interface SetupMetadata {
  /**
   * Import statement(s) exactly as consumers would write them.
   * @example "import { ButtonComponent } from '@ui-suite/components';"
   */
  importStatement: string;
  /**
   * Minimal working usage snippet (HTML template, not full component file).
   * Should be as short as possible while still being a runnable example.
   */
  usageSnippet: string;
  /**
   * Optional companion TypeScript class body for the minimal usage snippet.
   * Only include when the snippet genuinely requires signal/state wiring that
   * is not obvious from the template alone (e.g. fui-select, fui-modal).
   */
  usageTypescript?: string;
  /**
   * Names of additional types/interfaces the consumer must import, if any.
   * @example ['ContextMenuItem']
   */
  additionalImports?: string[];
  /**
   * Short prose explaining any peer setup required (e.g. "Add ThemeService to
   * the application root" or "No additional setup required").
   */
  setupNotes?: string;
}

/**
 * Complete component metadata
 */
export interface ComponentMetadata {
  id: string;
  name: string;
  category: 'form' | 'layout' | 'data-display' | 'feedback' | 'navigation';
  description: string;
  selector: string;
  /** Standalone import, minimal usage snippet, and optional setup notes. */
  setup?: SetupMetadata;
  inputs: InputMetadata[];
  outputs: OutputMetadata[];
  methods?: MethodMetadata[];
  /**
   * Named projection slots and native attribute-forwarding surfaces.
   * Populate for any component that uses `<ng-content select="...">` or
   * meaningfully forwards native HTML attributes to an underlying element.
   */
  passthroughs?: PassthroughMetadata[];
  /** Design tokens the component uses and safe customisation guidance. */
  theming?: ThemingMetadata;
  examples: ExampleMetadata[];
  accessibility?: AccessibilityMetadata;
  bestPractices?: string[];
  relatedComponents?: string[];
}

