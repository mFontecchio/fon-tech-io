/**
 * Component Metadata Registry
 * Central repository for all component API documentation
 */

import { ComponentMetadata } from './component-metadata.types';

// ============================================================================
// FORM COMPONENTS
// ============================================================================

const BUTTON_METADATA: ComponentMetadata = {
  id: 'button',
  name: 'Button',
  category: 'form',
  description: 'A themable button component with multiple variants, sizes, and states. Supports loading states and full accessibility.',
  selector: 'ui-button',
  inputs: [
    {
      name: 'variant',
      type: "'filled' | 'outlined' | 'text'",
      description: 'Visual style variant of the button',
      defaultValue: "'filled'",
    },
    {
      name: 'size',
      type: "'sm' | 'md' | 'lg'",
      description: 'Size of the button',
      defaultValue: "'md'",
    },
    {
      name: 'disabled',
      type: 'boolean',
      description: 'Whether the button is disabled',
      defaultValue: 'false',
    },
    {
      name: 'loading',
      type: 'boolean',
      description: 'Whether the button is in loading state',
      defaultValue: 'false',
    },
    {
      name: 'type',
      type: "'button' | 'submit' | 'reset'",
      description: 'HTML button type attribute',
      defaultValue: "'button'",
    },
    {
      name: 'fullWidth',
      type: 'boolean',
      description: 'Whether button should take full width of container',
      defaultValue: 'false',
    },
    {
      name: 'iconOnly',
      type: 'boolean',
      description: 'Whether button contains only an icon (removes text padding)',
      defaultValue: 'false',
    },
  ],
  outputs: [
    {
      name: 'clicked',
      type: 'MouseEvent',
      description: 'Emitted when button is clicked (only if not disabled or loading)',
    },
  ],
  examples: [
    {
      title: 'Basic Usage',
      description: 'Simple button with default filled variant',
      template: `<ui-button>Click Me</ui-button>`,
    },
    {
      title: 'Button Variants',
      description: 'Three visual styles: filled (solid), outlined (border), and text (minimal)',
      template: `<ui-button variant="filled">Filled</ui-button>
<ui-button variant="outlined">Outlined</ui-button>
<ui-button variant="text">Text</ui-button>`,
    },
    {
      title: 'Button Sizes',
      description: 'Three size options to fit different layouts',
      template: `<ui-button size="sm">Small</ui-button>
<ui-button size="md">Medium</ui-button>
<ui-button size="lg">Large</ui-button>`,
    },
    {
      title: 'Disabled State',
      description: 'Disabled buttons prevent interaction',
      template: `<ui-button [disabled]="true">Disabled Button</ui-button>`,
    },
    {
      title: 'Loading State',
      description: 'Display loading spinner with disabled interaction',
      template: `<ui-button [loading]="true">Loading...</ui-button>`,
    },
    {
      title: 'Full Width',
      description: 'Button that spans the full width of its container',
      template: `<ui-button [fullWidth]="true">Full Width Button</ui-button>`,
    },
  ],
  accessibility: {
    ariaSupport: [
      'Uses native HTML button element',
      'Supports aria-label for icon-only buttons',
      'Automatically sets aria-disabled when disabled',
      'Includes aria-busy during loading state',
    ],
    keyboardNavigation: [
      { key: 'Enter', description: 'Activates the button' },
      { key: 'Space', description: 'Activates the button' },
    ],
    screenReaderNotes: 'Button text is announced along with its state (disabled, loading). Use aria-label for icon-only buttons.',
  },
  bestPractices: [
    'Use "filled" variant for primary actions',
    'Use "outlined" for secondary actions',
    'Use "text" for tertiary or low-emphasis actions',
    'Provide clear, action-oriented button text',
    'Use loading state for asynchronous operations',
    'Include aria-label for icon-only buttons',
  ],
  relatedComponents: [],
};

const INPUT_METADATA: ComponentMetadata = {
  id: 'input',
  name: 'Input',
  category: 'form',
  description: 'A themable text input component with validation states, icons, and helper text support.',
  selector: 'ui-input',
  inputs: [
    { name: 'type', type: "'text' | 'email' | 'password' | 'number' | 'tel' | 'url'", description: 'HTML input type', defaultValue: "'text'" },
    { name: 'label', type: 'string', description: 'Label text displayed above the input' },
    { name: 'placeholder', type: 'string', description: 'Placeholder text' },
    { name: 'value', type: 'string | number', description: 'Input value', defaultValue: "''" },
    { name: 'disabled', type: 'boolean', description: 'Whether the input is disabled', defaultValue: 'false' },
    { name: 'required', type: 'boolean', description: 'Whether the input is required', defaultValue: 'false' },
    { name: 'error', type: 'string', description: 'Error message to display' },
    { name: 'helperText', type: 'string', description: 'Helper text displayed below the input' },
    { name: 'prefixIcon', type: 'string', description: 'Icon to display before the input text' },
    { name: 'suffixIcon', type: 'string', description: 'Icon to display after the input text' },
    { name: 'fullWidth', type: 'boolean', description: 'Whether input should take full width', defaultValue: 'false' },
  ],
  outputs: [
    { name: 'valueChange', type: 'string | number', description: 'Emitted when input value changes' },
  ],
  examples: [
    {
      title: 'Basic Input',
      description: 'Simple text input with label',
      template: `<ui-input label="Email" placeholder="Enter your email" />`,
    },
    {
      title: 'Input Types',
      description: 'Different input types for various data',
      template: `<ui-input type="email" label="Email" placeholder="email@example.com" />
<ui-input type="password" label="Password" placeholder="Enter password" />
<ui-input type="number" label="Age" placeholder="Enter age" />
<ui-input type="tel" label="Phone" placeholder="(123) 456-7890" />`,
    },
    {
      title: 'Input with Prefix Icon',
      description: 'Add visual context with a prefix icon',
      template: `<ui-input 
  label="Search" 
  placeholder="Search..." 
  prefixIcon="🔍" 
/>`,
    },
    {
      title: 'Input with Suffix Icon',
      description: 'Add actions or indicators with a suffix icon',
      template: `<ui-input 
  label="Password" 
  type="password"
  placeholder="Enter password" 
  suffixIcon="👁️" 
/>`,
    },
    {
      title: 'Input with Error',
      description: 'Display validation errors',
      template: `<ui-input 
  label="Email" 
  value="invalid-email"
  error="Please enter a valid email address"
/>`,
    },
    {
      title: 'Input with Helper Text',
      description: 'Provide additional guidance',
      template: `<ui-input 
  label="Username" 
  placeholder="Enter username"
  helperText="Must be 3-20 characters, letters and numbers only"
/>`,
    },
    {
      title: 'Disabled Input',
      description: 'Non-editable input field',
      template: `<ui-input 
  label="Email" 
  value="user@example.com"
  [disabled]="true"
/>`,
    },
    {
      title: 'Required Input',
      description: 'Mark input as required',
      template: `<ui-input 
  label="Email" 
  placeholder="Enter your email"
  [required]="true"
/>`,
    },
  ],
  accessibility: {
    ariaSupport: ['Automatically associates label with input', 'aria-invalid set when error present', 'aria-describedby links to helper/error text'],
    keyboardNavigation: [{ key: 'Tab', description: 'Move focus to/from input' }],
    screenReaderNotes: 'Label, value, and error states are announced. Helper text provides additional context.',
  },
  bestPractices: [
    'Always provide a label for clarity',
    'Use appropriate input types for better mobile keyboards',
    'Provide clear error messages',
    'Use helper text for format examples',
  ],
};

const TEXTAREA_METADATA: ComponentMetadata = {
  id: 'textarea',
  name: 'Textarea',
  category: 'form',
  description: 'A multi-line text input component with auto-resize and character counter support.',
  selector: 'ui-textarea',
  inputs: [
    { name: 'label', type: 'string', description: 'Label text displayed above the textarea' },
    { name: 'placeholder', type: 'string', description: 'Placeholder text shown when empty' },
    { name: 'value', type: 'string', description: 'Current textarea value', defaultValue: "''" },
    { name: 'disabled', type: 'boolean', description: 'Whether textarea is disabled', defaultValue: 'false' },
    { name: 'required', type: 'boolean', description: 'Whether input is required', defaultValue: 'false' },
    { name: 'rows', type: 'number', description: 'Number of visible text rows', defaultValue: '3' },
    { name: 'maxLength', type: 'number', description: 'Maximum character count' },
    { name: 'showCharacterCount', type: 'boolean', description: 'Display character counter', defaultValue: 'false' },
    { name: 'errorMessage', type: 'string', description: 'Error message to display' },
    { name: 'helperText', type: 'string', description: 'Helper text below input' },
  ],
  outputs: [
    { name: 'valueChange', type: 'string', description: 'Emitted when value changes' },
  ],
  examples: [
    {
      title: 'Basic Textarea',
      description: 'Simple multi-line text input',
      template: `<ui-textarea 
  label="Description" 
  placeholder="Enter description..." 
/>`,
    },
    {
      title: 'Textarea with Rows',
      description: 'Control visible height with row count',
      template: `<ui-textarea 
  label="Comments" 
  placeholder="Enter your comments..." 
  [rows]="5" 
/>`,
    },
    {
      title: 'Textarea with Character Limit',
      description: 'Maximum length with character counter',
      template: `<ui-textarea 
  label="Bio" 
  placeholder="Tell us about yourself..." 
  [maxLength]="200"
  [showCharacterCount]="true"
/>`,
    },
    {
      title: 'Textarea with Helper Text',
      description: 'Guidance text below the input',
      template: `<ui-textarea 
  label="Feedback" 
  placeholder="Share your thoughts..." 
  helperText="Your feedback helps us improve." 
/>`,
    },
    {
      title: 'Textarea with Error',
      description: 'Error state with validation message',
      template: `<ui-textarea 
  label="Message" 
  placeholder="Enter message..." 
  errorMessage="Message is required" 
/>`,
    },
    {
      title: 'Required Textarea',
      description: 'Required field indicator',
      template: `<ui-textarea 
  label="Required Field" 
  placeholder="This field is required..." 
  [required]="true" 
/>`,
    },
    {
      title: 'Disabled Textarea',
      description: 'Non-editable state',
      template: `<ui-textarea 
  label="Readonly Content" 
  value="This content cannot be edited." 
  [disabled]="true" 
/>`,
    },
  ],
  accessibility: {
    ariaSupport: [
      'Label association with for/id attributes',
      'aria-required for required fields',
      'aria-invalid for error states',
      'aria-describedby for helper text and errors',
    ],
    keyboardNavigation: [
      { key: 'Tab', description: 'Move focus to/from textarea' },
      { key: 'Shift+Tab', description: 'Move focus backward' },
    ],
    screenReaderNotes: 'Label, required state, helper text, and errors announced. Character count updates announced as user types.',
  },
  bestPractices: [
    'Always provide a clear label describing the expected input',
    'Use helper text for formatting instructions or examples',
    'Set appropriate row count based on expected input length',
    'Use maxLength for fields with strict length requirements',
    'Show character count for limited-length fields',
    'Provide clear error messages for validation failures',
    'Use required indicator for mandatory fields',
  ],
};

const CHECKBOX_METADATA: ComponentMetadata = {
  id: 'checkbox',
  name: 'Checkbox',
  category: 'form',
  description: 'A themable checkbox component with label support and indeterminate state.',
  selector: 'ui-checkbox',
  inputs: [
    { name: 'checked', type: 'boolean', description: 'Whether checked', defaultValue: 'false' },
    { name: 'disabled', type: 'boolean', description: 'Whether disabled', defaultValue: 'false' },
    { name: 'indeterminate', type: 'boolean', description: 'Indeterminate state (partially checked)', defaultValue: 'false' },
    { name: 'label', type: 'string', description: 'Label text displayed next to checkbox' },
  ],
  outputs: [
    { name: 'checkedChange', type: 'boolean', description: 'Emitted when checked state changes' },
  ],
  examples: [
    {
      title: 'Basic Checkbox',
      description: 'Simple checkbox with label text',
      template: `<ui-checkbox label="Accept terms and conditions" />`,
    },
    {
      title: 'Checkbox States',
      description: 'Checked, unchecked, and indeterminate states',
      template: `<ui-checkbox label="Unchecked" [checked]="false" />
<ui-checkbox label="Checked" [checked]="true" />
<ui-checkbox label="Indeterminate" [indeterminate]="true" />`,
    },
    {
      title: 'Disabled Checkbox',
      description: 'Checkbox in disabled state',
      template: `<ui-checkbox label="Disabled unchecked" [disabled]="true" />
<ui-checkbox label="Disabled checked" [checked]="true" [disabled]="true" />`,
    },
    {
      title: 'Checkbox Group',
      description: 'Multiple checkboxes for multi-selection',
      template: `<ui-checkbox label="JavaScript" />
<ui-checkbox label="TypeScript" />
<ui-checkbox label="Angular" />`,
    },
  ],
  accessibility: {
    ariaSupport: [
      'role="checkbox" for semantic meaning',
      'aria-checked="true|false|mixed" for state',
      'aria-disabled="true" when disabled',
      'Label properly associated with input',
    ],
    keyboardNavigation: [
      { key: 'Space', description: 'Toggle checked state' },
      { key: 'Tab', description: 'Move focus to/from checkbox' },
    ],
    screenReaderNotes: 'Checkbox state (checked, unchecked, or mixed) and label are announced. Disabled state is also announced.',
  },
  bestPractices: [
    'Always provide a clear label',
    'Use for multiple selections (use radio for single selection)',
    'Use indeterminate state for "select all" checkboxes',
    'Group related checkboxes with fieldset and legend',
    'Disable when action is unavailable, not to prevent user interaction',
  ],
};

const RADIO_METADATA: ComponentMetadata = {
  id: 'radio',
  name: 'Radio',
  category: 'form',
  description: 'A radio button component for mutually exclusive selections within a group.',
  selector: 'ui-radio',
  inputs: [
    { name: 'checked', type: 'boolean', description: 'Whether the radio is checked', defaultValue: 'false' },
    { name: 'disabled', type: 'boolean', description: 'Whether the radio is disabled', defaultValue: 'false' },
    { name: 'label', type: 'string', description: 'Label text displayed next to radio' },
    { name: 'name', type: 'string', description: 'Radio group name (required for grouping)' },
    { name: 'value', type: 'any', description: 'Radio value for form submission' },
  ],
  outputs: [
    { name: 'checkedChange', type: 'boolean', description: 'Emitted when checked state changes' },
  ],
  examples: [
    {
      title: 'Basic Radio Group',
      description: 'Simple radio group for single selection',
      template: `<ui-radio name="plan" value="free" label="Free Plan" />
<ui-radio name="plan" value="pro" label="Pro Plan" />
<ui-radio name="plan" value="enterprise" label="Enterprise Plan" />`,
    },
    {
      title: 'Radio with Pre-selection',
      description: 'Radio group with default selection',
      template: `<ui-radio name="size" value="sm" label="Small" />
<ui-radio name="size" value="md" label="Medium" [checked]="true" />
<ui-radio name="size" value="lg" label="Large" />`,
    },
    {
      title: 'Disabled Radio Options',
      description: 'Radio group with disabled options',
      template: `<ui-radio name="shipping" value="standard" label="Standard (5-7 days)" />
<ui-radio name="shipping" value="express" label="Express (2-3 days)" />
<ui-radio name="shipping" value="overnight" label="Overnight" [disabled]="true" />`,
    },
    {
      title: 'Radio States',
      description: 'Different radio button states',
      template: `<ui-radio name="state1" value="unchecked" label="Unchecked" [checked]="false" />
<ui-radio name="state2" value="checked" label="Checked" [checked]="true" />
<ui-radio name="state3" value="disabled-unchecked" label="Disabled Unchecked" [disabled]="true" />
<ui-radio name="state4" value="disabled-checked" label="Disabled Checked" [checked]="true" [disabled]="true" />`,
    },
    {
      title: 'Payment Method Selection',
      description: 'Practical radio group example',
      template: `<ui-radio name="payment" value="card" label="Credit/Debit Card" [checked]="true" />
<ui-radio name="payment" value="paypal" label="PayPal" />
<ui-radio name="payment" value="bank" label="Bank Transfer" />`,
    },
  ],
  accessibility: {
    ariaSupport: [
      'role="radio" for semantic meaning',
      'aria-checked reflects selection state',
      'aria-disabled for disabled state',
      'Group uses role="radiogroup" (if using radio group component)',
    ],
    keyboardNavigation: [
      { key: 'Tab', description: 'Move focus to/from radio group' },
      { key: 'Arrow Keys (↑↓←→)', description: 'Navigate between radio buttons in group' },
      { key: 'Space', description: 'Select focused radio button' },
    ],
    screenReaderNotes: 'Radio button label, state (checked/unchecked), and position in group announced. Group label should be announced when entering the group.',
  },
  bestPractices: [
    'Always use the same "name" attribute for radio buttons in a group',
    'Provide a clear label for each radio option',
    'Use radio groups for 2-5 mutually exclusive options',
    'For more than 5 options, consider using a Select dropdown',
    'Always have one option selected by default when possible',
    'Use disabled state for temporarily unavailable options',
    'Wrap radio groups in a fieldset with a legend for better accessibility',
  ],
};

const SWITCH_METADATA: ComponentMetadata = {
  id: 'switch',
  name: 'Switch',
  category: 'form',
  description: 'A toggle switch component for binary on/off states.',
  selector: 'ui-switch',
  inputs: [
    { name: 'checked', type: 'boolean', description: 'Whether checked (on)', defaultValue: 'false' },
    { name: 'disabled', type: 'boolean', description: 'Whether disabled', defaultValue: 'false' },
    { name: 'label', type: 'string', description: 'Label text displayed next to switch' },
    { name: 'size', type: "'sm' | 'md' | 'lg'", description: 'Switch size', defaultValue: "'md'" },
  ],
  outputs: [
    { name: 'checkedChange', type: 'boolean', description: 'Emitted when checked state changes' },
  ],
  examples: [
    {
      title: 'Basic Switch',
      description: 'Toggle switch for binary on/off settings',
      template: `<ui-switch label="Enable notifications" />`,
    },
    {
      title: 'Switch States',
      description: 'On and off states',
      template: `<ui-switch label="Off" [checked]="false" />
<ui-switch label="On" [checked]="true" />`,
    },
    {
      title: 'Switch Sizes',
      description: 'Three size options',
      template: `<ui-switch label="Small" size="sm" />
<ui-switch label="Medium" size="md" />
<ui-switch label="Large" size="lg" />`,
    },
    {
      title: 'Disabled Switch',
      description: 'Switch in disabled state',
      template: `<ui-switch label="Disabled off" [disabled]="true" />
<ui-switch label="Disabled on" [checked]="true" [disabled]="true" />`,
    },
  ],
  accessibility: {
    ariaSupport: [
      'role="switch" for semantic meaning',
      'aria-checked="true|false" for state',
      'aria-disabled="true" when disabled',
      'Label properly associated with switch',
    ],
    keyboardNavigation: [
      { key: 'Space', description: 'Toggle switch on/off' },
      { key: 'Tab', description: 'Move focus to/from switch' },
    ],
    screenReaderNotes: 'Switch state (on/off) and label are announced. Disabled state is also announced.',
  },
  bestPractices: [
    'Use for settings that take effect immediately',
    'Use checkbox for selections that require form submission',
    'Always provide a clear label describing what the switch controls',
    'Consider adding visible "On/Off" text for clarity',
    'Use disabled state when action is temporarily unavailable',
  ],
};

const SELECT_METADATA: ComponentMetadata = {
  id: 'select',
  name: 'Select',
  category: 'form',
  description: 'A dropdown select component with search and keyboard navigation support.',
  selector: 'ui-select',
  inputs: [
    { name: 'label', type: 'string', description: 'Label text displayed above select' },
    { name: 'placeholder', type: 'string', description: 'Placeholder text when no selection' },
    { name: 'value', type: 'string', description: 'Currently selected value' },
    { name: 'disabled', type: 'boolean', description: 'Whether select is disabled', defaultValue: 'false' },
    { name: 'required', type: 'boolean', description: 'Whether selection is required', defaultValue: 'false' },
    { name: 'options', type: 'SelectOption[]', description: 'Array of selectable options { value, label }', required: true },
    { name: 'error', type: 'string', description: 'Error message to display' },
  ],
  outputs: [
    { name: 'valueChange', type: 'string', description: 'Emitted when selection changes' },
  ],
  examples: [
    {
      title: 'Basic Select',
      description: 'Simple dropdown with options',
      typescript: `protected countries = [
  { value: 'us', label: 'United States' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'ca', label: 'Canada' }
];`,
      template: `<ui-select 
  label="Country" 
  [options]="countries" 
  placeholder="Select country" 
/>`,
    },
    {
      title: 'Select with Pre-selection',
      description: 'Dropdown with default value',
      typescript: `protected countries = [
  { value: 'us', label: 'United States' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'ca', label: 'Canada' }
];`,
      template: `<ui-select 
  label="Country" 
  [options]="countries" 
  value="us" 
/>`,
    },
    {
      title: 'Required Select',
      description: 'Select with required field indicator',
      typescript: `protected priorities = [
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' }
];`,
      template: `<ui-select 
  label="Priority" 
  [options]="priorities" 
  [required]="true" 
  placeholder="Select priority" 
/>`,
    },
    {
      title: 'Select with Error',
      description: 'Error state with validation message',
      typescript: `protected countries = [
  { value: 'us', label: 'United States' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'ca', label: 'Canada' }
];`,
      template: `<ui-select 
  label="Country" 
  [options]="countries" 
  placeholder="Select country" 
  error="Country is required" 
/>`,
    },
    {
      title: 'Disabled Select',
      description: 'Non-interactive select state',
      typescript: `protected countries = [
  { value: 'us', label: 'United States' },
  { value: 'uk', label: 'United Kingdom' }
];`,
      template: `<ui-select 
  label="Country" 
  [options]="countries" 
  value="us" 
  [disabled]="true" 
/>`,
    },
  ],
  accessibility: {
    ariaSupport: [
      'role="combobox" for semantic meaning',
      'aria-expanded indicates dropdown state',
      'aria-activedescendant tracks highlighted option',
      'aria-required for required fields',
      'aria-invalid for error states',
    ],
    keyboardNavigation: [
      { key: 'Space/Enter', description: 'Open/close dropdown' },
      { key: 'Arrow Up/Down', description: 'Navigate options' },
      { key: 'Home/End', description: 'Jump to first/last option' },
      { key: 'Escape', description: 'Close dropdown' },
      { key: 'Tab', description: 'Close dropdown and move focus' },
    ],
    screenReaderNotes: 'Selected value, label, and available options announced. Dropdown state changes announced.',
  },
  bestPractices: [
    'Provide a clear label describing what to select',
    'Use placeholder text to indicate the expected selection',
    'Sort options alphabetically or by relevance',
    'For 2-5 options, consider using radio buttons instead',
    'For very long lists (50+), add search functionality',
    'Always show the currently selected value',
    'Provide clear error messages for validation failures',
  ],
};

const MULTI_SELECT_METADATA: ComponentMetadata = {
  id: 'multi-select',
  name: 'Multi-Select',
  category: 'form',
  description: 'A multi-selection dropdown with chips for selected values.',
  selector: 'ui-multi-select',
  inputs: [
    { name: 'label', type: 'string', description: 'Label text displayed above select' },
    { name: 'placeholder', type: 'string', description: 'Placeholder text when no selection' },
    { name: 'value', type: 'string[]', description: 'Array of selected values', defaultValue: '[]' },
    { name: 'disabled', type: 'boolean', description: 'Whether select is disabled', defaultValue: 'false' },
    { name: 'options', type: 'SelectOption[]', description: 'Array of selectable options', required: true },
  ],
  outputs: [
    { name: 'valueChange', type: 'string[]', description: 'Emitted when selection changes' },
  ],
  examples: [
    {
      title: 'Basic Multi-Select',
      description: 'Select multiple options',
      typescript: `protected skills = [
  { value: 'js', label: 'JavaScript' },
  { value: 'ts', label: 'TypeScript' },
  { value: 'angular', label: 'Angular' },
  { value: 'react', label: 'React' }
];`,
      template: `<ui-multi-select 
  label="Skills" 
  [options]="skills" 
  placeholder="Select your skills" 
/>`,
    },
    {
      title: 'Multi-Select with Pre-selection',
      description: 'Multiple options pre-selected',
      typescript: `protected skills = [
  { value: 'js', label: 'JavaScript' },
  { value: 'ts', label: 'TypeScript' },
  { value: 'angular', label: 'Angular' }
];`,
      template: `<ui-multi-select 
  label="Skills" 
  [options]="skills" 
  [value]="['js', 'ts']" 
/>`,
    },
    {
      title: 'Disabled Multi-Select',
      description: 'Non-interactive state with selections',
      typescript: `protected skills = [
  { value: 'js', label: 'JavaScript' },
  { value: 'ts', label: 'TypeScript' }
];`,
      template: `<ui-multi-select 
  label="Skills" 
  [options]="skills" 
  [value]="['js']" 
  [disabled]="true" 
/>`,
    },
  ],
  accessibility: {
    ariaSupport: [
      'role="combobox" for semantic meaning',
      'aria-multiselectable="true" indicates multi-selection',
      'aria-expanded indicates dropdown state',
      'Selected count announced',
    ],
    keyboardNavigation: [
      { key: 'Space/Enter', description: 'Toggle option selection' },
      { key: 'Arrow Keys', description: 'Navigate options' },
      { key: 'Escape', description: 'Close dropdown' },
    ],
    screenReaderNotes: 'Number of selected items announced. Each selection change announced.',
  },
  bestPractices: [
    'Show selected items as removable chips',
    'Display selection count in the input',
    'Allow deselection by clicking chips',
    'Consider max selection limit for better UX',
    'Use search/filter for large option lists',
    'Provide clear "Select All" / "Clear All" options when appropriate',
  ],
};

const SLIDER_METADATA: ComponentMetadata = {
  id: 'slider',
  name: 'Slider',
  category: 'form',
  description: 'A range slider component with single or dual handles for numeric value selection.',
  selector: 'ui-slider',
  inputs: [
    { name: 'value', type: 'number', description: 'Current slider value', defaultValue: '0' },
    { name: 'valueEnd', type: 'number', description: 'End value for range mode (dual handles)' },
    { name: 'min', type: 'number', description: 'Minimum allowed value', defaultValue: '0' },
    { name: 'max', type: 'number', description: 'Maximum allowed value', defaultValue: '100' },
    { name: 'step', type: 'number', description: 'Step increment for value changes', defaultValue: '1' },
    { name: 'disabled', type: 'boolean', description: 'Whether slider is disabled', defaultValue: 'false' },
    { name: 'label', type: 'string', description: 'Label text displayed above slider' },
  ],
  outputs: [
    { name: 'valueChange', type: 'number', description: 'Emitted when value changes' },
    { name: 'valueEndChange', type: 'number', description: 'Emitted when end value changes (range mode)' },
  ],
  examples: [
    {
      title: 'Basic Slider',
      description: 'Simple single-handle slider',
      template: `<ui-slider 
  label="Volume" 
  [min]="0" 
  [max]="100" 
  [value]="50" 
/>`,
    },
    {
      title: 'Slider with Steps',
      description: 'Slider with defined step increments',
      template: `<ui-slider 
  label="Rating" 
  [min]="0" 
  [max]="10" 
  [step]="2" 
  [value]="6" 
/>`,
    },
    {
      title: 'Range Slider',
      description: 'Dual-handle slider for range selection',
      template: `<ui-slider 
  label="Price Range" 
  [min]="0" 
  [max]="1000" 
  [value]="200" 
  [valueEnd]="800" 
/>`,
    },
    {
      title: 'Disabled Slider',
      description: 'Non-interactive slider state',
      template: `<ui-slider 
  label="Volume" 
  [min]="0" 
  [max]="100" 
  [value]="75" 
  [disabled]="true" 
/>`,
    },
  ],
  accessibility: {
    ariaSupport: [
      'role="slider" for semantic meaning',
      'aria-valuemin indicates minimum value',
      'aria-valuemax indicates maximum value',
      'aria-valuenow reflects current value',
      'aria-label describes the slider purpose',
    ],
    keyboardNavigation: [
      { key: 'Arrow Left/Down', description: 'Decrease value' },
      { key: 'Arrow Right/Up', description: 'Increase value' },
      { key: 'Home', description: 'Jump to minimum value' },
      { key: 'End', description: 'Jump to maximum value' },
      { key: 'Page Up/Down', description: 'Large increment/decrement' },
    ],
    screenReaderNotes: 'Current value, minimum, maximum, and label announced. Value changes announced as user adjusts.',
  },
  bestPractices: [
    'Provide a clear label describing what the slider controls',
    'Use appropriate min/max values for the context',
    'Set step value based on desired precision',
    'Show current value(s) visually alongside the slider',
    'Use range mode for price ranges, time windows, etc.',
    'Ensure the slider thumb is large enough to grab (min 44x44px)',
    'Provide alternative input methods for precise values',
  ],
};

const DATEPICKER_METADATA: ComponentMetadata = {
  id: 'date-picker',
  name: 'Date Picker',
  category: 'form',
  description: 'A comprehensive date picker component with calendar popup, keyboard input support, and date range validation. Supports min/max dates, custom placeholders, and helper text.',
  selector: 'ui-date-picker',
  inputs: [
    { name: 'label', type: 'string', description: 'Label text displayed above the date picker' },
    { name: 'placeholder', type: 'string', description: 'Placeholder text shown when no date is selected' },
    { name: 'value', type: 'string', description: 'Selected date in ISO format (YYYY-MM-DD)' },
    { name: 'min', type: 'string', description: 'Minimum selectable date in ISO format' },
    { name: 'max', type: 'string', description: 'Maximum selectable date in ISO format' },
    { name: 'disabled', type: 'boolean', description: 'Whether the date picker is disabled', defaultValue: 'false' },
    { name: 'helperText', type: 'string', description: 'Helper text displayed below the date picker' },
    { name: 'errorMessage', type: 'string', description: 'Error message to display' },
    { name: 'required', type: 'boolean', description: 'Whether the field is required', defaultValue: 'false' },
    { name: 'size', type: "'sm' | 'md' | 'lg'", description: 'Size of the date picker', defaultValue: "'md'" },
    { name: 'fullWidth', type: 'boolean', description: 'Whether to take full width', defaultValue: 'false' },
  ],
  outputs: [
    { name: 'valueChange', type: 'string', description: 'Emitted when date changes (ISO format)' },
  ],
  examples: [
    {
      title: 'Basic Date Picker',
      description: 'Simple date picker with label and placeholder',
      template: `<ui-date-picker 
  label="Birth Date" 
  placeholder="Select your birth date" 
/>`,
    },
    {
      title: 'Date Picker with Pre-selected Date',
      description: 'Date picker with a default selected date',
      template: `<ui-date-picker 
  label="Appointment Date" 
  placeholder="Select date" 
  value="2024-12-15"
/>`,
    },
    {
      title: 'Date Picker with Date Range',
      description: 'Restrict selectable dates using min and max',
      template: `<ui-date-picker 
  label="Start Date" 
  placeholder="Select start date"
  min="2024-01-01"
  max="2024-12-31"
  helperText="Must be within 2024"
/>`,
    },
    {
      title: 'Required Date Picker',
      description: 'Date picker with required validation',
      template: `<ui-date-picker 
  label="Event Date" 
  placeholder="Select date"
  [required]="true"
  helperText="This field is required"
/>`,
    },
    {
      title: 'Date Picker with Error',
      description: 'Date picker displaying an error message',
      template: `<ui-date-picker 
  label="Expiry Date" 
  placeholder="Select expiry date"
  errorMessage="Please select a valid expiry date"
/>`,
    },
    {
      title: 'Disabled Date Picker',
      description: 'Date picker in a disabled state',
      template: `<ui-date-picker 
  label="Locked Date" 
  placeholder="Not available"
  value="2024-01-15"
  [disabled]="true"
/>`,
    },
    {
      title: 'Booking Form',
      description: 'Real-world example of a booking form with check-in and check-out dates',
      template: `<div style="display: flex; flex-direction: column; gap: 16px;">
  <ui-date-picker 
    label="Check-in Date" 
    placeholder="Select check-in date"
    [required]="true"
    helperText="Select your arrival date"
  />
  <ui-date-picker 
    label="Check-out Date" 
    placeholder="Select check-out date"
    [required]="true"
    helperText="Select your departure date"
  />
</div>`,
    },
  ],
  accessibility: {
    ariaSupport: ['Calendar grid navigation with arrow keys', 'Date format announced to screen readers', 'Selected date clearly indicated', 'Required fields marked with aria-required'],
    keyboardNavigation: [
      { key: 'Arrow Keys', description: 'Navigate between dates in the calendar' },
      { key: 'Enter/Space', description: 'Select the focused date' },
      { key: 'Escape', description: 'Close the calendar popup' },
      { key: 'Tab', description: 'Move focus to next/previous focusable element' },
      { key: 'Home/End', description: 'Jump to first/last day of month' },
      { key: 'PageUp/PageDown', description: 'Navigate to previous/next month' },
    ],
    screenReaderNotes: 'Selected date and format announced. Calendar month and year announced. Available and disabled dates indicated. Date range restrictions communicated clearly.',
  },
  bestPractices: [
    'Always provide a clear label describing what date is being selected',
    'Include placeholder text showing the expected date format (e.g., "MM/DD/YYYY")',
    'Set appropriate min/max date ranges to prevent invalid selections',
    'Provide helper text to clarify date requirements or restrictions',
    'Support both keyboard input and calendar selection for accessibility',
    'Use ISO format (YYYY-MM-DD) for value binding to ensure consistency',
    'Display validation errors clearly when dates are invalid or out of range',
    'Mark required fields appropriately with asterisks and aria-required',
    'Consider locale-specific date formats for international applications',
    'Disable past dates for future-only selections (bookings, events, etc.)',
  ],
};

const FILEUPLOAD_METADATA: ComponentMetadata = {
  id: 'file-upload',
  name: 'File Upload',
  category: 'form',
  description: 'A comprehensive file upload component with drag-and-drop support, file type validation, size restrictions, and file preview. Supports both single and multiple file uploads with progress indication.',
  selector: 'ui-file-upload',
  inputs: [
    { name: 'label', type: 'string', description: 'Label text displayed above the upload area' },
    { name: 'accept', type: 'string', description: 'Accepted file types (e.g., ".pdf,.jpg,.png" or "image/*")' },
    { name: 'multiple', type: 'boolean', description: 'Allow multiple file uploads', defaultValue: 'false' },
    { name: 'disabled', type: 'boolean', description: 'Whether the upload is disabled', defaultValue: 'false' },
    { name: 'maxSize', type: 'number', description: 'Maximum file size in bytes (e.g., 5242880 for 5MB)', defaultValue: '5242880' },
    { name: 'maxFiles', type: 'number', description: 'Maximum number of files allowed', defaultValue: '10' },
    { name: 'showPreview', type: 'boolean', description: 'Show preview for images', defaultValue: 'true' },
    { name: 'helperText', type: 'string', description: 'Helper text displayed below the upload area' },
    { name: 'errorMessage', type: 'string', description: 'Error message to display' },
  ],
  outputs: [
    { name: 'filesSelected', type: 'File[]', description: 'Emitted when files are selected or dropped' },
    { name: 'fileRemoved', type: 'File', description: 'Emitted when a file is removed' },
  ],
  examples: [
    {
      title: 'Basic File Upload',
      description: 'Simple single file upload',
      template: `<ui-file-upload 
  label="Upload File" 
  helperText="Choose a file to upload"
/>`,
    },
    {
      title: 'Multiple File Upload',
      description: 'Upload multiple files at once',
      template: `<ui-file-upload 
  label="Upload Documents" 
  [multiple]="true"
  helperText="You can select multiple files"
/>`,
    },
    {
      title: 'File Type Restrictions',
      description: 'Restrict upload to specific file types',
      template: `<ui-file-upload 
  label="Upload PDF Documents" 
  accept=".pdf"
  helperText="Only PDF files are accepted"
/>`,
    },
    {
      title: 'Image Upload',
      description: 'Upload images with preview',
      template: `<ui-file-upload 
  label="Upload Images" 
  accept="image/*"
  [multiple]="true"
  helperText="Supports JPG, PNG, GIF, and WebP"
/>`,
    },
    {
      title: 'File Size Limit',
      description: 'Restrict maximum file size',
      template: `<ui-file-upload 
  label="Upload Profile Picture" 
  accept="image/*"
  [maxSize]="2097152"
  helperText="Maximum file size: 2MB"
/>`,
    },
    {
      title: 'File Upload with Error',
      description: 'File upload displaying an error message',
      template: `<ui-file-upload 
  label="Upload Resume" 
  accept=".pdf,.doc,.docx"
  errorMessage="File size exceeds the maximum limit of 10MB"
  helperText="Please upload your resume (PDF or Word)"
/>`,
    },
    {
      title: 'Disabled Upload',
      description: 'File upload in a disabled state',
      template: `<ui-file-upload 
  label="Upload Disabled" 
  [disabled]="true"
  helperText="File upload is currently disabled"
/>`,
    },
    {
      title: 'Document Upload Form',
      description: 'Real-world example of a document submission form',
      template: `<div style="display: flex; flex-direction: column; gap: 16px;">
  <ui-file-upload 
    label="Upload Identity Document" 
    accept=".pdf,.jpg,.png"
    helperText="Upload a PDF or image of your ID (max 5MB)"
    [maxSize]="5242880"
  />
  <ui-file-upload 
    label="Upload Supporting Documents" 
    accept=".pdf,.doc,.docx"
    [multiple]="true"
    helperText="Upload any supporting documents (optional)"
    [maxSize]="10485760"
  />
</div>`,
    },
  ],
  accessibility: {
    ariaSupport: ['Drag-and-drop with keyboard alternatives', 'File list announced to screen readers', 'Upload progress and status announced', 'Error messages associated with upload area'],
    keyboardNavigation: [
      { key: 'Enter/Space', description: 'Open file browser dialog' },
      { key: 'Tab', description: 'Navigate to file upload button' },
      { key: 'Delete/Backspace', description: 'Remove selected file from list' },
    ],
    screenReaderNotes: 'File names, types, sizes, and upload status are announced. Validation errors and file restrictions are communicated clearly.',
  },
  bestPractices: [
    'Always provide a clear label describing what files should be uploaded',
    'Specify accepted file types to guide users and prevent invalid uploads',
    'Set reasonable file size limits and communicate them clearly',
    'Provide helper text indicating file type and size restrictions',
    'Display upload progress for large files or slow connections',
    'Show clear validation errors when files are rejected using errorMessage',
    'Allow users to remove files before submitting the form',
    'Provide file previews for images when possible using showPreview',
    'Support both drag-and-drop and click-to-browse for flexibility',
    'Use maxFiles to limit the number of uploads in multiple mode',
    'Consider UX for multiple file uploads (show count, total size, etc.)',
    'Implement security checks on the server side as well',
    'Handle filesSelected and fileRemoved events appropriately',
  ],
};

// ============================================================================
// LAYOUT COMPONENTS
// ============================================================================

const CARD_METADATA: ComponentMetadata = {
  id: 'card',
  name: 'Card',
  category: 'layout',
  description: 'A versatile container component for grouping related content with optional header and footer.',
  selector: 'ui-card',
  inputs: [
    { name: 'variant', type: "'elevated' | 'outlined' | 'filled'", description: 'Visual style variant', defaultValue: "'elevated'" },
  ],
  outputs: [],
  examples: [
    {
      title: 'Basic Card',
      description: 'Container for grouping related content',
      template: `<ui-card>
  <h3>Card Title</h3>
  <p>Card content goes here...</p>
</ui-card>`,
    },
    {
      title: 'Card Variants',
      description: 'Three visual styles: elevated (shadow), outlined (border), filled (background)',
      template: `<ui-card variant="elevated">
  <h3>Elevated Card</h3>
  <p>Card with shadow elevation</p>
</ui-card>

<ui-card variant="outlined">
  <h3>Outlined Card</h3>
  <p>Card with border only</p>
</ui-card>

<ui-card variant="filled">
  <h3>Filled Card</h3>
  <p>Card with background fill</p>
</ui-card>`,
    },
  ],
  accessibility: {
    ariaSupport: ['Semantic HTML structure', 'Optional role="region" with aria-label for landmark cards'],
    keyboardNavigation: [],
    screenReaderNotes: 'Card structure and content are announced. Use aria-label when card represents a significant region.',
  },
  bestPractices: [
    'Use "elevated" for prominent content that should stand out',
    'Use "outlined" for subtle separation without heavy visual weight',
    'Use "filled" for colored or themed sections',
    'Group related content logically within cards',
  ],
};

const MODAL_METADATA: ComponentMetadata = {
  id: 'modal',
  name: 'Modal',
  category: 'layout',
  description: 'A dialog overlay component for focused user interactions with backdrop and animations.',
  selector: 'ui-modal',
  inputs: [
    { name: 'open', type: 'boolean', description: 'Whether modal is visible', defaultValue: 'false' },
    { name: 'title', type: 'string', description: 'Modal title text' },
    { name: 'size', type: "'sm' | 'md' | 'lg' | 'xl' | 'full'", description: 'Modal width size', defaultValue: "'md'" },
    { name: 'closeOnBackdrop', type: 'boolean', description: 'Close when clicking backdrop', defaultValue: 'true' },
    { name: 'closeOnEsc', type: 'boolean', description: 'Close on Escape key press', defaultValue: 'true' },
  ],
  outputs: [
    { name: 'openChange', type: 'boolean', description: 'Emitted when open state changes' },
    { name: 'closed', type: 'void', description: 'Emitted when modal is closed' },
  ],
  examples: [
    {
      title: 'Basic Modal',
      description: 'Simple dialog with title',
      typescript: `protected isOpen = signal(false);`,
      template: `<button (click)="isOpen.set(true)">Open Modal</button>
<ui-modal [open]="isOpen()" title="Confirm Action" (closed)="isOpen.set(false)">
  <p>Are you sure you want to proceed?</p>
</ui-modal>`,
    },
    {
      title: 'Modal Sizes',
      description: 'Different modal widths',
      typescript: `protected showSmall = signal(false);`,
      template: `<ui-modal [open]="showSmall()" title="Small Modal" size="sm">
  <p>Small modal content</p>
</ui-modal>`,
    },
    {
      title: 'Modal without Backdrop Close',
      description: 'Prevent closing by clicking outside',
      typescript: `protected isOpen = signal(false);`,
      template: `<ui-modal [open]="isOpen()" title="Important" [closeOnBackdrop]="false">
  <p>You must use the close button.</p>
</ui-modal>`,
    },
  ],
  accessibility: {
    ariaSupport: [
      'role="dialog" for semantic meaning',
      'aria-modal="true" indicates modal behavior',
      'Focus trap keeps keyboard navigation within modal',
      'aria-labelledby links to modal title',
      'aria-describedby links to modal content',
    ],
    keyboardNavigation: [
      { key: 'Escape', description: 'Close modal (if enabled)' },
      { key: 'Tab', description: 'Cycle through focusable elements forward' },
      { key: 'Shift+Tab', description: 'Cycle through focusable elements backward' },
    ],
    screenReaderNotes: 'Modal announced as dialog. Focus automatically moves into modal when opened and returns to trigger when closed.',
  },
  bestPractices: [
    'Use modals sparingly - they interrupt user flow',
    'Always provide a clear way to close the modal',
    'Keep modal content concise and focused',
    'Use appropriate size based on content amount',
    'Ensure first focusable element makes sense',
    'Return focus to trigger element on close',
    'Use for critical actions that require immediate attention',
  ],
};

const TABS_METADATA: ComponentMetadata = {
  id: 'tabs',
  name: 'Tabs',
  category: 'layout',
  description: 'A tabbed interface component for organizing content into separate panels.',
  selector: 'ui-tabs',
  inputs: [
    { name: 'activeIndex', type: 'number', description: 'Currently active tab index (0-based)', defaultValue: '0' },
    { name: 'orientation', type: "'horizontal' | 'vertical'", description: 'Tab list orientation', defaultValue: "'horizontal'" },
    { name: 'size', type: "'sm' | 'md' | 'lg'", description: 'Tab button size', defaultValue: "'md'" },
    { name: 'fullWidth', type: 'boolean', description: 'Tabs expand to fill container width', defaultValue: 'false' },
  ],
  outputs: [
    { name: 'activeIndexChange', type: 'number', description: 'Emitted when active tab changes' },
  ],
  examples: [
    {
      title: 'Basic Tabs',
      description: 'Simple tabbed interface',
      template: `<ui-tabs>
  <ui-tab label="Profile">
    <h3>Profile Information</h3>
    <p>User profile content goes here.</p>
  </ui-tab>
  <ui-tab label="Settings">
    <h3>Settings</h3>
    <p>User settings content goes here.</p>
  </ui-tab>
  <ui-tab label="Notifications">
    <h3>Notifications</h3>
    <p>Notification preferences go here.</p>
  </ui-tab>
</ui-tabs>`,
    },
    {
      title: 'Vertical Tabs',
      description: 'Side-by-side tab layout',
      template: `<ui-tabs orientation="vertical">
  <ui-tab label="General">General settings</ui-tab>
  <ui-tab label="Security">Security settings</ui-tab>
  <ui-tab label="Privacy">Privacy settings</ui-tab>
</ui-tabs>`,
    },
    {
      title: 'Tab Sizes',
      description: 'Three size options',
      template: `<ui-tabs size="sm">
  <ui-tab label="Small">Small tab content</ui-tab>
  <ui-tab label="Tab 2">Content 2</ui-tab>
</ui-tabs>`,
    },
  ],
  accessibility: {
    ariaSupport: [
      'role="tablist" on tab container',
      'role="tab" on tab buttons',
      'role="tabpanel" on content panels',
      'aria-selected indicates active tab',
      'aria-controls links tab to its panel',
      'tabindex management for keyboard navigation',
    ],
    keyboardNavigation: [
      { key: 'Arrow Left/Right', description: 'Navigate tabs (horizontal)' },
      { key: 'Arrow Up/Down', description: 'Navigate tabs (vertical)' },
      { key: 'Home', description: 'Jump to first tab' },
      { key: 'End', description: 'Jump to last tab' },
      { key: 'Tab', description: 'Move focus to tab panel content' },
    ],
    screenReaderNotes: 'Tab labels, current selection, and panel content announced. Total number of tabs announced when entering tablist.',
  },
  bestPractices: [
    'Use tabs for organizing related content that users switch between',
    'Keep tab labels short and descriptive (1-2 words)',
    'Limit to 5-7 tabs for horizontal orientation',
    'Use vertical orientation for more than 7 tabs',
    'Ensure tab panels have meaningful content',
    'Avoid nesting tabs within tabs',
    'Load tab content lazily if it contains heavy resources',
  ],
};

const ACCORDION_METADATA: ComponentMetadata = {
  id: 'accordion',
  name: 'Accordion',
  category: 'layout',
  description: 'A vertically stacked set of collapsible content panels for organizing information.',
  selector: 'ui-accordion',
  inputs: [
    { name: 'mode', type: "'single' | 'multiple'", description: 'Expansion mode (single allows one, multiple allows many)', defaultValue: "'single'" },
    { name: 'expanded', type: 'number[]', description: 'Array of expanded item indices', defaultValue: '[]' },
  ],
  outputs: [
    { name: 'expandedChange', type: 'number[]', description: 'Emitted when expansion state changes' },
  ],
  examples: [
    {
      title: 'Single Mode Accordion',
      description: 'Only one panel open at a time',
      template: `<ui-accordion mode="single">
  <ui-accordion-item title="Personal Information">
    <p>Name, email, and contact details.</p>
  </ui-accordion-item>
  <ui-accordion-item title="Security Settings">
    <p>Password and authentication options.</p>
  </ui-accordion-item>
  <ui-accordion-item title="Notifications">
    <p>Email and push notification preferences.</p>
  </ui-accordion-item>
</ui-accordion>`,
    },
    {
      title: 'Multiple Mode Accordion',
      description: 'Multiple panels can be open simultaneously',
      template: `<ui-accordion mode="multiple">
  <ui-accordion-item title="FAQ 1">Answer to question 1</ui-accordion-item>
  <ui-accordion-item title="FAQ 2">Answer to question 2</ui-accordion-item>
  <ui-accordion-item title="FAQ 3">Answer to question 3</ui-accordion-item>
</ui-accordion>`,
    },
    {
      title: 'Pre-expanded Accordion',
      description: 'Accordion with default expanded items',
      template: `<ui-accordion [expanded]="[0]">
  <ui-accordion-item title="Getting Started">Welcome guide content</ui-accordion-item>
  <ui-accordion-item title="Advanced Features">Advanced topics</ui-accordion-item>
</ui-accordion>`,
    },
  ],
  accessibility: {
    ariaSupport: [
      'role="region" on accordion panels',
      'aria-expanded indicates panel state',
      'aria-controls links header to panel',
      'aria-labelledby links panel to header',
    ],
    keyboardNavigation: [
      { key: 'Enter/Space', description: 'Toggle panel expansion' },
      { key: 'Arrow Down', description: 'Move to next header' },
      { key: 'Arrow Up', description: 'Move to previous header' },
      { key: 'Home', description: 'Move to first header' },
      { key: 'End', description: 'Move to last header' },
    ],
    screenReaderNotes: 'Panel states (expanded/collapsed) and content announced. Header buttons clearly labeled.',
  },
  bestPractices: [
    'Use for FAQs, settings sections, and content organization',
    'Keep panel titles concise and descriptive',
    'Use single mode for mutually exclusive content',
    'Use multiple mode for independent content sections',
    'Limit to 5-7 panels for best UX',
    'Ensure first panel has meaningful default content',
    'Avoid nesting accordions within accordions',
  ],
};

const DIVIDER_METADATA: ComponentMetadata = {
  id: 'divider',
  name: 'Divider',
  category: 'layout',
  description: 'A visual separator for content sections with customizable styles.',
  selector: 'ui-divider',
  inputs: [
    { name: 'orientation', type: "'horizontal' | 'vertical'", description: 'Divider direction', defaultValue: "'horizontal'" },
    { name: 'variant', type: "'solid' | 'dashed' | 'dotted'", description: 'Line style', defaultValue: "'solid'" },
  ],
  outputs: [],
  examples: [
    {
      title: 'Horizontal Divider',
      description: 'Default separator between sections',
      template: `<div>Section 1</div>
<ui-divider />
<div>Section 2</div>`,
    },
    {
      title: 'Divider Variants',
      description: 'Different line styles',
      template: `<ui-divider variant="solid" />
<ui-divider variant="dashed" />
<ui-divider variant="dotted" />`,
    },
    {
      title: 'Vertical Divider',
      description: 'Separator for inline elements',
      template: `<div style="display: flex; align-items: center; gap: 16px;">
  <span>Item 1</span>
  <ui-divider orientation="vertical" style="height: 24px;" />
  <span>Item 2</span>
  <ui-divider orientation="vertical" style="height: 24px;" />
  <span>Item 3</span>
</div>`,
    },
  ],
  accessibility: {
    ariaSupport: [
      'role="separator" for semantic meaning',
      'aria-orientation indicates direction',
      'Decorative role when purely visual',
    ],
    keyboardNavigation: [],
    screenReaderNotes: 'Announced as separator between sections. Can be hidden from screen readers if purely decorative.',
  },
  bestPractices: [
    'Use horizontal dividers to separate vertical content',
    'Use vertical dividers in toolbars or inline lists',
    'Use solid variant for primary separations',
    'Use dashed or dotted for subtle separations',
    'Ensure sufficient spacing around dividers',
    'Consider hiding decorative dividers from screen readers',
  ],
};

const DRAWER_METADATA: ComponentMetadata = {
  id: 'drawer',
  name: 'Drawer',
  category: 'layout',
  description: 'A slide-in panel component that appears from the edge of the screen for navigation or content.',
  selector: 'ui-drawer',
  inputs: [
    { name: 'open', type: 'boolean', description: 'Whether drawer is visible', defaultValue: 'false' },
    { name: 'position', type: "'left' | 'right' | 'top' | 'bottom'", description: 'Edge from which drawer slides', defaultValue: "'right'" },
    { name: 'size', type: "'sm' | 'md' | 'lg' | 'xl' | 'full'", description: 'Drawer width/height', defaultValue: "'md'" },
    { name: 'title', type: 'string', description: 'Drawer title text' },
    { name: 'showBackdrop', type: 'boolean', description: 'Show backdrop overlay', defaultValue: 'true' },
  ],
  outputs: [
    { name: 'openChange', type: 'boolean', description: 'Emitted when open state changes' },
  ],
  examples: [
    {
      title: 'Navigation Drawer',
      description: 'Side panel for navigation menu',
      typescript: `protected isOpen = signal(false);`,
      template: `<button (click)="isOpen.set(true)">Open Menu</button>
<ui-drawer [open]="isOpen()" title="Navigation" position="left" (openChange)="isOpen.set($event)">
  <nav>
    <a href="/dashboard">Dashboard</a>
    <a href="/settings">Settings</a>
    <a href="/profile">Profile</a>
  </nav>
</ui-drawer>`,
    },
    {
      title: 'Right Drawer',
      description: 'Settings or info panel from right',
      typescript: `protected showSettings = signal(false);`,
      template: `<ui-drawer [open]="showSettings()" title="Settings" position="right">
  <div>Settings content...</div>
</ui-drawer>`,
    },
    {
      title: 'Drawer Sizes',
      description: 'Different drawer widths',
      typescript: `protected isOpen = signal(false);`,
      template: `<ui-drawer [open]="isOpen()" title="Small Drawer" size="sm">Content</ui-drawer>`,
    },
  ],
  accessibility: {
    ariaSupport: [
      'role="dialog" for semantic meaning',
      'aria-modal="true" indicates modal behavior',
      'Focus trap within drawer',
      'aria-labelledby links to title',
    ],
    keyboardNavigation: [
      { key: 'Escape', description: 'Close drawer' },
      { key: 'Tab', description: 'Navigate within drawer' },
    ],
    screenReaderNotes: 'Drawer announced as dialog. Focus moves into drawer when opened, returns to trigger when closed.',
  },
  bestPractices: [
    'Use left drawer for navigation menus',
    'Use right drawer for settings, filters, or details',
    'Keep drawer content focused and organized',
    'Always provide close button or backdrop dismiss',
    'Use appropriate size based on content',
    'Return focus to trigger element on close',
    'Consider persistent vs temporary drawer patterns',
  ],
};

const STACK_METADATA: ComponentMetadata = {
  id: 'stack',
  name: 'Stack',
  category: 'layout',
  description: 'A layout component for arranging children in a vertical or horizontal stack with consistent spacing.',
  selector: 'ui-stack',
  inputs: [
    { name: 'direction', type: "'vertical' | 'horizontal'", description: 'Stack direction', defaultValue: "'vertical'" },
    { name: 'spacing', type: 'number', description: 'Spacing between items (in spacing units)', defaultValue: '4' },
    { name: 'align', type: "'start' | 'center' | 'end' | 'stretch'", description: 'Cross-axis alignment', defaultValue: "'stretch'" },
    { name: 'justify', type: "'start' | 'center' | 'end' | 'space-between' | 'space-around' | 'space-evenly'", description: 'Main-axis alignment', defaultValue: "'start'" },
  ],
  outputs: [],
  examples: [
    {
      title: 'Vertical Stack',
      description: 'Items stacked vertically',
      template: `<ui-stack direction="vertical" [spacing]="4">
  <ui-button>Button 1</ui-button>
  <ui-button>Button 2</ui-button>
  <ui-button>Button 3</ui-button>
</ui-stack>`,
    },
    {
      title: 'Horizontal Stack',
      description: 'Items arranged horizontally',
      template: `<ui-stack direction="horizontal" [spacing]="4">
  <ui-button>Cancel</ui-button>
  <ui-button variant="filled">Save</ui-button>
</ui-stack>`,
    },
    {
      title: 'Stack with Alignment',
      description: 'Center-aligned stack',
      template: `<ui-stack direction="vertical" [spacing]="4" align="center">
  <ui-avatar text="JD" />
  <h3>John Doe</h3>
  <p>Software Engineer</p>
</ui-stack>`,
    },
  ],
  accessibility: {
    ariaSupport: ['Semantic structure maintained', 'Natural DOM order preserved'],
    keyboardNavigation: [],
    screenReaderNotes: 'Content flow is natural and logical. Items announced in stacking order.',
  },
  bestPractices: [
    'Use for consistent spacing between related items',
    'Prefer vertical stack for form fields',
    'Use horizontal stack for action buttons',
    'Set appropriate spacing based on content density',
    'Use align property for cross-axis positioning',
    'Consider responsive breakpoints for direction changes',
  ],
};

const GRID_METADATA: ComponentMetadata = {
  id: 'grid',
  name: 'Grid',
  category: 'layout',
  description: 'A responsive grid layout component with customizable columns and gaps.',
  selector: 'ui-grid',
  inputs: [
    { name: 'columns', type: 'number', description: 'Number of columns', defaultValue: '12' },
    { name: 'gap', type: 'number', description: 'Gap between items (in spacing units)', defaultValue: '4' },
  ],
  outputs: [],
  examples: [
    {
      title: '3-Column Grid',
      description: 'Three equal-width columns',
      template: `<ui-grid [columns]="3" [gap]="4">
  <ui-card><h4>Card 1</h4></ui-card>
  <ui-card><h4>Card 2</h4></ui-card>
  <ui-card><h4>Card 3</h4></ui-card>
  <ui-card><h4>Card 4</h4></ui-card>
  <ui-card><h4>Card 5</h4></ui-card>
  <ui-card><h4>Card 6</h4></ui-card>
</ui-grid>`,
    },
    {
      title: '4-Column Grid',
      description: 'Four columns with smaller gap',
      template: `<ui-grid [columns]="4" [gap]="2">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
  <div>Item 4</div>
</ui-grid>`,
    },
  ],
  accessibility: {
    ariaSupport: ['Natural grid flow', 'Semantic structure maintained'],
    keyboardNavigation: [],
    screenReaderNotes: 'Grid items announced in source order. Grid structure communicated by screen readers.',
  },
  bestPractices: [
    'Use for displaying collections of similar items',
    'Set appropriate column count for content type',
    'Use consistent gap spacing throughout the app',
    'Consider responsive breakpoints for different screen sizes',
    'Ensure grid items have meaningful content',
    'Use for card layouts, image galleries, product grids',
  ],
};

// ============================================================================
// DATA DISPLAY COMPONENTS
// ============================================================================

const BADGE_METADATA: ComponentMetadata = {
  id: 'badge',
  name: 'Badge',
  category: 'data-display',
  description: 'A small label for displaying status, count, or category.',
  selector: 'ui-badge',
  inputs: [
    { name: 'variant', type: "'default' | 'primary' | 'success' | 'warning' | 'error'", description: 'Visual variant', defaultValue: "'default'" },
    { name: 'size', type: "'sm' | 'md' | 'lg'", description: 'Badge size', defaultValue: "'md'" },
  ],
  outputs: [],
  examples: [
    {
      title: 'Badge Variants',
      description: 'Five semantic color variants for different use cases',
      template: `<ui-badge variant="default">Default</ui-badge>
<ui-badge variant="primary">Primary</ui-badge>
<ui-badge variant="success">Success</ui-badge>
<ui-badge variant="warning">Warning</ui-badge>
<ui-badge variant="error">Error</ui-badge>`,
    },
    {
      title: 'Badge Sizes',
      description: 'Three size options for different contexts',
      template: `<ui-badge size="sm">Small</ui-badge>
<ui-badge size="md">Medium</ui-badge>
<ui-badge size="lg">Large</ui-badge>`,
    },
    {
      title: 'Status Indicators',
      description: 'Common usage for status display',
      template: `<ui-badge variant="success">Active</ui-badge>
<ui-badge variant="warning">Pending</ui-badge>
<ui-badge variant="error">Inactive</ui-badge>`,
    },
    {
      title: 'Count Badges',
      description: 'Display numerical counts',
      template: `<ui-badge variant="primary">5</ui-badge>
<ui-badge variant="error">99+</ui-badge>`,
    },
  ],
  accessibility: {
    ariaSupport: [
      'Text content announced by screen readers',
      'Uses semantic colors for visual distinction',
      'Can be enhanced with aria-label for additional context',
    ],
    keyboardNavigation: [],
    screenReaderNotes: 'Badge text read as part of parent element. Consider adding context like "status: active" for clarity.',
  },
  bestPractices: [
    'Use "success" for positive states (active, completed, approved)',
    'Use "warning" for cautionary states (pending, in review)',
    'Use "error" for negative states (failed, rejected, inactive)',
    'Use "primary" for highlighted information',
    'Keep badge text short (1-2 words or numbers)',
  ],
};

const AVATAR_METADATA: ComponentMetadata = {
  id: 'avatar',
  name: 'Avatar',
  category: 'data-display',
  description: 'A component for displaying user profile images or initials in a circular container.',
  selector: 'ui-avatar',
  inputs: [
    { name: 'src', type: 'string', description: 'Image URL' },
    { name: 'alt', type: 'string', description: 'Alt text for image accessibility' },
    { name: 'text', type: 'string', description: 'Text/initials to display when no image is provided' },
    { name: 'size', type: "'sm' | 'md' | 'lg' | 'xl'", description: 'Avatar size', defaultValue: "'md'" },
  ],
  outputs: [],
  examples: [
    {
      title: 'Avatar with Initials',
      description: 'Text-based avatar using user initials',
      template: `<ui-avatar text="JD" alt="John Doe" />`,
    },
    {
      title: 'Avatar Sizes',
      description: 'Four size options for different contexts',
      template: `<ui-avatar text="SM" size="sm" />
<ui-avatar text="MD" size="md" />
<ui-avatar text="LG" size="lg" />
<ui-avatar text="XL" size="xl" />`,
    },
    {
      title: 'Avatar with Image',
      description: 'Profile photo with fallback to initials',
      template: `<ui-avatar src="/avatar.jpg" alt="John Doe" text="JD" />`,
    },
    {
      title: 'User Profile Group',
      description: 'Multiple avatars for team or group display',
      template: `<ui-avatar text="JD" size="md" />
<ui-avatar text="AS" size="md" />
<ui-avatar text="MK" size="md" />
<ui-avatar text="+3" size="md" />`,
    },
  ],
  accessibility: {
    ariaSupport: [
      'img alt text for image avatars',
      'role="img" for text-based avatars',
      'aria-label with full name when showing initials',
    ],
    keyboardNavigation: [],
    screenReaderNotes: 'Alt text or full name announced. Initials are not announced as individual letters.',
  },
  bestPractices: [
    'Always provide alt text or aria-label with the full name',
    'Use consistent size across similar UI contexts',
    'Provide text fallback when image may fail to load',
    'Use 1-2 letters for initials (first and last name)',
    'Ensure sufficient color contrast for text avatars',
    'Use xl size for profile pages, md for lists, sm for inline mentions',
  ],
};

const TOOLTIP_METADATA: ComponentMetadata = {
  id: 'tooltip',
  name: 'Tooltip',
  category: 'data-display',
  description: 'A popup that displays contextual information when hovering or focusing an element.',
  selector: 'ui-tooltip',
  inputs: [
    { name: 'text', type: 'string', description: 'Tooltip text content', required: true },
    { name: 'position', type: "'top' | 'bottom' | 'left' | 'right'", description: 'Tooltip position relative to target', defaultValue: "'top'" },
  ],
  outputs: [],
  examples: [
    {
      title: 'Basic Tooltip',
      description: 'Simple hover/focus tooltip',
      template: `<button ui-tooltip text="Click to save">Save</button>`,
    },
    {
      title: 'Tooltip Positions',
      description: 'Four position options',
      template: `<button ui-tooltip text="Top tooltip" position="top">Top</button>
<button ui-tooltip text="Bottom tooltip" position="bottom">Bottom</button>
<button ui-tooltip text="Left tooltip" position="left">Left</button>
<button ui-tooltip text="Right tooltip" position="right">Right</button>`,
    },
    {
      title: 'Icon with Tooltip',
      description: 'Tooltip on icon button',
      template: `<button ui-tooltip text="More information">ℹ️</button>`,
    },
    {
      title: 'Link with Tooltip',
      description: 'Tooltip on interactive element',
      template: `<a href="#" ui-tooltip text="Opens in new tab">Documentation</a>`,
    },
  ],
  accessibility: {
    ariaSupport: [
      'role="tooltip" for semantic meaning',
      'aria-describedby links tooltip to trigger element',
      'Tooltip ID referenced by trigger aria-describedby',
    ],
    keyboardNavigation: [
      { key: 'Hover', description: 'Show tooltip (mouse users)' },
      { key: 'Focus', description: 'Show tooltip (keyboard users)' },
      { key: 'Escape', description: 'Hide tooltip' },
    ],
    screenReaderNotes: 'Tooltip text announced when element receives focus. Announced as description of the trigger element.',
  },
  bestPractices: [
    'Keep tooltip text concise (1-2 short sentences)',
    'Use tooltips for supplementary information, not critical content',
    'Ensure tooltip appears on both hover and keyboard focus',
    'Position tooltips to avoid covering important content',
    'Use consistent positioning throughout the application',
    'Don\'t put interactive elements inside tooltips',
    'Ensure sufficient contrast for tooltip text',
  ],
};

const CHIP_METADATA: ComponentMetadata = {
  id: 'chip',
  name: 'Chip',
  category: 'data-display',
  description: 'A compact element for tags, filters, or selections with optional remove action.',
  selector: 'ui-chip',
  inputs: [
    { name: 'label', type: 'string', description: 'Chip label text', required: true },
    { name: 'variant', type: "'default' | 'primary' | 'success' | 'warning' | 'error'", description: 'Visual variant for semantic meaning', defaultValue: "'default'" },
    { name: 'size', type: "'sm' | 'md' | 'lg'", description: 'Chip size', defaultValue: "'md'" },
    { name: 'removable', type: 'boolean', description: 'Show remove button', defaultValue: 'false' },
    { name: 'disabled', type: 'boolean', description: 'Whether the chip is disabled', defaultValue: 'false' },
  ],
  outputs: [
    { name: 'removed', type: 'void', description: 'Emitted when remove button is clicked' },
  ],
  examples: [
    {
      title: 'Basic Chip',
      description: 'Simple chip for tags or labels',
      template: `<ui-chip label="JavaScript" />`,
    },
    {
      title: 'Chip Variants',
      description: 'Semantic colors for different meanings',
      template: `<ui-chip label="Default" variant="default" />
<ui-chip label="Primary" variant="primary" />
<ui-chip label="Success" variant="success" />
<ui-chip label="Warning" variant="warning" />
<ui-chip label="Error" variant="error" />`,
    },
    {
      title: 'Chip Sizes',
      description: 'Three size options',
      template: `<ui-chip label="Small" size="sm" />
<ui-chip label="Medium" size="md" />
<ui-chip label="Large" size="lg" />`,
    },
    {
      title: 'Removable Chips',
      description: 'Chips with remove action for filters or tags',
      template: `<ui-chip label="JavaScript" [removable]="true" />
<ui-chip label="TypeScript" [removable]="true" />
<ui-chip label="Angular" [removable]="true" />`,
    },
    {
      title: 'Disabled Chips',
      description: 'Non-interactive chip states',
      template: `<ui-chip label="Disabled" [disabled]="true" />
<ui-chip label="Disabled Removable" [removable]="true" [disabled]="true" />`,
    },
    {
      title: 'Chip Collection',
      description: 'Multiple chips for tags or filters',
      template: `<ui-chip label="React" variant="primary" [removable]="true" />
<ui-chip label="Vue" variant="primary" [removable]="true" />
<ui-chip label="Angular" variant="primary" [removable]="true" />
<ui-chip label="Svelte" variant="primary" [removable]="true" />`,
    },
  ],
  accessibility: {
    ariaSupport: [
      'Button semantics for removable chips',
      'aria-label for remove button ("Remove [label]")',
      'aria-disabled for disabled state',
    ],
    keyboardNavigation: [
      { key: 'Tab', description: 'Navigate to chip (if removable)' },
      { key: 'Enter/Space', description: 'Activate remove button' },
      { key: 'Backspace/Delete', description: 'Remove chip (when focused)' },
    ],
    screenReaderNotes: 'Chip label announced. When removable, announced as button with remove action.',
  },
  bestPractices: [
    'Use chips for displaying selected filters, tags, or options',
    'Keep chip labels concise (1-3 words)',
    'Use consistent variant colors for similar meanings across the app',
    'Make chips removable when users can dismiss them',
    'Group related chips visually with proper spacing',
    'Use disabled state for non-removable selections',
  ],
};

const POPOVER_METADATA: ComponentMetadata = {
  id: 'popover',
  name: 'Popover',
  category: 'data-display',
  description: 'A floating panel that displays rich content relative to a trigger element, similar to tooltip but interactive.',
  selector: 'ui-popover',
  inputs: [
    { name: 'open', type: 'boolean', description: 'Whether popover is visible', defaultValue: 'false' },
    { name: 'position', type: "'top' | 'bottom' | 'left' | 'right'", description: 'Popover position relative to trigger', defaultValue: "'bottom'" },
    { name: 'trigger', type: "'click' | 'hover'", description: 'Interaction that opens popover', defaultValue: "'click'" },
  ],
  outputs: [
    { name: 'openChange', type: 'boolean', description: 'Emitted when open state changes' },
  ],
  examples: [
    {
      title: 'Click Popover',
      description: 'Popover triggered by click',
      template: `<button [ui-popover]="content" trigger="click">User Info</button>
<ng-template #content>
  <div>
    <h4>John Doe</h4>
    <p>Software Engineer</p>
  </div>
</ng-template>`,
    },
    {
      title: 'Hover Popover',
      description: 'Popover triggered by hover',
      template: `<button [ui-popover]="content" trigger="hover">Hover Me</button>
<ng-template #content>
  <div>Additional information appears on hover</div>
</ng-template>`,
    },
    {
      title: 'Popover Positions',
      description: 'Different positioning options',
      template: `<button [ui-popover]="content" position="top">Top</button>
<button [ui-popover]="content" position="bottom">Bottom</button>
<button [ui-popover]="content" position="left">Left</button>
<button [ui-popover]="content" position="right">Right</button>`,
    },
  ],
  accessibility: {
    ariaSupport: [
      'role="dialog" for interactive content',
      'aria-haspopup indicates trigger has popup',
      'Focus management for keyboard users',
      'aria-expanded on trigger',
    ],
    keyboardNavigation: [
      { key: 'Enter/Space', description: 'Open popover (click trigger)' },
      { key: 'Escape', description: 'Close popover' },
      { key: 'Tab', description: 'Navigate within popover content' },
    ],
    screenReaderNotes: 'Popover content announced when opened. Focus moved to popover for click trigger.',
  },
  bestPractices: [
    'Use for rich, interactive content (forms, actions)',
    'Use tooltip for simple, non-interactive text',
    'Keep content concise and focused',
    'Use click trigger for interactive content',
    'Use hover trigger for supplementary information',
    'Position to avoid covering important content',
    'Ensure popover is dismissible',
  ],
};

const PAGINATION_METADATA: ComponentMetadata = {
  id: 'pagination',
  name: 'Pagination',
  category: 'data-display',
  description: 'A component for navigating through paginated data with page numbers and controls.',
  selector: 'ui-pagination',
  inputs: [
    { name: 'currentPage', type: 'number', description: 'Current active page number (1-based)', defaultValue: '1' },
    { name: 'totalItems', type: 'number', description: 'Total number of items across all pages', required: true },
    { name: 'pageSize', type: 'number', description: 'Number of items per page', defaultValue: '10' },
  ],
  outputs: [
    { name: 'pageChange', type: 'number', description: 'Emitted when user navigates to a different page' },
  ],
  examples: [
    {
      title: 'Basic Pagination',
      description: 'Simple page navigation',
      typescript: `protected currentPage = signal(1);`,
      template: `<ui-pagination 
  [currentPage]="currentPage()" 
  [totalItems]="100" 
  [pageSize]="10" 
  (pageChange)="currentPage.set($event)"
/>`,
    },
    {
      title: 'Large Dataset Pagination',
      description: 'Pagination for many pages',
      typescript: `protected currentPage = signal(1);`,
      template: `<ui-pagination 
  [currentPage]="currentPage()" 
  [totalItems]="1000" 
  [pageSize]="20" 
  (pageChange)="currentPage.set($event)"
/>`,
    },
    {
      title: 'Small Page Size',
      description: 'More pages with fewer items per page',
      typescript: `protected currentPage = signal(1);`,
      template: `<ui-pagination 
  [currentPage]="currentPage()" 
  [totalItems]="50" 
  [pageSize]="5" 
  (pageChange)="currentPage.set($event)"
/>`,
    },
  ],
  accessibility: {
    ariaSupport: [
      'role="navigation" on pagination container',
      'aria-label="Pagination" describes navigation purpose',
      'aria-current="page" marks current page',
      'Button semantics for page links',
    ],
    keyboardNavigation: [
      { key: 'Tab', description: 'Navigate between page buttons' },
      { key: 'Enter/Space', description: 'Activate page button' },
      { key: 'Arrow Left/Right', description: 'Previous/Next page (optional)' },
    ],
    screenReaderNotes: 'Current page, total pages, and page context announced. Page changes announced.',
  },
  bestPractices: [
    'Show reasonable number of page buttons (5-7 max)',
    'Always include Previous/Next buttons',
    'Display current page clearly',
    'Show total number of pages or items',
    'Consider "Go to page" input for large datasets',
    'Keep pagination controls visible and accessible',
    'Maintain scroll position or return to top on page change',
  ],
};

const TABLE_METADATA: ComponentMetadata = {
  id: 'table',
  name: 'Table',
  category: 'data-display',
  description: 'A data table component with sorting, selection, and customizable columns for displaying structured data.',
  selector: 'ui-table',
  inputs: [
    { name: 'columns', type: 'TableColumn[]', description: 'Array of column definitions with keys and headers', required: true },
    { name: 'data', type: 'any[]', description: 'Array of data objects to display', required: true },
    { name: 'sortable', type: 'boolean', description: 'Enable column sorting', defaultValue: 'false' },
    { name: 'selectable', type: 'boolean', description: 'Enable row selection', defaultValue: 'false' },
  ],
  outputs: [
    { name: 'rowClick', type: 'any', description: 'Emitted when a row is clicked' },
    { name: 'selectionChange', type: 'any[]', description: 'Emitted when selection changes' },
  ],
  examples: [
    {
      title: 'Basic Table',
      description: 'Simple data table',
      typescript: `protected columns = [
  { key: 'name', header: 'Name' },
  { key: 'email', header: 'Email' },
  { key: 'role', header: 'Role' }
];

protected users = [
  { name: 'John Doe', email: 'john@example.com', role: 'Admin' },
  { name: 'Jane Smith', email: 'jane@example.com', role: 'User' }
];`,
      template: `<ui-table [columns]="columns" [data]="users" />`,
    },
    {
      title: 'Sortable Table',
      description: 'Table with column sorting',
      typescript: `protected columns = [
  { key: 'name', header: 'Name', sortable: true },
  { key: 'email', header: 'Email', sortable: true },
  { key: 'status', header: 'Status', sortable: true }
];`,
      template: `<ui-table [columns]="columns" [data]="users" [sortable]="true" />`,
    },
    {
      title: 'Selectable Table',
      description: 'Table with row selection',
      typescript: `handleSelection(selected: any[]) {
  console.log('Selected rows:', selected);
}`,
      template: `<ui-table [columns]="columns" [data]="users" [selectable]="true" (selectionChange)="handleSelection($event)" />`,
    },
  ],
  accessibility: {
    ariaSupport: [
      'Semantic table structure (table, thead, tbody, tr, td)',
      'Column headers with scope attribute',
      'Sort state with aria-sort',
      'Row selection with aria-selected',
    ],
    keyboardNavigation: [
      { key: 'Arrow Keys', description: 'Navigate between cells' },
      { key: 'Enter/Space', description: 'Activate row or toggle selection' },
      { key: 'Home/End', description: 'First/last cell in row' },
    ],
    screenReaderNotes: 'Table structure announced. Column headers, row count, and data read in order. Sort and selection states announced.',
  },
  bestPractices: [
    'Use for displaying structured, tabular data',
    'Keep column count reasonable (5-8 max visible)',
    'Provide clear, concise column headers',
    'Use sorting for large datasets',
    'Combine with pagination for many rows',
    'Highlight selected or hovered rows',
    'Consider responsive design for mobile',
  ],
};

const LIST_METADATA: ComponentMetadata = {
  id: 'list',
  name: 'List',
  category: 'data-display',
  description: 'A component for displaying lists of items with optional interactivity and styling.',
  selector: 'ui-list',
  inputs: [
    { name: 'items', type: 'ListItem[]', description: 'Array of list items to display', required: true },
    { name: 'variant', type: "'default' | 'divided' | 'bordered'", description: 'Visual styling variant', defaultValue: "'default'" },
    { name: 'interactive', type: 'boolean', description: 'Items are clickable/interactive', defaultValue: 'false' },
  ],
  outputs: [
    { name: 'itemClick', type: 'ListItem', description: 'Emitted when an item is clicked' },
  ],
  examples: [
    {
      title: 'Simple List',
      description: 'Basic list without dividers',
      typescript: `protected items = signal([
  { id: 1, label: 'Item 1' },
  { id: 2, label: 'Item 2' },
  { id: 3, label: 'Item 3' }
]);`,
      template: `<ui-list [items]="items()" />`,
    },
    {
      title: 'Divided List',
      description: 'List with dividers between items',
      typescript: `protected items = signal([
  { id: 1, label: 'Personal Info' },
  { id: 2, label: 'Security' },
  { id: 3, label: 'Notifications' }
]);`,
      template: `<ui-list [items]="items()" variant="divided" />`,
    },
    {
      title: 'Interactive List',
      description: 'Clickable list items',
      typescript: `protected items = signal([
  { id: 1, label: 'Dashboard' },
  { id: 2, label: 'Settings' },
  { id: 3, label: 'Profile' }
]);

handleClick(item: ListItem) {
  console.log('Clicked:', item);
}`,
      template: `<ui-list [items]="items()" [interactive]="true" (itemClick)="handleClick($event)" />`,
    },
  ],
  accessibility: {
    ariaSupport: [
      'role="list" on container',
      'role="listitem" on each item',
      'Interactive items use button semantics',
      'aria-label for context',
    ],
    keyboardNavigation: [
      { key: 'Arrow Up/Down', description: 'Navigate between items' },
      { key: 'Enter/Space', description: 'Activate interactive item' },
      { key: 'Home/End', description: 'Jump to first/last item' },
    ],
    screenReaderNotes: 'List structure and total item count announced. Interactive items announced as buttons.',
  },
  bestPractices: [
    'Use for displaying collections of similar items',
    'Use divided variant for better visual separation',
    'Make items interactive only when they have actions',
    'Keep item content concise and scannable',
    'Use consistent item structure throughout the list',
    'Provide meaningful labels for screen readers',
  ],
};

// ============================================================================
// FEEDBACK COMPONENTS
// ============================================================================

const ALERT_METADATA: ComponentMetadata = {
  id: 'alert',
  name: 'Alert',
  category: 'feedback',
  description: 'A component for displaying important messages with different severity levels.',
  selector: 'ui-alert',
  inputs: [
    { name: 'variant', type: "'info' | 'success' | 'warning' | 'error'", description: 'Alert variant', defaultValue: "'info'" },
    { name: 'dismissible', type: 'boolean', description: 'Show dismiss button', defaultValue: 'false' },
    { name: 'size', type: "'sm' | 'md' | 'lg'", description: 'Alert size', defaultValue: "'md'" },
  ],
  outputs: [
    { name: 'dismissed', type: 'void', description: 'Emitted when alert is dismissed' },
  ],
  examples: [
    {
      title: 'Alert Variants',
      description: 'Four severity levels: info, success, warning, and error',
      template: `<ui-alert variant="info">
  This is an informational message.
</ui-alert>

<ui-alert variant="success">
  Operation completed successfully!
</ui-alert>

<ui-alert variant="warning">
  Please review your input carefully.
</ui-alert>

<ui-alert variant="error">
  An error occurred. Please try again.
</ui-alert>`,
    },
    {
      title: 'Dismissible Alert',
      description: 'Alert with close button',
      template: `<ui-alert variant="info" [dismissible]="true">
  You can close this alert by clicking the X button.
</ui-alert>`,
    },
    {
      title: 'Alert Sizes',
      description: 'Three size options for different contexts',
      template: `<ui-alert variant="info" size="sm">Small alert message</ui-alert>
<ui-alert variant="info" size="md">Medium alert message</ui-alert>
<ui-alert variant="info" size="lg">Large alert message</ui-alert>`,
    },
  ],
  accessibility: {
    ariaSupport: [
      'role="alert" for important messages',
      'aria-live="polite" for non-critical alerts',
      'aria-live="assertive" for critical alerts',
      'Dismiss button has aria-label',
    ],
    keyboardNavigation: [
      { key: 'Escape', description: 'Dismiss alert (if dismissible)' },
      { key: 'Tab', description: 'Focus dismiss button' },
    ],
    screenReaderNotes: 'Alert content immediately announced. Variant determines urgency of announcement.',
  },
  bestPractices: [
    'Use "info" for general information and tips',
    'Use "success" for successful operations and confirmations',
    'Use "warning" for cautions and potential issues',
    'Use "error" for critical errors and failures',
    'Keep alert messages concise and actionable',
    'Use dismissible alerts for non-critical messages',
  ],
};

const SPINNER_METADATA: ComponentMetadata = {
  id: 'spinner',
  name: 'Spinner',
  category: 'feedback',
  description: 'A loading spinner component to indicate processing or loading states.',
  selector: 'ui-spinner',
  inputs: [
    { name: 'size', type: "'sm' | 'md' | 'lg'", description: 'Spinner size', defaultValue: "'md'" },
    { name: 'color', type: 'string', description: 'Custom spinner color (CSS color value)' },
  ],
  outputs: [],
  examples: [
    {
      title: 'Basic Spinner',
      description: 'Default medium-sized loading spinner',
      template: `<ui-spinner />`,
    },
    {
      title: 'Spinner Sizes',
      description: 'Three size options for different contexts',
      template: `<ui-spinner size="sm" />
<ui-spinner size="md" />
<ui-spinner size="lg" />`,
    },
    {
      title: 'Inline Loading',
      description: 'Small spinner for inline loading states',
      template: `<p>Loading data <ui-spinner size="sm" /></p>`,
    },
  ],
  accessibility: {
    ariaSupport: [
      'role="status" for loading announcement',
      'aria-label="Loading" provides context',
      'aria-live="polite" for non-intrusive updates',
    ],
    keyboardNavigation: [],
    screenReaderNotes: 'Loading state announced without interrupting user. Spinner is not focusable.',
  },
  bestPractices: [
    'Use for asynchronous operations that take more than 1 second',
    'Place near the content being loaded',
    'Use small size for inline loading indicators',
    'Use medium/large sizes for full-page or section loading',
    'Always pair with alternative text or loading message for accessibility',
  ],
};

const PROGRESS_METADATA: ComponentMetadata = {
  id: 'progress',
  name: 'Progress',
  category: 'feedback',
  description: 'A progress bar component for showing task completion with visual feedback.',
  selector: 'ui-progress',
  inputs: [
    { name: 'value', type: 'number', description: 'Progress value (0-100)', defaultValue: '0' },
    { name: 'variant', type: "'default' | 'success' | 'warning' | 'error'", description: 'Visual variant for semantic meaning', defaultValue: "'default'" },
    { name: 'showValue', type: 'boolean', description: 'Show percentage text', defaultValue: 'false' },
  ],
  outputs: [],
  examples: [
    {
      title: 'Basic Progress',
      description: 'Simple progress bar showing completion',
      template: `<ui-progress [value]="60" />`,
    },
    {
      title: 'Progress with Value',
      description: 'Display percentage text alongside bar',
      template: `<ui-progress [value]="75" [showValue]="true" />`,
    },
    {
      title: 'Progress Variants',
      description: 'Semantic colors for different states',
      template: `<ui-progress [value]="30" variant="default" />
<ui-progress [value]="100" variant="success" />
<ui-progress [value]="70" variant="warning" />
<ui-progress [value]="50" variant="error" />`,
    },
    {
      title: 'Progress Stages',
      description: 'Different completion levels',
      template: `<ui-progress [value]="0" [showValue]="true" />
<ui-progress [value]="25" [showValue]="true" />
<ui-progress [value]="50" [showValue]="true" />
<ui-progress [value]="75" [showValue]="true" />
<ui-progress [value]="100" [showValue]="true" />`,
    },
  ],
  accessibility: {
    ariaSupport: [
      'role="progressbar" for semantic meaning',
      'aria-valuenow for current value',
      'aria-valuemin="0" and aria-valuemax="100"',
      'aria-label describes the operation',
    ],
    keyboardNavigation: [],
    screenReaderNotes: 'Progress percentage and label announced. Updates are announced as progress changes.',
  },
  bestPractices: [
    'Use "success" variant when operation completes successfully',
    'Use "warning" variant for operations that need attention',
    'Use "error" variant when operation fails',
    'Show percentage text for long-running operations',
    'Update progress smoothly to avoid jarring jumps',
  ],
};

const SKELETON_METADATA: ComponentMetadata = {
  id: 'skeleton',
  name: 'Skeleton',
  category: 'feedback',
  description: 'A placeholder component for loading content with animated shimmer effect.',
  selector: 'ui-skeleton',
  inputs: [
    { name: 'variant', type: "'text' | 'circular' | 'rectangular'", description: 'Skeleton shape', defaultValue: "'text'" },
    { name: 'width', type: 'string', description: 'Skeleton width (CSS value)', },
    { name: 'height', type: 'string', description: 'Skeleton height (CSS value)' },
  ],
  outputs: [],
  examples: [
    {
      title: 'Text Skeleton',
      description: 'Placeholder for loading text lines',
      template: `<ui-skeleton variant="text" width="100%" />
<ui-skeleton variant="text" width="80%" />
<ui-skeleton variant="text" width="90%" />`,
    },
    {
      title: 'Circular Skeleton',
      description: 'Placeholder for avatar or profile image',
      template: `<ui-skeleton variant="circular" width="40px" height="40px" />`,
    },
    {
      title: 'Rectangular Skeleton',
      description: 'Placeholder for images or cards',
      template: `<ui-skeleton variant="rectangular" width="300px" height="200px" />`,
    },
    {
      title: 'Skeleton Variants',
      description: 'All available skeleton shapes',
      template: `<ui-skeleton variant="text" width="200px" />
<ui-skeleton variant="circular" width="50px" height="50px" />
<ui-skeleton variant="rectangular" width="200px" height="100px" />`,
    },
    {
      title: 'Card Loading Pattern',
      description: 'Complete card skeleton with avatar, title, and content',
      template: `<ui-skeleton variant="circular" width="40px" height="40px" />
<ui-skeleton variant="text" width="150px" />
<ui-skeleton variant="rectangular" width="100%" height="150px" />
<ui-skeleton variant="text" width="100%" />
<ui-skeleton variant="text" width="80%" />`,
    },
  ],
  accessibility: {
    ariaSupport: [
      'aria-busy="true" indicates loading state',
      'aria-label="Loading content" describes purpose',
      'role="status" for screen reader announcements',
    ],
    keyboardNavigation: [],
    screenReaderNotes: 'Loading state announced when skeleton appears. Content announced when loading completes.',
  },
  bestPractices: [
    'Use skeleton shapes that match the content being loaded',
    'Match skeleton dimensions to actual content size',
    'Use text variant for paragraphs and headings',
    'Use circular variant for avatars and profile images',
    'Use rectangular variant for images, cards, and media',
    'Combine multiple skeletons to represent complex layouts',
    'Replace with actual content when loading completes',
  ],
};

const TOAST_METADATA: ComponentMetadata = {
  id: 'toast',
  name: 'Toast',
  category: 'feedback',
  description: 'A temporary notification component that appears at screen edges for non-intrusive feedback.',
  selector: 'ui-toast',
  inputs: [
    { name: 'message', type: 'string', description: 'Notification message text', required: true },
    { name: 'variant', type: "'info' | 'success' | 'warning' | 'error'", description: 'Visual variant for semantic meaning', defaultValue: "'info'" },
    { name: 'duration', type: 'number', description: 'Auto-dismiss duration in milliseconds', defaultValue: '3000' },
  ],
  outputs: [
    { name: 'dismissed', type: 'void', description: 'Emitted when toast is dismissed' },
  ],
  examples: [
    {
      title: 'Toast Variants',
      description: 'Different semantic toast types',
      typescript: `// Inject toast service
constructor(private toastService: ToastService) {}

showToasts() {
  this.toastService.show('Information message', 'info');
  this.toastService.show('Success! Changes saved', 'success');
  this.toastService.show('Warning: Check your input', 'warning');
  this.toastService.show('Error: Something went wrong', 'error');
}`,
    },
    {
      title: 'Custom Duration Toast',
      description: 'Toast with longer display time',
      typescript: `this.toastService.show('This message stays longer', 'info', 5000);`,
    },
    {
      title: 'Action Feedback',
      description: 'Common toast usage patterns',
      typescript: `// After saving
this.toastService.show('Profile updated successfully', 'success');

// After deleting  
this.toastService.show('Item deleted', 'success');

// After error
this.toastService.show('Failed to save changes', 'error');`,
    },
  ],
  accessibility: {
    ariaSupport: [
      'role="status" for non-critical messages',
      'role="alert" for error messages',
      'aria-live="polite" for non-intrusive announcements',
      'aria-atomic="true" announces entire message',
    ],
    keyboardNavigation: [
      { key: 'Escape', description: 'Dismiss toast' },
    ],
    screenReaderNotes: 'Toast messages announced automatically. Success/error variants use appropriate aria-live settings.',
  },
  bestPractices: [
    'Use for confirmation of user actions (saved, deleted, etc.)',
    'Keep messages concise (1-2 short sentences)',
    'Use success variant for positive confirmation',
    'Use error variant for failed operations',
    'Don\'t use for critical information that requires action',
    'Ensure toasts don\'t obscure important content',
    'Position consistently (usually top-right or bottom-right)',
  ],
};

// ============================================================================
// NAVIGATION COMPONENTS
// ============================================================================

const BREADCRUMB_METADATA: ComponentMetadata = {
  id: 'breadcrumb',
  name: 'Breadcrumb',
  category: 'navigation',
  description: 'A navigation component showing the current page location within the site hierarchy.',
  selector: 'ui-breadcrumb',
  inputs: [
    { name: 'items', type: 'BreadcrumbItem[]', description: 'Array of breadcrumb items with label and optional link', required: true },
    { name: 'separator', type: 'string', description: 'Character or icon separating items', defaultValue: "'/'"},
  ],
  outputs: [],
  examples: [
    {
      title: 'Basic Breadcrumb',
      description: 'Simple navigation trail',
      typescript: `protected breadcrumbs = [
  { label: 'Home', link: '/' },
  { label: 'Products', link: '/products' },
  { label: 'Electronics', link: '/products/electronics' },
  { label: 'Laptops' }
];`,
      template: `<ui-breadcrumb [items]="breadcrumbs" />`,
    },
    {
      title: 'Custom Separator',
      description: 'Breadcrumb with custom separator',
      typescript: `protected breadcrumbs = [
  { label: 'Dashboard', link: '/dashboard' },
  { label: 'Settings', link: '/settings' },
  { label: 'Profile' }
];`,
      template: `<ui-breadcrumb [items]="breadcrumbs" separator="›" />`,
    },
  ],
  accessibility: {
    ariaSupport: [
      'role="navigation" with aria-label="Breadcrumb"',
      'aria-current="page" on current page item',
      'Ordered list structure (ol/li)',
    ],
    keyboardNavigation: [
      { key: 'Tab', description: 'Navigate between breadcrumb links' },
      { key: 'Enter', description: 'Follow breadcrumb link' },
    ],
    screenReaderNotes: 'Breadcrumb trail announced with "Breadcrumb navigation". Current page identified. Path hierarchy clear.',
  },
  bestPractices: [
    'Start with Home or top-level page',
    'Show parent pages in hierarchical order',
    'Make current page non-clickable',
    'Use concise labels (1-2 words)',
    'Limit to 3-5 levels for clarity',
    'Place at top of page content',
  ],
};

const MENU_METADATA: ComponentMetadata = {
  id: 'menu',
  name: 'Menu',
  category: 'navigation',
  description: 'A dropdown menu component with nested submenu support for contextual actions.',
  selector: 'ui-menu',
  inputs: [
    { name: 'items', type: 'MenuItem[]', description: 'Array of menu items with labels and optional children', required: true },
    { name: 'open', type: 'boolean', description: 'Whether menu is visible', defaultValue: 'false' },
  ],
  outputs: [
    { name: 'itemSelected', type: 'string', description: 'Emitted when menu item is selected' },
  ],
  examples: [
    {
      title: 'Basic Dropdown Menu',
      description: 'Simple action menu',
      typescript: `protected menuItems = [
  { label: 'Edit', action: 'edit' },
  { label: 'Duplicate', action: 'duplicate' },
  { label: 'Delete', action: 'delete' }
];`,
      template: `<button [ui-menu]="menuItems">Actions</button>`,
    },
    {
      title: 'Nested Menu',
      description: 'Menu with submenus',
      typescript: `protected menuItems = [
  { label: 'File', children: [
    { label: 'New', action: 'new' },
    { label: 'Open', action: 'open' },
    { label: 'Save', action: 'save' }
  ]},
  { label: 'Edit', children: [
    { label: 'Cut', action: 'cut' },
    { label: 'Copy', action: 'copy' },
    { label: 'Paste', action: 'paste' }
  ]}
];`,
      template: `<ui-menu [items]="menuItems" />`,
    },
  ],
  accessibility: {
    ariaSupport: [
      'role="menu" on menu container',
      'role="menuitem" on each item',
      'aria-haspopup for items with submenus',
      'aria-expanded for submenu state',
    ],
    keyboardNavigation: [
      { key: 'Arrow Up/Down', description: 'Navigate menu items' },
      { key: 'Arrow Right', description: 'Open submenu' },
      { key: 'Arrow Left', description: 'Close submenu' },
      { key: 'Enter/Space', description: 'Select menu item' },
      { key: 'Escape', description: 'Close menu' },
    ],
    screenReaderNotes: 'Menu structure announced. Submenus identified. Item selection announced.',
  },
  bestPractices: [
    'Use for contextual actions related to specific content',
    'Keep menu items concise (1-2 words)',
    'Group related items logically',
    'Limit nesting to 2 levels',
    'Use dividers to separate action groups',
    'Provide keyboard shortcuts for common actions',
  ],
};

const NAVBAR_METADATA: ComponentMetadata = {
  id: 'navbar',
  name: 'Navbar',
  category: 'navigation',
  description: 'A navigation bar component for app-wide navigation with logo and links.',
  selector: 'ui-navbar',
  inputs: [
    { name: 'logo', type: 'string', description: 'Logo text or image URL' },
    { name: 'links', type: 'NavbarLink[]', description: 'Array of navigation links with labels and paths', required: true },
    { name: 'variant', type: "'default' | 'transparent' | 'sticky'", description: 'Navbar style variant', defaultValue: "'default'" },
  ],
  outputs: [],
  examples: [
    {
      title: 'Basic Navbar',
      description: 'Top navigation bar',
      typescript: `protected navLinks = [
  { label: 'Home', path: '/' },
  { label: 'Products', path: '/products' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' }
];`,
      template: `<ui-navbar logo="MyApp" [links]="navLinks" />`,
    },
    {
      title: 'Sticky Navbar',
      description: 'Navbar fixed to top on scroll',
      typescript: `protected navLinks = [
  { label: 'Dashboard', path: '/dashboard' },
  { label: 'Reports', path: '/reports' },
  { label: 'Settings', path: '/settings' }
];`,
      template: `<ui-navbar logo="MyApp" [links]="navLinks" variant="sticky" />`,
    },
  ],
  accessibility: {
    ariaSupport: [
      'role="navigation" landmark',
      'aria-label="Main navigation"',
      'aria-current="page" on active link',
      'Skip link for keyboard users',
    ],
    keyboardNavigation: [
      { key: 'Tab', description: 'Navigate between links' },
      { key: 'Enter', description: 'Activate link' },
    ],
    screenReaderNotes: 'Navigation landmark announced. Links and current page identified.',
  },
  bestPractices: [
    'Place at top of page as primary navigation',
    'Keep link count reasonable (5-7 max)',
    'Highlight current/active page',
    'Include logo that links to home',
    'Use sticky variant for long pages',
    'Ensure sufficient color contrast',
    'Make responsive for mobile devices',
  ],
};

const STEPPER_METADATA: ComponentMetadata = {
  id: 'stepper',
  name: 'Stepper',
  category: 'navigation',
  description: 'A component for multi-step processes with progress indication and step navigation.',
  selector: 'ui-stepper',
  inputs: [
    { name: 'steps', type: 'Step[]', description: 'Array of steps with labels and optional descriptions', required: true },
    { name: 'activeStep', type: 'number', description: 'Current active step index (0-based)', defaultValue: '0' },
    { name: 'orientation', type: "'horizontal' | 'vertical'", description: 'Stepper layout direction', defaultValue: "'horizontal'" },
  ],
  outputs: [
    { name: 'activeStepChange', type: 'number', description: 'Emitted when user navigates to different step' },
  ],
  examples: [
    {
      title: 'Horizontal Stepper',
      description: 'Multi-step checkout process',
      typescript: `protected steps = [
  { label: 'Cart', description: 'Review items' },
  { label: 'Shipping', description: 'Enter address' },
  { label: 'Payment', description: 'Payment info' },
  { label: 'Confirm', description: 'Review order' }
];
protected currentStep = signal(0);`,
      template: `<ui-stepper [steps]="steps" [activeStep]="currentStep()" (activeStepChange)="currentStep.set($event)" />`,
    },
    {
      title: 'Vertical Stepper',
      description: 'Vertical step layout',
      typescript: `protected steps = [
  { label: 'Personal Info' },
  { label: 'Account Details' },
  { label: 'Preferences' }
];`,
      template: `<ui-stepper [steps]="steps" [activeStep]="0" orientation="vertical" />`,
    },
    {
      title: 'Form Wizard',
      description: 'Multi-step form with progress',
      typescript: `protected steps = [
  { label: 'Basic Info', description: 'Name and email' },
  { label: 'Company', description: 'Company details' },
  { label: 'Review', description: 'Confirm submission' }
];`,
      template: `<ui-stepper [steps]="steps" [activeStep]="currentStep()" />`,
    },
  ],
  accessibility: {
    ariaSupport: [
      'role="navigation" with aria-label="Progress"',
      'aria-current="step" on active step',
      'Step completion status announced',
      'Total steps and current position indicated',
    ],
    keyboardNavigation: [
      { key: 'Tab', description: 'Navigate to step buttons' },
      { key: 'Arrow Keys', description: 'Navigate between steps (optional)' },
      { key: 'Enter/Space', description: 'Activate step' },
    ],
    screenReaderNotes: 'Current step, total steps, and completion status announced. Step descriptions read when focused.',
  },
  bestPractices: [
    'Use for processes with 3-7 distinct steps',
    'Show clear step labels and optional descriptions',
    'Indicate completed, current, and upcoming steps',
    'Allow navigation to completed steps',
    'Provide Next/Previous buttons for navigation',
    'Save progress between steps when possible',
    'Use horizontal for desktop, vertical for mobile',
  ],
};

// ============================================================================
// METADATA REGISTRY
// ============================================================================

const COMPONENT_METADATA_MAP = new Map<string, ComponentMetadata>([
  // Form Components
  ['button', BUTTON_METADATA],
  ['input', INPUT_METADATA],
  ['textarea', TEXTAREA_METADATA],
  ['checkbox', CHECKBOX_METADATA],
  ['radio', RADIO_METADATA],
  ['switch', SWITCH_METADATA],
  ['select', SELECT_METADATA],
  ['multi-select', MULTI_SELECT_METADATA],
  ['slider', SLIDER_METADATA],
  ['date-picker', DATEPICKER_METADATA],
  ['file-upload', FILEUPLOAD_METADATA],
  // Layout Components
  ['card', CARD_METADATA],
  ['modal', MODAL_METADATA],
  ['tabs', TABS_METADATA],
  ['accordion', ACCORDION_METADATA],
  ['divider', DIVIDER_METADATA],
  ['drawer', DRAWER_METADATA],
  ['stack', STACK_METADATA],
  ['grid', GRID_METADATA],
  // Data Display Components
  ['badge', BADGE_METADATA],
  ['avatar', AVATAR_METADATA],
  ['tooltip', TOOLTIP_METADATA],
  ['chip', CHIP_METADATA],
  ['popover', POPOVER_METADATA],
  ['pagination', PAGINATION_METADATA],
  ['table', TABLE_METADATA],
  ['list', LIST_METADATA],
  // Feedback Components
  ['alert', ALERT_METADATA],
  ['spinner', SPINNER_METADATA],
  ['progress', PROGRESS_METADATA],
  ['skeleton', SKELETON_METADATA],
  ['toast', TOAST_METADATA],
  // Navigation Components
  ['breadcrumb', BREADCRUMB_METADATA],
  ['menu', MENU_METADATA],
  ['navbar', NAVBAR_METADATA],
  ['stepper', STEPPER_METADATA],
]);

/**
 * Get metadata for a specific component
 */
export function getComponentMetadata(componentId: string): ComponentMetadata | undefined {
  return COMPONENT_METADATA_MAP.get(componentId);
}

/**
 * Get all component metadata
 */
export function getAllComponentMetadata(): ComponentMetadata[] {
  return Array.from(COMPONENT_METADATA_MAP.values());
}

/**
 * Get components by category
 */
export function getComponentsByCategory(category: ComponentMetadata['category']): ComponentMetadata[] {
  return getAllComponentMetadata().filter(meta => meta.category === category);
}

