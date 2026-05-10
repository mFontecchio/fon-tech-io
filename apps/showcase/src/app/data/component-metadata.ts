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
  description:
    'A themable button component with multiple variants, sizes, and states. Supports loading states and full accessibility.',
  selector: 'fui-button',
  setup: {
    importStatement: "import { ButtonComponent } from '@mfontecchio/components';",
    usageSnippet: `<fui-button>Click Me</fui-button>`,
    setupNotes:
      'No additional setup required. Add ButtonComponent to the imports array of your standalone component.',
  },
  forms: {
    recommendedBinding:
      'Use native form semantics. Place the button inside a standard HTML form and set the type input to submit or reset when appropriate.',
    changeBinding: '(clicked)',
    supportsControlValueAccessor: false,
    supportsTemplateDrivenForms: false,
    supportsReactiveForms: false,
    notes: [
      'This component does not represent a form value; it participates in forms through native button submit and reset behavior.',
      'Handle form submission on the parent form element or in the clicked output.',
    ],
  },
  runtime: {
    supportsSSR: true,
    requiresBrowserAPIs: false,
    notes: [
      'Uses native button semantics and is safe for SSR output.',
      'No browser-only APIs are required for core rendering behavior.',
    ],
  },
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
    {
      name: 'ariaLabel',
      type: 'string',
      description: 'ARIA label for accessibility (use when button has no visible text)',
    },
  ],
  outputs: [
    {
      name: 'clicked',
      type: 'MouseEvent',
      description: 'Emitted when button is clicked (only if not disabled or loading)',
    },
  ],
  passthroughs: [
    {
      name: 'Default content',
      type: 'slot',
      selector: '(default)',
      description:
        'Button label text or any inline content such as icons. Rendered inside the native button element.',
      optional: true,
    },
    {
      name: 'type',
      type: 'passthrough',
      selector: 'type',
      description:
        'Forwarded to the native button type attribute. Accepts button, submit, or reset.',
      optional: true,
    },
    {
      name: 'disabled',
      type: 'passthrough',
      selector: 'disabled',
      description: 'Forwarded to the native button disabled attribute. Also sets aria-disabled.',
      optional: true,
    },
  ],
  theming: {
    tokens: [
      {
        token: '--component-button-border-radius',
        description: 'Border radius applied to all button variants.',
      },
      {
        token: '--component-button-border-width',
        description: 'Border width for the outlined variant.',
      },
      { token: '--component-button-font-weight', description: 'Font weight of button label text.' },
      {
        token: '--component-button-sizes-sm-padding-y',
        description: 'Vertical padding for the small size.',
      },
      {
        token: '--component-button-sizes-sm-padding-x',
        description: 'Horizontal padding for the small size.',
      },
      {
        token: '--component-button-sizes-md-padding-y',
        description: 'Vertical padding for the medium size.',
      },
      {
        token: '--component-button-sizes-md-padding-x',
        description: 'Horizontal padding for the medium size.',
      },
      {
        token: '--component-button-sizes-lg-padding-y',
        description: 'Vertical padding for the large size.',
      },
      {
        token: '--component-button-sizes-lg-padding-x',
        description: 'Horizontal padding for the large size.',
      },
      { token: '--semantic-brand-primary', description: 'Background color of the filled variant.' },
      {
        token: '--semantic-brand-primary-hover',
        description: 'Hover background color of the filled variant.',
      },
      { token: '--semantic-text-inverse', description: 'Label text color on filled backgrounds.' },
      {
        token: '--semantic-state-disabled',
        description: 'Background color when the button is disabled.',
      },
      {
        token: '--semantic-text-disabled',
        description: 'Label color when the button is disabled.',
      },
    ],
    customizationNotes:
      'Override component tokens on a scoped ancestor element. For example: .my-context { --component-button-border-radius: 2px; }. Avoid ::ng-deep.',
  },
  examples: [
    {
      title: 'Basic Usage',
      description: 'Simple button with default filled variant',
      template: `<fui-button>Click Me</fui-button>`,
    },
    {
      title: 'Button Variants',
      description: 'Three visual styles: filled (solid), outlined (border), and text (minimal)',
      template: `<fui-button variant="filled">Filled</fui-button>
<fui-button variant="outlined">Outlined</fui-button>
<fui-button variant="text">Text</fui-button>`,
    },
    {
      title: 'Button Sizes',
      description: 'Three size options to fit different layouts',
      template: `<fui-button size="sm">Small</fui-button>
<fui-button size="md">Medium</fui-button>
<fui-button size="lg">Large</fui-button>`,
    },
    {
      title: 'Disabled State',
      description: 'Disabled buttons prevent interaction',
      template: `<fui-button [disabled]="true">Disabled Button</fui-button>`,
    },
    {
      title: 'Loading State',
      description: 'Display loading spinner with disabled interaction',
      template: `<fui-button [loading]="true">Loading...</fui-button>`,
    },
    {
      title: 'Full Width',
      description: 'Button that spans the full width of its container',
      template: `<fui-button [fullWidth]="true">Full Width Button</fui-button>`,
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
    screenReaderNotes:
      'Button text is announced along with its state (disabled, loading). Use aria-label for icon-only buttons.',
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
  description:
    'A themable text input component with validation states, projected affixes, native validity feedback, and optional password reveal support.',
  selector: 'fui-input',
  setup: {
    importStatement: "import { InputComponent } from '@mfontecchio/components';",
    usageSnippet: `<fui-input label="Email" placeholder="Enter your email" />`,
    setupNotes:
      'No additional setup required. Add InputComponent to the imports array of your standalone component.',
  },
  forms: {
    recommendedBinding:
      'Use formControl, formControlName, ngModel, or the explicit [value]/(valueChange) contract depending on the needs of the host form.',
    valueBinding: '[value]',
    changeBinding: '(valueChange)',
    supportsControlValueAccessor: true,
    supportsTemplateDrivenForms: true,
    supportsReactiveForms: true,
    notes: [
      'Supports Angular ControlValueAccessor for direct ngModel, formControl, and formControlName usage.',
      'The explicit [value] and (valueChange) bindings remain supported for signal-based or manual state management.',
      'Native validation attributes such as required, pattern, minlength, and maxlength still apply on the underlying input element.',
    ],
  },
  runtime: {
    supportsSSR: true,
    requiresBrowserAPIs: true,
    notes: [
      'Core input rendering is SSR-friendly.',
      'Auto-focus and programmatic focus behavior depend on browser DOM APIs after hydration.',
    ],
  },
  inputs: [
    {
      name: 'type',
      type: "'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search'",
      description: 'HTML input type',
      defaultValue: "'text'",
    },
    { name: 'label', type: 'string', description: 'Label text displayed above the input' },
    { name: 'placeholder', type: 'string', description: 'Placeholder text' },
    { name: 'value', type: 'string | number', description: 'Input value', defaultValue: "''" },
    {
      name: 'disabled',
      type: 'boolean',
      description: 'Whether the input is disabled',
      defaultValue: 'false',
    },
    {
      name: 'required',
      type: 'boolean',
      description: 'Whether the input is required',
      defaultValue: 'false',
    },
    { name: 'errorMessage', type: 'string', description: 'Error message to display' },
    { name: 'helperText', type: 'string', description: 'Helper text displayed below the input' },
    { name: 'prefixIcon', type: 'string', description: 'Icon to display before the input text' },
    { name: 'suffixIcon', type: 'string', description: 'Icon to display after the input text' },
    {
      name: 'readonly',
      type: 'boolean',
      description: 'Whether the input is read-only',
      defaultValue: 'false',
    },
    {
      name: 'autoFocus',
      type: 'boolean',
      description: 'Whether the input should receive focus on mount',
      defaultValue: 'false',
    },
    { name: 'maxLength', type: 'number', description: 'Maximum number of characters allowed' },
    { name: 'minLength', type: 'number', description: 'Minimum number of characters required' },
    { name: 'pattern', type: 'string', description: 'Native HTML validation pattern' },
    { name: 'autocomplete', type: 'string', description: 'Native autocomplete attribute value' },
    { name: 'name', type: 'string', description: 'Native input name attribute' },
    {
      name: 'id',
      type: 'string',
      description: 'ID attribute for label association and testing hooks',
    },
    {
      name: 'ariaLabel',
      type: 'string',
      description: 'Accessible name when a visual label is not present',
    },
    {
      name: 'ariaDescribedBy',
      type: 'string',
      description: 'Additional element IDs announced by assistive technology',
    },
    {
      name: 'showPasswordToggle',
      type: 'boolean',
      description: 'Shows a built-in reveal button when the input type is password',
      defaultValue: 'false',
    },
    {
      name: 'fullWidth',
      type: 'boolean',
      description: 'Whether input should take full width',
      defaultValue: 'false',
    },
  ],
  outputs: [
    {
      name: 'valueChange',
      type: 'string | number',
      description: 'Emitted when input value changes',
    },
    {
      name: 'blurred',
      type: 'FocusEvent',
      description: 'Emitted when the input loses focus',
    },
    {
      name: 'focused',
      type: 'FocusEvent',
      description: 'Emitted when the input receives focus',
    },
    {
      name: 'inputted',
      type: 'Event',
      description: 'Emitted on every native input event',
    },
  ],
  passthroughs: [
    {
      name: 'Prefix slot',
      type: 'slot',
      selector: '[prefix]',
      description:
        'Arbitrary content placed before the input field — typically an icon or symbol. Use the prefix attribute on a child element.',
      optional: true,
    },
    {
      name: 'Suffix slot',
      type: 'slot',
      selector: '[suffix]',
      description:
        'Arbitrary content placed after the input field — typically an icon, button, or unit label. Use the suffix attribute on a child element.',
      optional: true,
    },
    {
      name: 'Native input attributes',
      type: 'passthrough',
      selector:
        'type, name, id, autocomplete, pattern, maxlength, minlength, required, readonly, disabled',
      description:
        'All these native attributes are forwarded to the underlying <input> element via explicit component inputs of the same name.',
      optional: true,
    },
  ],
  theming: {
    tokens: [
      {
        token: '--component-input-padding-y',
        description: 'Vertical padding inside the input field.',
      },
      {
        token: '--component-input-padding-x',
        description: 'Horizontal padding inside the input field.',
      },
      { token: '--component-input-font-size', description: 'Font size of input text.' },
      {
        token: '--component-input-border-radius',
        description: 'Border radius of the input wrapper.',
      },
      { token: '--component-input-border-width', description: 'Width of the input border.' },
      { token: '--component-input-default-border', description: 'Default border color.' },
      { token: '--component-input-hover-border', description: 'Border color on hover.' },
      { token: '--component-input-focus-border', description: 'Border color when focused.' },
      { token: '--component-input-focus-ring', description: 'Focus ring color and style.' },
      { token: '--component-input-error-border', description: 'Border color in the error state.' },
      {
        token: '--component-input-disabled-background',
        description: 'Background color when disabled.',
      },
      { token: '--component-input-default-text', description: 'Text color of the input value.' },
      { token: '--component-input-default-placeholder', description: 'Placeholder text color.' },
    ],
    customizationNotes:
      'Override component tokens on an ancestor element to restyle inputs in a specific context. For example: .my-form { --component-input-border-radius: 0; }. Do not use ::ng-deep.',
  },
  examples: [
    {
      title: 'Basic Input',
      description: 'Simple text input with label',
      template: `<fui-input label="Email" placeholder="Enter your email" />`,
    },
    {
      title: 'Input Types',
      description: 'Different input types for various data',
      template: `<fui-input type="email" label="Email" placeholder="email@example.com" />
<fui-input type="password" label="Password" placeholder="Enter password" />
<fui-input type="number" label="Age" placeholder="Enter age" />
<fui-input type="tel" label="Phone" placeholder="(123) 456-7890" />`,
    },
    {
      title: 'Input with Prefix Icon',
      description: 'Add visual context with a prefix icon',
      template: `<fui-input 
  label="Search" 
  placeholder="Search..." 
  prefixIcon="🔍" 
/>`,
    },
    {
      title: 'Input with Suffix Icon',
      description: 'Add actions or indicators with a suffix icon',
      template: `<fui-input 
  label="Password" 
  type="password"
  placeholder="Enter password" 
  suffixIcon="👁️" 
/>`,
    },
    {
      title: 'Input with Custom Affixes',
      description: 'Project custom text, icons, or other content into the prefix and suffix areas',
      template: `<fui-input label="Website" placeholder="your-site">
  <span prefix>https://</span>
  <span suffix>.com</span>
</fui-input>`,
    },
    {
      title: 'Password Reveal Toggle',
      description: 'Opt into a built-in password visibility toggle',
      template: `<fui-input 
  label="Password" 
  type="password"
  placeholder="Enter password"
  [showPasswordToggle]="true"
/>`,
    },
    {
      title: 'Input with Error',
      description: 'Display validation errors',
      template: `<fui-input 
  label="Email" 
  value="invalid-email"
  errorMessage="Please enter a valid email address"
/>`,
    },
    {
      title: 'Input with Helper Text',
      description: 'Provide additional guidance',
      template: `<fui-input 
  label="Username" 
  placeholder="Enter username"
  helperText="Must be 3-20 characters, letters and numbers only"
/>`,
    },
    {
      title: 'Disabled Input',
      description: 'Non-editable input field',
      template: `<fui-input 
  label="Email" 
  value="user@example.com"
  [disabled]="true"
/>`,
    },
    {
      title: 'Required Input',
      description: 'Mark input as required',
      template: `<fui-input 
  label="Email" 
  placeholder="Enter your email"
  [required]="true"
/>`,
    },
  ],
  accessibility: {
    ariaSupport: [
      'Automatically associates label with input',
      'aria-invalid set when error present',
      'aria-describedby links to helper/error text',
    ],
    keyboardNavigation: [{ key: 'Tab', description: 'Move focus to/from input' }],
    screenReaderNotes:
      'Label, value, and error states are announced. Helper text provides additional context.',
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
  selector: 'fui-textarea',
  setup: {
    importStatement: "import { TextareaComponent } from '@mfontecchio/components';",
    usageSnippet: `<fui-textarea label="Message" placeholder="Enter your message" />`,
    setupNotes:
      'No additional setup required. Add TextareaComponent to the imports array of your standalone component.',
  },
  forms: {
    recommendedBinding:
      'Use formControl, formControlName, ngModel, or the explicit [value]/(valueChange) contract depending on the surrounding form architecture.',
    valueBinding: '[value]',
    changeBinding: '(valueChange)',
    supportsControlValueAccessor: true,
    supportsTemplateDrivenForms: true,
    supportsReactiveForms: true,
    notes: [
      'Supports Angular ControlValueAccessor for direct ngModel, formControl, and formControlName usage.',
      'The explicit [value] and (valueChange) bindings remain supported for signal-based or manual state management.',
      'Readonly, minlength, maxlength, and required are forwarded to the native textarea element.',
    ],
  },
  runtime: {
    supportsSSR: true,
    requiresBrowserAPIs: true,
    notes: [
      'Core textarea rendering is SSR-friendly.',
      'Auto-resize and programmatic focus behavior run against browser DOM APIs after hydration.',
    ],
  },
  inputs: [
    { name: 'label', type: 'string', description: 'Label text displayed above the textarea' },
    { name: 'placeholder', type: 'string', description: 'Placeholder text shown when empty' },
    { name: 'value', type: 'string', description: 'Current textarea value', defaultValue: "''" },
    {
      name: 'disabled',
      type: 'boolean',
      description: 'Whether textarea is disabled',
      defaultValue: 'false',
    },
    {
      name: 'required',
      type: 'boolean',
      description: 'Whether input is required',
      defaultValue: 'false',
    },
    {
      name: 'readonly',
      type: 'boolean',
      description: 'Whether the textarea is read-only',
      defaultValue: 'false',
    },
    { name: 'rows', type: 'number', description: 'Number of visible text rows', defaultValue: '3' },
    {
      name: 'autoResize',
      type: 'boolean',
      description: 'Automatically grow the textarea to fit its content',
      defaultValue: 'false',
    },
    { name: 'maxLength', type: 'number', description: 'Maximum character count' },
    { name: 'minLength', type: 'number', description: 'Minimum character count' },
    {
      name: 'showCharacterCount',
      type: 'boolean',
      description: 'Display character counter',
      defaultValue: 'false',
    },
    { name: 'errorMessage', type: 'string', description: 'Error message to display' },
    { name: 'helperText', type: 'string', description: 'Helper text below input' },
    { name: 'name', type: 'string', description: 'Native textarea name attribute' },
    { name: 'id', type: 'string', description: 'ID attribute for label association' },
    {
      name: 'ariaLabel',
      type: 'string',
      description: 'ARIA label when no visible label is present',
    },
    {
      name: 'fullWidth',
      type: 'boolean',
      description: 'Whether textarea takes full width',
      defaultValue: 'false',
    },
  ],
  outputs: [{ name: 'valueChange', type: 'string', description: 'Emitted when value changes' }],
  passthroughs: [
    {
      name: 'Native textarea attributes',
      type: 'passthrough',
      selector:
        'name, id, placeholder, disabled, readonly, required, maxlength, minlength, rows, autocomplete',
      description:
        'Forwarded to the underlying <textarea> element via explicit component inputs of the same name.',
      optional: true,
    },
  ],
  theming: {
    tokens: [
      {
        token: '--component-input-padding-y',
        description: 'Vertical padding inside the textarea.',
      },
      {
        token: '--component-input-padding-x',
        description: 'Horizontal padding inside the textarea.',
      },
      { token: '--component-input-font-size', description: 'Font size of textarea text.' },
      { token: '--component-input-border-radius', description: 'Border radius of the textarea.' },
      { token: '--component-input-border-width', description: 'Width of the textarea border.' },
      { token: '--component-input-default-border', description: 'Default border color.' },
      { token: '--component-input-focus-border', description: 'Border color when focused.' },
      { token: '--component-input-error-border', description: 'Border color in the error state.' },
      { token: '--component-input-disabled-background', description: 'Background when disabled.' },
    ],
    customizationNotes:
      'Textarea shares input tokens. Override --component-input-* tokens on an ancestor to apply consistent form styling.',
  },
  examples: [
    {
      title: 'Basic Textarea',
      description: 'Simple multi-line text input',
      template: `<fui-textarea 
  label="Description" 
  placeholder="Enter description..." 
/>`,
    },
    {
      title: 'Textarea with Rows',
      description: 'Control visible height with row count',
      template: `<fui-textarea 
  label="Comments" 
  placeholder="Enter your comments..." 
  [rows]="5" 
/>`,
    },
    {
      title: 'Textarea with Character Limit',
      description: 'Maximum length with character counter',
      template: `<fui-textarea 
  label="Bio" 
  placeholder="Tell us about yourself..." 
  [maxLength]="200"
  [showCharacterCount]="true"
/>`,
    },
    {
      title: 'Textarea with Helper Text',
      description: 'Guidance text below the input',
      template: `<fui-textarea 
  label="Feedback" 
  placeholder="Share your thoughts..." 
  helperText="Your feedback helps us improve." 
/>`,
    },
    {
      title: 'Textarea with Error',
      description: 'Error state with validation message',
      template: `<fui-textarea 
  label="Message" 
  placeholder="Enter message..." 
  errorMessage="Message is required" 
/>`,
    },
    {
      title: 'Required Textarea',
      description: 'Required field indicator',
      template: `<fui-textarea 
  label="Required Field" 
  placeholder="This field is required..." 
  [required]="true" 
/>`,
    },
    {
      title: 'Disabled Textarea',
      description: 'Non-editable state',
      template: `<fui-textarea 
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
    screenReaderNotes:
      'Label, required state, helper text, and errors announced. Character count updates announced as user types.',
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
  selector: 'fui-checkbox',
  setup: {
    importStatement: "import { CheckboxComponent } from '@mfontecchio/components';",
    usageSnippet: `<fui-checkbox label="Accept terms and conditions" />`,
    setupNotes:
      'No additional setup required. Add CheckboxComponent to the imports array of your standalone component.',
  },
  forms: {
    recommendedBinding:
      'Use formControl, formControlName, ngModel, or the explicit [checked]/(checkedChange) contract depending on the host form architecture.',
    valueBinding: '[checked]',
    changeBinding: '(checkedChange)',
    supportsControlValueAccessor: true,
    supportsTemplateDrivenForms: true,
    supportsReactiveForms: true,
    notes: [
      'Supports Angular ControlValueAccessor for direct ngModel, formControl, and formControlName usage.',
      'The explicit [checked] and (checkedChange) bindings remain supported for signal-based or manual state management.',
      'Indeterminate state is managed separately through the indeterminate input.',
    ],
  },
  runtime: {
    supportsSSR: true,
    requiresBrowserAPIs: true,
    notes: [
      'Markup and state are SSR-compatible.',
      'Indeterminate state is applied to the native checkbox element in the browser runtime.',
    ],
  },
  inputs: [
    { name: 'checked', type: 'boolean', description: 'Whether checked', defaultValue: 'false' },
    { name: 'disabled', type: 'boolean', description: 'Whether disabled', defaultValue: 'false' },
    {
      name: 'indeterminate',
      type: 'boolean',
      description: 'Indeterminate state (partially checked)',
      defaultValue: 'false',
    },
    { name: 'label', type: 'string', description: 'Label text displayed next to checkbox' },
    {
      name: 'required',
      type: 'boolean',
      description: 'Whether the field is required',
      defaultValue: 'false',
    },
    {
      name: 'size',
      type: "'sm' | 'md' | 'lg'",
      description: 'Checkbox size',
      defaultValue: "'md'",
    },
    { name: 'helperText', type: 'string', description: 'Helper text displayed below the checkbox' },
    {
      name: 'errorMessage',
      type: 'string',
      description: 'Error message displayed below the checkbox',
    },
    { name: 'name', type: 'string', description: 'Native input name attribute for form grouping' },
    { name: 'value', type: 'string', description: 'Value attribute submitted with the form' },
    { name: 'id', type: 'string', description: 'ID attribute for label association' },
    {
      name: 'ariaLabel',
      type: 'string',
      description: 'ARIA label when no visible label is present',
    },
  ],
  outputs: [
    { name: 'checkedChange', type: 'boolean', description: 'Emitted when checked state changes' },
  ],
  passthroughs: [
    {
      name: 'Native checkbox attributes',
      type: 'passthrough',
      selector: 'name, id, value, checked, disabled, required',
      description:
        'Forwarded to the underlying <input type="checkbox"> element via explicit component inputs of the same name.',
      optional: true,
    },
  ],
  theming: {
    tokens: [
      {
        token: '--semantic-brand-primary',
        description: 'Background color of the checked state indicator.',
      },
      {
        token: '--semantic-brand-primary-hover',
        description: 'Hover color for the checked state.',
      },
      {
        token: '--semantic-border-default',
        description: 'Default border color of the checkbox control.',
      },
      { token: '--semantic-border-error', description: 'Border color in the error state.' },
      { token: '--semantic-state-disabled', description: 'Appearance modifier when disabled.' },
      { token: '--semantic-text-primary', description: 'Label text color.' },
    ],
    customizationNotes:
      'Override semantic brand tokens to change the checked color globally, or scope overrides to a parent element for context-specific variants.',
  },
  examples: [
    {
      title: 'Basic Checkbox',
      description: 'Simple checkbox with label text',
      template: `<fui-checkbox label="Accept terms and conditions" />`,
    },
    {
      title: 'Checkbox States',
      description: 'Checked, unchecked, and indeterminate states',
      template: `<fui-checkbox label="Unchecked" [checked]="false" />
<fui-checkbox label="Checked" [checked]="true" />
<fui-checkbox label="Indeterminate" [indeterminate]="true" />`,
    },
    {
      title: 'Disabled Checkbox',
      description: 'Checkbox in disabled state',
      template: `<fui-checkbox label="Disabled unchecked" [disabled]="true" />
<fui-checkbox label="Disabled checked" [checked]="true" [disabled]="true" />`,
    },
    {
      title: 'Checkbox Group',
      description: 'Multiple checkboxes for multi-selection',
      template: `<fui-checkbox label="JavaScript" />
<fui-checkbox label="TypeScript" />
<fui-checkbox label="Angular" />`,
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
    screenReaderNotes:
      'Checkbox state (checked, unchecked, or mixed) and label are announced. Disabled state is also announced.',
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
  description:
    'A themable radio button component for mutually exclusive selections with explicit group selection bindings and legacy model compatibility.',
  selector: 'fui-radio',
  setup: {
    importStatement: "import { RadioComponent } from '@mfontecchio/components';",
    usageSnippet: `<fui-radio name="plan" value="free" label="Free Plan" [(selectedValue)]="selectedPlan" />\n<fui-radio name="plan" value="pro" label="Pro Plan" [(selectedValue)]="selectedPlan" />`,
    usageTypescript: `import { signal } from '@angular/core';\n\nexport class MyComponent {\n  protected readonly selectedPlan = signal<string>('free');\n}`,
    setupNotes:
      'Import signal from @angular/core. Add RadioComponent to the imports array of your standalone component.',
  },
  forms: {
    recommendedBinding:
      'Use formControl, formControlName, ngModel, or [(selectedValue)] across every radio in the same group and keep the native name input identical for mutual exclusion.',
    valueBinding: '[(selectedValue)]',
    changeBinding: '(selectedValueChange)',
    supportsControlValueAccessor: true,
    supportsTemplateDrivenForms: true,
    supportsReactiveForms: true,
    notes: [
      'All radios in a group must share the same name input and the same selectedValue signal or state field.',
      'Supports Angular ControlValueAccessor for direct ngModel, formControl, and formControlName usage across a radio group that shares the same name.',
      'Use [(selectedValue)] as the canonical explicit binding for manual or signal-driven state management.',
      'The existing [(modelValue)] API remains supported for signal-based or manual state management.',
      'Do not mix selectedValue and modelValue on the same radio group; selectedValue is the preferred explicit contract and modelValue is the backward-compatible alias.',
    ],
  },
  runtime: {
    supportsSSR: true,
    requiresBrowserAPIs: true,
    notes: [
      'Group rendering and selection logic are SSR-compatible.',
      'Programmatic focus and generated IDs rely on browser-side hydration for interactive behavior.',
    ],
  },
  inputs: [
    {
      name: 'selectedValue',
      type: 'string | undefined',
      description: 'Preferred group-selection value shared across all radios in the same group',
      defaultValue: 'undefined',
    },
    {
      name: 'modelValue',
      type: 'model<string | undefined>',
      description: 'Legacy model binding alias for the selected value across the radio group',
      defaultValue: 'undefined',
    },
    { name: 'value', type: 'string', description: 'Value for this radio button', required: true },
    {
      name: 'name',
      type: 'string',
      description: 'Radio group name (required for proper grouping and mutual exclusion)',
      required: true,
    },
    {
      name: 'label',
      type: 'string',
      description: 'Label text displayed next to radio button',
      defaultValue: 'undefined',
    },
    {
      name: 'disabled',
      type: 'boolean',
      description: 'Whether the radio button is disabled',
      defaultValue: 'false',
    },
    {
      name: 'required',
      type: 'boolean',
      description: 'Whether the radio selection is required',
      defaultValue: 'false',
    },
    {
      name: 'size',
      type: "'sm' | 'md' | 'lg'",
      description: 'Size of the radio button',
      defaultValue: "'md'",
    },
    {
      name: 'helperText',
      type: 'string',
      description: 'Helper text displayed below the radio button',
      defaultValue: 'undefined',
    },
    {
      name: 'errorMessage',
      type: 'string',
      description:
        'Error message displayed below the radio button (replaces helperText when present)',
      defaultValue: 'undefined',
    },
    {
      name: 'id',
      type: 'string',
      description: 'ID attribute for the radio input element (auto-generated if not provided)',
      defaultValue: 'auto-generated',
    },
    {
      name: 'ariaLabel',
      type: 'string',
      description: 'ARIA label for accessibility (falls back to label if not provided)',
      defaultValue: 'undefined',
    },
  ],
  outputs: [
    {
      name: 'selectedValueChange',
      type: 'string | undefined',
      description: 'Emitted when this radio updates the preferred selectedValue group binding',
    },
    {
      name: 'modelValueChange',
      type: 'string | undefined',
      description: 'Emitted when this radio updates the legacy modelValue binding',
    },
  ],
  methods: [
    {
      name: 'focus',
      parameters: '',
      returnType: 'void',
      description: 'Programmatically focus the radio button',
    },
  ],
  passthroughs: [
    {
      name: 'Native radio attributes',
      type: 'passthrough',
      selector: 'name, id, value, disabled, required',
      description:
        'Forwarded to the underlying <input type="radio"> element via explicit component inputs. All radio buttons in a group must share the same name.',
      optional: true,
    },
  ],
  theming: {
    tokens: [
      {
        token: '--semantic-brand-primary',
        description: 'Fill color of the selected radio indicator.',
      },
      { token: '--semantic-brand-primary-hover', description: 'Hover color of the radio control.' },
      {
        token: '--semantic-border-default',
        description: 'Default border of the radio control ring.',
      },
      { token: '--semantic-border-error', description: 'Border color in the error state.' },
      { token: '--semantic-state-disabled', description: 'Appearance modifier when disabled.' },
      { token: '--semantic-text-primary', description: 'Label text color.' },
    ],
    customizationNotes:
      'Override semantic brand tokens on an ancestor to restyle all radios within a form section.',
  },
  examples: [
    {
      title: 'Basic Radio Group',
      description:
        'Simple radio group for single selection using the explicit selectedValue contract',
      template: `<fui-radio name="plan" value="free" label="Free Plan" [(selectedValue)]="selectedPlan" />
    <fui-radio name="plan" value="pro" label="Pro Plan" [(selectedValue)]="selectedPlan" />
    <fui-radio name="plan" value="enterprise" label="Enterprise Plan" [(selectedValue)]="selectedPlan" />`,
      typescript: `export class MyComponent {
  selectedPlan = signal<string | undefined>(undefined);
}`,
    },
    {
      title: 'Radio with Pre-selection',
      description: 'Radio group with default selection',
      template: `<fui-radio name="size" value="sm" label="Small" [(selectedValue)]="selectedSize" />
    <fui-radio name="size" value="md" label="Medium" [(selectedValue)]="selectedSize" />
    <fui-radio name="size" value="lg" label="Large" [(selectedValue)]="selectedSize" />`,
      typescript: `export class MyComponent {
  selectedSize = signal<string>('md'); // Pre-selected
}`,
    },
    {
      title: 'Disabled Radio Options',
      description: 'Radio group with disabled options',
      template: `<fui-radio name="shipping" value="standard" label="Standard (5-7 days)" [(selectedValue)]="selectedShipping" />
    <fui-radio name="shipping" value="express" label="Express (2-3 days)" [(selectedValue)]="selectedShipping" />
    <fui-radio name="shipping" value="overnight" label="Overnight" [disabled]="true" [(selectedValue)]="selectedShipping" />`,
      typescript: `export class MyComponent {
  selectedShipping = signal<string | undefined>(undefined);
}`,
    },
    {
      title: 'Radio States',
      description: 'Different radio button states',
      template: `<fui-radio name="state1" value="unchecked" label="Unchecked" />
<fui-radio name="state2" value="disabled-unchecked" label="Disabled Unchecked" [disabled]="true" />
<fui-radio name="state3" value="disabled-checked" label="Disabled" [disabled]="true" />`,
    },
    {
      title: 'Payment Method Selection',
      description: 'Practical radio group example with pre-selection',
      template: `<fui-radio name="payment" value="card" label="Credit/Debit Card" [(selectedValue)]="selectedPayment" />
    <fui-radio name="payment" value="paypal" label="PayPal" [(selectedValue)]="selectedPayment" />
    <fui-radio name="payment" value="bank" label="Bank Transfer" [(selectedValue)]="selectedPayment" />`,
      typescript: `export class MyComponent {
  selectedPayment = signal<string>('card'); // Pre-selected card
}`,
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
    screenReaderNotes:
      'Radio button label, state (checked/unchecked), and position in group announced. Group label should be announced when entering the group.',
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
  selector: 'fui-switch',
  setup: {
    importStatement: "import { SwitchComponent } from '@mfontecchio/components';",
    usageSnippet: `<fui-switch label="Enable notifications" />`,
    setupNotes:
      'No additional setup required. Add SwitchComponent to the imports array of your standalone component.',
  },
  forms: {
    recommendedBinding:
      'Use formControl, formControlName, ngModel, or the explicit [checked]/(checkedChange) contract depending on the host form architecture.',
    valueBinding: '[checked]',
    changeBinding: '(checkedChange)',
    supportsControlValueAccessor: true,
    supportsTemplateDrivenForms: true,
    supportsReactiveForms: true,
    notes: [
      'Supports Angular ControlValueAccessor for direct ngModel, formControl, and formControlName usage.',
      'The explicit [checked] and (checkedChange) bindings remain supported for signal-based or manual state management.',
    ],
  },
  runtime: {
    supportsSSR: true,
    requiresBrowserAPIs: true,
    notes: [
      'Switch markup and state are SSR-compatible.',
      'Programmatic focus and generated IDs rely on browser-side hydration for full interactivity.',
    ],
  },
  inputs: [
    {
      name: 'checked',
      type: 'boolean',
      description: 'Whether checked (on)',
      defaultValue: 'false',
    },
    { name: 'disabled', type: 'boolean', description: 'Whether disabled', defaultValue: 'false' },
    {
      name: 'required',
      type: 'boolean',
      description: 'Whether the field is required',
      defaultValue: 'false',
    },
    { name: 'label', type: 'string', description: 'Label text displayed next to switch' },
    { name: 'size', type: "'sm' | 'md' | 'lg'", description: 'Switch size', defaultValue: "'md'" },
    { name: 'helperText', type: 'string', description: 'Helper text displayed below the switch' },
    { name: 'errorMessage', type: 'string', description: 'Error message to display' },
    { name: 'name', type: 'string', description: 'Native input name attribute' },
    { name: 'id', type: 'string', description: 'ID attribute for label association' },
    {
      name: 'ariaLabel',
      type: 'string',
      description: 'ARIA label when no visible label is present',
    },
    {
      name: 'showLabels',
      type: 'boolean',
      description: 'Show ON/OFF text labels on the switch track',
      defaultValue: 'false',
    },
    {
      name: 'onLabel',
      type: 'string',
      description: 'Custom label for the on state',
      defaultValue: "'ON'",
    },
    {
      name: 'offLabel',
      type: 'string',
      description: 'Custom label for the off state',
      defaultValue: "'OFF'",
    },
  ],
  outputs: [
    { name: 'checkedChange', type: 'boolean', description: 'Emitted when checked state changes' },
  ],
  passthroughs: [
    {
      name: 'Native switch attributes',
      type: 'passthrough',
      selector: 'name, id, checked, disabled, required',
      description:
        'Forwarded to the underlying <input type="checkbox" role="switch"> element via explicit component inputs.',
      optional: true,
    },
  ],
  theming: {
    tokens: [
      { token: '--semantic-brand-primary', description: 'Track color in the on (checked) state.' },
      {
        token: '--semantic-brand-primary-hover',
        description: 'Track hover color in the on state.',
      },
      { token: '--semantic-border-default', description: 'Track border color in the off state.' },
      { token: '--semantic-state-disabled', description: 'Appearance modifier when disabled.' },
      { token: '--semantic-surface-card', description: 'Thumb (toggle knob) background color.' },
    ],
    customizationNotes:
      'Override semantic brand tokens on an ancestor element to restyle switches in a specific context.',
  },
  examples: [
    {
      title: 'Basic Switch',
      description: 'Toggle switch for binary on/off settings',
      template: `<fui-switch label="Enable notifications" />`,
    },
    {
      title: 'Switch States',
      description: 'On and off states',
      template: `<fui-switch label="Off" [checked]="false" />
<fui-switch label="On" [checked]="true" />`,
    },
    {
      title: 'Switch Sizes',
      description: 'Three size options',
      template: `<fui-switch label="Small" size="sm" />
<fui-switch label="Medium" size="md" />
<fui-switch label="Large" size="lg" />`,
    },
    {
      title: 'Disabled Switch',
      description: 'Switch in disabled state',
      template: `<fui-switch label="Disabled off" [disabled]="true" />
<fui-switch label="Disabled on" [checked]="true" [disabled]="true" />`,
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
    screenReaderNotes:
      'Switch state (on/off) and label are announced. Disabled state is also announced.',
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
  description:
    'A native HTML select component with enhanced styling, grouped options, helper text, and validation messaging.',
  selector: 'fui-select',
  setup: {
    importStatement: "import { SelectComponent } from '@mfontecchio/components';",
    usageSnippet: `<fui-select label="Country" [options]="countries" placeholder="Choose a country" />`,
    usageTypescript: `export class MyComponent {\n  protected readonly countries = [\n    { value: 'us', label: 'United States' },\n    { value: 'uk', label: 'United Kingdom' },\n    { value: 'ca', label: 'Canada' },\n  ];\n}`,
    setupNotes:
      'No additional setup required. Add SelectComponent to the imports array of your standalone component.',
  },
  forms: {
    recommendedBinding:
      'Use formControl, formControlName, ngModel, or the explicit [value]/(valueChange) contract depending on the surrounding form architecture.',
    valueBinding: '[value]',
    changeBinding: '(valueChange)',
    supportsControlValueAccessor: true,
    supportsTemplateDrivenForms: true,
    supportsReactiveForms: true,
    notes: [
      'Supports Angular ControlValueAccessor for direct ngModel, formControl, and formControlName usage.',
      'The explicit [value] and (valueChange) bindings remain supported for signal-based or manual state management.',
    ],
  },
  runtime: {
    supportsSSR: true,
    requiresBrowserAPIs: true,
    notes: [
      'Native select rendering is SSR-compatible.',
      'Programmatic focus and generated fallback IDs rely on browser APIs after hydration.',
    ],
  },
  inputs: [
    { name: 'label', type: 'string', description: 'Label text displayed above select' },
    { name: 'placeholder', type: 'string', description: 'Placeholder text when no selection' },
    { name: 'value', type: 'string', description: 'Currently selected value' },
    { name: 'helperText', type: 'string', description: 'Helper text displayed below the select' },
    {
      name: 'disabled',
      type: 'boolean',
      description: 'Whether select is disabled',
      defaultValue: 'false',
    },
    {
      name: 'required',
      type: 'boolean',
      description: 'Whether selection is required',
      defaultValue: 'false',
    },
    {
      name: 'size',
      type: "'sm' | 'md' | 'lg'",
      description: 'Visual size of the select control',
      defaultValue: "'md'",
    },
    {
      name: 'fullWidth',
      type: 'boolean',
      description: 'Whether the select expands to the container width',
      defaultValue: 'false',
    },
    {
      name: 'name',
      type: 'string',
      description: 'Native select name attribute',
    },
    {
      name: 'id',
      type: 'string',
      description: 'ID attribute for label association and testing hooks',
    },
    {
      name: 'ariaLabel',
      type: 'string',
      description: 'Accessible name when a visible label is not present',
    },
    {
      name: 'options',
      type: 'SelectOption[]',
      description: 'Array of selectable options with optional disabled and group metadata',
      required: true,
    },
    { name: 'errorMessage', type: 'string', description: 'Error message to display' },
  ],
  outputs: [{ name: 'valueChange', type: 'string', description: 'Emitted when selection changes' }],
  methods: [
    {
      name: 'focus',
      parameters: '',
      returnType: 'void',
      description: 'Programmatically focus the native select element',
    },
  ],
  passthroughs: [
    {
      name: 'Native select attributes',
      type: 'passthrough',
      selector: 'name, id, disabled, required',
      description:
        'Forwarded to the underlying native select element via explicit component inputs.',
      optional: true,
    },
  ],
  theming: {
    tokens: [
      { token: '--semantic-surface-card', description: 'Dropdown panel background color.' },
      { token: '--semantic-border-default', description: 'Default border of the select control.' },
      { token: '--semantic-border-strong', description: 'Border color on hover.' },
      { token: '--semantic-state-focus-ring', description: 'Focus ring styling.' },
      { token: '--semantic-border-error', description: 'Border color in the error state.' },
      { token: '--semantic-state-disabled', description: 'Appearance modifier when disabled.' },
      {
        token: '--primitive-border-radius-md',
        description: 'Border radius of the control and panel.',
      },
    ],
    customizationNotes:
      'Override --semantic-* tokens on an ancestor element to restyle selects in a specific context.',
  },
  examples: [
    {
      title: 'Basic Select',
      description: 'Simple dropdown with options',
      typescript: `protected countries = [
  { value: 'us', label: 'United States' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'ca', label: 'Canada' }
];`,
      template: `<fui-select 
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
      template: `<fui-select 
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
      template: `<fui-select 
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
      template: `<fui-select 
  label="Country" 
  [options]="countries" 
  placeholder="Select country" 
  errorMessage="Country is required" 
/>`,
    },
    {
      title: 'Disabled Select',
      description: 'Non-interactive select state',
      typescript: `protected countries = [
  { value: 'us', label: 'United States' },
  { value: 'uk', label: 'United Kingdom' }
];`,
      template: `<fui-select 
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
    screenReaderNotes:
      'Selected value, label, and available options announced. Dropdown state changes announced.',
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
  selector: 'fui-multi-select',
  setup: {
    importStatement: "import { MultiSelectComponent } from '@mfontecchio/components';",
    usageSnippet: `<fui-multi-select label="Skills" [options]="skills" placeholder="Select skills" />`,
    usageTypescript: `export class MyComponent {\n  protected readonly skills = [\n    { value: 'ts', label: 'TypeScript' },\n    { value: 'angular', label: 'Angular' },\n    { value: 'rxjs', label: 'RxJS' },\n  ];\n}`,
    setupNotes:
      'No additional setup required. Add MultiSelectComponent to the imports array of your standalone component.',
  },
  forms: {
    recommendedBinding:
      'Use formControl, formControlName, ngModel, or the explicit [value]/(valueChange) contract depending on the surrounding form architecture.',
    valueBinding: '[value]',
    changeBinding: '(valueChange)',
    supportsControlValueAccessor: true,
    supportsTemplateDrivenForms: true,
    supportsReactiveForms: true,
    notes: [
      'Supports Angular ControlValueAccessor for direct ngModel, formControl, and formControlName usage with a string[] form value.',
      'The explicit [value] and (valueChange) bindings remain supported for signal-based or manual state management.',
      'When allowCreate is enabled, also handle optionCreated to persist newly created options.',
    ],
  },
  runtime: {
    supportsSSR: true,
    requiresBrowserAPIs: true,
    notes: [
      'Initial rendering is SSR-compatible.',
      'Dropdown interaction uses document-level click handling and timed focus in the browser runtime.',
    ],
  },
  inputs: [
    { name: 'label', type: 'string', description: 'Label text displayed above select' },
    { name: 'placeholder', type: 'string', description: 'Placeholder text when no selection' },
    {
      name: 'value',
      type: 'string[]',
      description: 'Array of selected values',
      defaultValue: '[]',
    },
    {
      name: 'disabled',
      type: 'boolean',
      description: 'Whether select is disabled',
      defaultValue: 'false',
    },
    {
      name: 'required',
      type: 'boolean',
      description: 'Whether the field is required',
      defaultValue: 'false',
    },
    {
      name: 'size',
      type: "'sm' | 'md' | 'lg'",
      description: 'Size of the select control',
      defaultValue: "'md'",
    },
    {
      name: 'fullWidth',
      type: 'boolean',
      description: 'Whether the select expands to container width',
      defaultValue: 'false',
    },
    {
      name: 'searchable',
      type: 'boolean',
      description: 'Enable search/filtering of options',
      defaultValue: 'true',
    },
    { name: 'helperText', type: 'string', description: 'Helper text displayed below the select' },
    { name: 'errorMessage', type: 'string', description: 'Error message to display' },
    {
      name: 'options',
      type: 'MultiSelectOption[]',
      description: 'Array of selectable options',
      required: true,
    },
  ],
  outputs: [
    { name: 'valueChange', type: 'string[]', description: 'Emitted when selection changes' },
  ],
  passthroughs: [
    {
      name: 'Native attributes',
      type: 'passthrough',
      selector: 'name, id, disabled, required',
      description:
        'Forwarded to the underlying hidden input element via explicit component inputs. Used for form submission.',
      optional: true,
    },
  ],
  theming: {
    tokens: [
      { token: '--semantic-surface-card', description: 'Dropdown panel background.' },
      { token: '--semantic-border-default', description: 'Default border of the control.' },
      { token: '--semantic-brand-primary', description: 'Background of selected option chips.' },
      { token: '--semantic-text-inverse', description: 'Text color on selected option chips.' },
      { token: '--semantic-state-focus-ring', description: 'Focus ring styling.' },
      { token: '--semantic-border-error', description: 'Border color in the error state.' },
      {
        token: '--primitive-border-radius-md',
        description: 'Border radius of the control and panel.',
      },
    ],
    customizationNotes:
      'Override --semantic-brand-primary to change the selected chip color. Scope overrides to a parent element to affect only a specific form.',
  },
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
      template: `<fui-multi-select 
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
      template: `<fui-multi-select 
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
      template: `<fui-multi-select 
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
  selector: 'fui-slider',
  setup: {
    importStatement: "import { SliderComponent } from '@mfontecchio/components';",
    usageSnippet: `<fui-slider label="Volume" [min]="0" [max]="100" [value]="50" />`,
    setupNotes:
      'No additional setup required. Add SliderComponent to the imports array of your standalone component.',
  },
  forms: {
    recommendedBinding:
      'Use formControl, formControlName, ngModel, or the explicit [value]/(valueChange) contract for single-value sliders. In range mode, prefer [(rangeValue)] and keep value/valueEnd bindings only for backward compatibility.',
    valueBinding: '[value]',
    changeBinding: '(valueChange)',
    supportsControlValueAccessor: true,
    supportsTemplateDrivenForms: true,
    supportsReactiveForms: true,
    notes: [
      'Single-value sliders support Angular ControlValueAccessor for direct ngModel, formControl, and formControlName usage.',
      'Range sliders now expose a composite [(rangeValue)] tuple for the long-term dual-handle contract.',
      'The existing value/valueChange and valueEnd/valueEndChange bindings remain supported for backward compatibility in range mode.',
      'Range mode still does not implement ControlValueAccessor; use the explicit rangeValue tuple rather than formControlName for composite values.',
    ],
  },
  runtime: {
    supportsSSR: true,
    requiresBrowserAPIs: true,
    notes: [
      'Slider rendering is SSR-compatible.',
      'Pointer and drag interactions attach document listeners in the browser runtime.',
    ],
  },
  inputs: [
    { name: 'value', type: 'number', description: 'Current slider value', defaultValue: '0' },
    { name: 'valueEnd', type: 'number', description: 'End value for range mode (dual handles)' },
    {
      name: 'rangeValue',
      type: 'readonly [number, number]',
      description: 'Preferred tuple-based value for range mode (start and end handles)',
    },
    { name: 'min', type: 'number', description: 'Minimum allowed value', defaultValue: '0' },
    { name: 'max', type: 'number', description: 'Maximum allowed value', defaultValue: '100' },
    {
      name: 'step',
      type: 'number',
      description: 'Step increment for value changes',
      defaultValue: '1',
    },
    {
      name: 'disabled',
      type: 'boolean',
      description: 'Whether slider is disabled',
      defaultValue: 'false',
    },
    { name: 'label', type: 'string', description: 'Label text displayed above slider' },
  ],
  outputs: [
    { name: 'valueChange', type: 'number', description: 'Emitted when value changes' },
    {
      name: 'valueEndChange',
      type: 'number',
      description: 'Emitted when end value changes (range mode)',
    },
    {
      name: 'rangeValueChange',
      type: 'readonly [number, number]',
      description: 'Emitted when the composite range tuple changes',
    },
  ],
  passthroughs: [
    {
      name: 'Native range attributes',
      type: 'passthrough',
      selector: 'min, max, step, value, disabled',
      description:
        'Forwarded to the underlying <input type="range"> element(s) via explicit component inputs.',
      optional: true,
    },
  ],
  theming: {
    tokens: [
      { token: '--semantic-brand-primary', description: 'Track fill color and thumb color.' },
      {
        token: '--semantic-surface-background-secondary',
        description: 'Unfilled track background.',
      },
      { token: '--semantic-state-focus-ring', description: 'Focus ring on the thumb.' },
      { token: '--semantic-state-disabled', description: 'Appearance modifier when disabled.' },
      { token: '--primitive-border-radius-full', description: 'Track and thumb border radius.' },
    ],
    customizationNotes:
      'Override --semantic-brand-primary to change the slider accent color in a given context.',
  },
  examples: [
    {
      title: 'Basic Slider',
      description: 'Simple single-handle slider',
      template: `<fui-slider 
  label="Volume" 
  [min]="0" 
  [max]="100" 
  [value]="50" 
/>`,
    },
    {
      title: 'Slider with Steps',
      description: 'Slider with defined step increments',
      template: `<fui-slider 
  label="Rating" 
  [min]="0" 
  [max]="10" 
  [step]="2" 
  [value]="6" 
/>`,
    },
    {
      title: 'Range Slider',
      description:
        'Dual-handle slider for range selection using the tuple-based rangeValue contract',
      template: `<fui-slider 
  label="Price Range" 
  [min]="0" 
  [max]="1000" 
      [(rangeValue)]="priceRange" 
/>`,
    },
    {
      title: 'Disabled Slider',
      description: 'Non-interactive slider state',
      template: `<fui-slider 
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
    screenReaderNotes:
      'Current value, minimum, maximum, and label announced. Value changes announced as user adjusts.',
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
  description:
    'A native HTML date input with a themed trigger button, helper text, and support for min/max validation in ISO date format.',
  selector: 'fui-date-picker',
  setup: {
    importStatement: "import { DatePickerComponent } from '@mfontecchio/components';",
    usageSnippet: `<fui-date-picker label="Start date" placeholder="Select a date" />`,
    setupNotes:
      'No additional setup required. Add DatePickerComponent to the imports array of your standalone component.',
  },
  forms: {
    recommendedBinding:
      'Use formControl, formControlName, ngModel, or the explicit [value]/(valueChange) contract depending on the surrounding form architecture.',
    valueBinding: '[value]',
    changeBinding: '(valueChange)',
    supportsControlValueAccessor: true,
    supportsTemplateDrivenForms: true,
    supportsReactiveForms: true,
    notes: [
      'Supports Angular ControlValueAccessor for direct ngModel, formControl, and formControlName usage.',
      'The component emits dates as YYYY-MM-DD strings, and the explicit [value]/(valueChange) bindings remain supported for signal-based or manual state management.',
    ],
  },
  runtime: {
    supportsSSR: true,
    requiresBrowserAPIs: true,
    notes: [
      'Native date input markup is SSR-compatible.',
      'Triggering showPicker is browser-dependent and gracefully falls back to focus/click behavior.',
    ],
  },
  inputs: [
    { name: 'label', type: 'string', description: 'Label text displayed above the date picker' },
    {
      name: 'placeholder',
      type: 'string',
      description: 'Placeholder text shown when no date is selected',
    },
    { name: 'value', type: 'string', description: 'Selected date in ISO format (YYYY-MM-DD)' },
    { name: 'min', type: 'string', description: 'Minimum selectable date in ISO format' },
    { name: 'max', type: 'string', description: 'Maximum selectable date in ISO format' },
    {
      name: 'disabled',
      type: 'boolean',
      description: 'Whether the date picker is disabled',
      defaultValue: 'false',
    },
    {
      name: 'helperText',
      type: 'string',
      description: 'Helper text displayed below the date picker',
    },
    { name: 'errorMessage', type: 'string', description: 'Error message to display' },
    {
      name: 'required',
      type: 'boolean',
      description: 'Whether the field is required',
      defaultValue: 'false',
    },
    {
      name: 'size',
      type: "'sm' | 'md' | 'lg'",
      description: 'Size of the date picker',
      defaultValue: "'md'",
    },
    {
      name: 'fullWidth',
      type: 'boolean',
      description: 'Whether to take full width',
      defaultValue: 'false',
    },
    { name: 'name', type: 'string', description: 'Native input name attribute' },
    {
      name: 'id',
      type: 'string',
      description: 'ID attribute for label association and testing hooks',
    },
    {
      name: 'ariaLabel',
      type: 'string',
      description: 'Accessible name when a visible label is not present',
    },
  ],
  outputs: [
    { name: 'valueChange', type: 'string', description: 'Emitted when date changes (ISO format)' },
  ],
  passthroughs: [
    {
      name: 'Native date input attributes',
      type: 'passthrough',
      selector: 'name, id, disabled, required, min, max',
      description:
        'Forwarded to the underlying <input type="date"> element via explicit component inputs.',
      optional: true,
    },
  ],
  theming: {
    tokens: [
      { token: '--semantic-surface-card', description: 'Calendar panel background.' },
      { token: '--semantic-border-default', description: 'Default border of the control.' },
      { token: '--semantic-brand-primary', description: 'Selected date highlight color.' },
      { token: '--semantic-state-focus-ring', description: 'Focus ring styling.' },
      { token: '--semantic-border-error', description: 'Border color in the error state.' },
      {
        token: '--primitive-border-radius-md',
        description: 'Border radius of the control and panel.',
      },
    ],
    customizationNotes:
      'Override --semantic-brand-primary to change the selected date accent. Scope to a parent element for context-specific calendars.',
  },
  examples: [
    {
      title: 'Basic Date Picker',
      description: 'Simple date picker with label and placeholder',
      template: `<fui-date-picker 
  label="Birth Date" 
  placeholder="Select your birth date" 
/>`,
    },
    {
      title: 'Date Picker with Pre-selected Date',
      description: 'Date picker with a default selected date',
      template: `<fui-date-picker 
  label="Appointment Date" 
  placeholder="Select date" 
  value="2024-12-15"
/>`,
    },
    {
      title: 'Date Picker with Date Range',
      description: 'Restrict selectable dates using min and max',
      template: `<fui-date-picker 
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
      template: `<fui-date-picker 
  label="Event Date" 
  placeholder="Select date"
  [required]="true"
  helperText="This field is required"
/>`,
    },
    {
      title: 'Date Picker with Error',
      description: 'Date picker displaying an error message',
      template: `<fui-date-picker 
  label="Expiry Date" 
  placeholder="Select expiry date"
  errorMessage="Please select a valid expiry date"
/>`,
    },
    {
      title: 'Disabled Date Picker',
      description: 'Date picker in a disabled state',
      template: `<fui-date-picker 
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
  <fui-date-picker 
    label="Check-in Date" 
    placeholder="Select check-in date"
    [required]="true"
    helperText="Select your arrival date"
  />
  <fui-date-picker 
    label="Check-out Date" 
    placeholder="Select check-out date"
    [required]="true"
    helperText="Select your departure date"
  />
</div>`,
    },
  ],
  accessibility: {
    ariaSupport: [
      'Native date input semantics and browser accessibility support',
      'aria-required for mandatory fields',
      'aria-describedby links helper and error text to the input',
      'Themed trigger button opens the native picker when supported by the browser',
    ],
    keyboardNavigation: [
      {
        key: 'Tab',
        description: 'Move focus between the input, trigger button, and surrounding controls',
      },
      {
        key: 'Enter/Space',
        description: 'Open the native date picker from the trigger button when supported',
      },
      {
        key: 'Arrow Keys',
        description: 'Navigate the browser-provided date UI when the native picker is open',
      },
    ],
    screenReaderNotes:
      'The label, helper text, errors, and selected ISO date value are announced by assistive technology. Native browser date controls determine the detailed calendar narration.',
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
  description:
    'A comprehensive file upload component with drag-and-drop support, file type validation, size restrictions, and file preview. Supports both single and multiple file uploads with progress indication.',
  selector: 'fui-file-upload',
  setup: {
    importStatement: "import { FileUploadComponent } from '@mfontecchio/components';",
    usageSnippet: `<fui-file-upload label="Upload documents" />`,
    setupNotes:
      'No additional setup required. Add FileUploadComponent to the imports array of your standalone component.',
  },
  forms: {
    recommendedBinding:
      'Handle uploads as an event-driven interaction. Listen to (filesSelected) and patch application state or a form model manually.',
    changeBinding: '(filesSelected)',
    supportsControlValueAccessor: false,
    supportsTemplateDrivenForms: false,
    supportsReactiveForms: false,
    notes: [
      'The internal native file input is not exposed as a ControlValueAccessor because browsers restrict programmatic file value assignment.',
      'Use filesSelected to update your own upload queue or FormData builder and fileRemoved to keep that state in sync.',
    ],
  },
  runtime: {
    supportsSSR: false,
    requiresBrowserAPIs: true,
    notes: [
      'File objects, drag-and-drop, and FileReader previews are browser-only capabilities.',
      'Render file upload components conditionally in SSR routes when file interaction is not required.',
    ],
  },
  inputs: [
    { name: 'label', type: 'string', description: 'Label text displayed above the upload area' },
    {
      name: 'accept',
      type: 'string',
      description: 'Accepted file types (e.g., ".pdf,.jpg,.png" or "image/*")',
    },
    {
      name: 'multiple',
      type: 'boolean',
      description: 'Allow multiple file uploads',
      defaultValue: 'false',
    },
    {
      name: 'disabled',
      type: 'boolean',
      description: 'Whether the upload is disabled',
      defaultValue: 'false',
    },
    {
      name: 'maxSize',
      type: 'number',
      description: 'Maximum file size in bytes (e.g., 5242880 for 5MB)',
      defaultValue: '5242880',
    },
    {
      name: 'maxFiles',
      type: 'number',
      description: 'Maximum number of files allowed',
      defaultValue: '10',
    },
    {
      name: 'showPreview',
      type: 'boolean',
      description: 'Show preview for images',
      defaultValue: 'true',
    },
    {
      name: 'helperText',
      type: 'string',
      description: 'Helper text displayed below the upload area',
    },
    { name: 'errorMessage', type: 'string', description: 'Error message to display' },
  ],
  outputs: [
    {
      name: 'filesSelected',
      type: 'File[]',
      description: 'Emitted when files are selected or dropped',
    },
    { name: 'fileRemoved', type: 'File', description: 'Emitted when a file is removed' },
  ],
  passthroughs: [
    {
      name: 'Native file input attributes',
      type: 'passthrough',
      selector: 'accept, multiple, disabled',
      description:
        'Forwarded to the underlying <input type="file"> element via explicit component inputs. Use accept to filter allowed file types.',
      optional: true,
    },
  ],
  theming: {
    tokens: [
      {
        token: '--semantic-border-default',
        description: 'Dropzone border color in the idle state.',
      },
      { token: '--semantic-brand-primary', description: 'Accent color on hover/drag-over.' },
      {
        token: '--semantic-brand-primary-subtle',
        description: 'Dropzone background on drag-over.',
      },
      {
        token: '--semantic-surface-background-secondary',
        description: 'Dropzone idle background.',
      },
      { token: '--semantic-border-error', description: 'Border color in the error state.' },
      { token: '--primitive-border-radius-md', description: 'Border radius of the dropzone.' },
    ],
    customizationNotes:
      'Override --semantic-brand-primary to change the drag-over accent. Scope to a parent element for isolated forms.',
  },
  examples: [
    {
      title: 'Basic File Upload',
      description: 'Simple single file upload',
      template: `<fui-file-upload 
  label="Upload File" 
  helperText="Choose a file to upload"
/>`,
    },
    {
      title: 'Multiple File Upload',
      description: 'Upload multiple files at once',
      template: `<fui-file-upload 
  label="Upload Documents" 
  [multiple]="true"
  helperText="You can select multiple files"
/>`,
    },
    {
      title: 'File Type Restrictions',
      description: 'Restrict upload to specific file types',
      template: `<fui-file-upload 
  label="Upload PDF Documents" 
  accept=".pdf"
  helperText="Only PDF files are accepted"
/>`,
    },
    {
      title: 'Image Upload',
      description: 'Upload images with preview',
      template: `<fui-file-upload 
  label="Upload Images" 
  accept="image/*"
  [multiple]="true"
  helperText="Supports JPG, PNG, GIF, and WebP"
/>`,
    },
    {
      title: 'File Size Limit',
      description: 'Restrict maximum file size',
      template: `<fui-file-upload 
  label="Upload Profile Picture" 
  accept="image/*"
  [maxSize]="2097152"
  helperText="Maximum file size: 2MB"
/>`,
    },
    {
      title: 'File Upload with Error',
      description: 'File upload displaying an error message',
      template: `<fui-file-upload 
  label="Upload Resume" 
  accept=".pdf,.doc,.docx"
  errorMessage="File size exceeds the maximum limit of 10MB"
  helperText="Please upload your resume (PDF or Word)"
/>`,
    },
    {
      title: 'Disabled Upload',
      description: 'File upload in a disabled state',
      template: `<fui-file-upload 
  label="Upload Disabled" 
  [disabled]="true"
  helperText="File upload is currently disabled"
/>`,
    },
    {
      title: 'Document Upload Form',
      description: 'Real-world example of a document submission form',
      template: `<div style="display: flex; flex-direction: column; gap: 16px;">
  <fui-file-upload 
    label="Upload Identity Document" 
    accept=".pdf,.jpg,.png"
    helperText="Upload a PDF or image of your ID (max 5MB)"
    [maxSize]="5242880"
  />
  <fui-file-upload 
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
    ariaSupport: [
      'Drag-and-drop with keyboard alternatives',
      'File list announced to screen readers',
      'Upload progress and status announced',
      'Error messages associated with upload area',
    ],
    keyboardNavigation: [
      { key: 'Enter/Space', description: 'Open file browser dialog' },
      { key: 'Tab', description: 'Navigate to file upload button' },
      { key: 'Delete/Backspace', description: 'Remove selected file from list' },
    ],
    screenReaderNotes:
      'File names, types, sizes, and upload status are announced. Validation errors and file restrictions are communicated clearly.',
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
  description:
    'A versatile container component for grouping related content with optional header and footer.',
  selector: 'fui-card',
  setup: {
    importStatement: "import { CardComponent } from '@mfontecchio/components';",
    usageSnippet: `<fui-card>\n  <div header>Card Title</div>\n  <p>Card content goes here.</p>\n  <div footer>Footer actions</div>\n</fui-card>`,
    setupNotes:
      'No additional setup required. Add CardComponent to the imports array of your standalone component. Use [header] and [footer] attributes to project content into the header and footer slots.',
  },
  runtime: {
    supportsSSR: true,
    requiresBrowserAPIs: false,
    notes: [
      'Card rendering is fully SSR-friendly with no browser-only dependencies for core behavior.',
    ],
  },
  inputs: [
    {
      name: 'variant',
      type: "'elevated' | 'outlined' | 'filled'",
      description: 'Visual style variant',
      defaultValue: "'elevated'",
    },
    {
      name: 'fullWidth',
      type: 'boolean',
      description: 'Whether the card expands to the full width of its container',
      defaultValue: 'false',
    },
    {
      name: 'interactive',
      type: 'boolean',
      description: 'Adds hover and focus effects for clickable card patterns',
      defaultValue: 'false',
    },
    {
      name: 'noPadding',
      type: 'boolean',
      description:
        'Removes the default card padding (useful for full-bleed images or custom layouts)',
      defaultValue: 'false',
    },
    {
      name: 'ariaLabel',
      type: 'string',
      description: 'ARIA label for the card region',
    },
    {
      name: 'ariaLabelledBy',
      type: 'string',
      description: 'ID of an element that labels this card (for landmark regions)',
    },
  ],
  outputs: [],
  passthroughs: [
    {
      name: 'Header slot',
      type: 'slot',
      selector: '[header]',
      description:
        'Content projected into the card header region. Hidden when empty. Apply the header attribute to a child element.',
      optional: true,
    },
    {
      name: 'Default content',
      type: 'slot',
      selector: '(default)',
      description:
        'Primary card body content — rendered inside fui-card__body with standard padding.',
      optional: true,
    },
    {
      name: 'Footer slot',
      type: 'slot',
      selector: '[footer]',
      description:
        'Content projected into the card footer region. Hidden when empty. Apply the footer attribute to a child element.',
      optional: true,
    },
  ],
  theming: {
    tokens: [
      { token: '--component-card-background', description: 'Card surface background color.' },
      { token: '--component-card-border-radius', description: 'Corner radius of the card.' },
      {
        token: '--component-card-padding',
        description: 'Padding applied to header, body, and footer sections.',
      },
      { token: '--component-card-shadow', description: 'Box shadow for the elevated variant.' },
      {
        token: '--component-card-shadow-hover',
        description: 'Box shadow when hovered in interactive mode.',
      },
      { token: '--component-card-border', description: 'Border color for the outlined variant.' },
    ],
    customizationNotes:
      'Override --component-card-* tokens on an ancestor element. For example: .tight-card { --component-card-padding: var(--primitive-spacing-3); }.',
  },
  examples: [
    {
      title: 'Basic Card',
      description: 'Container for grouping related content',
      template: `<fui-card>
  <h3>Card Title</h3>
  <p>Card content goes here...</p>
</fui-card>`,
    },
    {
      title: 'Card Variants',
      description: 'Three visual styles: elevated (shadow), outlined (border), filled (background)',
      template: `<fui-card variant="elevated">
  <h3>Elevated Card</h3>
  <p>Card with shadow elevation</p>
</fui-card>

<fui-card variant="outlined">
  <h3>Outlined Card</h3>
  <p>Card with border only</p>
</fui-card>

<fui-card variant="filled">
  <h3>Filled Card</h3>
  <p>Card with background fill</p>
</fui-card>`,
    },
  ],
  accessibility: {
    ariaSupport: [
      'Semantic HTML structure',
      'Optional role="region" with aria-label for landmark cards',
    ],
    keyboardNavigation: [],
    screenReaderNotes:
      'Card structure and content are announced. Use aria-label when card represents a significant region.',
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
  description:
    'A dialog overlay component for focused user interactions with backdrop and animations.',
  selector: 'fui-modal',
  setup: {
    importStatement: "import { ModalComponent } from '@mfontecchio/components';",
    usageSnippet: `<button (click)="isOpen.set(true)">Open Modal</button>\n<fui-modal [open]="isOpen()" title="Hello" (openChange)="isOpen.set($event)">\n  <p>Modal content goes here.</p>\n  <div slot="footer">\n    <fui-button (clicked)="isOpen.set(false)">Close</fui-button>\n  </div>\n</fui-modal>`,
    usageTypescript: `import { signal } from '@angular/core';\n\nexport class MyComponent {\n  protected readonly isOpen = signal(false);\n}`,
    setupNotes:
      'Import signal from @angular/core. Add ModalComponent to the imports array of your standalone component.',
  },
  runtime: {
    supportsSSR: true,
    requiresBrowserAPIs: true,
    notes: [
      'Markup is SSR-compatible, while dialog open/close lifecycle runs in the browser after hydration.',
      'Body scroll locking relies on browser document APIs.',
    ],
  },
  inputs: [
    {
      name: 'open',
      type: 'boolean',
      description: 'Whether modal is visible',
      defaultValue: 'false',
    },
    { name: 'title', type: 'string', description: 'Modal title text' },
    {
      name: 'size',
      type: "'sm' | 'md' | 'lg' | 'xl' | 'full'",
      description: 'Modal width size',
      defaultValue: "'md'",
    },
    {
      name: 'showClose',
      type: 'boolean',
      description: 'Whether to display the close button',
      defaultValue: 'true',
    },
    {
      name: 'closeOnBackdropClick',
      type: 'boolean',
      description: 'Close when clicking backdrop',
      defaultValue: 'true',
    },
    {
      name: 'closeOnEscape',
      type: 'boolean',
      description: 'Close on Escape key press',
      defaultValue: 'true',
    },
    {
      name: 'preventBodyScroll',
      type: 'boolean',
      description: 'Prevent body scrolling while the modal is open',
      defaultValue: 'true',
    },
    {
      name: 'ariaLabel',
      type: 'string',
      description: 'ARIA label for the dialog element',
    },
    {
      name: 'ariaLabelledby',
      type: 'string',
      description: 'ID of the element that labels the dialog',
    },
  ],
  outputs: [
    { name: 'openChange', type: 'boolean', description: 'Emitted when open state changes' },
    { name: 'closed', type: 'void', description: 'Emitted when modal is closed' },
  ],
  passthroughs: [
    {
      name: 'Default content',
      type: 'slot',
      selector: '(default)',
      description:
        'Primary modal body content — rendered inside the scrollable fui-modal-body area.',
      optional: true,
    },
    {
      name: 'Footer slot',
      type: 'slot',
      selector: "[slot='footer']",
      description:
        "Content projected into the modal footer area, typically action buttons. Apply slot='footer' to a child element.",
      optional: true,
    },
    {
      name: 'Native dialog attributes',
      type: 'passthrough',
      selector: 'aria-label, aria-labelledby',
      description:
        'Forwarded to the underlying native <dialog> element. The component also sets aria-labelledby automatically when a title is provided.',
      optional: true,
    },
  ],
  theming: {
    tokens: [
      { token: '--semantic-surface-overlay', description: 'Backdrop overlay color.' },
      { token: '--semantic-surface-card', description: 'Modal panel background.' },
      { token: '--primitive-shadow-2xl', description: 'Box shadow of the modal panel.' },
      { token: '--primitive-border-radius-lg', description: 'Corner radius of the modal panel.' },
      { token: '--semantic-border-subtle', description: 'Border between header and body.' },
      {
        token: '--semantic-animation-duration-component',
        description: 'Entry/exit animation duration.',
      },
    ],
    customizationNotes:
      'Override semantic surface tokens to restyle the backdrop or panel. Avoid sizing the modal with CSS — use the size input instead.',
  },
  examples: [
    {
      title: 'Basic Modal',
      description: 'Simple dialog with title',
      typescript: `protected isOpen = signal(false);`,
      template: `<button (click)="isOpen.set(true)">Open Modal</button>
<fui-modal [open]="isOpen()" title="Confirm Action" (closed)="isOpen.set(false)">
  <p>Are you sure you want to proceed?</p>
</fui-modal>`,
    },
    {
      title: 'Modal Sizes',
      description: 'Different modal widths',
      typescript: `protected showSmall = signal(false);`,
      template: `<fui-modal [open]="showSmall()" title="Small Modal" size="sm">
  <p>Small modal content</p>
</fui-modal>`,
    },
    {
      title: 'Modal without Backdrop Close',
      description: 'Prevent closing by clicking outside',
      typescript: `protected isOpen = signal(false);`,
      template: `<fui-modal [open]="isOpen()" title="Important" [closeOnBackdrop]="false">
  <p>You must use the close button.</p>
</fui-modal>`,
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
    screenReaderNotes:
      'Modal announced as dialog. Focus automatically moves into modal when opened and returns to trigger when closed.',
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
  selector: 'fui-tabs',
  setup: {
    importStatement: "import { TabsComponent, TabComponent } from '@mfontecchio/components';",
    usageSnippet: `<fui-tabs>\n  <fui-tab label="First">First tab content</fui-tab>\n  <fui-tab label="Second">Second tab content</fui-tab>\n</fui-tabs>`,
    setupNotes:
      'Import both TabsComponent and TabComponent. Both must be in the imports array of your standalone component.',
  },
  runtime: {
    supportsSSR: true,
    requiresBrowserAPIs: true,
    notes: [
      'Tabs render correctly during SSR.',
      'Indicator positioning and interactive focus behavior rely on browser DOM measurements after hydration.',
    ],
  },
  inputs: [
    {
      name: 'activeIndex',
      type: 'number',
      description: 'Currently active tab index (0-based)',
      defaultValue: '0',
    },
    {
      name: 'orientation',
      type: "'horizontal' | 'vertical'",
      description: 'Tab list orientation',
      defaultValue: "'horizontal'",
    },
    {
      name: 'size',
      type: "'sm' | 'md' | 'lg'",
      description: 'Tab button size',
      defaultValue: "'md'",
    },
    {
      name: 'fullWidth',
      type: 'boolean',
      description: 'Tabs expand to fill container width',
      defaultValue: 'false',
    },
  ],
  outputs: [
    { name: 'activeIndexChange', type: 'number', description: 'Emitted when active tab changes' },
  ],
  passthroughs: [
    {
      name: 'Tab children',
      type: 'slot',
      selector: 'fui-tab',
      description:
        'Place fui-tab components as direct children of fui-tabs. Each tab provides a label input and projects its own content.',
      optional: false,
    },
    {
      name: 'Tab default content',
      type: 'slot',
      selector: '(default inside fui-tab)',
      description:
        'Content inside each fui-tab element is projected into the tab panel area when that tab is active.',
      optional: true,
    },
  ],
  theming: {
    tokens: [
      { token: '--semantic-surface-card', description: 'Tab list and panel background.' },
      { token: '--semantic-brand-primary', description: 'Active tab indicator color.' },
      { token: '--semantic-text-primary', description: 'Active tab label color.' },
      { token: '--semantic-text-secondary', description: 'Inactive tab label color.' },
      { token: '--semantic-text-disabled', description: 'Disabled tab label color.' },
      { token: '--semantic-state-focus-ring', description: 'Focus ring on tab buttons.' },
      { token: '--semantic-border-subtle', description: 'Tab list bottom border.' },
    ],
    customizationNotes:
      'Override --semantic-brand-primary to change the active indicator color. Scope to a parent element for section-specific tab styles.',
  },
  examples: [
    {
      title: 'Basic Tabs',
      description: 'Simple tabbed interface',
      template: `<fui-tabs>
  <fui-tab label="Profile">
    <h3>Profile Information</h3>
    <p>User profile content goes here.</p>
  </fui-tab>
  <fui-tab label="Settings">
    <h3>Settings</h3>
    <p>User settings content goes here.</p>
  </fui-tab>
  <fui-tab label="Notifications">
    <h3>Notifications</h3>
    <p>Notification preferences go here.</p>
  </fui-tab>
</fui-tabs>`,
    },
    {
      title: 'Vertical Tabs',
      description: 'Side-by-side tab layout',
      template: `<fui-tabs orientation="vertical">
  <fui-tab label="General">General settings</fui-tab>
  <fui-tab label="Security">Security settings</fui-tab>
  <fui-tab label="Privacy">Privacy settings</fui-tab>
</fui-tabs>`,
    },
    {
      title: 'Tab Sizes',
      description: 'Three size options',
      template: `<fui-tabs size="sm">
  <fui-tab label="Small">Small tab content</fui-tab>
  <fui-tab label="Tab 2">Content 2</fui-tab>
</fui-tabs>`,
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
    screenReaderNotes:
      'Tab labels, current selection, and panel content announced. Total number of tabs announced when entering tablist.',
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
  description:
    'A vertically stacked set of collapsible content panels for organizing information. Supports single or multiple expansion modes and composable styling flags for card, flush, and list presentations.',
  selector: 'fui-accordion',
  setup: {
    importStatement:
      "import { AccordionComponent, AccordionItemComponent } from '@mfontecchio/components';",
    usageSnippet: `<fui-accordion>
  <fui-accordion-item title="Section 1">Content for section 1</fui-accordion-item>
  <fui-accordion-item title="Section 2">Content for section 2</fui-accordion-item>
</fui-accordion>`,
    setupNotes:
      'Add both AccordionComponent and AccordionItemComponent to the imports array of your standalone component.',
  },
  runtime: {
    supportsSSR: true,
    requiresBrowserAPIs: false,
    notes: ['Accordion content and expansion state are SSR-friendly.'],
  },
  inputs: [
    {
      name: 'mode',
      type: "'single' | 'multiple'",
      description: 'Expansion mode. Single allows one panel open at a time; multiple allows many.',
      defaultValue: "'single'",
    },
    {
      name: 'expanded',
      type: 'number[]',
      description: 'Array of item indices that should be expanded on initialisation.',
      defaultValue: '[]',
    },
    {
      name: 'bordered',
      type: 'boolean',
      description:
        'Whether to render a border and border-radius around the entire accordion container. Set to false for flush or nav-list contexts.',
      defaultValue: 'true',
    },
    {
      name: 'highlightExpanded',
      type: 'boolean',
      description:
        'Whether to apply a background tint and brand-coloured chevron to the currently expanded item header. Set to false for minimal or list contexts.',
      defaultValue: 'true',
    },
    {
      name: 'dividers',
      type: 'boolean',
      description:
        'Whether to render separator lines between accordion items. Set to false for a fully plain expandable list.',
      defaultValue: 'true',
    },
  ],
  outputs: [
    {
      name: 'expandedChange',
      type: 'number[]',
      description: 'Emitted when the expansion state changes, carrying the updated index array.',
    },
  ],
  passthroughs: [
    {
      name: 'fui-accordion-item',
      type: 'slot',
      selector: 'fui-accordion-item',
      description:
        'One or more AccordionItemComponent children projected as content. Each item declares its title and disabled state as inputs; body content is projected inside the item tag.',
      optional: false,
    },
  ],
  theming: {
    tokens: [
      {
        token: '--semantic-surface-card',
        description:
          'Header and panel background. Applied when bordered or highlightExpanded is true.',
      },
      {
        token: '--semantic-border-default',
        description: 'Outer container border color. Applied when bordered is true.',
      },
      {
        token: '--semantic-border-subtle',
        description: 'Separator line between items. Applied when dividers is true.',
      },
      {
        token: '--semantic-brand-primary',
        description:
          'Expanded chevron icon accent color. Applied when highlightExpanded is true.',
      },
      {
        token: '--semantic-surface-background-secondary',
        description:
          'Expanded header hover and highlight background. Applied when highlightExpanded is true.',
      },
      {
        token: '--semantic-animation-duration-component',
        description: 'Panel open/close animation duration.',
      },
      {
        token: '--primitive-border-radius-md',
        description: 'Corner radius of the outer container. Applied when bordered is true.',
      },
    ],
    customizationNotes:
      'Override --semantic-brand-primary to change the expanded-icon accent. The bordered, highlightExpanded, and dividers inputs allow structural visual changes without token overrides. Scope any token overrides to a parent element to avoid unintended global impact.',
  },
  examples: [
    {
      title: 'Default Card Accordion',
      description: 'Standard bordered accordion with a single panel open at a time.',
      template: `<fui-accordion mode="single">
  <fui-accordion-item title="Personal Information">
    <p>Name, email, and contact details.</p>
  </fui-accordion-item>
  <fui-accordion-item title="Security Settings">
    <p>Password and authentication options.</p>
  </fui-accordion-item>
  <fui-accordion-item title="Notifications">
    <p>Email and push notification preferences.</p>
  </fui-accordion-item>
</fui-accordion>`,
    },
    {
      title: 'Multiple Expansion',
      description: 'Multiple panels can be open simultaneously.',
      template: `<fui-accordion mode="multiple">
  <fui-accordion-item title="What is included?">Full component library with theming support.</fui-accordion-item>
  <fui-accordion-item title="How do I install it?">Run pnpm add @mfontecchio/components.</fui-accordion-item>
  <fui-accordion-item title="Is SSR supported?">Yes, all components are SSR-compatible.</fui-accordion-item>
</fui-accordion>`,
    },
    {
      title: 'Pre-expanded Items',
      description: 'Accordion with items open by default.',
      template: `<fui-accordion [expanded]="[0]">
  <fui-accordion-item title="Getting Started">Welcome guide content.</fui-accordion-item>
  <fui-accordion-item title="Advanced Features">Advanced configuration topics.</fui-accordion-item>
</fui-accordion>`,
    },
    {
      title: 'Flush / Borderless',
      description:
        'Removes the outer border. Useful when the accordion sits inside an existing card or panel surface.',
      template: `<fui-accordion [bordered]="false">
  <fui-accordion-item title="Billing">Manage your payment methods.</fui-accordion-item>
  <fui-accordion-item title="Subscriptions">View active plans.</fui-accordion-item>
</fui-accordion>`,
    },
    {
      title: 'Expandable Navigation List',
      description:
        'All styling flags disabled — renders a plain expandable list ideal for nested navigation groups or sidebar menus.',
      template: `<fui-accordion
  mode="multiple"
  [bordered]="false"
  [highlightExpanded]="false"
  [dividers]="false"
>
  <fui-accordion-item title="Components">
    <nav class="sidebar-nav">
      <a href="/components/button" class="sidebar-nav__link">Button</a>
      <a href="/components/input" class="sidebar-nav__link">Input</a>
    </nav>
  </fui-accordion-item>
  <fui-accordion-item title="Getting Started">
    <nav class="sidebar-nav">
      <a href="/getting-started/installation" class="sidebar-nav__link">Installation</a>
      <a href="/getting-started/theming" class="sidebar-nav__link">Theming</a>
    </nav>
  </fui-accordion-item>
</fui-accordion>`,
    },
  ],
  accessibility: {
    ariaSupport: [
      'role="region" on accordion panels',
      'aria-expanded on header buttons indicates panel state',
      'aria-controls links each header button to its panel',
      'aria-labelledby links each panel back to its header',
      'disabled items carry the disabled attribute and are skipped by keyboard navigation',
    ],
    keyboardNavigation: [
      { key: 'Enter / Space', description: 'Toggle panel expansion' },
      { key: 'Arrow Down', description: 'Move focus to next header' },
      { key: 'Arrow Up', description: 'Move focus to previous header' },
      { key: 'Home', description: 'Move focus to first header' },
      { key: 'End', description: 'Move focus to last header' },
    ],
    screenReaderNotes:
      'Panel expanded/collapsed state and body content are announced on toggle. Header buttons carry descriptive labels. Disabled items are announced as unavailable.',
  },
  bestPractices: [
    'Use for FAQs, settings sections, and progressive disclosure of content',
    'Keep panel titles concise and descriptive — they are the primary navigation affordance',
    'Use single mode for mutually exclusive content sections',
    'Use multiple mode for independent content sections that users may compare',
    'Use [bordered]="false" when embedding the accordion inside an existing card or panel',
    'Use [highlightExpanded]="false" [dividers]="false" [bordered]="false" for sidebar navigation groups',
    'Limit to 5–7 panels for best user experience; split longer sets into separate sections',
    'Avoid nesting accordions within accordions — prefer tabs or a flat list instead',
  ],
  relatedComponents: ['tabs', 'list', 'navbar'],
};

const DIVIDER_METADATA: ComponentMetadata = {
  id: 'divider',
  name: 'Divider',
  category: 'layout',
  description: 'A visual separator for content sections with customizable styles.',
  selector: 'fui-divider',
  setup: {
    importStatement: "import { DividerComponent } from '@mfontecchio/components';",
    usageSnippet: `<fui-divider />`,
    setupNotes:
      'No additional setup required. Add DividerComponent to the imports array of your standalone component.',
  },
  runtime: {
    supportsSSR: true,
    requiresBrowserAPIs: false,
    notes: [
      'Divider is purely presentational and safe for SSR with no runtime browser dependency.',
    ],
  },
  inputs: [
    {
      name: 'orientation',
      type: "'horizontal' | 'vertical'",
      description: 'Divider direction',
      defaultValue: "'horizontal'",
    },
    {
      name: 'label',
      type: 'string',
      description: 'Optional text label displayed in the center of the divider',
    },
    {
      name: 'align',
      type: "'left' | 'center' | 'right'",
      description: 'Text alignment when a label is provided',
      defaultValue: "'center'",
    },
    {
      name: 'dashed',
      type: 'boolean',
      description: 'Render the divider as a dashed line',
      defaultValue: 'false',
    },
  ],
  outputs: [],
  passthroughs: [],
  theming: {
    tokens: [
      {
        token: '--semantic-border-subtle',
        description: 'Line color for horizontal and vertical dividers.',
      },
      {
        token: '--semantic-border-default',
        description: 'Alternative line color for the dashed variant.',
      },
      { token: '--semantic-text-secondary', description: 'Color of optional label text.' },
      { token: '--primitive-font-size-sm', description: 'Label font size.' },
    ],
    customizationNotes:
      'Override --semantic-border-subtle on an ancestor to restyle all dividers in a section.',
  },
  examples: [
    {
      title: 'Horizontal Divider',
      description: 'Default separator between sections',
      template: `<div>Section 1</div>
<fui-divider />
<div>Section 2</div>`,
    },
    {
      title: 'Divider Variants',
      description: 'Different line styles',
      template: `<fui-divider variant="solid" />
<fui-divider variant="dashed" />
<fui-divider variant="dotted" />`,
    },
    {
      title: 'Vertical Divider',
      description: 'Separator for inline elements',
      template: `<div style="display: flex; align-items: center; gap: 16px;">
  <span>Item 1</span>
  <fui-divider orientation="vertical" style="height: 24px;" />
  <span>Item 2</span>
  <fui-divider orientation="vertical" style="height: 24px;" />
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
    screenReaderNotes:
      'Announced as separator between sections. Can be hidden from screen readers if purely decorative.',
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
  description:
    'A slide-in panel component that appears from the edge of the screen for navigation or content.',
  selector: 'fui-drawer',
  setup: {
    importStatement: "import { DrawerComponent } from '@mfontecchio/components';",
    usageSnippet: `<button (click)="isOpen.set(true)">Open Drawer</button>\n<fui-drawer [open]="isOpen()" title="Settings" (closed)="isOpen.set(false)">\n  <p>Drawer content goes here.</p>\n  <div footer>\n    <fui-button (clicked)="isOpen.set(false)">Done</fui-button>\n  </div>\n</fui-drawer>`,
    usageTypescript: `import { signal } from '@angular/core';\n\nexport class MyComponent {\n  protected readonly isOpen = signal(false);\n}`,
    setupNotes:
      'Import signal from @angular/core. Add DrawerComponent to the imports array of your standalone component.',
  },
  runtime: {
    supportsSSR: true,
    requiresBrowserAPIs: true,
    notes: [
      'Drawer markup is SSR-compatible.',
      'Dialog state transitions and body scroll locking rely on browser document and window APIs.',
    ],
  },
  inputs: [
    {
      name: 'open',
      type: 'boolean',
      description: 'Whether drawer is visible',
      defaultValue: 'false',
    },
    {
      name: 'position',
      type: "'left' | 'right' | 'top' | 'bottom'",
      description: 'Edge from which drawer slides',
      defaultValue: "'right'",
    },
    {
      name: 'size',
      type: "'sm' | 'md' | 'lg' | 'xl' | 'full'",
      description: 'Drawer width/height',
      defaultValue: "'md'",
    },
    { name: 'title', type: 'string', description: 'Drawer title text' },
    {
      name: 'showBackdrop',
      type: 'boolean',
      description: 'Show backdrop overlay',
      defaultValue: 'true',
    },
  ],
  outputs: [
    { name: 'openChange', type: 'boolean', description: 'Emitted when open state changes' },
    { name: 'closed', type: 'void', description: 'Emitted when drawer is closed' },
  ],
  passthroughs: [
    {
      name: 'Default content',
      type: 'slot',
      selector: '(default)',
      description:
        'Primary drawer body content — rendered inside the scrollable fui-drawer-content area.',
      optional: true,
    },
    {
      name: 'Footer slot',
      type: 'slot',
      selector: '[footer]',
      description:
        'Content projected into the drawer footer, typically action buttons. Apply the footer attribute to a child element.',
      optional: true,
    },
    {
      name: 'Native dialog attributes',
      type: 'passthrough',
      selector: 'aria-label, aria-labelledby',
      description:
        'Forwarded to the underlying native <dialog> element. The component also sets aria-labelledby automatically when a title is provided.',
      optional: true,
    },
  ],
  theming: {
    tokens: [
      { token: '--semantic-surface-card', description: 'Drawer panel background.' },
      { token: '--semantic-surface-overlay', description: 'Backdrop overlay color.' },
      { token: '--primitive-shadow-xl', description: 'Panel box shadow.' },
      { token: '--semantic-border-subtle', description: 'Footer top border.' },
      {
        token: '--semantic-animation-duration-component',
        description: 'Slide in/out animation duration.',
      },
    ],
    customizationNotes:
      'Override --semantic-surface-card to change the drawer panel background. Avoid sizing the panel with CSS — use the size input instead.',
  },
  examples: [
    {
      title: 'Left Drawer',
      description: 'Navigation drawer sliding from left',
      typescript: `protected isOpen = signal(false);`,
      template: `<button (click)="isOpen.set(true)">Open Navigation</button>
<fui-drawer [open]="isOpen()" title="Navigation" position="left" (openChange)="isOpen.set($event)">
  <nav>
    <a href="/dashboard">Dashboard</a>
    <a href="/settings">Settings</a>
    <a href="/profile">Profile</a>
  </nav>
</fui-drawer>`,
    },
    {
      title: 'Right Drawer',
      description: 'Settings or filters drawer from right',
      typescript: `protected showSettings = signal(false);`,
      template: `<button (click)="showSettings.set(true)">Open Settings</button>
<fui-drawer [open]="showSettings()" title="Settings" position="right" (openChange)="showSettings.set($event)">
  <div>Settings content...</div>
</fui-drawer>`,
    },
    {
      title: 'Top Drawer',
      description: 'Notification panel from top',
      typescript: `protected showNotifications = signal(false);`,
      template: `<button (click)="showNotifications.set(true)">Show Notifications</button>
<fui-drawer [open]="showNotifications()" title="Notifications" position="top" (openChange)="showNotifications.set($event)">
  <p>You have 3 new notifications</p>
</fui-drawer>`,
    },
    {
      title: 'Bottom Drawer',
      description: 'Action sheet from bottom',
      typescript: `protected showActions = signal(false);`,
      template: `<button (click)="showActions.set(true)">Show Actions</button>
<fui-drawer [open]="showActions()" title="Actions" position="bottom" (openChange)="showActions.set($event)">
  <button>Edit</button>
  <button>Delete</button>
</fui-drawer>`,
    },
    {
      title: 'Drawer with Footer',
      description: 'Enhanced drawer with action buttons in footer',
      typescript: `protected showForm = signal(false);`,
      template: `<button (click)="showForm.set(true)">Edit Profile</button>
<fui-drawer [open]="showForm()" title="Edit Profile" (openChange)="showForm.set($event)">
  <form>
    <input type="text" placeholder="Name" />
    <input type="email" placeholder="Email" />
  </form>
  <div footer>
    <button (click)="showForm.set(false)">Cancel</button>
    <button>Save Changes</button>
  </div>
</fui-drawer>`,
    },
    {
      title: 'Drawer Sizes',
      description: 'Different drawer sizes (sm, md, lg, xl)',
      typescript: `protected isOpen = signal(false);`,
      template: `<button (click)="isOpen.set(true)">Small Drawer</button>
<fui-drawer [open]="isOpen()" title="Small Drawer" size="sm" (openChange)="isOpen.set($event)">
  <p>Compact drawer for simple content.</p>
</fui-drawer>`,
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
    screenReaderNotes:
      'Drawer announced as dialog. Focus moves into drawer when opened, returns to trigger when closed.',
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
  description:
    'A layout component for arranging children in a vertical or horizontal stack with consistent spacing.',
  selector: 'fui-stack',
  setup: {
    importStatement: "import { StackComponent } from '@mfontecchio/components';",
    usageSnippet: `<fui-stack direction="vertical" [spacing]="4">\n  <div>Item 1</div>\n  <div>Item 2</div>\n  <div>Item 3</div>\n</fui-stack>`,
    setupNotes:
      'No additional setup required. Add StackComponent to the imports array of your standalone component.',
  },
  runtime: {
    supportsSSR: true,
    requiresBrowserAPIs: false,
    notes: ['Stack layout is CSS-driven and SSR-friendly.'],
  },
  inputs: [
    {
      name: 'direction',
      type: "'vertical' | 'horizontal'",
      description: 'Stack direction',
      defaultValue: "'vertical'",
    },
    {
      name: 'spacing',
      type: 'number',
      description: 'Spacing between items (in spacing units)',
      defaultValue: '4',
    },
    {
      name: 'align',
      type: "'start' | 'center' | 'end' | 'stretch'",
      description: 'Cross-axis alignment',
      defaultValue: "'stretch'",
    },
    {
      name: 'justify',
      type: "'start' | 'center' | 'end' | 'space-between' | 'space-around' | 'space-evenly'",
      description: 'Main-axis alignment',
      defaultValue: "'start'",
    },
    {
      name: 'wrap',
      type: 'boolean',
      description: 'Allow items to wrap onto multiple lines',
      defaultValue: 'false',
    },
    {
      name: 'divider',
      type: 'boolean',
      description: 'Add a visual divider between each item',
      defaultValue: 'false',
    },
    {
      name: 'fullSize',
      type: 'boolean',
      description: 'Expand stack to fill the full width and height of its container',
      defaultValue: 'false',
    },
  ],
  outputs: [],
  passthroughs: [
    {
      name: 'Default content',
      type: 'slot',
      selector: '(default)',
      description:
        'Child elements to arrange. The stack applies flex layout and spacing between all direct children.',
      optional: false,
    },
  ],
  theming: {
    tokens: [
      {
        token: '--semantic-border-subtle',
        description: 'Divider line color when dividers are enabled.',
      },
      {
        token: '--primitive-spacing-4',
        description:
          'Reference spacing unit. Actual gap is set by the spacing input multiplied against the base unit.',
      },
    ],
    customizationNotes:
      'The stack component primarily exposes layout behaviour through its inputs (direction, spacing, align, justify). Override tokens only for visual dividers.',
  },
  examples: [
    {
      title: 'Vertical Stack',
      description: 'Items stacked vertically',
      template: `<fui-stack direction="vertical" [spacing]="4">
  <fui-button>Button 1</fui-button>
  <fui-button>Button 2</fui-button>
  <fui-button>Button 3</fui-button>
</fui-stack>`,
    },
    {
      title: 'Horizontal Stack',
      description: 'Items arranged horizontally',
      template: `<fui-stack direction="horizontal" [spacing]="4">
  <fui-button>Cancel</fui-button>
  <fui-button variant="filled">Save</fui-button>
</fui-stack>`,
    },
    {
      title: 'Stack with Alignment',
      description: 'Center-aligned stack',
      template: `<fui-stack direction="vertical" [spacing]="4" align="center">
  <fui-avatar text="JD" />
  <h3>John Doe</h3>
  <p>Software Engineer</p>
</fui-stack>`,
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
  selector: 'fui-grid',
  setup: {
    importStatement: "import { GridComponent } from '@mfontecchio/components';",
    usageSnippet: `<fui-grid [columns]="3" [gap]="4">\n  <div>Column 1</div>\n  <div>Column 2</div>\n  <div>Column 3</div>\n</fui-grid>`,
    setupNotes:
      'No additional setup required. Add GridComponent to the imports array of your standalone component.',
  },
  runtime: {
    supportsSSR: true,
    requiresBrowserAPIs: false,
    notes: ['Grid layout is CSS-driven and renders predictably in SSR.'],
  },
  inputs: [
    {
      name: 'columns',
      type: "1 | 2 | 3 | 4 | 6 | 12 | 'auto'",
      description: "Number of columns or 'auto' for responsive auto-fit",
      defaultValue: '12',
    },
    {
      name: 'columnsMd',
      type: '1 | 2 | 3 | 4 | 6 | 12',
      description: 'Column count override for tablet breakpoints',
    },
    {
      name: 'columnsLg',
      type: '1 | 2 | 3 | 4 | 6 | 12',
      description: 'Column count override for desktop breakpoints',
    },
    {
      name: 'gap',
      type: 'number',
      description: 'Gap between items (in spacing units)',
      defaultValue: '4',
    },
    {
      name: 'rowGap',
      type: 'number',
      description: 'Row gap override (defaults to gap if not specified)',
    },
    {
      name: 'columnGap',
      type: 'number',
      description: 'Column gap override (defaults to gap if not specified)',
    },
    {
      name: 'minColumnWidth',
      type: 'number',
      description: "Minimum column width in rem for 'auto' column mode",
      defaultValue: '15',
    },
    {
      name: 'fullWidth',
      type: 'boolean',
      description: 'Whether the grid expands to full container width',
      defaultValue: 'true',
    },
  ],
  outputs: [],
  passthroughs: [
    {
      name: 'Default content',
      type: 'slot',
      selector: '(default)',
      description:
        'Child elements placed into the CSS grid. Each direct child occupies one grid cell by default.',
      optional: false,
    },
  ],
  theming: {
    tokens: [],
    customizationNotes:
      'Grid layout is driven by the columns and gap inputs. For advanced layouts (spans, offsets) apply CSS grid properties directly to child elements using a scoped class.',
  },
  examples: [
    {
      title: '3-Column Grid',
      description: 'Three equal-width columns',
      template: `<fui-grid [columns]="3" [gap]="4">
  <fui-card><h4>Card 1</h4></fui-card>
  <fui-card><h4>Card 2</h4></fui-card>
  <fui-card><h4>Card 3</h4></fui-card>
  <fui-card><h4>Card 4</h4></fui-card>
  <fui-card><h4>Card 5</h4></fui-card>
  <fui-card><h4>Card 6</h4></fui-card>
</fui-grid>`,
    },
    {
      title: '4-Column Grid',
      description: 'Four columns with smaller gap',
      template: `<fui-grid [columns]="4" [gap]="2">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
  <div>Item 4</div>
</fui-grid>`,
    },
  ],
  accessibility: {
    ariaSupport: ['Natural grid flow', 'Semantic structure maintained'],
    keyboardNavigation: [],
    screenReaderNotes:
      'Grid items announced in source order. Grid structure communicated by screen readers.',
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
  selector: 'fui-badge',
  setup: {
    importStatement: "import { BadgeComponent } from '@mfontecchio/components';",
    usageSnippet: `<fui-badge variant="primary">New</fui-badge>`,
    setupNotes:
      'No additional setup required. Add BadgeComponent to the imports array of your standalone component.',
  },
  runtime: {
    supportsSSR: true,
    requiresBrowserAPIs: false,
    notes: ['Badge is presentation-focused and fully SSR-friendly.'],
  },
  inputs: [
    {
      name: 'variant',
      type: "'default' | 'primary' | 'success' | 'warning' | 'error' | 'info'",
      description: 'Visual variant',
      defaultValue: "'default'",
    },
    { name: 'size', type: "'sm' | 'md' | 'lg'", description: 'Badge size', defaultValue: "'md'" },
    {
      name: 'label',
      type: 'string',
      description: 'Badge text content (alternative to content projection)',
    },
    {
      name: 'dot',
      type: 'boolean',
      description: 'Display as a dot indicator (no text)',
      defaultValue: 'false',
    },
    {
      name: 'pill',
      type: 'boolean',
      description: 'Pill-shaped badge with fully rounded corners',
      defaultValue: 'false',
    },
    {
      name: 'count',
      type: 'number',
      description: 'Numeric count value',
    },
    {
      name: 'max',
      type: 'number',
      description: 'Maximum count to display; numbers above this show as "max+"',
    },
    {
      name: 'dismissible',
      type: 'boolean',
      description: 'Whether the badge can be dismissed',
      defaultValue: 'false',
    },
    {
      name: 'icon',
      type: 'string',
      description: 'Icon name or character to display within the badge',
    },
    {
      name: 'ariaLabel',
      type: 'string',
      description: 'ARIA label for additional screen reader context',
    },
  ],
  outputs: [],
  passthroughs: [
    {
      name: 'Default content',
      type: 'slot',
      selector: '(default)',
      description:
        'Optional custom content to render inside the badge instead of the label input. Use this for rich inline markup.',
      optional: true,
    },
  ],
  theming: {
    tokens: [
      { token: '--semantic-brand-primary', description: 'Background of the primary variant.' },
      { token: '--semantic-text-inverse', description: 'Label color on colored backgrounds.' },
      {
        token: '--semantic-surface-background-secondary',
        description: 'Background of the default variant.',
      },
      { token: '--semantic-text-primary', description: 'Label color of the default variant.' },
      { token: '--semantic-feedback-success', description: 'Background of the success variant.' },
      { token: '--semantic-feedback-warning', description: 'Background of the warning variant.' },
      { token: '--semantic-feedback-error', description: 'Background of the error variant.' },
      { token: '--primitive-border-radius-full', description: 'Full pill border radius.' },
      { token: '--primitive-border-radius-md', description: 'Rounded border radius.' },
    ],
    customizationNotes:
      'Override variant-specific semantic tokens to restyle badges in a given context. Do not add ::ng-deep rules.',
  },
  examples: [
    {
      title: 'Badge Variants',
      description: 'Five semantic color variants for different use cases',
      template: `<fui-badge variant="default">Default</fui-badge>
<fui-badge variant="primary">Primary</fui-badge>
<fui-badge variant="success">Success</fui-badge>
<fui-badge variant="warning">Warning</fui-badge>
<fui-badge variant="error">Error</fui-badge>`,
    },
    {
      title: 'Badge Sizes',
      description: 'Three size options for different contexts',
      template: `<fui-badge size="sm">Small</fui-badge>
<fui-badge size="md">Medium</fui-badge>
<fui-badge size="lg">Large</fui-badge>`,
    },
    {
      title: 'Status Indicators',
      description: 'Common usage for status display',
      template: `<fui-badge variant="success">Active</fui-badge>
<fui-badge variant="warning">Pending</fui-badge>
<fui-badge variant="error">Inactive</fui-badge>`,
    },
    {
      title: 'Count Badges',
      description: 'Display numerical counts',
      template: `<fui-badge variant="primary">5</fui-badge>
<fui-badge variant="error">99+</fui-badge>`,
    },
  ],
  accessibility: {
    ariaSupport: [
      'Text content announced by screen readers',
      'Uses semantic colors for visual distinction',
      'Can be enhanced with aria-label for additional context',
    ],
    keyboardNavigation: [],
    screenReaderNotes:
      'Badge text read as part of parent element. Consider adding context like "status: active" for clarity.',
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
  description:
    'A component for displaying user profile images or initials in a circular container.',
  selector: 'fui-avatar',
  setup: {
    importStatement: "import { AvatarComponent } from '@mfontecchio/components';",
    usageSnippet: `<fui-avatar initials="JD" alt="John Doe" size="md" />`,
    setupNotes:
      'No additional setup required. Add AvatarComponent to the imports array of your standalone component.',
  },
  runtime: {
    supportsSSR: true,
    requiresBrowserAPIs: false,
    notes: [
      'Avatar rendering is SSR-compatible. Image loading and fallbacks are handled by native browser behavior after hydration.',
    ],
  },
  inputs: [
    { name: 'src', type: 'string', description: 'Image URL' },
    {
      name: 'alt',
      type: 'string',
      description: 'Alt text for image accessibility',
      defaultValue: "'Avatar'",
    },
    {
      name: 'initials',
      type: 'string',
      description: 'Initials to display when no image is available',
    },
    {
      name: 'icon',
      type: 'string',
      description: 'Icon or emoji to display (emoji or text character)',
    },
    {
      name: 'size',
      type: "'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'",
      description: 'Avatar size',
      defaultValue: "'md'",
    },
    {
      name: 'shape',
      type: "'circle' | 'square'",
      description: 'Avatar shape',
      defaultValue: "'circle'",
    },
    {
      name: 'status',
      type: "'online' | 'offline' | 'away' | 'busy'",
      description: 'Status indicator type',
    },
    {
      name: 'showStatus',
      type: 'boolean',
      description: 'Whether to display the status indicator dot',
      defaultValue: 'false',
    },
    {
      name: 'backgroundColor',
      type: 'string',
      description: 'Custom background color for initials or icon display',
    },
    {
      name: 'textColor',
      type: 'string',
      description: 'Custom text color for initials or icon display',
    },
  ],
  outputs: [],
  passthroughs: [],
  theming: {
    tokens: [
      {
        token: '--semantic-surface-background-secondary',
        description: 'Fallback background when no image or initials are provided.',
      },
      { token: '--semantic-text-primary', description: 'Initials text color.' },
      { token: '--semantic-feedback-success', description: 'Online status indicator color.' },
      { token: '--semantic-text-disabled', description: 'Offline status indicator color.' },
      { token: '--semantic-feedback-warning', description: 'Away status indicator color.' },
      { token: '--semantic-feedback-error', description: 'Busy status indicator color.' },
      { token: '--primitive-border-radius-full', description: 'Circle shape border radius.' },
      { token: '--primitive-border-radius-md', description: 'Rounded square shape border radius.' },
    ],
    customizationNotes:
      'Status indicator colors map to semantic feedback tokens. Override them on an ancestor for custom status palettes.',
  },
  examples: [
    {
      title: 'Avatar with Initials',
      description: 'Text-based avatar using user initials',
      template: `<fui-avatar initials="JD" alt="John Doe" />`,
    },
    {
      title: 'Avatar Sizes',
      description: 'Six size options from extra-small to double-extra-large',
      template: `<fui-avatar initials="XS" size="xs" />
<fui-avatar initials="SM" size="sm" />
<fui-avatar initials="MD" size="md" />
<fui-avatar initials="LG" size="lg" />
<fui-avatar initials="XL" size="xl" />
<fui-avatar initials="2X" size="2xl" />`,
    },
    {
      title: 'Avatar Shapes',
      description: 'Circle and square shape variants',
      template: `<fui-avatar initials="JD" shape="circle" />
<fui-avatar initials="JD" shape="square" />`,
    },
    {
      title: 'Avatar with Image',
      description: 'Profile photo with fallback to initials',
      template: `<fui-avatar src="/avatar.jpg" alt="John Doe" initials="JD" />`,
    },
    {
      title: 'Avatar with Status',
      description: 'Avatar displaying an online/offline status indicator',
      template: `<fui-avatar initials="JD" status="online" [showStatus]="true" />
<fui-avatar initials="AS" status="away" [showStatus]="true" />
<fui-avatar initials="MK" status="busy" [showStatus]="true" />
<fui-avatar initials="RS" status="offline" [showStatus]="true" />`,
    },
    {
      title: 'User Profile Group',
      description: 'Multiple avatars for team or group display',
      template: `<fui-avatar initials="JD" size="md" />
<fui-avatar initials="AS" size="md" />
<fui-avatar initials="MK" size="md" />
<fui-avatar initials="+3" size="md" />`,
    },
  ],
  accessibility: {
    ariaSupport: [
      'img alt text for image avatars',
      'role="img" for text-based avatars',
      'aria-label with full name when showing initials',
    ],
    keyboardNavigation: [],
    screenReaderNotes:
      'Alt text or full name announced. Initials are not announced as individual letters.',
  },
  bestPractices: [
    'Always provide alt text or aria-label with the full name',
    'Use consistent size across similar UI contexts',
    'Provide initials fallback when image may fail to load',
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
  selector: 'fui-tooltip',
  setup: {
    importStatement: "import { TooltipComponent } from '@mfontecchio/components';",
    usageSnippet: `<button fui-tooltip text="Save your changes">Save</button>`,
    setupNotes:
      'The tooltip is applied as an attribute directive on a host element. Add TooltipComponent to the imports array of your standalone component.',
  },
  runtime: {
    supportsSSR: true,
    requiresBrowserAPIs: true,
    notes: [
      'Tooltip host markup is SSR-compatible.',
      'Show/hide timing and placement behavior rely on browser runtime APIs.',
    ],
  },
  inputs: [
    { name: 'text', type: 'string', description: 'Tooltip text content', required: true },
    {
      name: 'position',
      type: "'top' | 'bottom' | 'left' | 'right'",
      description: 'Tooltip position relative to target',
      defaultValue: "'top'",
    },
    {
      name: 'size',
      type: "'sm' | 'md' | 'lg'",
      description: 'Tooltip size',
      defaultValue: "'md'",
    },
    {
      name: 'showDelay',
      type: 'number',
      description: 'Delay in milliseconds before the tooltip appears',
      defaultValue: '200',
    },
    {
      name: 'hideDelay',
      type: 'number',
      description: 'Delay in milliseconds before the tooltip hides',
      defaultValue: '0',
    },
    {
      name: 'disabled',
      type: 'boolean',
      description: 'Whether the tooltip is disabled',
      defaultValue: 'false',
    },
  ],
  outputs: [],
  passthroughs: [
    {
      name: 'Host element content',
      type: 'slot',
      selector: '(default)',
      description:
        'The element to which the tooltip is attached. The tooltip activates on hover or focus of this projected host content.',
      optional: false,
    },
  ],
  theming: {
    tokens: [
      { token: '--component-tooltip-background', description: 'Tooltip bubble background color.' },
      { token: '--component-tooltip-text', description: 'Tooltip text color.' },
      { token: '--primitive-font-size-sm', description: 'Tooltip font size.' },
      { token: '--primitive-border-radius-md', description: 'Tooltip bubble corner radius.' },
      { token: '--primitive-shadow-lg', description: 'Tooltip drop shadow.' },
    ],
    customizationNotes:
      'Override --component-tooltip-background and --component-tooltip-text to create inverted or brand-colored tooltips.',
  },
  examples: [
    {
      title: 'Basic Tooltip',
      description: 'Simple hover/focus tooltip',
      template: `<button fui-tooltip text="Click to save">Save</button>`,
    },
    {
      title: 'Tooltip Positions',
      description: 'Four position options',
      template: `<button fui-tooltip text="Top tooltip" position="top">Top</button>
<button fui-tooltip text="Bottom tooltip" position="bottom">Bottom</button>
<button fui-tooltip text="Left tooltip" position="left">Left</button>
<button fui-tooltip text="Right tooltip" position="right">Right</button>`,
    },
    {
      title: 'Icon with Tooltip',
      description: 'Tooltip on icon button',
      template: `<button fui-tooltip text="More information">ℹ️</button>`,
    },
    {
      title: 'Link with Tooltip',
      description: 'Tooltip on interactive element',
      template: `<a href="#" fui-tooltip text="Opens in new tab">Documentation</a>`,
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
    screenReaderNotes:
      'Tooltip text announced when element receives focus. Announced as description of the trigger element.',
  },
  bestPractices: [
    'Keep tooltip text concise (1-2 short sentences)',
    'Use tooltips for supplementary information, not critical content',
    'Ensure tooltip appears on both hover and keyboard focus',
    'Position tooltips to avoid covering important content',
    'Use consistent positioning throughout the application',
    "Don't put interactive elements inside tooltips",
    'Ensure sufficient contrast for tooltip text',
  ],
};

const CHIP_METADATA: ComponentMetadata = {
  id: 'chip',
  name: 'Chip',
  category: 'data-display',
  description: 'A compact element for tags, filters, or selections with optional remove action.',
  selector: 'fui-chip',
  setup: {
    importStatement: "import { ChipComponent } from '@mfontecchio/components';",
    usageSnippet: `<fui-chip label="Angular" variant="primary" />\n<fui-chip label="Removable" [removable]="true" (removed)="onRemove()" />`,
    setupNotes:
      'No additional setup required. Add ChipComponent to the imports array of your standalone component.',
  },
  runtime: {
    supportsSSR: true,
    requiresBrowserAPIs: false,
    notes: ['Chip rendering and interaction bindings are SSR-compatible.'],
  },
  inputs: [
    { name: 'label', type: 'string', description: 'Chip label text', required: true },
    {
      name: 'variant',
      type: "'default' | 'primary' | 'success' | 'warning' | 'error'",
      description: 'Visual variant for semantic meaning',
      defaultValue: "'default'",
    },
    { name: 'size', type: "'sm' | 'md' | 'lg'", description: 'Chip size', defaultValue: "'md'" },
    {
      name: 'removable',
      type: 'boolean',
      description: 'Show remove button',
      defaultValue: 'false',
    },
    {
      name: 'clickable',
      type: 'boolean',
      description: 'Whether the chip is interactive/clickable',
      defaultValue: 'false',
    },
    {
      name: 'disabled',
      type: 'boolean',
      description: 'Whether the chip is disabled',
      defaultValue: 'false',
    },
    {
      name: 'avatar',
      type: 'string',
      description: 'Avatar image URL or initials to display before the label',
    },
    {
      name: 'ariaLabel',
      type: 'string',
      description: 'ARIA label for accessibility',
    },
  ],
  outputs: [
    { name: 'removed', type: 'void', description: 'Emitted when remove button is clicked' },
    {
      name: 'clicked',
      type: 'void',
      description: 'Emitted when the chip is clicked (requires clickable)',
    },
  ],
  passthroughs: [],
  theming: {
    tokens: [
      {
        token: '--semantic-surface-background-secondary',
        description: 'Background of the default variant.',
      },
      { token: '--semantic-text-primary', description: 'Label color of the default variant.' },
      { token: '--semantic-brand-primary', description: 'Background of the primary variant.' },
      { token: '--semantic-text-inverse', description: 'Label color on colored chip backgrounds.' },
      { token: '--semantic-feedback-success', description: 'Background of the success variant.' },
      { token: '--semantic-feedback-warning', description: 'Background of the warning variant.' },
      { token: '--semantic-feedback-error', description: 'Background of the error variant.' },
      { token: '--primitive-border-radius-full', description: 'Pill shape border radius.' },
    ],
    customizationNotes:
      'Override variant-specific semantic tokens on an ancestor element to restyle chips in a particular context.',
  },
  examples: [
    {
      title: 'Basic Chip',
      description: 'Simple chip for tags or labels',
      template: `<fui-chip label="JavaScript" />`,
    },
    {
      title: 'Chip Variants',
      description: 'Semantic colors for different meanings',
      template: `<fui-chip label="Default" variant="default" />
<fui-chip label="Primary" variant="primary" />
<fui-chip label="Success" variant="success" />
<fui-chip label="Warning" variant="warning" />
<fui-chip label="Error" variant="error" />`,
    },
    {
      title: 'Chip Sizes',
      description: 'Three size options',
      template: `<fui-chip label="Small" size="sm" />
<fui-chip label="Medium" size="md" />
<fui-chip label="Large" size="lg" />`,
    },
    {
      title: 'Removable Chips',
      description: 'Chips with remove action for filters or tags',
      template: `<fui-chip label="JavaScript" [removable]="true" />
<fui-chip label="TypeScript" [removable]="true" />
<fui-chip label="Angular" [removable]="true" />`,
    },
    {
      title: 'Disabled Chips',
      description: 'Non-interactive chip states',
      template: `<fui-chip label="Disabled" [disabled]="true" />
<fui-chip label="Disabled Removable" [removable]="true" [disabled]="true" />`,
    },
    {
      title: 'Chip Collection',
      description: 'Multiple chips for tags or filters',
      template: `<fui-chip label="React" variant="primary" [removable]="true" />
<fui-chip label="Vue" variant="primary" [removable]="true" />
<fui-chip label="Angular" variant="primary" [removable]="true" />
<fui-chip label="Svelte" variant="primary" [removable]="true" />`,
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
    screenReaderNotes:
      'Chip label announced. When removable, announced as button with remove action.',
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
  description:
    'A floating panel that displays rich content relative to a trigger element, similar to tooltip but interactive.',
  selector: 'fui-popover',
  setup: {
    importStatement: "import { PopoverComponent } from '@mfontecchio/components';",
    usageSnippet: `<button [fui-popover]="myPopover" trigger="click">Open Popover</button>\n<ng-template #myPopover>\n  <p>Popover content here.</p>\n</ng-template>`,
    setupNotes:
      'The popover is applied as an attribute directive binding a template reference. Add PopoverComponent to the imports array of your standalone component.',
  },
  runtime: {
    supportsSSR: true,
    requiresBrowserAPIs: true,
    notes: [
      'Popover content definition is SSR-compatible.',
      'Overlay positioning, trigger handling, and dismissal depend on browser document and viewport APIs.',
    ],
  },
  inputs: [
    {
      name: 'title',
      type: 'string',
      description: 'Optional title displayed at the top of the popover',
    },
    {
      name: 'position',
      type: "'top' | 'bottom' | 'left' | 'right'",
      description: 'Popover position relative to trigger',
      defaultValue: "'bottom'",
    },
    {
      name: 'trigger',
      type: "'click' | 'hover'",
      description: 'Interaction that opens popover',
      defaultValue: "'click'",
    },
    {
      name: 'showArrow',
      type: 'boolean',
      description: 'Whether to display the directional arrow',
      defaultValue: 'true',
    },
    {
      name: 'disabled',
      type: 'boolean',
      description: 'Whether the popover is disabled',
      defaultValue: 'false',
    },
  ],
  outputs: [
    { name: 'openChange', type: 'boolean', description: 'Emitted when open state changes' },
  ],
  passthroughs: [
    {
      name: 'Trigger slot',
      type: 'slot',
      selector: '[trigger]',
      description:
        'The element that triggers the popover. Apply the trigger attribute to a child element inside fui-popover, or use the [fui-popover] directive pattern.',
      optional: true,
    },
    {
      name: 'Default content',
      type: 'slot',
      selector: '(default)',
      description: 'Content rendered inside the popover panel.',
      optional: true,
    },
  ],
  theming: {
    tokens: [
      { token: '--semantic-surface-card', description: 'Popover panel background.' },
      { token: '--semantic-border-default', description: 'Panel border color.' },
      { token: '--primitive-border-radius-md', description: 'Panel corner radius.' },
      { token: '--primitive-shadow-lg', description: 'Panel drop shadow.' },
      {
        token: '--semantic-animation-duration-interactive',
        description: 'Open/close animation duration.',
      },
    ],
    customizationNotes:
      'Override --semantic-surface-card and shadow tokens to restyle the popover panel. Use the width input or CSS max-width on the panel class for sizing.',
  },
  examples: [
    {
      title: 'Click Popover',
      description: 'Popover triggered by click',
      template: `<button [fui-popover]="content" trigger="click">User Info</button>
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
      template: `<button [fui-popover]="content" trigger="hover">Hover Me</button>
<ng-template #content>
  <div>Additional information appears on hover</div>
</ng-template>`,
    },
    {
      title: 'Popover Positions',
      description: 'Different positioning options',
      template: `<button [fui-popover]="content" position="top">Top</button>
<button [fui-popover]="content" position="bottom">Bottom</button>
<button [fui-popover]="content" position="left">Left</button>
<button [fui-popover]="content" position="right">Right</button>`,
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
    screenReaderNotes:
      'Popover content announced when opened. Focus moved to popover for click trigger.',
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
  selector: 'fui-pagination',
  setup: {
    importStatement: "import { PaginationComponent } from '@mfontecchio/components';",
    usageSnippet: `<fui-pagination\n  [total]="100"\n  [pageSize]="10"\n  [page]="currentPage()"\n  (pageChange)="currentPage.set($event)"\n/>`,
    usageTypescript: `import { signal } from '@angular/core';\n\nexport class MyComponent {\n  protected readonly currentPage = signal(1);\n}`,
    setupNotes:
      'Import signal from @angular/core. Add PaginationComponent to the imports array of your standalone component.',
  },
  runtime: {
    supportsSSR: true,
    requiresBrowserAPIs: false,
    notes: ['Pagination rendering and state transitions are SSR-compatible.'],
  },
  inputs: [
    {
      name: 'currentPage',
      type: 'number',
      description: 'Current active page number (1-based)',
      defaultValue: '1',
    },
    {
      name: 'totalItems',
      type: 'number',
      description: 'Total number of items across all pages',
      required: true,
    },
    {
      name: 'pageSize',
      type: 'number',
      description: 'Number of items per page',
      defaultValue: '10',
    },
    {
      name: 'maxPages',
      type: 'number',
      description: 'Maximum number of page buttons displayed before truncating with ellipsis',
      defaultValue: '7',
    },
    {
      name: 'size',
      type: "'sm' | 'md' | 'lg'",
      description: 'Pagination control size',
      defaultValue: "'md'",
    },
    {
      name: 'showFirstLast',
      type: 'boolean',
      description: 'Show first and last page jump buttons',
      defaultValue: 'true',
    },
    {
      name: 'showPageSize',
      type: 'boolean',
      description: 'Show a page size selector dropdown',
      defaultValue: 'false',
    },
    {
      name: 'pageSizeOptions',
      type: 'number[]',
      description: 'Available page size options for the selector',
      defaultValue: '[10, 20, 50, 100]',
    },
    {
      name: 'disabled',
      type: 'boolean',
      description: 'Whether pagination controls are disabled',
      defaultValue: 'false',
    },
  ],
  outputs: [
    {
      name: 'pageChange',
      type: 'number',
      description: 'Emitted when user navigates to a different page',
    },
    {
      name: 'pageSizeChange',
      type: 'number',
      description: 'Emitted when the user changes the page size',
    },
  ],
  passthroughs: [],
  theming: {
    tokens: [
      {
        token: '--semantic-brand-primary',
        description: 'Background and border of the active page button.',
      },
      { token: '--semantic-text-inverse', description: 'Text color of the active page button.' },
      { token: '--semantic-surface-card', description: 'Background of inactive page buttons.' },
      { token: '--semantic-border-default', description: 'Border of inactive page buttons.' },
      { token: '--primitive-border-radius-md', description: 'Border radius of page buttons.' },
      { token: '--semantic-state-focus-ring', description: 'Focus ring on page buttons.' },
    ],
    customizationNotes:
      'Override --semantic-brand-primary to change the active page color. Scope to a parent element for context-specific paginations.',
  },
  examples: [
    {
      title: 'Basic Pagination',
      description: 'Simple page navigation',
      typescript: `protected currentPage = signal(1);`,
      template: `<fui-pagination 
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
      template: `<fui-pagination 
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
      template: `<fui-pagination 
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
    screenReaderNotes:
      'Current page, total pages, and page context announced. Page changes announced.',
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
  description:
    'A data table component with sorting, selection, and customizable columns for displaying structured data.',
  selector: 'fui-table',
  setup: {
    importStatement: "import { TableComponent } from '@mfontecchio/components';",
    usageSnippet: `<fui-table [columns]="columns" [data]="rows" />`,
    usageTypescript: `export class MyComponent {\n  protected readonly columns = [\n    { key: 'name', label: 'Name' },\n    { key: 'email', label: 'Email' },\n  ];\n  protected readonly rows = [\n    { name: 'Alice', email: 'alice@example.com' },\n    { name: 'Bob', email: 'bob@example.com' },\n  ];\n}`,
    setupNotes:
      'No additional setup required. Add TableComponent to the imports array of your standalone component.',
  },
  runtime: {
    supportsSSR: true,
    requiresBrowserAPIs: false,
    notes: ['Table markup and sorting state projection are SSR-compatible.'],
  },
  inputs: [
    {
      name: 'columns',
      type: 'TableColumn[]',
      description: 'Array of column definitions with keys and headers',
      required: true,
    },
    {
      name: 'data',
      type: 'any[]',
      description: 'Array of data objects to display',
      required: true,
    },
    {
      name: 'size',
      type: "'sm' | 'md' | 'lg'",
      description: 'Table cell padding size',
      defaultValue: "'md'",
    },
    {
      name: 'striped',
      type: 'boolean',
      description: 'Alternate row background colors',
      defaultValue: 'false',
    },
    {
      name: 'hoverable',
      type: 'boolean',
      description: 'Highlight rows on hover',
      defaultValue: 'true',
    },
    {
      name: 'bordered',
      type: 'boolean',
      description: 'Add borders between cells',
      defaultValue: 'false',
    },
    {
      name: 'loading',
      type: 'boolean',
      description: 'Display a loading state over the table',
      defaultValue: 'false',
    },
    {
      name: 'emptyMessage',
      type: 'string',
      description: 'Message displayed when the data array is empty',
      defaultValue: "'No data available'",
    },
    {
      name: 'selectable',
      type: 'boolean',
      description: 'Enable row selection with checkboxes',
      defaultValue: 'false',
    },
    {
      name: 'selectedRows',
      type: 'number[]',
      description: 'Array of selected row indices',
      defaultValue: '[]',
    },
    {
      name: 'caption',
      type: 'string',
      description: 'Accessible table caption text',
    },
  ],
  outputs: [
    { name: 'sortChange', type: 'SortState', description: 'Emitted when column sort changes' },
    {
      name: 'rowClick',
      type: '{ row: any; index: number }',
      description: 'Emitted when a row is clicked',
    },
    {
      name: 'selectionChange',
      type: 'number[]',
      description: 'Emitted when row selection changes',
    },
  ],
  passthroughs: [],
  theming: {
    tokens: [
      { token: '--semantic-surface-card', description: 'Table background.' },
      { token: '--semantic-surface-background-secondary', description: 'Table header background.' },
      { token: '--semantic-border-default', description: 'Table outer border.' },
      { token: '--semantic-border-subtle', description: 'Row divider lines.' },
      { token: '--semantic-brand-primary', description: 'Sort indicator and selected row accent.' },
      { token: '--primitive-border-radius-md', description: 'Table container corner radius.' },
      { token: '--primitive-font-size-sm', description: 'Cell font size.' },
    ],
    customizationNotes:
      'Override --semantic-surface-background-secondary to restyle the header. Scope token overrides to a parent element for context-specific tables.',
  },
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
      template: `<fui-table [columns]="columns" [data]="users" />`,
    },
    {
      title: 'Sortable Table',
      description: 'Table with column sorting',
      typescript: `protected columns = [
  { key: 'name', label: 'Name', sortable: true },
  { key: 'email', label: 'Email', sortable: true },
  { key: 'status', label: 'Status', sortable: true }
];`,
      template: `<fui-table [columns]="columns" [data]="users" />`,
    },
    {
      title: 'Selectable Table',
      description: 'Table with row selection',
      typescript: `handleSelection(selected: any[]) {
  console.log('Selected rows:', selected);
}`,
      template: `<fui-table [columns]="columns" [data]="users" [selectable]="true" (selectionChange)="handleSelection($event)" />`,
    },
  ],
  accessibility: {
    ariaSupport: [
      'Semantic table structure (table, thead, tbody, tr, td)',
      'Column headers with scope="col"',
      'Sort state with aria-sort',
      'Row selection with aria-selected',
    ],
    keyboardNavigation: [
      { key: 'Tab', description: 'Move between sortable column headers and selection checkboxes' },
      { key: 'Enter/Space', description: 'Sort the focused column or toggle a focused checkbox' },
    ],
    screenReaderNotes:
      'Table structure announced. Column headers, row count, and data read in order. Sort and selection states announced.',
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
  selector: 'fui-list',
  setup: {
    importStatement: "import { ListComponent } from '@mfontecchio/components';",
    usageSnippet: `<fui-list [items]="items()" />`,
    usageTypescript: `import { signal } from '@angular/core';\n\nexport class MyComponent {\n  protected readonly items = signal([\n    { id: '1', primary: 'First item', secondary: 'Subtitle' },\n    { id: '2', primary: 'Second item', secondary: 'Subtitle' },\n  ]);\n}`,
    setupNotes:
      'Import signal from @angular/core. Add ListComponent to the imports array of your standalone component.',
  },
  runtime: {
    supportsSSR: true,
    requiresBrowserAPIs: false,
    notes: ['List rendering and item projections are SSR-compatible.'],
  },
  inputs: [
    {
      name: 'items',
      type: 'ListItem[]',
      description: 'Array of list items to display',
      required: true,
    },
    {
      name: 'variant',
      type: "'default' | 'divided' | 'bordered'",
      description: 'Visual styling variant',
      defaultValue: "'default'",
    },
    {
      name: 'size',
      type: "'sm' | 'md' | 'lg'",
      description: 'List item size',
      defaultValue: "'md'",
    },
    {
      name: 'ordered',
      type: 'boolean',
      description: 'Render as an ordered list (ol) instead of unordered (ul)',
      defaultValue: 'false',
    },
    {
      name: 'interactive',
      type: 'boolean',
      description: 'Items are clickable/interactive',
      defaultValue: 'false',
    },
    {
      name: 'showIcons',
      type: 'boolean',
      description: 'Whether to display item icons when provided',
      defaultValue: 'true',
    },
    {
      name: 'emptyMessage',
      type: 'string',
      description: 'Message displayed when the items array is empty',
      defaultValue: "'No items'",
    },
  ],
  outputs: [
    { name: 'itemClick', type: 'ListItem', description: 'Emitted when an item is clicked' },
  ],
  passthroughs: [],
  theming: {
    tokens: [
      { token: '--semantic-surface-card', description: 'List background.' },
      { token: '--semantic-border-default', description: 'List outer border.' },
      { token: '--semantic-border-subtle', description: 'Item divider lines.' },
      { token: '--semantic-surface-background-secondary', description: 'Item hover background.' },
      { token: '--semantic-text-primary', description: 'Primary item text color.' },
      { token: '--semantic-text-secondary', description: 'Secondary/subtitle text color.' },
      { token: '--primitive-border-radius-md', description: 'List container corner radius.' },
    ],
    customizationNotes:
      'Override --semantic-border-subtle to restyle item dividers. Scope to a parent element for isolated list styles.',
  },
  examples: [
    {
      title: 'Simple List',
      description: 'Basic list without dividers',
      typescript: `protected items = signal([
  { id: 1, label: 'Item 1' },
  { id: 2, label: 'Item 2' },
  { id: 3, label: 'Item 3' }
]);`,
      template: `<fui-list [items]="items()" />`,
    },
    {
      title: 'Divided List',
      description: 'List with dividers between items',
      typescript: `protected items = signal([
  { id: 1, label: 'Personal Info' },
  { id: 2, label: 'Security' },
  { id: 3, label: 'Notifications' }
]);`,
      template: `<fui-list [items]="items()" variant="divided" />`,
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
      template: `<fui-list [items]="items()" [interactive]="true" (itemClick)="handleClick($event)" />`,
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
    screenReaderNotes:
      'List structure and total item count announced. Interactive items announced as buttons.',
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

const CAROUSEL_METADATA: ComponentMetadata = {
  id: 'carousel',
  name: 'Carousel',
  category: 'data-display',
  description:
    'A composition-based carousel component for rotating projected content with keyboard navigation, autoplay controls, indicators, thumbnails, and reduced-motion support.',
  selector: 'fui-carousel',
  setup: {
    importStatement:
      "import { CarouselComponent, CarouselSlideComponent } from '@mfontecchio/components';",
    usageSnippet: `<fui-carousel ariaLabel="Featured slides">\n  <fui-carousel-slide>\n    <div class="slide-content">Slide 1</div>\n  </fui-carousel-slide>\n  <fui-carousel-slide>\n    <div class="slide-content">Slide 2</div>\n  </fui-carousel-slide>\n</fui-carousel>`,
    setupNotes:
      'Import both CarouselComponent and CarouselSlideComponent. Both must be in the imports array of your standalone component. Slides are projected as fui-carousel-slide children.',
  },
  runtime: {
    supportsSSR: true,
    requiresBrowserAPIs: true,
    notes: [
      'Carousel structure is SSR-compatible.',
      'Autoplay timers, pointer gestures, and viewport-aware interactions rely on browser window/document APIs.',
    ],
  },
  inputs: [
    {
      name: 'variant',
      type: "'slide' | 'fade'",
      description: 'Transition style used when slides change.',
      defaultValue: "'slide'",
    },
    {
      name: 'size',
      type: "'sm' | 'md' | 'lg'",
      description: 'Control button size.',
      defaultValue: "'md'",
    },
    {
      name: 'loop',
      type: 'boolean',
      description: 'Whether navigation wraps from the end back to the beginning.',
      defaultValue: 'true',
    },
    {
      name: 'autoplay',
      type: 'boolean',
      description: 'Automatically advances slides on a timer.',
      defaultValue: 'false',
    },
    {
      name: 'autoplayDelay',
      type: 'number',
      description: 'Delay between automatic slide changes in milliseconds.',
      defaultValue: '5000',
    },
    {
      name: 'showControls',
      type: 'boolean',
      description: 'Shows previous and next navigation buttons.',
      defaultValue: 'true',
    },
    {
      name: 'showIndicators',
      type: 'boolean',
      description: 'Shows dot indicators for slide navigation.',
      defaultValue: 'true',
    },
    {
      name: 'showThumbnails',
      type: 'boolean',
      description: 'Shows thumbnail navigation below the carousel.',
      defaultValue: 'false',
    },
    {
      name: 'visibleSlides',
      type: 'number',
      description: 'Number of visible slides in slide mode.',
      defaultValue: '1',
    },
    {
      name: 'ariaLabel',
      type: 'string',
      description: 'Accessible label announced for the carousel region.',
      defaultValue: "'Carousel'",
    },
    {
      name: 'activeIndex',
      type: 'number',
      description: 'Controlled active slide index.',
      defaultValue: '0',
    },
  ],
  outputs: [
    {
      name: 'activeIndexChange',
      type: 'number',
      description: 'Emits the active slide index whenever navigation changes.',
    },
    {
      name: 'slideChanged',
      type: '{ from: number; to: number }',
      description: 'Emits the previous and next slide indices after a transition.',
    },
  ],
  passthroughs: [
    {
      name: 'Slide children',
      type: 'slot',
      selector: 'fui-carousel-slide',
      description:
        'Place fui-carousel-slide elements as direct children of fui-carousel. Each slide hosts arbitrary content.',
      optional: false,
    },
  ],
  theming: {
    tokens: [
      { token: '--semantic-surface-card', description: 'Carousel slide background.' },
      { token: '--semantic-border-subtle', description: 'Inactive slide indicator color.' },
      { token: '--semantic-brand-primary', description: 'Active slide indicator color.' },
      { token: '--semantic-surface-overlay', description: 'Navigation button backdrop.' },
      { token: '--primitive-border-radius-md', description: 'Carousel container corner radius.' },
      {
        token: '--semantic-animation-duration-component',
        description: 'Slide transition duration.',
      },
    ],
    customizationNotes:
      'Override --semantic-brand-primary to change the active indicator. Use the autoplay and interval inputs to control timing rather than CSS.',
  },
  examples: [
    {
      title: 'Basic Carousel',
      description: 'Default slide transition with controls and indicators.',
      template: `<fui-carousel ariaLabel="Featured highlights">
  <fui-carousel-slide label="Built for keyboard-first navigation">
    <article>
      <h3>Built for keyboard-first navigation</h3>
      <p>Arrow keys, Home, End, focus visibility, autoplay pause, and reduced-motion support are built in.</p>
    </article>
  </fui-carousel-slide>
  <fui-carousel-slide label="Project any semantic slide content">
    <article>
      <h3>Project any semantic slide content</h3>
      <p>Slides accept media, cards, marketing content, or custom layouts without a rigid data schema.</p>
    </article>
  </fui-carousel-slide>
  <fui-carousel-slide label="Tokens drive every visual state">
    <article>
      <h3>Tokens drive every visual state</h3>
      <p>Controls, indicators, thumbnails, and surfaces inherit the active theme.</p>
    </article>
  </fui-carousel-slide>
</fui-carousel>`,
    },
    {
      title: 'Fade Transition',
      description: 'Cross-fades between slides instead of translating the track.',
      template: `<fui-carousel variant="fade" ariaLabel="Fade transition example">
  <fui-carousel-slide label="Slide one">...</fui-carousel-slide>
  <fui-carousel-slide label="Slide two">...</fui-carousel-slide>
  <fui-carousel-slide label="Slide three">...</fui-carousel-slide>
</fui-carousel>`,
    },
    {
      title: 'Autoplay with Pause Control',
      description: 'Automatically rotates while exposing an explicit pause/resume button.',
      template: `<fui-carousel [autoplay]="true" [autoplayDelay]="3500" ariaLabel="Autoplaying customer stories">
  <fui-carousel-slide label="Customer story one">...</fui-carousel-slide>
  <fui-carousel-slide label="Customer story two">...</fui-carousel-slide>
  <fui-carousel-slide label="Customer story three">...</fui-carousel-slide>
</fui-carousel>`,
    },
    {
      title: 'Multiple Visible Slides',
      description: 'Shows adjacent cards at the same time in slide mode.',
      template: `<fui-carousel [visibleSlides]="2" ariaLabel="Product cards">
  <fui-carousel-slide label="Card one">...</fui-carousel-slide>
  <fui-carousel-slide label="Card two">...</fui-carousel-slide>
  <fui-carousel-slide label="Card three">...</fui-carousel-slide>
  <fui-carousel-slide label="Card four">...</fui-carousel-slide>
</fui-carousel>`,
    },
    {
      title: 'Thumbnail Navigation',
      description: 'Uses the slide thumbnail inputs to render a secondary navigation strip.',
      template: `<fui-carousel [showThumbnails]="true" ariaLabel="Release highlights">
  <fui-carousel-slide label="Accessibility" thumbnail="A11y" thumbnailAlt="Accessibility highlight">...</fui-carousel-slide>
  <fui-carousel-slide label="Composition" thumbnail="API" thumbnailAlt="Composition highlight">...</fui-carousel-slide>
  <fui-carousel-slide label="Theming" thumbnail="Theme" thumbnailAlt="Theming highlight">...</fui-carousel-slide>
</fui-carousel>`,
    },
    {
      title: 'No Loop',
      description: 'Disables wrap-around so the first and last slides behave like hard stops.',
      template: `<fui-carousel [loop]="false" ariaLabel="Non-looping updates">
  <fui-carousel-slide label="Update one">...</fui-carousel-slide>
  <fui-carousel-slide label="Update two">...</fui-carousel-slide>
  <fui-carousel-slide label="Update three">...</fui-carousel-slide>
</fui-carousel>`,
    },
  ],
  accessibility: {
    ariaSupport: [
      'role="region" with aria-roledescription="carousel" on the host',
      'aria-label on the carousel region for landmark identification',
      'Live status text announces slide changes with aria-live="polite" when autoplay is paused',
      'Each slide uses role="group" with aria-roledescription="slide" and a synthesized "Slide N of M" label',
      'Inactive slides expose aria-hidden and inert to keep off-screen content out of the accessibility tree and tab order',
      'Controls, indicators, thumbnails, and autoplay toggle use native button elements with descriptive labels',
    ],
    keyboardNavigation: [
      { key: 'Arrow Left / Arrow Up', description: 'Move to the previous slide' },
      { key: 'Arrow Right / Arrow Down', description: 'Move to the next slide' },
      { key: 'Home', description: 'Jump to the first slide' },
      { key: 'End', description: 'Jump to the last available slide position' },
      {
        key: 'Tab',
        description:
          'Move between carousel controls, indicators, thumbnails, and interactive slide content',
      },
    ],
    screenReaderNotes:
      'The carousel region is announced once with its label. Slide changes announce a concise status update instead of re-reading the entire slide content. Autoplay pauses on hover or focus and exposes an explicit pause button for motion control.',
  },
  bestPractices: [
    'Use carousel only when the content is sequential and users benefit from viewing one or a few items at a time',
    'Provide concise, unique slide labels so indicator and thumbnail controls remain understandable to screen-reader users',
    'Prefer manual navigation for critical content and enable autoplay only for supplementary or promotional content',
    'Pause autoplay whenever the carousel receives focus or hover so users can read and interact without time pressure',
    'Keep the number of visible slides low enough that each slide remains legible on smaller screens',
    'Respect reduced-motion preferences and avoid using carousels for essential form or transactional workflows',
  ],
  relatedComponents: ['tabs', 'card', 'list'],
};

const CODE_BLOCK_METADATA: ComponentMetadata = {
  id: 'code-block',
  name: 'Code Block',
  category: 'data-display',
  description:
    'A component for displaying formatted code with syntax highlighting, copy-to-clipboard, and download functionality. Supports multiple languages and themes.',
  selector: 'fui-code-block',
  setup: {
    importStatement: "import { CodeBlockComponent } from '@mfontecchio/components';",
    usageSnippet: `<fui-code-block [code]="snippet" language="typescript" title="example.ts" />`,
    usageTypescript: `export class MyComponent {\n  protected readonly snippet = \`const greeting = 'Hello, world!';\`;\n}`,
    setupNotes:
      'No additional setup required. Add CodeBlockComponent to the imports array of your standalone component.',
  },
  runtime: {
    supportsSSR: true,
    requiresBrowserAPIs: true,
    notes: [
      'Code rendering and syntax highlighting are SSR-compatible.',
      'Copy/download actions rely on browser clipboard and document APIs.',
    ],
  },
  inputs: [
    { name: 'code', type: 'string', description: 'The code content to display', required: true },
    {
      name: 'language',
      type: 'string',
      description: 'Programming language for syntax highlighting',
      defaultValue: "'typescript'",
    },
    {
      name: 'title',
      type: 'string',
      description: 'Optional title shown in header (enables copy/download buttons)',
      defaultValue: "''",
    },
    {
      name: 'showDownload',
      type: 'boolean',
      description: 'Show the download button',
      defaultValue: 'true',
    },
    {
      name: 'filename',
      type: 'string',
      description: 'Custom filename for downloads (auto-generated if not provided)',
      defaultValue: "''",
    },
  ],
  outputs: [],
  passthroughs: [],
  theming: {
    tokens: [
      { token: '--semantic-surface-card', description: 'Code block panel background.' },
      { token: '--semantic-border-subtle', description: 'Code block panel border.' },
      {
        token: '--semantic-text-secondary',
        description: 'Language label and filename text color.',
      },
      { token: '--primitive-font-family-mono', description: 'Monospace font used for code text.' },
      { token: '--primitive-font-size-sm', description: 'Code font size.' },
      { token: '--primitive-border-radius-md', description: 'Panel corner radius.' },
    ],
    customizationNotes:
      'Syntax highlight colors are determined by the active theme class applied by the theming engine. Override --primitive-font-family-mono to change the code font.',
  },
  examples: [
    {
      title: 'Basic Code Block',
      description: 'Simple code display with TypeScript syntax highlighting',
      typescript: `protected code = signal(\`function greet(name: string): string {
  return \\\`Hello, \\\${name}!\\\`;
}\`);`,
      template: `<fui-code-block [code]="code()" language="typescript" title="TypeScript" />`,
    },
    {
      title: 'HTML Code',
      description: 'Displaying HTML markup with proper formatting',
      typescript: `protected htmlCode = signal(\`<fui-button variant="filled" size="md">
  Click Me
</fui-button>\`);`,
      template: `<fui-code-block [code]="htmlCode()" language="html" title="HTML" />`,
    },
    {
      title: 'CSS Code',
      description: 'Styling information with CSS syntax highlighting',
      typescript: `protected cssCode = signal(\`.button {
  padding: 10px 20px;
  border-radius: 4px;
  background-color: #007bff;
  color: white;
}\`);`,
      template: `<fui-code-block [code]="cssCode()" language="css" title="CSS" />`,
    },
    {
      title: 'JSON Data',
      description: 'Structured data in JSON format',
      typescript: `protected jsonCode = signal(\`{
  "name": "UI Component Suite",
  "version": "1.0.0",
  "author": "Your Team"
}\`);`,
      template: `<fui-code-block [code]="jsonCode()" language="json" title="Configuration" />`,
    },
    {
      title: 'Custom Filename',
      description: 'Specify a custom filename for downloads',
      typescript: `protected componentCode = signal(\`@Component({
  selector: 'app-example',
  template: '<div>Example</div>'
})
export class ExampleComponent {}\`);`,
      template: `<fui-code-block [code]="componentCode()" language="typescript" title="Component" filename="example.component.ts" />`,
    },
  ],
  accessibility: {
    ariaSupport: [
      'aria-label on copy and download buttons',
      'Role semantics for interactive elements',
      'Dynamic aria-label updates on copy success',
    ],
    keyboardNavigation: [
      { key: 'Tab', description: 'Navigate to copy/download buttons' },
      { key: 'Enter/Space', description: 'Activate buttons' },
      { key: 'Arrow Keys', description: 'Scroll through code content' },
    ],
    screenReaderNotes:
      'Code content is readable. Button states announced. Theme-aware colors ensure sufficient contrast.',
  },
  bestPractices: [
    'Always provide a title to enable copy/download functionality',
    'Specify the correct language for accurate syntax highlighting',
    'Use custom filenames for better download organization',
    'Keep code blocks concise and focused',
    'Supported languages: TypeScript, JavaScript, HTML, CSS, SCSS, JSON',
    'Component automatically adapts colors to current theme (Light/Dark/High-Contrast)',
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
  selector: 'fui-alert',
  setup: {
    importStatement: "import { AlertComponent } from '@mfontecchio/components';",
    usageSnippet: `<fui-alert variant="info">Your changes have been saved.</fui-alert>`,
    setupNotes:
      'No additional setup required. Add AlertComponent to the imports array of your standalone component. Content is projected directly inside the element.',
  },
  runtime: {
    supportsSSR: true,
    requiresBrowserAPIs: false,
    notes: ['Alert content and semantics are SSR-compatible.'],
  },
  inputs: [
    {
      name: 'variant',
      type: "'info' | 'success' | 'warning' | 'error'",
      description: 'Alert variant',
      defaultValue: "'info'",
    },
    {
      name: 'dismissible',
      type: 'boolean',
      description: 'Show dismiss button',
      defaultValue: 'false',
    },
    { name: 'size', type: "'sm' | 'md' | 'lg'", description: 'Alert size', defaultValue: "'md'" },
    {
      name: 'title',
      type: 'string',
      description: 'Optional title displayed above the alert message',
    },
    {
      name: 'showIcon',
      type: 'boolean',
      description: 'Whether to display the variant icon',
      defaultValue: 'true',
    },
    {
      name: 'role',
      type: "'alert' | 'status'",
      description: "ARIA role — use 'alert' for critical messages, 'status' for informational ones",
      defaultValue: "'alert'",
    },
    {
      name: 'ariaLive',
      type: "'polite' | 'assertive'",
      description: 'ARIA live region politeness setting',
      defaultValue: "'polite'",
    },
  ],
  outputs: [{ name: 'dismissed', type: 'void', description: 'Emitted when alert is dismissed' }],
  examples: [
    {
      title: 'Alert Variants',
      description: 'Four severity levels: info, success, warning, and error',
      template: `<fui-alert variant="info">
  This is an informational message.
</fui-alert>

<fui-alert variant="success">
  Operation completed successfully!
</fui-alert>

<fui-alert variant="warning">
  Please review your input carefully.
</fui-alert>

<fui-alert variant="error">
  An error occurred. Please try again.
</fui-alert>`,
    },
    {
      title: 'Dismissible Alert',
      description: 'Alert with close button',
      template: `<fui-alert variant="info" [dismissible]="true">
  You can close this alert by clicking the X button.
</fui-alert>`,
    },
    {
      title: 'Alert Sizes',
      description: 'Three size options for different contexts',
      template: `<fui-alert variant="info" size="sm">Small alert message</fui-alert>
<fui-alert variant="info" size="md">Medium alert message</fui-alert>
<fui-alert variant="info" size="lg">Large alert message</fui-alert>`,
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
    screenReaderNotes:
      'Alert content immediately announced. Variant determines urgency of announcement.',
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
  selector: 'fui-spinner',
  setup: {
    importStatement: "import { SpinnerComponent } from '@mfontecchio/components';",
    usageSnippet: `<fui-spinner />\n<fui-spinner size="lg" color="primary" />`,
    setupNotes:
      'No additional setup required. Add SpinnerComponent to the imports array of your standalone component.',
  },
  runtime: {
    supportsSSR: true,
    requiresBrowserAPIs: false,
    notes: ['Spinner rendering is SSR-compatible. Animation is CSS-driven.'],
  },
  inputs: [
    {
      name: 'size',
      type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'",
      description: 'Spinner size',
      defaultValue: "'md'",
    },
    {
      name: 'variant',
      type: "'primary' | 'secondary' | 'inverse'",
      description: 'Color variant for different surface contexts',
      defaultValue: "'primary'",
    },
    {
      name: 'label',
      type: 'string',
      description: 'Loading message for screen readers (and optionally visible)',
      defaultValue: "'Loading...'",
    },
    {
      name: 'showLabel',
      type: 'boolean',
      description: 'Render the label text visibly alongside the spinner',
      defaultValue: 'false',
    },
    {
      name: 'centered',
      type: 'boolean',
      description: 'Center the spinner within its container',
      defaultValue: 'false',
    },
  ],
  outputs: [],
  examples: [
    {
      title: 'Basic Spinner',
      description: 'Default medium-sized loading spinner',
      template: `<fui-spinner />`,
    },
    {
      title: 'Spinner Sizes',
      description: 'Three size options for different contexts',
      template: `<fui-spinner size="sm" />
<fui-spinner size="md" />
<fui-spinner size="lg" />`,
    },
    {
      title: 'Inline Loading',
      description: 'Small spinner for inline loading states',
      template: `<p>Loading data <fui-spinner size="sm" /></p>`,
    },
  ],
  accessibility: {
    ariaSupport: [
      'role="status" for loading announcement',
      'aria-label="Loading" provides context',
      'aria-live="polite" for non-intrusive updates',
    ],
    keyboardNavigation: [],
    screenReaderNotes:
      'Loading state announced without interrupting user. Spinner is not focusable.',
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
  selector: 'fui-progress',
  setup: {
    importStatement: "import { ProgressComponent } from '@mfontecchio/components';",
    usageSnippet: `<fui-progress [value]="75" [showValue]="true" />`,
    setupNotes:
      'No additional setup required. Add ProgressComponent to the imports array of your standalone component.',
  },
  runtime: {
    supportsSSR: true,
    requiresBrowserAPIs: false,
    notes: ['Progress bar rendering and value projection are SSR-compatible.'],
  },
  inputs: [
    { name: 'value', type: 'number', description: 'Progress value (0-max)', defaultValue: '0' },
    {
      name: 'max',
      type: 'number',
      description: 'Maximum value for the progress bar',
      defaultValue: '100',
    },
    {
      name: 'variant',
      type: "'default' | 'success' | 'warning' | 'error' | 'info'",
      description: 'Visual variant for semantic meaning',
      defaultValue: "'default'",
    },
    {
      name: 'size',
      type: "'sm' | 'md' | 'lg'",
      description: 'Height of the progress bar',
      defaultValue: "'md'",
    },
    {
      name: 'label',
      type: 'string',
      description: 'Label text displayed above or alongside the bar',
    },
    {
      name: 'showValue',
      type: 'boolean',
      description: 'Show percentage text',
      defaultValue: 'false',
    },
    {
      name: 'indeterminate',
      type: 'boolean',
      description: 'Indeterminate mode — shows an animated bar when the total is unknown',
      defaultValue: 'false',
    },
    {
      name: 'striped',
      type: 'boolean',
      description: 'Apply a striped pattern to the progress fill',
      defaultValue: 'false',
    },
    {
      name: 'animated',
      type: 'boolean',
      description: 'Animate the stripes (requires striped to be true)',
      defaultValue: 'false',
    },
    {
      name: 'ariaLabel',
      type: 'string',
      description: 'ARIA label describing the operation being tracked',
    },
  ],
  outputs: [],
  examples: [
    {
      title: 'Basic Progress',
      description: 'Simple progress bar showing completion',
      template: `<fui-progress [value]="60" />`,
    },
    {
      title: 'Progress with Value',
      description: 'Display percentage text alongside bar',
      template: `<fui-progress [value]="75" [showValue]="true" />`,
    },
    {
      title: 'Progress Variants',
      description: 'Semantic colors for different states',
      template: `<fui-progress [value]="30" variant="default" />
<fui-progress [value]="100" variant="success" />
<fui-progress [value]="70" variant="warning" />
<fui-progress [value]="50" variant="error" />`,
    },
    {
      title: 'Progress Stages',
      description: 'Different completion levels',
      template: `<fui-progress [value]="0" [showValue]="true" />
<fui-progress [value]="25" [showValue]="true" />
<fui-progress [value]="50" [showValue]="true" />
<fui-progress [value]="75" [showValue]="true" />
<fui-progress [value]="100" [showValue]="true" />`,
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
    screenReaderNotes:
      'Progress percentage and label announced. Updates are announced as progress changes.',
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
  selector: 'fui-skeleton',
  setup: {
    importStatement: "import { SkeletonComponent } from '@mfontecchio/components';",
    usageSnippet: `<fui-skeleton variant="text" width="80%" />\n<fui-skeleton variant="circular" width="40px" height="40px" />\n<fui-skeleton variant="rectangular" width="100%" height="120px" />`,
    setupNotes:
      'No additional setup required. Add SkeletonComponent to the imports array of your standalone component.',
  },
  runtime: {
    supportsSSR: true,
    requiresBrowserAPIs: false,
    notes: [
      'Skeleton placeholders are SSR-compatible. Motion is CSS-driven and respects reduced-motion preferences.',
    ],
  },
  inputs: [
    {
      name: 'variant',
      type: "'text' | 'circular' | 'rectangular' | 'rounded'",
      description: 'Skeleton shape',
      defaultValue: "'text'",
    },
    { name: 'width', type: 'string', description: 'Skeleton width (CSS value)' },
    { name: 'height', type: 'string', description: 'Skeleton height (CSS value)' },
    {
      name: 'lines',
      type: 'number',
      description: 'Number of text lines to render (text variant only)',
      defaultValue: '1',
    },
    {
      name: 'noAnimation',
      type: 'boolean',
      description: 'Disable the shimmer animation',
      defaultValue: 'false',
    },
  ],
  outputs: [],
  passthroughs: [],
  theming: {
    tokens: [
      { token: '--semantic-border-default', description: 'Skeleton base background color.' },
      { token: '--semantic-border-subtle', description: 'Shimmer highlight color.' },
      {
        token: '--semantic-animation-duration-shimmer',
        description: 'Shimmer sweep animation duration.',
      },
      { token: '--primitive-border-radius-md', description: 'Skeleton block corner radius.' },
      { token: '--primitive-border-radius-full', description: 'Circle skeleton border radius.' },
    ],
    customizationNotes:
      'Override the shimmer tokens to match your brand. Use noAnimation to disable the shimmer for reduced-motion environments — the component also respects prefers-reduced-motion.',
  },
  examples: [
    {
      title: 'Text Skeleton',
      description: 'Placeholder for loading text lines',
      template: `<fui-skeleton variant="text" width="100%" />
<fui-skeleton variant="text" width="80%" />
<fui-skeleton variant="text" width="90%" />`,
    },
    {
      title: 'Circular Skeleton',
      description: 'Placeholder for avatar or profile image',
      template: `<fui-skeleton variant="circular" width="40px" height="40px" />`,
    },
    {
      title: 'Rectangular Skeleton',
      description: 'Placeholder for images or cards',
      template: `<fui-skeleton variant="rectangular" width="300px" height="200px" />`,
    },
    {
      title: 'Skeleton Variants',
      description: 'All available skeleton shapes',
      template: `<fui-skeleton variant="text" width="200px" />
<fui-skeleton variant="circular" width="50px" height="50px" />
<fui-skeleton variant="rectangular" width="200px" height="100px" />`,
    },
    {
      title: 'Card Loading Pattern',
      description: 'Complete card skeleton with avatar, title, and content',
      template: `<fui-skeleton variant="circular" width="40px" height="40px" />
<fui-skeleton variant="text" width="150px" />
<fui-skeleton variant="rectangular" width="100%" height="150px" />
<fui-skeleton variant="text" width="100%" />
<fui-skeleton variant="text" width="80%" />`,
    },
  ],
  accessibility: {
    ariaSupport: [
      'aria-busy="true" indicates loading state',
      'aria-label="Loading content" describes purpose',
      'role="status" for screen reader announcements',
    ],
    keyboardNavigation: [],
    screenReaderNotes:
      'Loading state announced when skeleton appears. Content announced when loading completes.',
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
  description:
    'A temporary notification component that appears at screen edges for non-intrusive feedback.',
  selector: 'fui-toast',
  setup: {
    importStatement: "import { ToastComponent, ToastService } from '@mfontecchio/components';",
    usageSnippet: `<!-- Place once in your app root or layout component -->
<fui-toast />`,
    usageTypescript: `import { inject } from '@angular/core';
import { ToastService } from '@mfontecchio/components';

export class MyComponent {
  private readonly toastService = inject(ToastService);

  save(): void {
    // ... save logic ...
    this.toastService.show('Changes saved successfully', 'success');
  }
}`,
    setupNotes:
      'Place the fui-toast outlet once in your app root or layout. Inject ToastService into any component to trigger toasts programmatically. The service is provided at root level.',
  },
  runtime: {
    supportsSSR: false,
    requiresBrowserAPIs: true,
    notes: [
      'Toast timing and dismissal use window timers in the runtime service.',
      'Render the toast outlet only in browser-capable layouts when strict SSR isolation is required.',
    ],
  },
  inputs: [
    { name: 'message', type: 'string', description: 'Notification message text', required: true },
    {
      name: 'variant',
      type: "'info' | 'success' | 'warning' | 'error'",
      description: 'Visual variant for semantic meaning',
      defaultValue: "'info'",
    },
    {
      name: 'dismissible',
      type: 'boolean',
      description: 'Whether the toast shows a dismiss button',
      defaultValue: 'true',
    },
    {
      name: 'dismissing',
      type: 'boolean',
      description: 'Whether the dismiss animation is playing (set by the toast service)',
      defaultValue: 'false',
    },
  ],
  outputs: [
    {
      name: 'dismissRequested',
      type: 'void',
      description: 'Emitted when the user requests dismissal',
    },
  ],
  passthroughs: [
    {
      name: 'Default content',
      type: 'slot',
      selector: '(default)',
      description:
        'Rich HTML content rendered inside the toast body. Use when the message input is insufficient.',
      optional: true,
    },
  ],
  theming: {
    tokens: [
      { token: '--semantic-surface-card', description: 'Toast panel background.' },
      { token: '--primitive-border-radius-md', description: 'Toast corner radius.' },
      { token: '--primitive-shadow-lg', description: 'Toast drop shadow.' },
      { token: '--semantic-feedback-info', description: 'Info variant accent color.' },
      { token: '--semantic-feedback-success', description: 'Success variant accent color.' },
      { token: '--semantic-feedback-warning', description: 'Warning variant accent color.' },
      { token: '--semantic-feedback-error', description: 'Error variant accent color.' },
      {
        token: '--semantic-animation-duration-component',
        description: 'Entry/exit animation duration.',
      },
    ],
    customizationNotes:
      'Toasts are managed by ToastService and rendered into a portal. Scope token overrides to the toast container element for global restyling.',
  },
  examples: [
    {
      title: 'Toast Variants',
      description: 'Different semantic toast types',
      typescript: `import { inject } from '@angular/core';
import { ToastService } from '@mfontecchio/components';

private readonly toastService = inject(ToastService);

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
    keyboardNavigation: [{ key: 'Escape', description: 'Dismiss toast' }],
    screenReaderNotes:
      'Toast messages announced automatically. Success/error variants use appropriate aria-live settings.',
  },
  bestPractices: [
    'Use for confirmation of user actions (saved, deleted, etc.)',
    'Keep messages concise (1-2 short sentences)',
    'Use success variant for positive confirmation',
    'Use error variant for failed operations',
    "Don't use for critical information that requires action",
    "Ensure toasts don't obscure important content",
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
  description:
    'A navigation component showing the current page location within the site hierarchy.',
  selector: 'fui-breadcrumb',
  setup: {
    importStatement: "import { BreadcrumbComponent } from '@mfontecchio/components';",
    usageSnippet: `<fui-breadcrumb [items]="breadcrumbs" />`,
    usageTypescript: `export class MyComponent {
  protected readonly breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/products' },
    { label: 'Details' },
  ];
}`,
    setupNotes:
      'No additional setup required. Add BreadcrumbComponent to the imports array of your standalone component.',
  },
  runtime: {
    supportsSSR: true,
    requiresBrowserAPIs: false,
    notes: [
      'Breadcrumb navigation is SSR-friendly with no browser-only requirements for core rendering.',
    ],
  },
  inputs: [
    {
      name: 'items',
      type: 'BreadcrumbItem[]',
      description: 'Array of breadcrumb items with label and optional link',
      required: true,
    },
    {
      name: 'separator',
      type: 'string',
      description: 'Character or icon separating items',
      defaultValue: "'/'",
    },
    {
      name: 'size',
      type: "'sm' | 'md' | 'lg'",
      description: 'Breadcrumb text and icon size',
      defaultValue: "'md'",
    },
    {
      name: 'maxItems',
      type: 'number',
      description:
        'Maximum number of items to display; excess items are collapsed into an ellipsis (0 = unlimited)',
      defaultValue: '0',
    },
  ],
  outputs: [
    {
      name: 'itemClicked',
      type: '{ item: BreadcrumbItem; index: number }',
      description: 'Emitted when a breadcrumb item is clicked',
    },
  ],
  passthroughs: [],
  theming: {
    tokens: [
      { token: '--semantic-text-secondary', description: 'Color of non-active breadcrumb links.' },
      {
        token: '--semantic-text-primary',
        description: 'Color of the active (current) breadcrumb item.',
      },
      { token: '--semantic-brand-primary', description: 'Link hover color.' },
      { token: '--semantic-border-subtle', description: 'Separator icon color.' },
      { token: '--semantic-state-focus-ring', description: 'Focus ring on breadcrumb links.' },
    ],
    customizationNotes:
      'Override --semantic-text-secondary and --semantic-brand-primary to restyle breadcrumb navigation for a given section.',
  },
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
      template: `<fui-breadcrumb [items]="breadcrumbs" />`,
    },
    {
      title: 'Custom Separator',
      description: 'Breadcrumb with custom separator',
      typescript: `protected breadcrumbs = [
  { label: 'Dashboard', link: '/dashboard' },
  { label: 'Settings', link: '/settings' },
  { label: 'Profile' }
];`,
      template: `<fui-breadcrumb [items]="breadcrumbs" separator="›" />`,
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
    screenReaderNotes:
      'Breadcrumb trail announced with "Breadcrumb navigation". Current page identified. Path hierarchy clear.',
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
  selector: 'fui-menu',
  setup: {
    importStatement: "import { MenuComponent } from '@mfontecchio/components';",
    usageSnippet: `<button [fui-menu]="menuItems">Actions</button>`,
    usageTypescript: `export class MyComponent {
  protected readonly menuItems = [
    { id: 'edit', label: 'Edit' },
    { id: 'delete', label: 'Delete' },
  ];
}`,
    additionalImports: ['MenuItem'],
    setupNotes:
      'No additional setup required. Add MenuComponent to the imports array of your standalone component.',
  },
  runtime: {
    supportsSSR: true,
    requiresBrowserAPIs: true,
    notes: [
      'Menu markup is SSR-compatible.',
      'Overlay positioning and keyboard focus traversal rely on browser document and viewport APIs after hydration.',
    ],
  },
  inputs: [
    {
      name: 'items',
      type: 'MenuItem[]',
      description: 'Array of menu items with labels and optional children',
      required: true,
    },
    {
      name: 'open',
      type: 'boolean',
      description: 'Whether menu is visible',
      defaultValue: 'false',
    },
    {
      name: 'position',
      type: "'bottom-left' | 'bottom-right' | 'top-left' | 'top-right'",
      description: 'Menu position relative to the trigger element',
      defaultValue: "'bottom-left'",
    },
    {
      name: 'disabled',
      type: 'boolean',
      description: 'Whether the menu trigger is disabled',
      defaultValue: 'false',
    },
  ],
  outputs: [
    { name: 'openChange', type: 'boolean', description: 'Emitted when the open state changes' },
    { name: 'itemClick', type: 'MenuItem', description: 'Emitted when a menu item is selected' },
  ],
  passthroughs: [
    {
      name: 'Trigger slot',
      type: 'slot',
      selector: '[trigger]',
      description:
        'The element that opens and closes the menu. Apply the trigger attribute to a child element inside fui-menu.',
      optional: true,
    },
  ],
  theming: {
    tokens: [
      { token: '--semantic-surface-card', description: 'Menu panel background.' },
      { token: '--semantic-border-default', description: 'Panel border color.' },
      { token: '--semantic-surface-background-secondary', description: 'Item hover background.' },
      { token: '--semantic-text-primary', description: 'Item text color.' },
      { token: '--semantic-text-disabled', description: 'Disabled item text color.' },
      { token: '--primitive-border-radius-md', description: 'Panel corner radius.' },
      { token: '--primitive-shadow-lg', description: 'Panel drop shadow.' },
    ],
    customizationNotes:
      'Override surface and shadow tokens to restyle the menu panel. Use the items input to define the menu structure rather than custom HTML.',
  },
  examples: [
    {
      title: 'Basic Dropdown Menu',
      description: 'Simple action menu',
      typescript: `protected menuItems = [
  { label: 'Edit', action: 'edit' },
  { label: 'Duplicate', action: 'duplicate' },
  { label: 'Delete', action: 'delete' }
];`,
      template: `<button [fui-menu]="menuItems">Actions</button>`,
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
      template: `<fui-menu [items]="menuItems" />`,
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
  relatedComponents: ['context-menu', 'popover'],
};

const CONTEXT_MENU_METADATA: ComponentMetadata = {
  id: 'context-menu',
  name: 'Context Menu',
  category: 'navigation',
  description:
    'A right-click context menu component with nested submenu support, icons, and keyboard shortcuts.',
  selector: 'fui-context-menu',
  setup: {
    importStatement: "import { ContextMenuComponent } from '@mfontecchio/components';",
    usageSnippet: `<fui-context-menu [items]="menuItems()" (itemClick)="handleClick($event)">
  <div class="context-area">Right-click anywhere in this area</div>
</fui-context-menu>`,
    usageTypescript: `import { signal } from '@angular/core';
import { ContextMenuItem } from '@mfontecchio/components';

export class MyComponent {
  protected readonly menuItems = signal<ContextMenuItem[]>([
    { id: 'cut', label: 'Cut', shortcut: 'Ctrl+X' },
    { id: 'copy', label: 'Copy', shortcut: 'Ctrl+C' },
    { id: 'paste', label: 'Paste', shortcut: 'Ctrl+V' },
  ]);

  handleClick(item: ContextMenuItem): void {
    console.log('Clicked:', item.id);
  }
}`,
    additionalImports: ['ContextMenuItem'],
    setupNotes:
      'Import signal from @angular/core and ContextMenuItem from @mfontecchio/components. Add ContextMenuComponent to the imports array of your standalone component.',
  },
  runtime: {
    supportsSSR: true,
    requiresBrowserAPIs: true,
    notes: [
      'Context menu structure is SSR-compatible.',
      'Right-click interaction, viewport collision handling, and focus management require browser window/document APIs.',
    ],
  },
  inputs: [
    {
      name: 'items',
      type: 'ContextMenuItem[]',
      description: 'Array of menu items with labels, icons, shortcuts, and optional submenus',
      required: true,
    },
    {
      name: 'disabled',
      type: 'boolean',
      description: 'Whether the context menu is disabled',
      defaultValue: 'false',
    },
  ],
  outputs: [
    {
      name: 'itemClick',
      type: 'ContextMenuItem',
      description: 'Emitted when a menu item is clicked',
    },
    { name: 'opened', type: 'MouseEvent', description: 'Emitted when the context menu opens' },
    { name: 'closed', type: 'void', description: 'Emitted when the context menu closes' },
  ],
  passthroughs: [
    {
      name: 'Context area content',
      type: 'slot',
      selector: '(default)',
      description:
        'The area on which right-click opens the context menu. Project the target element inside fui-context-menu to make it context-aware.',
      optional: false,
    },
  ],
  theming: {
    tokens: [
      { token: '--semantic-surface-card', description: 'Context menu panel background.' },
      { token: '--semantic-border-default', description: 'Panel border color.' },
      { token: '--semantic-border-subtle', description: 'Divider between item groups.' },
      { token: '--semantic-surface-background-secondary', description: 'Item hover background.' },
      { token: '--semantic-text-primary', description: 'Item text color.' },
      { token: '--semantic-text-disabled', description: 'Disabled item text color.' },
      { token: '--primitive-border-radius-md', description: 'Panel corner radius.' },
      { token: '--primitive-shadow-lg', description: 'Panel drop shadow.' },
    ],
    customizationNotes:
      'Override surface and shadow tokens globally or scoped to a container. Group items with the separator property on individual menu items.',
  },
  examples: [
    {
      title: 'Basic Context Menu',
      description: 'Simple right-click menu with actions',
      typescript: `protected readonly contextMenuItems = signal<ContextMenuItem[]>([
  { id: 'cut', label: 'Cut', shortcut: 'Ctrl+X' },
  { id: 'copy', label: 'Copy', shortcut: 'Ctrl+C' },
  { id: 'paste', label: 'Paste', shortcut: 'Ctrl+V' },
  { id: 'divider-1', divider: true },
  { id: 'delete', label: 'Delete', shortcut: 'Del' },
]);

handleMenuClick(item: ContextMenuItem): void {
  console.log('Selected:', item.id);
}`,
      template: `<fui-context-menu
  [items]="contextMenuItems()"
  (itemClick)="handleMenuClick($event)"
>
  <div class="content-area">
    Right-click anywhere in this area
  </div>
</fui-context-menu>`,
    },
    {
      title: 'File Explorer Context Menu',
      description: 'Context menu with nested submenus',
      typescript: `protected readonly fileMenuItems = signal<ContextMenuItem[]>([
  { id: 'open', label: 'Open', shortcut: 'Enter' },
  {
    id: 'open-with',
    label: 'Open With',
    submenu: [
      { id: 'notepad', label: 'Notepad' },
      { id: 'vscode', label: 'VS Code' },
      { id: 'other', label: 'Choose another app...' }
    ]
  },
  { id: 'divider-1', divider: true },
  { id: 'cut', label: 'Cut', shortcut: 'Ctrl+X' },
  { id: 'copy', label: 'Copy', shortcut: 'Ctrl+C' },
  { id: 'paste', label: 'Paste', shortcut: 'Ctrl+V', disabled: true },
  { id: 'divider-2', divider: true },
  { id: 'rename', label: 'Rename', shortcut: 'F2' },
  { id: 'delete', label: 'Delete', shortcut: 'Del' },
  { id: 'divider-3', divider: true },
  { id: 'properties', label: 'Properties', shortcut: 'Alt+Enter' },
]);`,
      template: `<fui-context-menu
  [items]="fileMenuItems()"
  (itemClick)="handleFileAction($event)"
>
  <div class="file-item">
    📄 document.pdf
  </div>
</fui-context-menu>`,
    },
    {
      title: 'Text Editor Context Menu',
      description: 'Context menu with formatting options',
      typescript: `protected readonly editorMenuItems = signal<ContextMenuItem[]>([
  { id: 'cut', label: 'Cut', shortcut: 'Ctrl+X' },
  { id: 'copy', label: 'Copy', shortcut: 'Ctrl+C' },
  { id: 'paste', label: 'Paste', shortcut: 'Ctrl+V' },
  { id: 'divider-1', divider: true },
  { id: 'select-all', label: 'Select All', shortcut: 'Ctrl+A' },
  { id: 'divider-2', divider: true },
  {
    id: 'format',
    label: 'Format',
    submenu: [
      { id: 'bold', label: 'Bold', shortcut: 'Ctrl+B' },
      { id: 'italic', label: 'Italic', shortcut: 'Ctrl+I' },
      { id: 'underline', label: 'Underline', shortcut: 'Ctrl+U' },
    ]
  },
]);`,
      template: `<fui-context-menu
  [items]="editorMenuItems()"
  (itemClick)="handleTextFormat($event)"
>
  <textarea class="editor">
    Right-click to format text
  </textarea>
</fui-context-menu>`,
    },
  ],
  accessibility: {
    ariaSupport: [
      'role="menu" on menu container',
      'role="menuitem" on each item',
      'role="separator" on dividers',
      'aria-disabled for disabled items',
      'aria-haspopup for items with submenus',
      'aria-expanded for submenu state',
      'aria-label for keyboard shortcuts',
    ],
    keyboardNavigation: [
      { key: 'Right-click', description: 'Open context menu at cursor position' },
      { key: 'Arrow Up/Down', description: 'Navigate menu items' },
      { key: 'Arrow Right', description: 'Open submenu' },
      { key: 'Arrow Left', description: 'Close submenu' },
      { key: 'Enter/Space', description: 'Activate menu item' },
      { key: 'Escape', description: 'Close context menu' },
      { key: 'Tab', description: 'Move focus within menu' },
    ],
    screenReaderNotes:
      'Menu structure announced with item count. Icons and shortcuts announced. Disabled items identified. Submenu presence indicated.',
  },
  bestPractices: [
    'Use meaningful IDs for each menu item',
    'Display common keyboard shortcuts for better UX',
    'Group related items with dividers',
    'Limit submenu nesting to 2 levels maximum',
    'Handle disabled state for inapplicable actions',
    'Provide visual feedback when actions are performed',
    'Keep labels concise and action-oriented',
    'Use icons sparingly to enhance recognition',
    'Consider different contexts (text selection, files, etc.)',
    'Ensure menu stays within viewport boundaries',
  ],
  relatedComponents: ['menu', 'popover', 'tooltip'],
};

const NAVBAR_METADATA: ComponentMetadata = {
  id: 'navbar',
  name: 'Navbar',
  category: 'navigation',
  description: 'A navigation bar component for app-wide navigation with logo and links.',
  selector: 'fui-navbar',
  setup: {
    importStatement: "import { NavbarComponent } from '@mfontecchio/components';",
    usageSnippet: `<fui-navbar brand="My App" [links]="navLinks">
  <span brand>My App</span>
  <div actions>
    <fui-button variant="outlined" size="sm">Sign In</fui-button>
  </div>
</fui-navbar>`,
    usageTypescript: `export class MyComponent {
  protected readonly navLinks = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ];
}`,
    setupNotes:
      'No additional setup required. Add NavbarComponent to the imports array of your standalone component. Use [brand], [brand-logo], and [actions] slots to project custom content.',
  },
  runtime: {
    supportsSSR: true,
    requiresBrowserAPIs: false,
    notes: ['Navbar rendering is SSR-friendly for static and router-driven navigation links.'],
  },
  inputs: [
    { name: 'brandText', type: 'string', description: 'Brand or logo text displayed on the left' },
    {
      name: 'links',
      type: 'NavbarLink[]',
      description: 'Array of navigation links with labels and paths',
      required: true,
    },
    {
      name: 'variant',
      type: "'default' | 'sticky' | 'fixed'",
      description: 'Navbar positioning variant',
      defaultValue: "'default'",
    },
    {
      name: 'showMobileToggle',
      type: 'boolean',
      description: 'Whether to display the hamburger toggle on mobile',
      defaultValue: 'true',
    },
  ],
  outputs: [
    {
      name: 'linkClick',
      type: 'NavbarLink',
      description: 'Emitted when a navigation link is clicked',
    },
  ],
  passthroughs: [
    {
      name: 'Brand logo slot',
      type: 'slot',
      selector: '[brand-logo]',
      description:
        'Custom logo element rendered in the navbar brand area. Replaces the default text brand.',
      optional: true,
    },
    {
      name: 'Brand slot',
      type: 'slot',
      selector: '[brand]',
      description: 'Custom brand content — use for styled text or composite logo+name elements.',
      optional: true,
    },
    {
      name: 'Actions slot',
      type: 'slot',
      selector: '[actions]',
      description:
        'Content projected into the navbar actions region (far-right). Suitable for icon buttons, user avatars, or dropdowns.',
      optional: true,
    },
  ],
  theming: {
    tokens: [
      { token: '--semantic-surface-card', description: 'Navbar background.' },
      { token: '--semantic-border-subtle', description: 'Bottom border of the navbar.' },
      { token: '--semantic-text-primary', description: 'Navigation link text color.' },
      { token: '--semantic-text-secondary', description: 'Inactive link text color.' },
      { token: '--semantic-brand-primary', description: 'Active link and indicator color.' },
      { token: '--semantic-state-focus-ring', description: 'Focus ring on nav links.' },
      { token: '--primitive-shadow-sm', description: 'Navbar drop shadow (sticky variant).' },
    ],
    customizationNotes:
      'Override --semantic-surface-card to change the navbar background. For custom height, override the --component-navbar-height token if defined in your theme.',
  },
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
      template: `<fui-navbar logo="MyApp" [links]="navLinks" />`,
    },
    {
      title: 'Sticky Navbar',
      description: 'Navbar fixed to top on scroll',
      typescript: `protected navLinks = [
  { label: 'Dashboard', path: '/dashboard' },
  { label: 'Reports', path: '/reports' },
  { label: 'Settings', path: '/settings' }
];`,
      template: `<fui-navbar logo="MyApp" [links]="navLinks" variant="sticky" />`,
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
  selector: 'fui-stepper',
  setup: {
    importStatement: "import { StepperComponent } from '@mfontecchio/components';",
    usageSnippet: `<fui-stepper
  [steps]="steps"
  [activeStep]="activeStep()"
  (activeStepChange)="activeStep.set($event)"
/>`,
    usageTypescript: `import { signal } from '@angular/core';

export class MyComponent {
  protected readonly activeStep = signal(0);
  protected readonly steps = [
    { title: 'Account', description: 'Create your account' },
    { title: 'Profile', description: 'Set up your profile' },
    { title: 'Confirm', description: 'Review and confirm' },
  ];
}`,
    setupNotes:
      'Import signal from @angular/core. Add StepperComponent to the imports array of your standalone component.',
  },
  runtime: {
    supportsSSR: true,
    requiresBrowserAPIs: false,
    notes: ['Stepper rendering and state projection are SSR-compatible.'],
  },
  inputs: [
    {
      name: 'steps',
      type: 'Step[]',
      description: 'Array of steps with labels and optional descriptions',
      required: true,
    },
    {
      name: 'activeStep',
      type: 'number',
      description: 'Current active step index (0-based)',
      defaultValue: '0',
    },
    {
      name: 'orientation',
      type: "'horizontal' | 'vertical'",
      description: 'Stepper layout direction',
      defaultValue: "'horizontal'",
    },
  ],
  outputs: [
    {
      name: 'activeStepChange',
      type: 'number',
      description: 'Emitted when user navigates to different step',
    },
  ],
  passthroughs: [],
  theming: {
    tokens: [
      {
        token: '--semantic-brand-primary',
        description: 'Active and completed step indicator color.',
      },
      { token: '--semantic-feedback-error', description: 'Error state step indicator color.' },
      {
        token: '--semantic-surface-background-secondary',
        description: 'Inactive step indicator background.',
      },
      { token: '--semantic-border-default', description: 'Connector line between steps.' },
      {
        token: '--primitive-border-radius-full',
        description: 'Circular step indicator border radius.',
      },
      { token: '--semantic-text-primary', description: 'Step label text color.' },
      { token: '--semantic-text-secondary', description: 'Inactive step label color.' },
    ],
    customizationNotes:
      'Override --semantic-brand-primary to change the active and completed step color. Scope to a parent element for section-specific steppers.',
  },
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
      template: `<fui-stepper [steps]="steps" [activeStep]="currentStep()" (activeStepChange)="currentStep.set($event)" />`,
    },
    {
      title: 'Vertical Stepper',
      description: 'Vertical step layout',
      typescript: `protected steps = [
  { label: 'Personal Info' },
  { label: 'Account Details' },
  { label: 'Preferences' }
];`,
      template: `<fui-stepper [steps]="steps" [activeStep]="0" orientation="vertical" />`,
    },
    {
      title: 'Form Wizard',
      description: 'Multi-step form with progress',
      typescript: `protected steps = [
  { label: 'Basic Info', description: 'Name and email' },
  { label: 'Company', description: 'Company details' },
  { label: 'Review', description: 'Confirm submission' }
];`,
      template: `<fui-stepper [steps]="steps" [activeStep]="currentStep()" />`,
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
    screenReaderNotes:
      'Current step, total steps, and completion status announced. Step descriptions read when focused.',
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
  ['carousel', CAROUSEL_METADATA],
  ['code-block', CODE_BLOCK_METADATA],
  // Feedback Components
  ['alert', ALERT_METADATA],
  ['spinner', SPINNER_METADATA],
  ['progress', PROGRESS_METADATA],
  ['skeleton', SKELETON_METADATA],
  ['toast', TOAST_METADATA],
  // Navigation Components
  ['breadcrumb', BREADCRUMB_METADATA],
  ['menu', MENU_METADATA],
  ['context-menu', CONTEXT_MENU_METADATA],
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
export function getComponentsByCategory(
  category: ComponentMetadata['category']
): ComponentMetadata[] {
  return getAllComponentMetadata().filter((meta) => meta.category === category);
}
