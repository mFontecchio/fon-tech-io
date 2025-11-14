/**
 * Tier 2: Semantic Design Tokens
 * 
 * Purpose-driven tokens that reference primitive tokens.
 * These tokens give meaning to the primitive values based on their usage context.
 */

/**
 * Surface color semantic tokens
 * Used for backgrounds and container surfaces
 */
export interface SemanticSurfaceColors {
  background: string; // Main app background
  backgroundSecondary: string; // Secondary background
  card: string; // Card/panel background
  cardHover: string; // Card hover state
  modal: string; // Modal background
  overlay: string; // Overlay/backdrop
  elevated: string; // Elevated surface
}

/**
 * Text color semantic tokens
 */
export interface SemanticTextColors {
  primary: string; // Primary text color
  secondary: string; // Secondary text color
  tertiary: string; // Tertiary text color
  disabled: string; // Disabled text
  inverse: string; // Inverse text (light text on dark bg)
  link: string; // Link text
  linkHover: string; // Link hover state
  success: string; // Success text
  warning: string; // Warning text
  error: string; // Error text
  info: string; // Info text
}

/**
 * Border color semantic tokens
 */
export interface SemanticBorderColors {
  default: string; // Default border
  subtle: string; // Subtle border
  strong: string; // Strong border
  focus: string; // Focus state border
  error: string; // Error state border
  success: string; // Success state border
  warning: string; // Warning state border
}

/**
 * State color semantic tokens
 * Used for interactive element states
 */
export interface SemanticStateColors {
  hover: string; // Hover state overlay
  active: string; // Active/pressed state
  selected: string; // Selected state
  disabled: string; // Disabled state
  focusRing: string; // Focus ring color
}

/**
 * Brand color semantic tokens
 */
export interface SemanticBrandColors {
  primary: string; // Primary brand color
  primaryHover: string; // Primary hover state
  primaryActive: string; // Primary active state
  primarySubtle: string; // Primary subtle background
  secondary: string; // Secondary brand color
  secondaryHover: string; // Secondary hover state
  secondaryActive: string; // Secondary active state
  accent: string; // Accent color
  accentHover: string; // Accent hover state
}

/**
 * Feedback color semantic tokens
 */
export interface SemanticFeedbackColors {
  success: string; // Success color
  successSubtle: string; // Success subtle background
  warning: string; // Warning color
  warningSubtle: string; // Warning subtle background
  error: string; // Error color
  errorSubtle: string; // Error subtle background
  info: string; // Info color
  infoSubtle: string; // Info subtle background
}

/**
 * Complete semantic token interface
 */
export interface SemanticTokens {
  surface: SemanticSurfaceColors;
  text: SemanticTextColors;
  border: SemanticBorderColors;
  state: SemanticStateColors;
  brand: SemanticBrandColors;
  feedback: SemanticFeedbackColors;
}

/**
 * Default semantic tokens for light theme
 * These reference primitive tokens but can be overridden for different themes
 */
export const defaultLightSemanticTokens: SemanticTokens = {
  surface: {
    background: 'var(--primitive-neutral-50)',
    backgroundSecondary: 'var(--primitive-neutral-100)',
    card: 'var(--primitive-white)',
    cardHover: 'var(--primitive-neutral-50)',
    modal: 'var(--primitive-white)',
    overlay: 'rgba(0, 0, 0, 0.5)',
    elevated: 'var(--primitive-white)',
  },
  text: {
    primary: 'var(--primitive-neutral-900)',
    secondary: 'var(--primitive-neutral-700)',
    tertiary: 'var(--primitive-neutral-500)',
    disabled: 'var(--primitive-neutral-400)',
    inverse: 'var(--primitive-white)',
    link: 'var(--primitive-primary-600)',
    linkHover: 'var(--primitive-primary-700)',
    success: 'var(--primitive-success-700)',
    warning: 'var(--primitive-warning-700)',
    error: 'var(--primitive-error-700)',
    info: 'var(--primitive-info-700)',
  },
  border: {
    default: 'var(--primitive-neutral-300)',
    subtle: 'var(--primitive-neutral-200)',
    strong: 'var(--primitive-neutral-400)',
    focus: 'var(--primitive-primary-500)',
    error: 'var(--primitive-error-500)',
    success: 'var(--primitive-success-500)',
    warning: 'var(--primitive-warning-500)',
  },
  state: {
    hover: 'rgba(0, 0, 0, 0.04)',
    active: 'rgba(0, 0, 0, 0.08)',
    selected: 'var(--primitive-primary-50)',
    disabled: 'var(--primitive-neutral-100)',
    focusRing: 'var(--primitive-primary-500)',
  },
  brand: {
    primary: 'var(--primitive-primary-600)',
    primaryHover: 'var(--primitive-primary-700)',
    primaryActive: 'var(--primitive-primary-800)',
    primarySubtle: 'var(--primitive-primary-50)',
    secondary: 'var(--primitive-secondary-600)',
    secondaryHover: 'var(--primitive-secondary-700)',
    secondaryActive: 'var(--primitive-secondary-800)',
    accent: 'var(--primitive-accent-600)',
    accentHover: 'var(--primitive-accent-700)',
  },
  feedback: {
    success: 'var(--primitive-success-600)',
    successSubtle: 'var(--primitive-success-50)',
    warning: 'var(--primitive-warning-600)',
    warningSubtle: 'var(--primitive-warning-50)',
    error: 'var(--primitive-error-600)',
    errorSubtle: 'var(--primitive-error-50)',
    info: 'var(--primitive-info-600)',
    infoSubtle: 'var(--primitive-info-50)',
  },
};

/**
 * Default semantic tokens for dark theme
 */
export const defaultDarkSemanticTokens: SemanticTokens = {
  surface: {
    background: 'var(--primitive-neutral-950)',
    backgroundSecondary: 'var(--primitive-neutral-900)',
    card: 'var(--primitive-neutral-900)',
    cardHover: 'var(--primitive-neutral-800)',
    modal: 'var(--primitive-neutral-900)',
    overlay: 'rgba(0, 0, 0, 0.75)',
    elevated: 'var(--primitive-neutral-800)',
  },
  text: {
    primary: 'var(--primitive-neutral-50)',
    secondary: 'var(--primitive-neutral-300)',
    tertiary: 'var(--primitive-neutral-500)',
    disabled: 'var(--primitive-neutral-600)',
    inverse: 'var(--primitive-neutral-900)',
    link: 'var(--primitive-primary-400)',
    linkHover: 'var(--primitive-primary-300)',
    success: 'var(--primitive-success-400)',
    warning: 'var(--primitive-warning-400)',
    error: 'var(--primitive-error-400)',
    info: 'var(--primitive-info-400)',
  },
  border: {
    default: 'var(--primitive-neutral-700)',
    subtle: 'var(--primitive-neutral-800)',
    strong: 'var(--primitive-neutral-600)',
    focus: 'var(--primitive-primary-500)',
    error: 'var(--primitive-error-500)',
    success: 'var(--primitive-success-500)',
    warning: 'var(--primitive-warning-500)',
  },
  state: {
    hover: 'rgba(255, 255, 255, 0.08)',
    active: 'rgba(255, 255, 255, 0.12)',
    selected: 'var(--primitive-primary-900)',
    disabled: 'var(--primitive-neutral-800)',
    focusRing: 'var(--primitive-primary-500)',
  },
  brand: {
    primary: 'var(--primitive-primary-500)',
    primaryHover: 'var(--primitive-primary-400)',
    primaryActive: 'var(--primitive-primary-300)',
    primarySubtle: 'var(--primitive-primary-950)',
    secondary: 'var(--primitive-secondary-500)',
    secondaryHover: 'var(--primitive-secondary-400)',
    secondaryActive: 'var(--primitive-secondary-300)',
    accent: 'var(--primitive-accent-500)',
    accentHover: 'var(--primitive-accent-400)',
  },
  feedback: {
    success: 'var(--primitive-success-500)',
    successSubtle: 'var(--primitive-success-950)',
    warning: 'var(--primitive-warning-500)',
    warningSubtle: 'var(--primitive-warning-950)',
    error: 'var(--primitive-error-500)',
    errorSubtle: 'var(--primitive-error-950)',
    info: 'var(--primitive-info-500)',
    infoSubtle: 'var(--primitive-info-950)',
  },
};

