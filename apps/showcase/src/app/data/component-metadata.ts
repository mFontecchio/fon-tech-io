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
    { name: 'placeholder', type: 'string', description: 'Placeholder text' },
    { name: 'value', type: 'string', description: 'Textarea value', defaultValue: "''" },
    { name: 'disabled', type: 'boolean', description: 'Whether disabled', defaultValue: 'false' },
    { name: 'required', type: 'boolean', description: 'Whether required', defaultValue: 'false' },
    { name: 'rows', type: 'number', description: 'Number of visible text rows', defaultValue: '3' },
    { name: 'maxLength', type: 'number', description: 'Maximum character count' },
    { name: 'error', type: 'string', description: 'Error message' },
    { name: 'helperText', type: 'string', description: 'Helper text' },
  ],
  outputs: [
    { name: 'valueChange', type: 'string', description: 'Emitted when value changes' },
  ],
  examples: [
    {
      title: 'Basic Textarea',
      description: 'Multi-line text input with configurable rows',
      template: `<ui-textarea 
  label="Description" 
  placeholder="Enter description..." 
  [rows]="5" 
/>`,
    },
  ],
  accessibility: {
    ariaSupport: ['Label association', 'Error state indication'],
    keyboardNavigation: [{ key: 'Tab', description: 'Focus navigation' }],
    screenReaderNotes: 'All text (label, value, errors) announced by screen readers.',
  },
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
  description: 'A radio button component for mutually exclusive selections.',
  selector: 'ui-radio',
  inputs: [
    { name: 'checked', type: 'boolean', description: 'Whether checked', defaultValue: 'false' },
    { name: 'disabled', type: 'boolean', description: 'Whether disabled', defaultValue: 'false' },
    { name: 'label', type: 'string', description: 'Label text' },
    { name: 'name', type: 'string', description: 'Radio group name' },
    { name: 'value', type: 'any', description: 'Radio value' },
  ],
  outputs: [
    { name: 'checkedChange', type: 'boolean', description: 'Emitted when checked state changes' },
  ],
  examples: [
    {
      title: 'Radio Group',
      description: 'Mutually exclusive radio buttons sharing the same name',
      template: `<ui-radio name="plan" value="free" label="Free Plan" />
<ui-radio name="plan" value="pro" label="Pro Plan" />`,
    },
  ],
  accessibility: {
    ariaSupport: ['role="radio"', 'aria-checked state'],
    keyboardNavigation: [
      { key: 'Arrow Keys', description: 'Navigate between radio buttons in group' },
      { key: 'Space', description: 'Select radio button' },
    ],
    screenReaderNotes: 'Radio button state and label announced.',
  },
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
    { name: 'label', type: 'string', description: 'Label text' },
    { name: 'placeholder', type: 'string', description: 'Placeholder text' },
    { name: 'value', type: 'string', description: 'Selected value' },
    { name: 'disabled', type: 'boolean', description: 'Whether disabled', defaultValue: 'false' },
    { name: 'required', type: 'boolean', description: 'Whether required', defaultValue: 'false' },
    { name: 'options', type: 'SelectOption[]', description: 'Array of options', required: true },
    { name: 'error', type: 'string', description: 'Error message' },
  ],
  outputs: [
    { name: 'valueChange', type: 'string', description: 'Emitted when selection changes' },
  ],
  examples: [
    {
      title: 'Basic Select',
      description: 'Dropdown select with predefined options',
      typescript: `protected options = [
  { value: 'us', label: 'United States' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'ca', label: 'Canada' }
];`,
      template: `<ui-select 
  label="Country" 
  [options]="options" 
  placeholder="Select country" 
/>`,
    },
  ],
  accessibility: {
    ariaSupport: ['role="combobox"', 'aria-expanded state', 'aria-activedescendant for highlighted option'],
    keyboardNavigation: [
      { key: 'Space/Enter', description: 'Open/close dropdown' },
      { key: 'Arrow Keys', description: 'Navigate options' },
      { key: 'Escape', description: 'Close dropdown' },
    ],
    screenReaderNotes: 'Selected value and available options announced.',
  },
};

const MULTI_SELECT_METADATA: ComponentMetadata = {
  id: 'multi-select',
  name: 'Multi-Select',
  category: 'form',
  description: 'A multi-selection dropdown with chips for selected values.',
  selector: 'ui-multi-select',
  inputs: [
    { name: 'label', type: 'string', description: 'Label text' },
    { name: 'placeholder', type: 'string', description: 'Placeholder text' },
    { name: 'value', type: 'string[]', description: 'Selected values', defaultValue: '[]' },
    { name: 'disabled', type: 'boolean', description: 'Whether disabled', defaultValue: 'false' },
    { name: 'options', type: 'SelectOption[]', description: 'Array of options', required: true },
  ],
  outputs: [
    { name: 'valueChange', type: 'string[]', description: 'Emitted when selection changes' },
  ],
  examples: [
    {
      title: 'Multi-Select',
      description: 'Select multiple options with chip display',
      template: `<ui-multi-select 
  label="Skills" 
  [options]="skillOptions" 
  placeholder="Select skills" 
/>`,
    },
  ],
  accessibility: {
    ariaSupport: ['role="combobox"', 'aria-multiselectable="true"'],
    keyboardNavigation: [
      { key: 'Space', description: 'Toggle option selection' },
      { key: 'Arrow Keys', description: 'Navigate options' },
    ],
    screenReaderNotes: 'Number of selected items and current focus announced.',
  },
};

const SLIDER_METADATA: ComponentMetadata = {
  id: 'slider',
  name: 'Slider',
  category: 'form',
  description: 'A range slider component with single or dual handles for numeric value selection.',
  selector: 'ui-slider',
  inputs: [
    { name: 'value', type: 'number', description: 'Current value', defaultValue: '0' },
    { name: 'valueEnd', type: 'number', description: 'End value for range mode' },
    { name: 'min', type: 'number', description: 'Minimum value', defaultValue: '0' },
    { name: 'max', type: 'number', description: 'Maximum value', defaultValue: '100' },
    { name: 'step', type: 'number', description: 'Step increment', defaultValue: '1' },
    { name: 'disabled', type: 'boolean', description: 'Whether disabled', defaultValue: 'false' },
    { name: 'label', type: 'string', description: 'Label text' },
  ],
  outputs: [
    { name: 'valueChange', type: 'number', description: 'Emitted when value changes' },
    { name: 'valueEndChange', type: 'number', description: 'Emitted when end value changes (range mode)' },
  ],
  examples: [
    {
      title: 'Basic Slider',
      description: 'Range slider for numeric value selection',
      template: `<ui-slider 
  label="Volume" 
  [min]="0" 
  [max]="100" 
  [value]="50" 
/>`,
    },
  ],
  accessibility: {
    ariaSupport: ['role="slider"', 'aria-valuemin/max/now', 'aria-label'],
    keyboardNavigation: [
      { key: 'Arrow Keys', description: 'Adjust value' },
      { key: 'Home/End', description: 'Jump to min/max' },
    ],
    screenReaderNotes: 'Current value and range announced.',
  },
};

const DATEPICKER_METADATA: ComponentMetadata = {
  id: 'date-picker',
  name: 'Date Picker',
  category: 'form',
  description: 'A date picker component with calendar popup and keyboard input support.',
  selector: 'ui-date-picker',
  inputs: [
    { name: 'label', type: 'string', description: 'Label text' },
    { name: 'placeholder', type: 'string', description: 'Placeholder text' },
    { name: 'value', type: 'string', description: 'Selected date (ISO format)' },
    { name: 'min', type: 'string', description: 'Minimum selectable date' },
    { name: 'max', type: 'string', description: 'Maximum selectable date' },
    { name: 'disabled', type: 'boolean', description: 'Whether disabled', defaultValue: 'false' },
    { name: 'helperText', type: 'string', description: 'Helper text' },
  ],
  outputs: [
    { name: 'valueChange', type: 'string', description: 'Emitted when date changes' },
  ],
  examples: [
    {
      title: 'Date Picker',
      description: 'Calendar popup for date selection',
      template: `<ui-date-picker 
  label="Birth Date" 
  placeholder="Select date" 
/>`,
    },
  ],
  accessibility: {
    ariaSupport: ['Calendar grid navigation', 'Date format announced'],
    keyboardNavigation: [
      { key: 'Arrow Keys', description: 'Navigate calendar' },
      { key: 'Enter/Space', description: 'Select date' },
    ],
    screenReaderNotes: 'Selected date and calendar navigation announced.',
  },
};

const FILEUPLOAD_METADATA: ComponentMetadata = {
  id: 'file-upload',
  name: 'File Upload',
  category: 'form',
  description: 'A file upload component with drag-and-drop support and file preview.',
  selector: 'ui-file-upload',
  inputs: [
    { name: 'label', type: 'string', description: 'Label text' },
    { name: 'accept', type: 'string', description: 'Accepted file types' },
    { name: 'multiple', type: 'boolean', description: 'Allow multiple files', defaultValue: 'false' },
    { name: 'disabled', type: 'boolean', description: 'Whether disabled', defaultValue: 'false' },
    { name: 'maxSize', type: 'number', description: 'Max file size in bytes' },
  ],
  outputs: [
    { name: 'filesChange', type: 'File[]', description: 'Emitted when files are selected' },
  ],
  examples: [
    {
      title: 'File Upload',
      description: 'Drag-and-drop file upload with type restrictions',
      template: `<ui-file-upload 
  label="Upload Documents" 
  accept=".pdf,.doc,.docx" 
  [multiple]="true" 
/>`,
    },
  ],
  accessibility: {
    ariaSupport: ['Drag-and-drop accessible alternatives', 'File list announced'],
    keyboardNavigation: [
      { key: 'Enter/Space', description: 'Open file browser' },
    ],
    screenReaderNotes: 'File names and upload status announced.',
  },
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
    { name: 'open', type: 'boolean', description: 'Whether modal is open', defaultValue: 'false' },
    { name: 'title', type: 'string', description: 'Modal title' },
    { name: 'size', type: "'sm' | 'md' | 'lg' | 'xl' | 'full'", description: 'Modal size', defaultValue: "'md'" },
    { name: 'closeOnBackdrop', type: 'boolean', description: 'Close when clicking backdrop', defaultValue: 'true' },
    { name: 'closeOnEsc', type: 'boolean', description: 'Close on Escape key', defaultValue: 'true' },
  ],
  outputs: [
    { name: 'openChange', type: 'boolean', description: 'Emitted when open state changes' },
    { name: 'closed', type: 'void', description: 'Emitted when modal closes' },
  ],
  examples: [
    {
      title: 'Basic Modal',
      description: 'Dialog overlay with title and backdrop',
      template: `<ui-modal [open]="isOpen()" title="Confirm Action">
  <p>Are you sure you want to proceed?</p>
</ui-modal>`,
    },
  ],
  accessibility: {
    ariaSupport: ['role="dialog"', 'aria-modal="true"', 'Focus trap', 'aria-labelledby for title'],
    keyboardNavigation: [
      { key: 'Escape', description: 'Close modal' },
      { key: 'Tab', description: 'Cycle through focusable elements' },
    ],
    screenReaderNotes: 'Modal announces as dialog. Focus moves into modal when opened.',
  },
};

const TABS_METADATA: ComponentMetadata = {
  id: 'tabs',
  name: 'Tabs',
  category: 'layout',
  description: 'A tabbed interface component for organizing content into separate panels.',
  selector: 'ui-tabs',
  inputs: [
    { name: 'activeIndex', type: 'number', description: 'Active tab index', defaultValue: '0' },
    { name: 'orientation', type: "'horizontal' | 'vertical'", description: 'Tab orientation', defaultValue: "'horizontal'" },
    { name: 'size', type: "'sm' | 'md' | 'lg'", description: 'Tab size', defaultValue: "'md'" },
    { name: 'fullWidth', type: 'boolean', description: 'Tabs take full width', defaultValue: 'false' },
  ],
  outputs: [
    { name: 'activeIndexChange', type: 'number', description: 'Emitted when active tab changes' },
  ],
  examples: [
    {
      title: 'Basic Tabs',
      description: 'Tabbed interface for organizing content panels',
      template: `<ui-tabs>
  <ui-tab label="Profile">Profile content</ui-tab>
  <ui-tab label="Settings">Settings content</ui-tab>
</ui-tabs>`,
    },
  ],
  accessibility: {
    ariaSupport: ['role="tablist"', 'role="tab"', 'role="tabpanel"', 'aria-selected state'],
    keyboardNavigation: [
      { key: 'Arrow Keys', description: 'Navigate between tabs' },
      { key: 'Home/End', description: 'First/last tab' },
    ],
    screenReaderNotes: 'Tab labels and panel content announced.',
  },
};

const ACCORDION_METADATA: ComponentMetadata = {
  id: 'accordion',
  name: 'Accordion',
  category: 'layout',
  description: 'A vertically stacked set of collapsible content panels.',
  selector: 'ui-accordion',
  inputs: [
    { name: 'mode', type: "'single' | 'multiple'", description: 'Expansion mode', defaultValue: "'single'" },
    { name: 'expanded', type: 'number[]', description: 'Array of expanded item indices', defaultValue: '[]' },
  ],
  outputs: [
    { name: 'expandedChange', type: 'number[]', description: 'Emitted when expansion state changes' },
  ],
  examples: [
    {
      title: 'Basic Accordion',
      description: 'Collapsible content panels with expand/collapse',
      template: `<ui-accordion>
  <ui-accordion-item title="Section 1">Content 1</ui-accordion-item>
  <ui-accordion-item title="Section 2">Content 2</ui-accordion-item>
</ui-accordion>`,
    },
  ],
  accessibility: {
    ariaSupport: ['role="region"', 'aria-expanded state', 'aria-controls'],
    keyboardNavigation: [
      { key: 'Enter/Space', description: 'Toggle panel' },
      { key: 'Arrow Keys', description: 'Navigate headers' },
    ],
    screenReaderNotes: 'Panel states and content announced.',
  },
};

const DIVIDER_METADATA: ComponentMetadata = {
  id: 'divider',
  name: 'Divider',
  category: 'layout',
  description: 'A visual separator for content sections.',
  selector: 'ui-divider',
  inputs: [
    { name: 'orientation', type: "'horizontal' | 'vertical'", description: 'Divider orientation', defaultValue: "'horizontal'" },
    { name: 'variant', type: "'solid' | 'dashed' | 'dotted'", description: 'Line style', defaultValue: "'solid'" },
  ],
  outputs: [],
  examples: [
    {
      title: 'Horizontal Divider',
      description: 'Visual separator between content sections',
      template: `<div>Section 1</div>
<ui-divider />
<div>Section 2</div>`,
    },
  ],
  accessibility: {
    ariaSupport: ['role="separator"', 'aria-orientation'],
    keyboardNavigation: [],
    screenReaderNotes: 'Announced as separator between sections.',
  },
};

const DRAWER_METADATA: ComponentMetadata = {
  id: 'drawer',
  name: 'Drawer',
  category: 'layout',
  description: 'A slide-in panel component that appears from the edge of the screen.',
  selector: 'ui-drawer',
  inputs: [
    { name: 'open', type: 'boolean', description: 'Whether drawer is open', defaultValue: 'false' },
    { name: 'position', type: "'left' | 'right' | 'top' | 'bottom'", description: 'Position', defaultValue: "'right'" },
    { name: 'size', type: "'sm' | 'md' | 'lg' | 'xl' | 'full'", description: 'Drawer size', defaultValue: "'md'" },
    { name: 'title', type: 'string', description: 'Drawer title' },
    { name: 'showBackdrop', type: 'boolean', description: 'Show backdrop overlay', defaultValue: 'true' },
  ],
  outputs: [
    { name: 'openChange', type: 'boolean', description: 'Emitted when open state changes' },
  ],
  examples: [
    {
      title: 'Side Drawer',
      description: 'Slide-in panel from screen edge',
      template: `<ui-drawer [open]="isOpen()" title="Navigation">
  <nav>Menu items...</nav>
</ui-drawer>`,
    },
  ],
  accessibility: {
    ariaSupport: ['role="dialog"', 'aria-modal="true"', 'Focus management'],
    keyboardNavigation: [{ key: 'Escape', description: 'Close drawer' }],
    screenReaderNotes: 'Drawer announces as dialog when opened.',
  },
};

const STACK_METADATA: ComponentMetadata = {
  id: 'stack',
  name: 'Stack',
  category: 'layout',
  description: 'A layout component for arranging children in a vertical or horizontal stack.',
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
      description: 'Vertical layout with consistent spacing',
      template: `<ui-stack direction="vertical" [spacing]="4">
  <div>Item 1</div>
  <div>Item 2</div>
</ui-stack>`,
    },
  ],
  accessibility: {
    ariaSupport: ['Semantic structure maintained'],
    keyboardNavigation: [],
    screenReaderNotes: 'Content flow is natural and logical.',
  },
};

const GRID_METADATA: ComponentMetadata = {
  id: 'grid',
  name: 'Grid',
  category: 'layout',
  description: 'A responsive grid layout component.',
  selector: 'ui-grid',
  inputs: [
    { name: 'columns', type: 'number', description: 'Number of columns', defaultValue: '12' },
    { name: 'gap', type: 'number', description: 'Gap between items (in spacing units)', defaultValue: '4' },
  ],
  outputs: [],
  examples: [
    {
      title: 'Responsive Grid',
      description: 'Multi-column grid layout with gap spacing',
      template: `<ui-grid [columns]="3" [gap]="4">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</ui-grid>`,
    },
  ],
  accessibility: {
    ariaSupport: ['Natural grid flow'],
    keyboardNavigation: [],
    screenReaderNotes: 'Grid items announced in order.',
  },
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
  description: 'A component for displaying user profile images or initials.',
  selector: 'ui-avatar',
  inputs: [
    { name: 'src', type: 'string', description: 'Image URL' },
    { name: 'alt', type: 'string', description: 'Alt text for image' },
    { name: 'text', type: 'string', description: 'Text/initials to display if no image' },
    { name: 'size', type: "'sm' | 'md' | 'lg' | 'xl'", description: 'Avatar size', defaultValue: "'md'" },
  ],
  outputs: [],
  examples: [
    {
      title: 'Avatar with Image',
      description: 'User profile image with fallback to initials',
      template: `<ui-avatar src="/avatar.jpg" alt="John Doe" />`,
    },
  ],
  accessibility: {
    ariaSupport: ['img alt text', 'role="img" for text avatars'],
    keyboardNavigation: [],
    screenReaderNotes: 'Alt text or initials announced.',
  },
};

const TOOLTIP_METADATA: ComponentMetadata = {
  id: 'tooltip',
  name: 'Tooltip',
  category: 'data-display',
  description: 'A popup that displays information when hovering or focusing an element.',
  selector: 'ui-tooltip',
  inputs: [
    { name: 'text', type: 'string', description: 'Tooltip text content', required: true },
    { name: 'position', type: "'top' | 'bottom' | 'left' | 'right'", description: 'Tooltip position', defaultValue: "'top'" },
  ],
  outputs: [],
  examples: [
    {
      title: 'Basic Tooltip',
      description: 'Hover or focus popup with additional information',
      template: `<button ui-tooltip text="Click to save">
  Save
</button>`,
    },
  ],
  accessibility: {
    ariaSupport: ['role="tooltip"', 'aria-describedby linkage'],
    keyboardNavigation: [{ key: 'Escape', description: 'Hide tooltip' }],
    screenReaderNotes: 'Tooltip text announced when element receives focus.',
  },
};

const CHIP_METADATA: ComponentMetadata = {
  id: 'chip',
  name: 'Chip',
  category: 'data-display',
  description: 'A compact element for tags, filters, or selections with optional remove action.',
  selector: 'ui-chip',
  inputs: [
    { name: 'label', type: 'string', description: 'Chip label text', required: true },
    { name: 'variant', type: "'default' | 'primary' | 'success' | 'warning' | 'error'", description: 'Visual variant', defaultValue: "'default'" },
    { name: 'size', type: "'sm' | 'md' | 'lg'", description: 'Chip size', defaultValue: "'md'" },
    { name: 'removable', type: 'boolean', description: 'Show remove button', defaultValue: 'false' },
    { name: 'disabled', type: 'boolean', description: 'Whether disabled', defaultValue: 'false' },
  ],
  outputs: [
    { name: 'removed', type: 'void', description: 'Emitted when remove button clicked' },
  ],
  examples: [
    {
      title: 'Removable Chip',
      description: 'Tag or filter chip with remove button',
      template: `<ui-chip label="JavaScript" [removable]="true" />`,
    },
  ],
  accessibility: {
    ariaSupport: ['Button semantics for removable chips', 'aria-label for remove button'],
    keyboardNavigation: [{ key: 'Backspace/Delete', description: 'Remove chip (when focused)' }],
    screenReaderNotes: 'Chip label and removable state announced.',
  },
};

const POPOVER_METADATA: ComponentMetadata = {
  id: 'popover',
  name: 'Popover',
  category: 'data-display',
  description: 'A floating panel that displays rich content relative to a trigger element.',
  selector: 'ui-popover',
  inputs: [
    { name: 'open', type: 'boolean', description: 'Whether popover is open', defaultValue: 'false' },
    { name: 'position', type: "'top' | 'bottom' | 'left' | 'right'", description: 'Popover position', defaultValue: "'bottom'" },
    { name: 'trigger', type: "'click' | 'hover'", description: 'Trigger type', defaultValue: "'click'" },
  ],
  outputs: [
    { name: 'openChange', type: 'boolean', description: 'Emitted when open state changes' },
  ],
  examples: [
    {
      title: 'Click Popover',
      description: 'Floating panel with rich content on click',
      template: `<button [ui-popover]="content">Show Info</button>
<ng-template #content>
  <div>Popover content...</div>
</ng-template>`,
    },
  ],
  accessibility: {
    ariaSupport: ['role="dialog"', 'aria-haspopup', 'Focus management'],
    keyboardNavigation: [{ key: 'Escape', description: 'Close popover' }],
    screenReaderNotes: 'Popover announces when opened.',
  },
};

const PAGINATION_METADATA: ComponentMetadata = {
  id: 'pagination',
  name: 'Pagination',
  category: 'data-display',
  description: 'A component for navigating through paginated data.',
  selector: 'ui-pagination',
  inputs: [
    { name: 'currentPage', type: 'number', description: 'Current page number', defaultValue: '1' },
    { name: 'totalItems', type: 'number', description: 'Total number of items', required: true },
    { name: 'pageSize', type: 'number', description: 'Items per page', defaultValue: '10' },
  ],
  outputs: [
    { name: 'pageChange', type: 'number', description: 'Emitted when page changes' },
  ],
  examples: [
    {
      title: 'Basic Pagination',
      description: 'Page navigation for large data sets',
      template: `<ui-pagination 
  [currentPage]="page()" 
  [totalItems]="1000" 
  [pageSize]="20" 
/>`,
    },
  ],
  accessibility: {
    ariaSupport: ['role="navigation"', 'aria-label="Pagination"', 'aria-current for current page'],
    keyboardNavigation: [
      { key: 'Arrow Keys', description: 'Navigate pages' },
      { key: 'Enter', description: 'Select page' },
    ],
    screenReaderNotes: 'Current page and total pages announced.',
  },
};

const TABLE_METADATA: ComponentMetadata = {
  id: 'table',
  name: 'Table',
  category: 'data-display',
  description: 'A data table component with sorting, selection, and customizable columns.',
  selector: 'ui-table',
  inputs: [
    { name: 'columns', type: 'TableColumn[]', description: 'Column definitions', required: true },
    { name: 'data', type: 'any[]', description: 'Table data', required: true },
  ],
  outputs: [
    { name: 'rowClick', type: 'any', description: 'Emitted when row is clicked' },
  ],
  examples: [
    {
      title: 'Data Table',
      description: 'Table with sorting and customizable columns',
      template: `<ui-table [columns]="columns" [data]="users" />`,
    },
  ],
  accessibility: {
    ariaSupport: ['Semantic table structure', 'Column headers', 'Sort state announcement'],
    keyboardNavigation: [
      { key: 'Arrow Keys', description: 'Navigate cells' },
      { key: 'Enter', description: 'Activate row/cell' },
    ],
    screenReaderNotes: 'Table structure, headers, and data announced.',
  },
};

const LIST_METADATA: ComponentMetadata = {
  id: 'list',
  name: 'List',
  category: 'data-display',
  description: 'A component for displaying lists of items with optional interactivity.',
  selector: 'ui-list',
  inputs: [
    { name: 'items', type: 'ListItem[]', description: 'List items', required: true },
    { name: 'variant', type: "'default' | 'divided' | 'bordered'", description: 'Visual variant', defaultValue: "'default'" },
    { name: 'interactive', type: 'boolean', description: 'Items are interactive', defaultValue: 'false' },
  ],
  outputs: [
    { name: 'itemClick', type: 'ListItem', description: 'Emitted when item is clicked' },
  ],
  examples: [
    {
      title: 'Basic List',
      description: 'List display with divider styling',
      template: `<ui-list [items]="items" variant="divided" />`,
    },
  ],
  accessibility: {
    ariaSupport: ['role="list"', 'role="listitem"', 'Interactive items use button semantics'],
    keyboardNavigation: [
      { key: 'Arrow Keys', description: 'Navigate items' },
      { key: 'Enter', description: 'Activate item' },
    ],
    screenReaderNotes: 'List structure and item count announced.',
  },
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
  description: 'A progress bar component for showing task completion.',
  selector: 'ui-progress',
  inputs: [
    { name: 'value', type: 'number', description: 'Progress value (0-100)', defaultValue: '0' },
    { name: 'variant', type: "'default' | 'success' | 'warning' | 'error'", description: 'Visual variant', defaultValue: "'default'" },
    { name: 'showValue', type: 'boolean', description: 'Show percentage value', defaultValue: 'false' },
  ],
  outputs: [],
  examples: [
    {
      title: 'Progress Bar',
      description: 'Task completion progress with percentage display',
      template: `<ui-progress [value]="75" [showValue]="true" />`,
    },
  ],
  accessibility: {
    ariaSupport: ['role="progressbar"', 'aria-valuenow/min/max', 'aria-label'],
    keyboardNavigation: [],
    screenReaderNotes: 'Progress percentage announced.',
  },
};

const SKELETON_METADATA: ComponentMetadata = {
  id: 'skeleton',
  name: 'Skeleton',
  category: 'feedback',
  description: 'A placeholder component for loading content.',
  selector: 'ui-skeleton',
  inputs: [
    { name: 'variant', type: "'text' | 'circular' | 'rectangular'", description: 'Skeleton shape', defaultValue: "'text'" },
    { name: 'width', type: 'string', description: 'Skeleton width' },
    { name: 'height', type: 'string', description: 'Skeleton height' },
  ],
  outputs: [],
  examples: [
    {
      title: 'Text Skeleton',
      description: 'Placeholder for loading text content',
      template: `<ui-skeleton variant="text" width="200px" />`,
    },
  ],
  accessibility: {
    ariaSupport: ['aria-busy="true"', 'aria-label="Loading content"'],
    keyboardNavigation: [],
    screenReaderNotes: 'Loading state announced.',
  },
};

const TOAST_METADATA: ComponentMetadata = {
  id: 'toast',
  name: 'Toast',
  category: 'feedback',
  description: 'A temporary notification component that appears at screen edges.',
  selector: 'ui-toast',
  inputs: [
    { name: 'message', type: 'string', description: 'Toast message', required: true },
    { name: 'variant', type: "'info' | 'success' | 'warning' | 'error'", description: 'Toast variant', defaultValue: "'info'" },
    { name: 'duration', type: 'number', description: 'Auto-dismiss duration (ms)', defaultValue: '3000' },
  ],
  outputs: [
    { name: 'dismissed', type: 'void', description: 'Emitted when toast is dismissed' },
  ],
  examples: [
    {
      title: 'Success Toast',
      description: 'Temporary notification at screen edge',
      typescript: `this.toastService.show('Saved!', 'success');`,
    },
  ],
  accessibility: {
    ariaSupport: ['role="status"', 'aria-live="polite"', 'aria-atomic="true"'],
    keyboardNavigation: [{ key: 'Escape', description: 'Dismiss toast' }],
    screenReaderNotes: 'Toast message announced non-intrusively.',
  },
};

// ============================================================================
// NAVIGATION COMPONENTS
// ============================================================================

const BREADCRUMB_METADATA: ComponentMetadata = {
  id: 'breadcrumb',
  name: 'Breadcrumb',
  category: 'navigation',
  description: 'A navigation component showing the current page location.',
  selector: 'ui-breadcrumb',
  inputs: [
    { name: 'items', type: 'BreadcrumbItem[]', description: 'Breadcrumb items', required: true },
    { name: 'separator', type: 'string', description: 'Separator character', defaultValue: "'/'"},
  ],
  outputs: [],
  examples: [
    {
      title: 'Basic Breadcrumb',
      description: 'Navigation trail showing current page location',
      template: `<ui-breadcrumb [items]="breadcrumbs" />`,
    },
  ],
  accessibility: {
    ariaSupport: ['role="navigation"', 'aria-label="Breadcrumb"', 'aria-current for current page'],
    keyboardNavigation: [{ key: 'Tab', description: 'Navigate links' }],
    screenReaderNotes: 'Breadcrumb trail and current location announced.',
  },
};

const MENU_METADATA: ComponentMetadata = {
  id: 'menu',
  name: 'Menu',
  category: 'navigation',
  description: 'A dropdown menu component with nested submenu support.',
  selector: 'ui-menu',
  inputs: [
    { name: 'items', type: 'MenuItem[]', description: 'Menu items', required: true },
    { name: 'open', type: 'boolean', description: 'Whether menu is open', defaultValue: 'false' },
  ],
  outputs: [
    { name: 'itemSelected', type: 'string', description: 'Emitted when item is selected' },
  ],
  examples: [
    {
      title: 'Dropdown Menu',
      description: 'Menu with nested submenu support',
      template: `<ui-menu [items]="menuItems" />`,
    },
  ],
  accessibility: {
    ariaSupport: ['role="menu"', 'role="menuitem"', 'aria-haspopup for submenus'],
    keyboardNavigation: [
      { key: 'Arrow Keys', description: 'Navigate menu items' },
      { key: 'Enter', description: 'Select item' },
      { key: 'Escape', description: 'Close menu' },
    ],
    screenReaderNotes: 'Menu structure and items announced.',
  },
};

const NAVBAR_METADATA: ComponentMetadata = {
  id: 'navbar',
  name: 'Navbar',
  category: 'navigation',
  description: 'A navigation bar component for app-wide navigation.',
  selector: 'ui-navbar',
  inputs: [
    { name: 'logo', type: 'string', description: 'Logo text or image URL' },
    { name: 'links', type: 'NavbarLink[]', description: 'Navigation links', required: true },
    { name: 'variant', type: "'default' | 'transparent' | 'sticky'", description: 'Navbar variant', defaultValue: "'default'" },
  ],
  outputs: [],
  examples: [
    {
      title: 'App Navbar',
      description: 'Application-wide navigation bar with logo and links',
      template: `<ui-navbar logo="MyApp" [links]="navLinks" />`,
    },
  ],
  accessibility: {
    ariaSupport: ['role="navigation"', 'aria-label="Main navigation"', 'Landmark navigation'],
    keyboardNavigation: [{ key: 'Tab', description: 'Navigate links' }],
    screenReaderNotes: 'Navigation structure announced.',
  },
};

const STEPPER_METADATA: ComponentMetadata = {
  id: 'stepper',
  name: 'Stepper',
  category: 'navigation',
  description: 'A component for multi-step processes with progress indication.',
  selector: 'ui-stepper',
  inputs: [
    { name: 'steps', type: 'Step[]', description: 'Stepper steps', required: true },
    { name: 'activeStep', type: 'number', description: 'Active step index', defaultValue: '0' },
    { name: 'orientation', type: "'horizontal' | 'vertical'", description: 'Stepper orientation', defaultValue: "'horizontal'" },
  ],
  outputs: [
    { name: 'activeStepChange', type: 'number', description: 'Emitted when active step changes' },
  ],
  examples: [
    {
      title: 'Checkout Stepper',
      description: 'Multi-step process with progress indication',
      template: `<ui-stepper [steps]="checkoutSteps" [activeStep]="currentStep()" />`,
    },
  ],
  accessibility: {
    ariaSupport: ['role="navigation"', 'aria-label="Progress"', 'Step status announced'],
    keyboardNavigation: [
      { key: 'Arrow Keys', description: 'Navigate steps' },
      { key: 'Enter', description: 'Select step' },
    ],
    screenReaderNotes: 'Current step and total steps announced.',
  },
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

