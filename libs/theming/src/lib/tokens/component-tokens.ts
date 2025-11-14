/**
 * Tier 3: Component Design Tokens
 * 
 * Component-specific tokens that reference semantic and primitive tokens.
 * These tokens are used to customize individual components.
 */

/**
 * Button component tokens
 */
export interface ButtonTokens {
  // Base styles
  paddingX: string;
  paddingY: string;
  fontSize: string;
  fontWeight: string;
  borderRadius: string;
  borderWidth: string;
  // Size variants
  sizes: {
    sm: { paddingX: string; paddingY: string; fontSize: string };
    md: { paddingX: string; paddingY: string; fontSize: string };
    lg: { paddingX: string; paddingY: string; fontSize: string };
  };
  // Filled variant
  filled: {
    background: string;
    backgroundHover: string;
    backgroundActive: string;
    text: string;
    border: string;
  };
  // Outlined variant
  outlined: {
    background: string;
    backgroundHover: string;
    text: string;
    border: string;
    borderHover: string;
  };
  // Text variant
  text: {
    background: string;
    backgroundHover: string;
    text: string;
  };
  // Disabled state
  disabled: {
    background: string;
    text: string;
    border: string;
    opacity: string;
  };
}

/**
 * Input component tokens
 */
export interface InputTokens {
  paddingX: string;
  paddingY: string;
  fontSize: string;
  borderRadius: string;
  borderWidth: string;
  // States
  default: {
    background: string;
    text: string;
    border: string;
    placeholder: string;
  };
  hover: {
    border: string;
  };
  focus: {
    border: string;
    ring: string;
    ringWidth: string;
  };
  error: {
    border: string;
    text: string;
  };
  disabled: {
    background: string;
    text: string;
    border: string;
    opacity: string;
  };
}

/**
 * Card component tokens
 */
export interface CardTokens {
  background: string;
  border: string;
  borderRadius: string;
  padding: string;
  shadow: string;
  shadowHover: string;
}

/**
 * Modal component tokens
 */
export interface ModalTokens {
  background: string;
  overlay: string;
  borderRadius: string;
  padding: string;
  shadow: string;
  maxWidth: string;
}

/**
 * Tooltip component tokens
 */
export interface TooltipTokens {
  background: string;
  text: string;
  borderRadius: string;
  padding: string;
  fontSize: string;
  shadow: string;
  zIndex: number;
}

/**
 * Badge component tokens
 */
export interface BadgeTokens {
  paddingX: string;
  paddingY: string;
  fontSize: string;
  fontWeight: string;
  borderRadius: string;
  // Variants
  default: {
    background: string;
    text: string;
  };
  success: {
    background: string;
    text: string;
  };
  warning: {
    background: string;
    text: string;
  };
  error: {
    background: string;
    text: string;
  };
  info: {
    background: string;
    text: string;
  };
}

/**
 * Table component tokens
 */
export interface TableTokens {
  headerBackground: string;
  headerText: string;
  rowBackground: string;
  rowBackgroundHover: string;
  rowBorder: string;
  cellPadding: string;
  fontSize: string;
}

/**
 * Complete component token interface
 */
export interface ComponentTokens {
  button: ButtonTokens;
  input: InputTokens;
  card: CardTokens;
  modal: ModalTokens;
  tooltip: TooltipTokens;
  badge: BadgeTokens;
  table: TableTokens;
}

/**
 * Default component tokens
 * These reference semantic and primitive tokens
 */
export const defaultComponentTokens: ComponentTokens = {
  button: {
    paddingX: 'var(--primitive-spacing-4)',
    paddingY: 'var(--primitive-spacing-2)',
    fontSize: 'var(--primitive-font-size-base)',
    fontWeight: 'var(--primitive-font-weight-medium)',
    borderRadius: 'var(--primitive-border-radius-md)',
    borderWidth: '1px',
    sizes: {
      sm: {
        paddingX: 'var(--primitive-spacing-3)',
        paddingY: 'var(--primitive-spacing-1)',
        fontSize: 'var(--primitive-font-size-sm)',
      },
      md: {
        paddingX: 'var(--primitive-spacing-4)',
        paddingY: 'var(--primitive-spacing-2)',
        fontSize: 'var(--primitive-font-size-base)',
      },
      lg: {
        paddingX: 'var(--primitive-spacing-6)',
        paddingY: 'var(--primitive-spacing-3)',
        fontSize: 'var(--primitive-font-size-lg)',
      },
    },
    filled: {
      background: 'var(--semantic-brand-primary)',
      backgroundHover: 'var(--semantic-brand-primary-hover)',
      backgroundActive: 'var(--semantic-brand-primary-active)',
      text: 'var(--semantic-text-inverse)',
      border: 'transparent',
    },
    outlined: {
      background: 'transparent',
      backgroundHover: 'var(--semantic-state-hover)',
      text: 'var(--semantic-brand-primary)',
      border: 'var(--semantic-brand-primary)',
      borderHover: 'var(--semantic-brand-primary-hover)',
    },
    text: {
      background: 'transparent',
      backgroundHover: 'var(--semantic-state-hover)',
      text: 'var(--semantic-brand-primary)',
    },
    disabled: {
      background: 'var(--semantic-state-disabled)',
      text: 'var(--semantic-text-disabled)',
      border: 'var(--semantic-border-subtle)',
      opacity: '0.6',
    },
  },
  input: {
    paddingX: 'var(--primitive-spacing-3)',
    paddingY: 'var(--primitive-spacing-2)',
    fontSize: 'var(--primitive-font-size-base)',
    borderRadius: 'var(--primitive-border-radius-md)',
    borderWidth: '1px',
    default: {
      background: 'var(--semantic-surface-card)',
      text: 'var(--semantic-text-primary)',
      border: 'var(--semantic-border-default)',
      placeholder: 'var(--semantic-text-tertiary)',
    },
    hover: {
      border: 'var(--semantic-border-strong)',
    },
    focus: {
      border: 'var(--semantic-border-focus)',
      ring: 'var(--semantic-state-focus-ring)',
      ringWidth: '2px',
    },
    error: {
      border: 'var(--semantic-border-error)',
      text: 'var(--semantic-text-error)',
    },
    disabled: {
      background: 'var(--semantic-state-disabled)',
      text: 'var(--semantic-text-disabled)',
      border: 'var(--semantic-border-subtle)',
      opacity: '0.6',
    },
  },
  card: {
    background: 'var(--semantic-surface-card)',
    border: 'var(--semantic-border-default)',
    borderRadius: 'var(--primitive-border-radius-lg)',
    padding: 'var(--primitive-spacing-6)',
    shadow: 'var(--primitive-shadow-md)',
    shadowHover: 'var(--primitive-shadow-lg)',
  },
  modal: {
    background: 'var(--semantic-surface-modal)',
    overlay: 'var(--semantic-surface-overlay)',
    borderRadius: 'var(--primitive-border-radius-xl)',
    padding: 'var(--primitive-spacing-6)',
    shadow: 'var(--primitive-shadow-2xl)',
    maxWidth: '32rem',
  },
  tooltip: {
    background: 'var(--primitive-neutral-900)',
    text: 'var(--primitive-white)',
    borderRadius: 'var(--primitive-border-radius-md)',
    padding: 'var(--primitive-spacing-2) var(--primitive-spacing-3)',
    fontSize: 'var(--primitive-font-size-sm)',
    shadow: 'var(--primitive-shadow-lg)',
    zIndex: 1600,
  },
  badge: {
    paddingX: 'var(--primitive-spacing-2)',
    paddingY: 'var(--primitive-spacing-1)',
    fontSize: 'var(--primitive-font-size-xs)',
    fontWeight: 'var(--primitive-font-weight-medium)',
    borderRadius: 'var(--primitive-border-radius-full)',
    default: {
      background: 'var(--semantic-brand-primary-subtle)',
      text: 'var(--semantic-brand-primary)',
    },
    success: {
      background: 'var(--semantic-feedback-success-subtle)',
      text: 'var(--semantic-feedback-success)',
    },
    warning: {
      background: 'var(--semantic-feedback-warning-subtle)',
      text: 'var(--semantic-feedback-warning)',
    },
    error: {
      background: 'var(--semantic-feedback-error-subtle)',
      text: 'var(--semantic-feedback-error)',
    },
    info: {
      background: 'var(--semantic-feedback-info-subtle)',
      text: 'var(--semantic-feedback-info)',
    },
  },
  table: {
    headerBackground: 'var(--semantic-surface-background-secondary)',
    headerText: 'var(--semantic-text-primary)',
    rowBackground: 'var(--semantic-surface-card)',
    rowBackgroundHover: 'var(--semantic-state-hover)',
    rowBorder: 'var(--semantic-border-subtle)',
    cellPadding: 'var(--primitive-spacing-3) var(--primitive-spacing-4)',
    fontSize: 'var(--primitive-font-size-sm)',
  },
};

