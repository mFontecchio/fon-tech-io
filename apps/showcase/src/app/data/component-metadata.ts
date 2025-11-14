/**
 * Component Metadata Registry
 * Contains API documentation for all components
 */

import { ComponentMetadataMap } from './component-metadata.types';

export const COMPONENT_METADATA: ComponentMetadataMap = {
  // ===========================
  // FORM COMPONENTS
  // ===========================
  
  'button': {
    id: 'button',
    name: 'Button',
    category: 'form',
    description: 'A clickable button component that supports multiple variants, sizes, and states. Fully accessible with keyboard navigation and ARIA support.',
    selector: 'ui-button',
    
    inputs: [
      {
        name: 'variant',
        type: "'filled' | 'outlined' | 'text'",
        default: "'filled'",
        required: false,
        description: 'Visual style variant of the button',
      },
      {
        name: 'size',
        type: "'sm' | 'md' | 'lg'",
        default: "'md'",
        required: false,
        description: 'Size of the button',
      },
      {
        name: 'color',
        type: "'primary' | 'secondary' | 'success' | 'warning' | 'error'",
        default: "'primary'",
        required: false,
        description: 'Color scheme of the button',
      },
      {
        name: 'disabled',
        type: 'boolean',
        default: 'false',
        required: false,
        description: 'Whether the button is disabled',
      },
      {
        name: 'loading',
        type: 'boolean',
        default: 'false',
        required: false,
        description: 'Shows a loading spinner and disables the button',
      },
      {
        name: 'fullWidth',
        type: 'boolean',
        default: 'false',
        required: false,
        description: 'Makes the button take up the full width of its container',
      },
      {
        name: 'type',
        type: "'button' | 'submit' | 'reset'",
        default: "'button'",
        required: false,
        description: 'HTML button type attribute',
      },
    ],
    
    outputs: [
      {
        name: 'clicked',
        type: 'void',
        description: 'Emitted when the button is clicked (not emitted when disabled or loading)',
      },
    ],
    
    examples: [
      {
        title: 'Basic Usage',
        description: 'A simple button with default settings',
        typescript: `import { Component } from '@angular/core';
import { ButtonComponent } from '@ui-suite/components';

@Component({
  selector: 'app-example',
  imports: [ButtonComponent],
  template: \`
    <ui-button (clicked)="handleClick()">
      Click Me
    </ui-button>
  \`
})
export class ExampleComponent {
  handleClick() {
    console.log('Button clicked!');
  }
}`,
        template: `<ui-button (clicked)="handleClick()">
  Click Me
</ui-button>`,
      },
      {
        title: 'Variants',
        description: 'Different visual styles for various use cases',
        typescript: '',
        template: `<ui-button variant="filled">Filled Button</ui-button>
<ui-button variant="outlined">Outlined Button</ui-button>
<ui-button variant="text">Text Button</ui-button>`,
      },
      {
        title: 'Sizes',
        description: 'Three size options to fit different contexts',
        typescript: '',
        template: `<ui-button size="sm">Small</ui-button>
<ui-button size="md">Medium</ui-button>
<ui-button size="lg">Large</ui-button>`,
      },
      {
        title: 'Colors',
        description: 'Semantic color schemes for different actions',
        typescript: '',
        template: `<ui-button color="primary">Primary</ui-button>
<ui-button color="secondary">Secondary</ui-button>
<ui-button color="success">Success</ui-button>
<ui-button color="warning">Warning</ui-button>
<ui-button color="error">Error</ui-button>`,
      },
      {
        title: 'States',
        description: 'Loading and disabled states',
        typescript: '',
        template: `<ui-button [loading]="true">Loading...</ui-button>
<ui-button [disabled]="true">Disabled</ui-button>`,
      },
    ],
    
    accessibility: {
      ariaSupport: [
        'Automatically includes aria-disabled when disabled',
        'Supports custom aria-label via standard HTML attributes',
        'Button role is implicit from native button element',
      ],
      keyboardNavigation: [
        { key: 'Enter', description: 'Activates the button' },
        { key: 'Space', description: 'Activates the button' },
        { key: 'Tab', description: 'Moves focus to/from the button' },
      ],
      screenReaderNotes: 'Button content is announced along with its state (disabled, loading). Loading state shows visual spinner but should include aria-live region for screen readers.',
    },
    
    bestPractices: [
      'Use semantic color props (success, error, warning) to convey meaning',
      'Always provide clear, action-oriented button text',
      'Use loading state during async operations to prevent double-clicks',
      'Consider using fullWidth for mobile layouts',
      'Avoid using disabled buttons without explaining why they are disabled',
    ],
    
    relatedComponents: ['input', 'checkbox', 'radio'],
  },
  
  'input': {
    id: 'input',
    name: 'Input',
    category: 'form',
    description: 'A versatile text input field component supporting multiple input types, validation states, helper text, and accessibility features.',
    selector: 'ui-input',
    
    inputs: [
      {
        name: 'type',
        type: "'text' | 'email' | 'password' | 'tel' | 'url' | 'number' | 'search'",
        default: "'text'",
        required: false,
        description: 'HTML input type attribute',
      },
      {
        name: 'label',
        type: 'string',
        required: false,
        description: 'Label text displayed above the input',
      },
      {
        name: 'placeholder',
        type: 'string',
        required: false,
        description: 'Placeholder text shown when input is empty',
      },
      {
        name: 'value',
        type: 'string',
        default: "''",
        required: false,
        description: 'Current value of the input',
      },
      {
        name: 'disabled',
        type: 'boolean',
        default: 'false',
        required: false,
        description: 'Whether the input is disabled',
      },
      {
        name: 'required',
        type: 'boolean',
        default: 'false',
        required: false,
        description: 'Whether the input is required',
      },
      {
        name: 'readonly',
        type: 'boolean',
        default: 'false',
        required: false,
        description: 'Whether the input is read-only',
      },
      {
        name: 'errorMessage',
        type: 'string',
        required: false,
        description: 'Error message to display (shows error state)',
      },
      {
        name: 'helperText',
        type: 'string',
        required: false,
        description: 'Helper text displayed below the input',
      },
      {
        name: 'fullWidth',
        type: 'boolean',
        default: 'false',
        required: false,
        description: 'Makes the input take full width of container',
      },
      {
        name: 'size',
        type: "'sm' | 'md' | 'lg'",
        default: "'md'",
        required: false,
        description: 'Size of the input field',
      },
    ],
    
    outputs: [
      {
        name: 'valueChange',
        type: 'string',
        description: 'Emitted when the input value changes',
      },
      {
        name: 'blur',
        type: 'void',
        description: 'Emitted when the input loses focus',
      },
      {
        name: 'focus',
        type: 'void',
        description: 'Emitted when the input gains focus',
      },
    ],
    
    examples: [
      {
        title: 'Basic Usage',
        description: 'Simple text input with label',
        typescript: `import { Component, signal } from '@angular/core';
import { InputComponent } from '@ui-suite/components';

@Component({
  selector: 'app-example',
  imports: [InputComponent],
  template: \`
    <ui-input
      label="Full Name"
      placeholder="Enter your name"
      [value]="name()"
      (valueChange)="name.set($event)"
    />
  \`
})
export class ExampleComponent {
  name = signal('');
}`,
        template: `<ui-input
  label="Full Name"
  placeholder="Enter your name"
  [value]="name()"
  (valueChange)="name.set($event)"
/>`,
      },
      {
        title: 'Input Types',
        description: 'Different input types for various data',
        typescript: '',
        template: `<ui-input type="email" label="Email" placeholder="you@example.com" />
<ui-input type="password" label="Password" placeholder="Enter password" />
<ui-input type="tel" label="Phone" placeholder="(555) 123-4567" />
<ui-input type="url" label="Website" placeholder="https://example.com" />
<ui-input type="number" label="Age" placeholder="25" />`,
      },
      {
        title: 'Validation States',
        description: 'Show error messages and helper text',
        typescript: '',
        template: `<ui-input
  label="Email"
  errorMessage="Please enter a valid email address"
  [fullWidth]="true"
/>

<ui-input
  label="Username"
  helperText="Must be 3-20 characters"
  [fullWidth]="true"
/>`,
      },
      {
        title: 'Sizes',
        description: 'Three size options',
        typescript: '',
        template: `<ui-input size="sm" label="Small" placeholder="Small input" />
<ui-input size="md" label="Medium" placeholder="Medium input" />
<ui-input size="lg" label="Large" placeholder="Large input" />`,
      },
    ],
    
    accessibility: {
      ariaSupport: [
        'Automatically links label to input via id',
        'Error messages connected via aria-describedby',
        'Helper text connected via aria-describedby',
        'Required state indicated with aria-required',
        'Invalid state indicated with aria-invalid when error exists',
      ],
      keyboardNavigation: [
        { key: 'Tab', description: 'Moves focus to/from the input' },
        { key: 'Shift + Tab', description: 'Moves focus backward' },
      ],
      screenReaderNotes: 'Label, current value, error messages, and helper text are announced. Required fields are identified. Invalid fields announce the error message.',
    },
    
    bestPractices: [
      'Always provide a clear label for the input',
      'Use appropriate input types for better mobile keyboards',
      'Provide helpful placeholder text as examples, not instructions',
      'Show error messages that explain how to fix the problem',
      'Use helper text to set expectations before errors occur',
    ],
    
    relatedComponents: ['textarea', 'select', 'button'],
  },
  
  'textarea': {
    id: 'textarea',
    name: 'Textarea',
    category: 'form',
    description: 'A multi-line text input component with auto-resize capability and character counting.',
    selector: 'ui-textarea',
    
    inputs: [
      {
        name: 'label',
        type: 'string',
        required: false,
        description: 'Label text displayed above the textarea',
      },
      {
        name: 'placeholder',
        type: 'string',
        required: false,
        description: 'Placeholder text shown when textarea is empty',
      },
      {
        name: 'value',
        type: 'string',
        default: "''",
        required: false,
        description: 'Current value of the textarea',
      },
      {
        name: 'rows',
        type: 'number',
        default: '3',
        required: false,
        description: 'Initial number of visible rows',
      },
      {
        name: 'maxLength',
        type: 'number',
        required: false,
        description: 'Maximum number of characters allowed',
      },
      {
        name: 'autoResize',
        type: 'boolean',
        default: 'false',
        required: false,
        description: 'Automatically adjusts height based on content',
      },
      {
        name: 'showCharacterCount',
        type: 'boolean',
        default: 'false',
        required: false,
        description: 'Shows character count (requires maxLength)',
      },
      {
        name: 'disabled',
        type: 'boolean',
        default: 'false',
        required: false,
        description: 'Whether the textarea is disabled',
      },
      {
        name: 'required',
        type: 'boolean',
        default: 'false',
        required: false,
        description: 'Whether the textarea is required',
      },
      {
        name: 'readonly',
        type: 'boolean',
        default: 'false',
        required: false,
        description: 'Whether the textarea is read-only',
      },
      {
        name: 'errorMessage',
        type: 'string',
        required: false,
        description: 'Error message to display',
      },
      {
        name: 'helperText',
        type: 'string',
        required: false,
        description: 'Helper text displayed below the textarea',
      },
      {
        name: 'fullWidth',
        type: 'boolean',
        default: 'false',
        required: false,
        description: 'Makes the textarea take full width',
      },
    ],
    
    outputs: [
      {
        name: 'valueChange',
        type: 'string',
        description: 'Emitted when the textarea value changes',
      },
    ],
    
    examples: [
      {
        title: 'Basic Usage',
        description: 'Simple textarea with fixed rows',
        typescript: '',
        template: `<ui-textarea
  label="Description"
  placeholder="Enter a description..."
  [rows]="4"
  [fullWidth]="true"
/>`,
      },
      {
        title: 'Auto-Resize',
        description: 'Textarea that grows with content',
        typescript: '',
        template: `<ui-textarea
  label="Comments"
  placeholder="Type your comments..."
  [autoResize]="true"
  [fullWidth]="true"
/>`,
      },
      {
        title: 'Character Count',
        description: 'Display character count with limit',
        typescript: '',
        template: `<ui-textarea
  label="Bio"
  placeholder="Tell us about yourself..."
  [maxLength]="200"
  [showCharacterCount]="true"
  [fullWidth]="true"
/>`,
      },
    ],
    
    accessibility: {
      ariaSupport: [
        'Label automatically linked to textarea',
        'Character count announced to screen readers',
        'Error and helper text connected via aria-describedby',
        'Required state indicated with aria-required',
      ],
      keyboardNavigation: [
        { key: 'Tab', description: 'Moves focus to/from the textarea' },
        { key: 'Enter', description: 'Creates a new line in the textarea' },
      ],
      screenReaderNotes: 'Multi-line edit field is announced. Character count updates are announced. Maximum length is communicated.',
    },
    
    bestPractices: [
      'Use autoResize for dynamic content to improve UX',
      'Always set maxLength with showCharacterCount for user clarity',
      'Provide adequate initial rows (3-5) for comfortable typing',
      'Use helper text to indicate expected content format',
    ],
    
    relatedComponents: ['input'],
  },
  
  'checkbox': {
    id: 'checkbox',
    name: 'Checkbox',
    category: 'form',
    description: 'A checkbox component supporting checked, unchecked, and indeterminate states with customizable sizes.',
    selector: 'ui-checkbox',
    
    inputs: [
      {
        name: 'checked',
        type: 'boolean',
        default: 'false',
        required: false,
        description: 'Whether the checkbox is checked',
      },
      {
        name: 'indeterminate',
        type: 'boolean',
        default: 'false',
        required: false,
        description: 'Shows indeterminate state (partial selection)',
      },
      {
        name: 'label',
        type: 'string',
        required: false,
        description: 'Label text displayed next to the checkbox',
      },
      {
        name: 'disabled',
        type: 'boolean',
        default: 'false',
        required: false,
        description: 'Whether the checkbox is disabled',
      },
      {
        name: 'required',
        type: 'boolean',
        default: 'false',
        required: false,
        description: 'Whether the checkbox is required',
      },
      {
        name: 'size',
        type: "'sm' | 'md' | 'lg'",
        default: "'md'",
        required: false,
        description: 'Size of the checkbox',
      },
      {
        name: 'helperText',
        type: 'string',
        required: false,
        description: 'Helper text displayed below the checkbox',
      },
    ],
    
    outputs: [
      {
        name: 'checkedChange',
        type: 'boolean',
        description: 'Emitted when the checked state changes',
      },
    ],
    
    examples: [
      {
        title: 'Basic Usage',
        description: 'Simple checkbox with label',
        typescript: `import { Component, signal } from '@angular/core';
import { CheckboxComponent } from '@ui-suite/components';

@Component({
  selector: 'app-example',
  imports: [CheckboxComponent],
  template: \`
    <ui-checkbox
      label="Accept terms and conditions"
      [checked]="accepted()"
      (checkedChange)="accepted.set($event)"
    />
  \`
})
export class ExampleComponent {
  accepted = signal(false);
}`,
        template: `<ui-checkbox
  label="Accept terms and conditions"
  [checked]="accepted()"
  (checkedChange)="accepted.set($event)"
/>`,
      },
      {
        title: 'Indeterminate State',
        description: 'Checkbox with partial selection state',
        typescript: '',
        template: `<ui-checkbox
  label="Select all items"
  [indeterminate]="true"
  helperText="Some items are selected"
/>`,
      },
      {
        title: 'Sizes',
        description: 'Different checkbox sizes',
        typescript: '',
        template: `<ui-checkbox label="Small" size="sm" />
<ui-checkbox label="Medium" size="md" />
<ui-checkbox label="Large" size="lg" />`,
      },
      {
        title: 'Checkbox Group',
        description: 'Multiple checkboxes for multi-selection',
        typescript: '',
        template: `<ui-checkbox label="JavaScript" [checked]="true" />
<ui-checkbox label="TypeScript" [checked]="true" />
<ui-checkbox label="Python" />
<ui-checkbox label="Go" />`,
      },
    ],
    
    accessibility: {
      ariaSupport: [
        'Checkbox role is implicit from input type="checkbox"',
        'Label automatically associated with checkbox',
        'Checked state announced to screen readers',
        'Indeterminate state indicated with aria-checked="mixed"',
        'Required state indicated with aria-required',
      ],
      keyboardNavigation: [
        { key: 'Space', description: 'Toggles the checkbox' },
        { key: 'Tab', description: 'Moves focus to/from checkbox' },
      ],
      screenReaderNotes: 'Checkbox state (checked, not checked, or partially checked) is announced. Label is read when focused.',
    },
    
    bestPractices: [
      'Use clear, concise labels that describe what will be selected',
      'Use indeterminate state for "select all" in grouped checkboxes',
      'Group related checkboxes together visually',
      'Avoid using disabled checkboxes without explanation',
    ],
    
    relatedComponents: ['radio', 'switch'],
  },
  
  'radio': {
    id: 'radio',
    name: 'Radio',
    category: 'form',
    description: 'A radio button component for selecting a single option from a group of choices.',
    selector: 'ui-radio',
    
    inputs: [
      {
        name: 'name',
        type: 'string',
        required: true,
        description: 'Name attribute (groups radios together)',
      },
      {
        name: 'value',
        type: 'string',
        required: true,
        description: 'Value of this radio option',
      },
      {
        name: 'checked',
        type: 'boolean',
        default: 'false',
        required: false,
        description: 'Whether this radio is selected',
      },
      {
        name: 'label',
        type: 'string',
        required: false,
        description: 'Label text displayed next to the radio',
      },
      {
        name: 'disabled',
        type: 'boolean',
        default: 'false',
        required: false,
        description: 'Whether the radio is disabled',
      },
      {
        name: 'required',
        type: 'boolean',
        default: 'false',
        required: false,
        description: 'Whether selection is required',
      },
      {
        name: 'size',
        type: "'sm' | 'md' | 'lg'",
        default: "'md'",
        required: false,
        description: 'Size of the radio button',
      },
    ],
    
    outputs: [
      {
        name: 'checkedChange',
        type: 'string',
        description: 'Emitted with the value when this radio is selected',
      },
    ],
    
    examples: [
      {
        title: 'Radio Group',
        description: 'Group of radio buttons for single selection',
        typescript: `import { Component, signal } from '@angular/core';
import { RadioComponent } from '@ui-suite/components';

@Component({
  selector: 'app-example',
  imports: [RadioComponent],
  template: \`
    <ui-radio
      name="plan"
      value="free"
      label="Free Plan"
      [checked]="plan() === 'free'"
      (checkedChange)="plan.set($event)"
    />
    <ui-radio
      name="plan"
      value="pro"
      label="Pro Plan"
      [checked]="plan() === 'pro'"
      (checkedChange)="plan.set($event)"
    />
  \`
})
export class ExampleComponent {
  plan = signal('free');
}`,
        template: `<ui-radio
  name="plan"
  value="free"
  label="Free Plan"
  [checked]="plan() === 'free'"
  (checkedChange)="plan.set($event)"
/>
<ui-radio
  name="plan"
  value="pro"
  label="Pro Plan"
  [checked]="plan() === 'pro'"
  (checkedChange)="plan.set($event)"
/>`,
      },
      {
        title: 'Sizes',
        description: 'Different radio button sizes',
        typescript: '',
        template: `<ui-radio name="size-demo" value="sm" label="Small" size="sm" />
<ui-radio name="size-demo" value="md" label="Medium" size="md" />
<ui-radio name="size-demo" value="lg" label="Large" size="lg" />`,
      },
    ],
    
    accessibility: {
      ariaSupport: [
        'Radio role is implicit from input type="radio"',
        'Name attribute groups radios into radio group',
        'Label automatically associated with radio',
        'Checked state announced to screen readers',
      ],
      keyboardNavigation: [
        { key: 'Tab', description: 'Moves focus to the radio group' },
        { key: 'Space', description: 'Selects the focused radio' },
        { key: 'Arrow Keys', description: 'Navigate between radios in the group' },
      ],
      screenReaderNotes: 'Radio button state is announced. Group name and current selection announced when entering group.',
    },
    
    bestPractices: [
      'Always use the same name attribute for radios in a group',
      'Provide clear labels that distinguish options',
      'Use radio buttons for 2-6 options; consider a select for more',
      'Avoid having too many radio groups on one page',
      'Pre-select a default option when appropriate',
    ],
    
    relatedComponents: ['checkbox', 'select'],
  },
  
  'switch': {
    id: 'switch',
    name: 'Switch',
    category: 'form',
    description: 'A toggle switch component for binary on/off states, commonly used for settings and preferences.',
    selector: 'ui-switch',
    
    inputs: [
      {
        name: 'checked',
        type: 'boolean',
        default: 'false',
        required: false,
        description: 'Whether the switch is on (checked)',
      },
      {
        name: 'label',
        type: 'string',
        required: false,
        description: 'Label text displayed next to the switch',
      },
      {
        name: 'disabled',
        type: 'boolean',
        default: 'false',
        required: false,
        description: 'Whether the switch is disabled',
      },
      {
        name: 'required',
        type: 'boolean',
        default: 'false',
        required: false,
        description: 'Whether the switch is required',
      },
      {
        name: 'size',
        type: "'sm' | 'md' | 'lg'",
        default: "'md'",
        required: false,
        description: 'Size of the switch',
      },
    ],
    
    outputs: [
      {
        name: 'checkedChange',
        type: 'boolean',
        description: 'Emitted when the switch state changes',
      },
    ],
    
    examples: [
      {
        title: 'Basic Usage',
        description: 'Simple on/off toggle switch',
        typescript: `import { Component, signal } from '@angular/core';
import { SwitchComponent } from '@ui-suite/components';

@Component({
  selector: 'app-example',
  imports: [SwitchComponent],
  template: \`
    <ui-switch
      label="Enable notifications"
      [checked]="notifications()"
      (checkedChange)="notifications.set($event)"
    />
  \`
})
export class ExampleComponent {
  notifications = signal(false);
}`,
        template: `<ui-switch
  label="Enable notifications"
  [checked]="notifications()"
  (checkedChange)="notifications.set($event)"
/>`,
      },
      {
        title: 'Settings Group',
        description: 'Multiple switches for settings',
        typescript: '',
        template: `<ui-switch label="Dark mode" [checked]="true" />
<ui-switch label="Auto-save" [checked]="true" />
<ui-switch label="Show notifications" />
<ui-switch label="Email updates" />`,
      },
      {
        title: 'Sizes',
        description: 'Different switch sizes',
        typescript: '',
        template: `<ui-switch label="Small switch" size="sm" />
<ui-switch label="Medium switch" size="md" />
<ui-switch label="Large switch" size="lg" />`,
      },
    ],
    
    accessibility: {
      ariaSupport: [
        'Switch role indicated with role="switch"',
        'Checked state indicated with aria-checked',
        'Label automatically associated with switch',
        'Disabled state indicated with aria-disabled',
      ],
      keyboardNavigation: [
        { key: 'Space', description: 'Toggles the switch' },
        { key: 'Tab', description: 'Moves focus to/from switch' },
      ],
      screenReaderNotes: 'Switch control announced with on/off state. Label read when focused. State changes announced.',
    },
    
    bestPractices: [
      'Use switches for settings that take effect immediately',
      'Use checkboxes for selections that require explicit submission',
      'Labels should clearly indicate what the "on" state enables',
      'Group related switches together',
      'Avoid using disabled switches without explanation',
    ],
    
    relatedComponents: ['checkbox', 'radio'],
  },
  
  'select': {
    id: 'select',
    name: 'Select',
    category: 'form',
    description: 'A dropdown select component for choosing one option from a list of choices.',
    selector: 'ui-select',
    
    inputs: [
      {
        name: 'options',
        type: 'SelectOption[]',
        required: true,
        description: 'Array of options with value and label properties',
      },
      {
        name: 'value',
        type: 'string',
        required: false,
        description: 'Currently selected value',
      },
      {
        name: 'label',
        type: 'string',
        required: false,
        description: 'Label text displayed above the select',
      },
      {
        name: 'placeholder',
        type: 'string',
        default: "'Select an option'",
        required: false,
        description: 'Placeholder text when no option selected',
      },
      {
        name: 'disabled',
        type: 'boolean',
        default: 'false',
        required: false,
        description: 'Whether the select is disabled',
      },
      {
        name: 'required',
        type: 'boolean',
        default: 'false',
        required: false,
        description: 'Whether selection is required',
      },
      {
        name: 'errorMessage',
        type: 'string',
        required: false,
        description: 'Error message to display',
      },
      {
        name: 'helperText',
        type: 'string',
        required: false,
        description: 'Helper text displayed below the select',
      },
      {
        name: 'fullWidth',
        type: 'boolean',
        default: 'false',
        required: false,
        description: 'Makes the select take full width',
      },
    ],
    
    outputs: [
      {
        name: 'valueChange',
        type: 'string',
        description: 'Emitted when the selected value changes',
      },
    ],
    
    examples: [
      {
        title: 'Basic Usage',
        description: 'Simple select dropdown',
        typescript: `import { Component, signal } from '@angular/core';
import { SelectComponent } from '@ui-suite/components';

@Component({
  selector: 'app-example',
  imports: [SelectComponent],
  template: \`
    <ui-select
      label="Country"
      [options]="countries"
      [value]="selectedCountry()"
      (valueChange)="selectedCountry.set($event)"
    />
  \`
})
export class ExampleComponent {
  countries = [
    { value: 'us', label: 'United States' },
    { value: 'ca', label: 'Canada' },
    { value: 'uk', label: 'United Kingdom' }
  ];
  selectedCountry = signal('');
}`,
        template: `<ui-select
  label="Country"
  [options]="countries"
  [value]="selectedCountry()"
  (valueChange)="selectedCountry.set($event)"
/>`,
      },
    ],
    
    accessibility: {
      ariaSupport: [
        'Combobox role for keyboard interaction',
        'Label automatically linked',
        'Selected option announced',
        'Expanded state indicated with aria-expanded',
      ],
      keyboardNavigation: [
        { key: 'Enter / Space', description: 'Opens the dropdown' },
        { key: 'Arrow Up / Down', description: 'Navigate options' },
        { key: 'Escape', description: 'Closes the dropdown' },
        { key: 'Tab', description: 'Moves focus to/from select' },
      ],
      screenReaderNotes: 'Combobox with current selection announced. Options announced when navigating with arrow keys.',
    },
    
    bestPractices: [
      'Keep option lists under 10 items when possible',
      'For long lists, consider adding search functionality',
      'Use clear, distinct labels for options',
      'Group related options when there are many choices',
    ],
    
    relatedComponents: ['multi-select', 'input', 'radio'],
  },
  
  'multi-select': {
    id: 'multi-select',
    name: 'Multi Select',
    category: 'form',
    description: 'An advanced multi-select component with search, tag display, and the ability to add custom tags.',
    selector: 'ui-multi-select',
    
    inputs: [
      {
        name: 'options',
        type: 'SelectOption[]',
        required: true,
        description: 'Array of available options',
      },
      {
        name: 'selectedValues',
        type: 'string[]',
        default: '[]',
        required: false,
        description: 'Array of currently selected values',
      },
      {
        name: 'label',
        type: 'string',
        required: false,
        description: 'Label text displayed above the multi-select',
      },
      {
        name: 'placeholder',
        type: 'string',
        default: "'Select options'",
        required: false,
        description: 'Placeholder text',
      },
      {
        name: 'searchable',
        type: 'boolean',
        default: 'true',
        required: false,
        description: 'Enables search/filtering of options',
      },
      {
        name: 'allowCustomTags',
        type: 'boolean',
        default: 'false',
        required: false,
        description: 'Allows users to create custom tags',
      },
      {
        name: 'disabled',
        type: 'boolean',
        default: 'false',
        required: false,
        description: 'Whether the multi-select is disabled',
      },
      {
        name: 'maxSelections',
        type: 'number',
        required: false,
        description: 'Maximum number of selections allowed',
      },
      {
        name: 'fullWidth',
        type: 'boolean',
        default: 'false',
        required: false,
        description: 'Makes the multi-select take full width',
      },
    ],
    
    outputs: [
      {
        name: 'selectedValuesChange',
        type: 'string[]',
        description: 'Emitted when selected values change',
      },
    ],
    
    examples: [
      {
        title: 'Basic Multi-Select',
        description: 'Select multiple options',
        typescript: '',
        template: `<ui-multi-select
  label="Skills"
  [options]="skillOptions"
  [selectedValues]="selectedSkills()"
  (selectedValuesChange)="selectedSkills.set($event)"
/>`,
      },
      {
        title: 'With Search',
        description: 'Searchable multi-select for long lists',
        typescript: '',
        template: `<ui-multi-select
  label="Technologies"
  [options]="techOptions"
  [searchable]="true"
  placeholder="Search and select..."
/>`,
      },
      {
        title: 'Custom Tags',
        description: 'Allow users to create custom tags',
        typescript: '',
        template: `<ui-multi-select
  label="Tags"
  [options]="predefinedTags"
  [allowCustomTags]="true"
  placeholder="Type to add custom tags..."
/>`,
      },
    ],
    
    accessibility: {
      ariaSupport: [
        'Combobox role with multi-select support',
        'Selected tags have remove buttons with aria-label',
        'Search input has aria-autocomplete',
        'Options have aria-selected state',
      ],
      keyboardNavigation: [
        { key: 'Enter / Space', description: 'Selects/deselects option' },
        { key: 'Arrow Up / Down', description: 'Navigate options' },
        { key: 'Backspace', description: 'Removes last selected tag' },
        { key: 'Escape', description: 'Closes dropdown' },
      ],
      screenReaderNotes: 'Multi-select combobox announced. Number of selected items announced. Each selection change announced.',
    },
    
    bestPractices: [
      'Enable search for lists with more than 10 options',
      'Show selected count in label or helper text',
      'Consider maxSelections for constrained scenarios',
      'Provide clear visual feedback for selected items',
    ],
    
    relatedComponents: ['select', 'chip', 'checkbox'],
  },
  
  'slider': {
    id: 'slider',
    name: 'Slider',
    category: 'form',
    description: 'A slider component for selecting numeric values, supporting single value or range selection.',
    selector: 'ui-slider',
    
    inputs: [
      {
        name: 'value',
        type: 'number',
        default: '0',
        required: false,
        description: 'Current value (or start value in range mode)',
      },
      {
        name: 'valueEnd',
        type: 'number',
        required: false,
        description: 'End value for range slider (enables dual handles)',
      },
      {
        name: 'min',
        type: 'number',
        default: '0',
        required: false,
        description: 'Minimum value',
      },
      {
        name: 'max',
        type: 'number',
        default: '100',
        required: false,
        description: 'Maximum value',
      },
      {
        name: 'step',
        type: 'number',
        default: '1',
        required: false,
        description: 'Step increment between values',
      },
      {
        name: 'label',
        type: 'string',
        required: false,
        description: 'Label text displayed above the slider',
      },
      {
        name: 'showValue',
        type: 'boolean',
        default: 'true',
        required: false,
        description: 'Shows current value(s) above handles',
      },
      {
        name: 'disabled',
        type: 'boolean',
        default: 'false',
        required: false,
        description: 'Whether the slider is disabled',
      },
      {
        name: 'marks',
        type: 'SliderMark[]',
        required: false,
        description: 'Array of mark points to display on the track',
      },
    ],
    
    outputs: [
      {
        name: 'valueChange',
        type: 'number',
        description: 'Emitted when the value changes',
      },
      {
        name: 'valueEndChange',
        type: 'number',
        description: 'Emitted when the end value changes (range mode)',
      },
    ],
    
    examples: [
      {
        title: 'Basic Slider',
        description: 'Single value slider',
        typescript: '',
        template: `<ui-slider
  label="Volume"
  [min]="0"
  [max]="100"
  [value]="volume()"
  (valueChange)="volume.set($event)"
/>`,
      },
      {
        title: 'Range Slider',
        description: 'Select a range with two handles',
        typescript: '',
        template: `<ui-slider
  label="Price Range"
  [min]="0"
  [max]="1000"
  [value]="priceMin()"
  [valueEnd]="priceMax()"
  (valueChange)="priceMin.set($event)"
  (valueEndChange)="priceMax.set($event)"
/>`,
      },
      {
        title: 'With Step',
        description: 'Slider with custom step increment',
        typescript: '',
        template: `<ui-slider
  label="Rating"
  [min]="0"
  [max]="10"
  [step]="0.5"
  [value]="rating()"
  (valueChange)="rating.set($event)"
/>`,
      },
    ],
    
    accessibility: {
      ariaSupport: [
        'Slider role on input elements',
        'aria-valuemin, aria-valuemax, aria-valuenow for current state',
        'aria-label describes the slider purpose',
      ],
      keyboardNavigation: [
        { key: 'Arrow Left / Down', description: 'Decrease value by step' },
        { key: 'Arrow Right / Up', description: 'Increase value by step' },
        { key: 'Home', description: 'Set to minimum value' },
        { key: 'End', description: 'Set to maximum value' },
        { key: 'Page Up / Down', description: 'Increase/decrease by larger step' },
      ],
      screenReaderNotes: 'Slider value announced when changed. Min, max, and current value announced when focused.',
    },
    
    bestPractices: [
      'Choose appropriate min, max, and step values for your use case',
      'Use showValue to display current selection',
      'Consider marks for important value points',
      'Provide clear labels indicating what the slider controls',
    ],
    
    relatedComponents: ['input', 'progress'],
  },
  
  'date-picker': {
    id: 'date-picker',
    name: 'Date Picker',
    category: 'form',
    description: 'A calendar-based date picker component with keyboard navigation and accessibility support.',
    selector: 'ui-date-picker',
    
    inputs: [
      {
        name: 'value',
        type: 'Date | null',
        required: false,
        description: 'Currently selected date',
      },
      {
        name: 'label',
        type: 'string',
        required: false,
        description: 'Label text displayed above the date picker',
      },
      {
        name: 'placeholder',
        type: 'string',
        default: "'Select a date'",
        required: false,
        description: 'Placeholder text',
      },
      {
        name: 'minDate',
        type: 'Date',
        required: false,
        description: 'Minimum selectable date',
      },
      {
        name: 'maxDate',
        type: 'Date',
        required: false,
        description: 'Maximum selectable date',
      },
      {
        name: 'disabled',
        type: 'boolean',
        default: 'false',
        required: false,
        description: 'Whether the date picker is disabled',
      },
      {
        name: 'required',
        type: 'boolean',
        default: 'false',
        required: false,
        description: 'Whether date selection is required',
      },
      {
        name: 'errorMessage',
        type: 'string',
        required: false,
        description: 'Error message to display',
      },
      {
        name: 'fullWidth',
        type: 'boolean',
        default: 'false',
        required: false,
        description: 'Makes the date picker take full width',
      },
    ],
    
    outputs: [
      {
        name: 'valueChange',
        type: 'Date | null',
        description: 'Emitted when the selected date changes',
      },
    ],
    
    examples: [
      {
        title: 'Basic Date Picker',
        description: 'Simple date selection',
        typescript: '',
        template: `<ui-date-picker
  label="Birth Date"
  [value]="birthDate()"
  (valueChange)="birthDate.set($event)"
/>`,
      },
      {
        title: 'With Min/Max Dates',
        description: 'Restrict selectable date range',
        typescript: '',
        template: `<ui-date-picker
  label="Appointment Date"
  [minDate]="today"
  [maxDate]="oneMonthFromNow"
  placeholder="Select an appointment date"
/>`,
      },
    ],
    
    accessibility: {
      ariaSupport: [
        'Calendar grid with aria-label for each day',
        'Selected date indicated with aria-selected',
        'Disabled dates indicated with aria-disabled',
        'Month/year navigation buttons labeled',
      ],
      keyboardNavigation: [
        { key: 'Arrow Keys', description: 'Navigate between dates' },
        { key: 'Enter / Space', description: 'Select focused date' },
        { key: 'Escape', description: 'Close calendar' },
        { key: 'Home', description: 'Go to first day of week' },
        { key: 'End', description: 'Go to last day of week' },
        { key: 'Page Up / Down', description: 'Previous/next month' },
      ],
      screenReaderNotes: 'Calendar dialog announced. Current date and focused date announced. Month and year changes announced.',
    },
    
    bestPractices: [
      'Use minDate/maxDate to prevent invalid date selection',
      'Provide clear labels indicating date format expectations',
      'Consider time zones for date-sensitive applications',
      'Show error messages for invalid date entries',
    ],
    
    relatedComponents: ['input'],
  },
  
  'file-upload': {
    id: 'file-upload',
    name: 'File Upload',
    category: 'form',
    description: 'A file upload component with drag-and-drop support, file validation, and progress tracking.',
    selector: 'ui-file-upload',
    
    inputs: [
      {
        name: 'label',
        type: 'string',
        required: false,
        description: 'Label text displayed above the upload area',
      },
      {
        name: 'accept',
        type: 'string',
        required: false,
        description: 'Accepted file types (e.g., ".pdf,.doc,.docx")',
      },
      {
        name: 'multiple',
        type: 'boolean',
        default: 'false',
        required: false,
        description: 'Allow multiple file selection',
      },
      {
        name: 'maxSize',
        type: 'number',
        required: false,
        description: 'Maximum file size in bytes',
      },
      {
        name: 'maxFiles',
        type: 'number',
        required: false,
        description: 'Maximum number of files allowed',
      },
      {
        name: 'disabled',
        type: 'boolean',
        default: 'false',
        required: false,
        description: 'Whether the file upload is disabled',
      },
      {
        name: 'helperText',
        type: 'string',
        required: false,
        description: 'Helper text displayed below the upload area',
      },
      {
        name: 'errorMessage',
        type: 'string',
        required: false,
        description: 'Error message to display',
      },
    ],
    
    outputs: [
      {
        name: 'filesChange',
        type: 'File[]',
        description: 'Emitted when files are selected or changed',
      },
      {
        name: 'fileRemoved',
        type: 'File',
        description: 'Emitted when a file is removed',
      },
    ],
    
    examples: [
      {
        title: 'Basic File Upload',
        description: 'Simple file upload with drag-and-drop',
        typescript: '',
        template: `<ui-file-upload
  label="Upload Document"
  accept=".pdf,.doc,.docx"
  helperText="PDF or Word documents only"
  (filesChange)="onFilesSelected($event)"
/>`,
      },
      {
        title: 'Multiple Files',
        description: 'Upload multiple files with size limit',
        typescript: '',
        template: `<ui-file-upload
  label="Upload Images"
  accept="image/*"
  [multiple]="true"
  [maxFiles]="5"
  [maxSize]="5242880"
  helperText="Up to 5 images, 5MB each"
/>`,
      },
    ],
    
    accessibility: {
      ariaSupport: [
        'File input with descriptive aria-label',
        'Drop zone has clear instructions',
        'File list with remove buttons labeled',
        'Upload progress announced to screen readers',
      ],
      keyboardNavigation: [
        { key: 'Tab', description: 'Focus the upload button' },
        { key: 'Enter / Space', description: 'Open file selection dialog' },
      ],
      screenReaderNotes: 'File selection announced. Number of files selected announced. Remove buttons clearly labeled with file name.',
    },
    
    bestPractices: [
      'Always specify accept attribute to filter file types',
      'Set maxSize to prevent large file uploads',
      'Provide clear feedback on file validation errors',
      'Show upload progress for large files',
      'Allow users to remove files before final submission',
    ],
    
    relatedComponents: ['button', 'progress'],
  },
  
  // ===========================
  // LAYOUT COMPONENTS
  // ===========================
  
  'card': {
    id: 'card',
    name: 'Card',
    category: 'layout',
    description: 'A flexible container component for grouping related content with optional header, body, and footer sections.',
    selector: 'ui-card',
    
    inputs: [
      {
        name: 'variant',
        type: "'elevated' | 'outlined' | 'filled'",
        default: "'elevated'",
        required: false,
        description: 'Visual style of the card',
      },
      {
        name: 'padding',
        type: "'none' | 'sm' | 'md' | 'lg'",
        default: "'md'",
        required: false,
        description: 'Internal padding of the card',
      },
      {
        name: 'hoverable',
        type: 'boolean',
        default: 'false',
        required: false,
        description: 'Adds hover effect (useful for clickable cards)',
      },
    ],
    
    outputs: [],
    
    examples: [
      {
        title: 'Basic Card',
        description: 'Simple card with content',
        typescript: '',
        template: `<ui-card>
  <h3>Card Title</h3>
  <p>This is the card content. Cards are great for organizing information.</p>
</ui-card>`,
      },
      {
        title: 'Card Variants',
        description: 'Different visual styles',
        typescript: '',
        template: `<ui-card variant="elevated">Elevated Card</ui-card>
<ui-card variant="outlined">Outlined Card</ui-card>
<ui-card variant="filled">Filled Card</ui-card>`,
      },
      {
        title: 'Hoverable Card',
        description: 'Card with hover effect for clickable areas',
        typescript: '',
        template: `<ui-card [hoverable]="true">
  <h3>Clickable Card</h3>
  <p>Hover over this card to see the effect.</p>
</ui-card>`,
      },
    ],
    
    accessibility: {
      ariaSupport: [
        'Semantic article or section role can be added via attributes',
        'Supports all standard HTML attributes for accessibility',
      ],
      keyboardNavigation: [
        { key: 'Tab', description: 'Navigates through focusable elements inside card' },
      ],
      screenReaderNotes: 'Card is a generic container. Use semantic HTML inside for proper structure (headings, lists, etc.).',
    },
    
    bestPractices: [
      'Use cards to group related information',
      'Keep card content concise and focused',
      'Use hoverable for interactive cards (links, buttons)',
      'Consider grid or flexbox layout for multiple cards',
      'Use semantic headings inside cards for hierarchy',
    ],
    
    relatedComponents: ['modal', 'drawer'],
  },
  
  'modal': {
    id: 'modal',
    name: 'Modal',
    category: 'layout',
    description: 'A dialog overlay component that focuses user attention on a specific task or message, with backdrop and close functionality.',
    selector: 'ui-modal',
    
    inputs: [
      {
        name: 'open',
        type: 'boolean',
        default: 'false',
        required: false,
        description: 'Whether the modal is visible',
      },
      {
        name: 'size',
        type: "'sm' | 'md' | 'lg' | 'xl' | 'full'",
        default: "'md'",
        required: false,
        description: 'Size of the modal dialog',
      },
      {
        name: 'closeOnBackdropClick',
        type: 'boolean',
        default: 'true',
        required: false,
        description: 'Close modal when clicking backdrop',
      },
      {
        name: 'closeOnEscape',
        type: 'boolean',
        default: 'true',
        required: false,
        description: 'Close modal when pressing Escape key',
      },
      {
        name: 'showCloseButton',
        type: 'boolean',
        default: 'true',
        required: false,
        description: 'Show close (X) button in top-right',
      },
    ],
    
    outputs: [
      {
        name: 'openChange',
        type: 'boolean',
        description: 'Emitted when modal open state changes',
      },
    ],
    
    examples: [
      {
        title: 'Basic Modal',
        description: 'Simple modal with content',
        typescript: `import { Component, signal } from '@angular/core';
import { ModalComponent, ButtonComponent } from '@ui-suite/components';

@Component({
  selector: 'app-example',
  imports: [ModalComponent, ButtonComponent],
  template: \`
    <ui-button (clicked)="showModal.set(true)">Open Modal</ui-button>
    
    <ui-modal 
      [open]="showModal()" 
      (openChange)="showModal.set($event)"
    >
      <h2>Modal Title</h2>
      <p>This is the modal content.</p>
      <ui-button (clicked)="showModal.set(false)">Close</ui-button>
    </ui-modal>
  \`
})
export class ExampleComponent {
  showModal = signal(false);
}`,
        template: `<ui-modal [open]="showModal()" (openChange)="showModal.set($event)">
  <h2>Modal Title</h2>
  <p>This is the modal content.</p>
</ui-modal>`,
      },
      {
        title: 'Modal Sizes',
        description: 'Different modal sizes',
        typescript: '',
        template: `<ui-modal size="sm" [open]="true">Small Modal</ui-modal>
<ui-modal size="md" [open]="true">Medium Modal</ui-modal>
<ui-modal size="lg" [open]="true">Large Modal</ui-modal>
<ui-modal size="xl" [open]="true">Extra Large Modal</ui-modal>
<ui-modal size="full" [open]="true">Full Screen Modal</ui-modal>`,
      },
    ],
    
    accessibility: {
      ariaSupport: [
        'Dialog role with aria-modal="true"',
        'Focus trapped within modal when open',
        'Initial focus set to first focusable element or close button',
        'aria-labelledby for modal title',
        'aria-describedby for modal description',
      ],
      keyboardNavigation: [
        { key: 'Escape', description: 'Closes the modal (if enabled)' },
        { key: 'Tab', description: 'Cycles through focusable elements within modal' },
        { key: 'Shift + Tab', description: 'Cycles backward through focusable elements' },
      ],
      screenReaderNotes: 'Modal dialog announced when opened. Focus moves to modal. Background content marked as inert. Focus returns to trigger element when closed.',
    },
    
    bestPractices: [
      'Use modals sparingly - they interrupt user flow',
      'Always provide a clear way to close the modal',
      'Keep modal content focused on a single task',
      'Use appropriate size based on content amount',
      'Consider using Drawer for non-critical content',
    ],
    
    relatedComponents: ['drawer', 'dialog', 'alert'],
  },
  
  'tabs': {
    id: 'tabs',
    name: 'Tabs',
    category: 'layout',
    description: 'A tabbed interface component for organizing content into separate views, showing one panel at a time.',
    selector: 'ui-tabs',
    
    inputs: [
      {
        name: 'activeIndex',
        type: 'number',
        default: '0',
        required: false,
        description: 'Index of the currently active tab',
      },
      {
        name: 'variant',
        type: "'default' | 'pills' | 'underline'",
        default: "'default'",
        required: false,
        description: 'Visual style of the tabs',
      },
    ],
    
    outputs: [
      {
        name: 'activeIndexChange',
        type: 'number',
        description: 'Emitted when active tab changes',
      },
    ],
    
    methods: [
      {
        name: 'setActiveTab',
        parameters: '(index: number)',
        returnType: 'void',
        description: 'Programmatically set the active tab',
      },
    ],
    
    examples: [
      {
        title: 'Basic Tabs',
        description: 'Simple tabbed interface',
        typescript: '',
        template: `<ui-tabs>
  <ui-tab label="Profile">
    <p>Profile content goes here</p>
  </ui-tab>
  <ui-tab label="Settings">
    <p>Settings content goes here</p>
  </ui-tab>
  <ui-tab label="Messages">
    <p>Messages content goes here</p>
  </ui-tab>
</ui-tabs>`,
      },
      {
        title: 'Tab Variants',
        description: 'Different visual styles',
        typescript: '',
        template: `<ui-tabs variant="default">...</ui-tabs>
<ui-tabs variant="pills">...</ui-tabs>
<ui-tabs variant="underline">...</ui-tabs>`,
      },
    ],
    
    accessibility: {
      ariaSupport: [
        'Tablist role on tab container',
        'Tab role on each tab button',
        'Tabpanel role on each content panel',
        'aria-selected indicates active tab',
        'aria-controls links tabs to their panels',
      ],
      keyboardNavigation: [
        { key: 'Arrow Left / Right', description: 'Navigate between tabs' },
        { key: 'Home', description: 'Go to first tab' },
        { key: 'End', description: 'Go to last tab' },
        { key: 'Tab', description: 'Move focus into active panel' },
      ],
      screenReaderNotes: 'Tab list announced with number of tabs. Current tab announced with position. Panel content announced when tab changes.',
    },
    
    bestPractices: [
      'Keep tab labels short and descriptive',
      'Use 3-7 tabs maximum for clarity',
      'Consider vertical tabs or a menu for many options',
      'Ensure tab content is related but independent',
      'Avoid nesting tabs within tabs',
    ],
    
    relatedComponents: ['accordion', 'menu'],
  },
  
  'accordion': {
    id: 'accordion',
    name: 'Accordion',
    category: 'layout',
    description: 'A vertically stacked set of collapsible panels for organizing content, allowing multiple or single panel expansion.',
    selector: 'ui-accordion',
    
    inputs: [
      {
        name: 'expandedItems',
        type: 'string[]',
        default: '[]',
        required: false,
        description: 'Array of IDs of currently expanded items',
      },
      {
        name: 'allowMultiple',
        type: 'boolean',
        default: 'true',
        required: false,
        description: 'Allow multiple items to be expanded simultaneously',
      },
    ],
    
    outputs: [
      {
        name: 'expandedItemsChange',
        type: 'string[]',
        description: 'Emitted when expanded items change',
      },
    ],
    
    examples: [
      {
        title: 'Basic Accordion',
        description: 'Collapsible panels',
        typescript: '',
        template: `<ui-accordion>
  <ui-accordion-item id="item1" title="What is Angular?">
    <p>Angular is a platform for building web applications...</p>
  </ui-accordion-item>
  <ui-accordion-item id="item2" title="What are Signals?">
    <p>Signals are a reactive primitive for managing state...</p>
  </ui-accordion-item>
  <ui-accordion-item id="item3" title="What is TypeScript?">
    <p>TypeScript is a typed superset of JavaScript...</p>
  </ui-accordion-item>
</ui-accordion>`,
      },
      {
        title: 'Single Expansion',
        description: 'Only one item open at a time',
        typescript: '',
        template: `<ui-accordion [allowMultiple]="false">
  <!-- accordion items -->
</ui-accordion>`,
      },
    ],
    
    accessibility: {
      ariaSupport: [
        'Accordion role or region role on container',
        'Button role on each accordion header',
        'aria-expanded indicates expanded state',
        'aria-controls links headers to content panels',
        'Unique IDs link headers and panels',
      ],
      keyboardNavigation: [
        { key: 'Enter / Space', description: 'Toggle accordion item' },
        { key: 'Tab', description: 'Move between accordion headers' },
        { key: 'Arrow Down', description: 'Move to next header (optional)' },
        { key: 'Arrow Up', description: 'Move to previous header (optional)' },
      ],
      screenReaderNotes: 'Accordion structure announced. Header announced as button with expanded/collapsed state. Content announced when expanded.',
    },
    
    bestPractices: [
      'Use accordions for related content sections',
      'Keep header text clear and concise',
      'Consider allowMultiple=false for mutually exclusive content',
      'Ensure first item is expanded by default if appropriate',
      'Use for FAQ pages, settings panels, or long forms',
    ],
    
    relatedComponents: ['tabs', 'drawer'],
  },
  
  'divider': {
    id: 'divider',
    name: 'Divider',
    category: 'layout',
    description: 'A visual separator component for dividing content, supporting horizontal and vertical orientations with optional text.',
    selector: 'ui-divider',
    
    inputs: [
      {
        name: 'orientation',
        type: "'horizontal' | 'vertical'",
        default: "'horizontal'",
        required: false,
        description: 'Direction of the divider',
      },
      {
        name: 'text',
        type: 'string',
        required: false,
        description: 'Optional text to display in the center',
      },
      {
        name: 'textPosition',
        type: "'left' | 'center' | 'right'",
        default: "'center'",
        required: false,
        description: 'Position of text along the divider',
      },
    ],
    
    outputs: [],
    
    examples: [
      {
        title: 'Basic Divider',
        description: 'Simple horizontal line',
        typescript: '',
        template: `<p>Content above</p>
<ui-divider />
<p>Content below</p>`,
      },
      {
        title: 'Divider with Text',
        description: 'Divider with centered text',
        typescript: '',
        template: `<ui-divider text="OR" />
<ui-divider text="Section 2" textPosition="left" />`,
      },
      {
        title: 'Vertical Divider',
        description: 'Vertical separator for inline content',
        typescript: '',
        template: `<div style="display: flex; align-items: center;">
  <span>Item 1</span>
  <ui-divider orientation="vertical" />
  <span>Item 2</span>
  <ui-divider orientation="vertical" />
  <span>Item 3</span>
</div>`,
      },
    ],
    
    accessibility: {
      ariaSupport: [
        'Separator role (decorative)',
        'No keyboard interaction required',
        'Purely visual element',
      ],
      keyboardNavigation: [],
      screenReaderNotes: 'Dividers are decorative and typically not announced. Text within divider is announced normally.',
    },
    
    bestPractices: [
      'Use dividers sparingly to avoid visual clutter',
      'Prefer whitespace over dividers when possible',
      'Use semantic headings instead of dividers with text',
      'Vertical dividers work best with flex layouts',
    ],
    
    relatedComponents: ['card'],
  },
  
  'drawer': {
    id: 'drawer',
    name: 'Drawer',
    category: 'layout',
    description: 'A slide-out panel component for navigation or supplementary content, appearing from screen edges.',
    selector: 'ui-drawer',
    
    inputs: [
      {
        name: 'open',
        type: 'boolean',
        default: 'false',
        required: false,
        description: 'Whether the drawer is visible',
      },
      {
        name: 'position',
        type: "'left' | 'right' | 'top' | 'bottom'",
        default: "'left'",
        required: false,
        description: 'Edge from which drawer appears',
      },
      {
        name: 'size',
        type: "'sm' | 'md' | 'lg'",
        default: "'md'",
        required: false,
        description: 'Width (or height for top/bottom)',
      },
      {
        name: 'closeOnBackdropClick',
        type: 'boolean',
        default: 'true',
        required: false,
        description: 'Close when clicking outside drawer',
      },
      {
        name: 'closeOnEscape',
        type: 'boolean',
        default: 'true',
        required: false,
        description: 'Close when pressing Escape',
      },
      {
        name: 'showBackdrop',
        type: 'boolean',
        default: 'true',
        required: false,
        description: 'Show overlay backdrop',
      },
    ],
    
    outputs: [
      {
        name: 'openChange',
        type: 'boolean',
        description: 'Emitted when drawer open state changes',
      },
    ],
    
    examples: [
      {
        title: 'Basic Drawer',
        description: 'Simple slide-out panel',
        typescript: '',
        template: `<ui-button (clicked)="drawerOpen.set(true)">Open Drawer</ui-button>

<ui-drawer 
  [open]="drawerOpen()" 
  (openChange)="drawerOpen.set($event)"
>
  <h2>Drawer Content</h2>
  <p>Navigation or supplementary content goes here.</p>
</ui-drawer>`,
      },
      {
        title: 'Drawer Positions',
        description: 'Drawer from different edges',
        typescript: '',
        template: `<ui-drawer position="left">...</ui-drawer>
<ui-drawer position="right">...</ui-drawer>
<ui-drawer position="top">...</ui-drawer>
<ui-drawer position="bottom">...</ui-drawer>`,
      },
    ],
    
    accessibility: {
      ariaSupport: [
        'Dialog role with aria-modal when using backdrop',
        'Focus trapped within drawer when open',
        'aria-labelledby for drawer title',
        'Complementary role for navigation drawers',
      ],
      keyboardNavigation: [
        { key: 'Escape', description: 'Closes the drawer' },
        { key: 'Tab', description: 'Cycles through focusable elements' },
      ],
      screenReaderNotes: 'Drawer announced when opened. Focus moves to drawer. Background content inert when modal.',
    },
    
    bestPractices: [
      'Use for navigation menus or filters',
      'Keep drawer content focused and scannable',
      'Prefer left/right for primary navigation',
      'Use top/bottom for notifications or quick settings',
      'Consider fixed drawer for desktop, overlay for mobile',
    ],
    
    relatedComponents: ['modal', 'navbar'],
  },
  
  'stack': {
    id: 'stack',
    name: 'Stack',
    category: 'layout',
    description: 'A layout component for arranging children in a vertical or horizontal stack with consistent spacing.',
    selector: 'ui-stack',
    
    inputs: [
      {
        name: 'direction',
        type: "'vertical' | 'horizontal'",
        default: "'vertical'",
        required: false,
        description: 'Direction of the stack',
      },
      {
        name: 'spacing',
        type: 'number',
        default: '4',
        required: false,
        description: 'Spacing between items (in spacing units)',
      },
      {
        name: 'align',
        type: "'start' | 'center' | 'end' | 'stretch'",
        default: "'stretch'",
        required: false,
        description: 'Cross-axis alignment',
      },
      {
        name: 'justify',
        type: "'start' | 'center' | 'end' | 'space-between' | 'space-around'",
        default: "'start'",
        required: false,
        description: 'Main-axis justification',
      },
      {
        name: 'wrap',
        type: 'boolean',
        default: 'false',
        required: false,
        description: 'Allow items to wrap to next line',
      },
    ],
    
    outputs: [],
    
    examples: [
      {
        title: 'Vertical Stack',
        description: 'Stack items vertically',
        typescript: '',
        template: `<ui-stack direction="vertical" [spacing]="4">
  <ui-button>Button 1</ui-button>
  <ui-button>Button 2</ui-button>
  <ui-button>Button 3</ui-button>
</ui-stack>`,
      },
      {
        title: 'Horizontal Stack',
        description: 'Stack items horizontally',
        typescript: '',
        template: `<ui-stack direction="horizontal" [spacing]="2">
  <ui-button>Action 1</ui-button>
  <ui-button>Action 2</ui-button>
  <ui-button>Action 3</ui-button>
</ui-stack>`,
      },
      {
        title: 'Centered Stack',
        description: 'Center items with spacing',
        typescript: '',
        template: `<ui-stack align="center" justify="center" [spacing]="6">
  <h1>Centered Content</h1>
  <p>This content is centered both horizontally and vertically.</p>
</ui-stack>`,
      },
    ],
    
    accessibility: {
      ariaSupport: [
        'No specific ARIA required - semantic HTML preserved',
        'Supports all standard container attributes',
      ],
      keyboardNavigation: [
        { key: 'Tab', description: 'Navigate through focusable children' },
      ],
      screenReaderNotes: 'Stack is a layout component. Child elements announced normally.',
    },
    
    bestPractices: [
      'Use Stack for consistent spacing between elements',
      'Prefer Stack over manual margin/padding for layouts',
      'Use Grid for two-dimensional layouts',
      'Combine with other layout components for complex designs',
    ],
    
    relatedComponents: ['grid'],
  },
  
  'grid': {
    id: 'grid',
    name: 'Grid',
    category: 'layout',
    description: 'A responsive grid layout component for arranging items in rows and columns with automatic wrapping.',
    selector: 'ui-grid',
    
    inputs: [
      {
        name: 'columns',
        type: 'number',
        default: '12',
        required: false,
        description: 'Number of columns in the grid',
      },
      {
        name: 'gap',
        type: 'number',
        default: '4',
        required: false,
        description: 'Gap between grid items (in spacing units)',
      },
      {
        name: 'responsive',
        type: 'boolean',
        default: 'true',
        required: false,
        description: 'Enable responsive column adjustments',
      },
    ],
    
    outputs: [],
    
    examples: [
      {
        title: 'Basic Grid',
        description: 'Simple 3-column grid',
        typescript: '',
        template: `<ui-grid [columns]="3" [gap]="4">
  <ui-card>Item 1</ui-card>
  <ui-card>Item 2</ui-card>
  <ui-card>Item 3</ui-card>
  <ui-card>Item 4</ui-card>
  <ui-card>Item 5</ui-card>
  <ui-card>Item 6</ui-card>
</ui-grid>`,
      },
      {
        title: 'Responsive Grid',
        description: 'Grid that adapts to screen size',
        typescript: '',
        template: `<ui-grid [columns]="4" [gap]="6" [responsive]="true">
  <!-- Automatically adjusts columns on mobile/tablet -->
  <ui-card>Card 1</ui-card>
  <ui-card>Card 2</ui-card>
  <ui-card>Card 3</ui-card>
  <ui-card>Card 4</ui-card>
</ui-grid>`,
      },
    ],
    
    accessibility: {
      ariaSupport: [
        'No specific ARIA required',
        'Semantic HTML structure maintained',
      ],
      keyboardNavigation: [
        { key: 'Tab', description: 'Navigate through focusable grid items' },
      ],
      screenReaderNotes: 'Grid is a layout component. Items announced in reading order (row by row).',
    },
    
    bestPractices: [
      'Use Grid for two-dimensional layouts',
      'Enable responsive for mobile-friendly layouts',
      'Use Stack for single-direction layouts',
      'Consider CSS Grid for complex custom layouts',
      'Keep grid items similar in size for best results',
    ],
    
    relatedComponents: ['stack', 'card'],
  },
  
  // ===========================
  // DATA DISPLAY COMPONENTS
  // ===========================
  
  'badge': {
    id: 'badge',
    name: 'Badge',
    category: 'data-display',
    description: 'A small label component for displaying status, counts, or notifications, typically overlaid on other elements.',
    selector: 'ui-badge',
    
    inputs: [
      {
        name: 'content',
        type: 'string | number',
        required: false,
        description: 'Content to display in the badge',
      },
      {
        name: 'variant',
        type: "'filled' | 'outlined' | 'dot'",
        default: "'filled'",
        required: false,
        description: 'Visual style of the badge',
      },
      {
        name: 'color',
        type: "'primary' | 'secondary' | 'success' | 'warning' | 'error'",
        default: "'primary'",
        required: false,
        description: 'Color scheme',
      },
      {
        name: 'size',
        type: "'sm' | 'md' | 'lg'",
        default: "'md'",
        required: false,
        description: 'Size of the badge',
      },
      {
        name: 'position',
        type: "'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'",
        default: "'top-right'",
        required: false,
        description: 'Position when overlaid on another element',
      },
      {
        name: 'max',
        type: 'number',
        default: '99',
        required: false,
        description: 'Maximum number to display (shows 99+ for higher)',
      },
    ],
    
    outputs: [],
    
    examples: [
      {
        title: 'Basic Badge',
        description: 'Simple badge with content',
        typescript: '',
        template: `<ui-badge [content]="5" color="primary" />
<ui-badge content="New" color="success" />`,
      },
      {
        title: 'Badge on Icon/Button',
        description: 'Badge overlaid on another element',
        typescript: '',
        template: `<div style="position: relative; display: inline-block;">
  <ui-button>Notifications</ui-button>
  <ui-badge [content]="12" position="top-right" />
</div>`,
      },
      {
        title: 'Dot Badge',
        description: 'Badge as a simple dot indicator',
        typescript: '',
        template: `<ui-badge variant="dot" color="success" />`,
      },
    ],
    
    accessibility: {
      ariaSupport: [
        'Content announced to screen readers',
        'Can use aria-label for custom announcements',
        'Decorative badges can be hidden with aria-hidden',
      ],
      keyboardNavigation: [],
      screenReaderNotes: 'Badge content announced. For notification counts, ensure parent element provides context.',
    },
    
    bestPractices: [
      'Use semantic colors (success, error) to convey meaning',
      'Keep badge content short (ideally single digit or word)',
      'Use max prop to prevent overflow for large numbers',
      'Ensure sufficient contrast for accessibility',
    ],
    
    relatedComponents: ['chip', 'avatar'],
  },
  
  'avatar': {
    id: 'avatar',
    name: 'Avatar',
    category: 'data-display',
    description: 'A component for displaying user profile images, initials, or icons with consistent sizing and styling.',
    selector: 'ui-avatar',
    
    inputs: [
      {
        name: 'src',
        type: 'string',
        required: false,
        description: 'Image URL to display',
      },
      {
        name: 'alt',
        type: 'string',
        required: false,
        description: 'Alt text for the image',
      },
      {
        name: 'initials',
        type: 'string',
        required: false,
        description: 'Initials to display (when no image)',
      },
      {
        name: 'size',
        type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'",
        default: "'md'",
        required: false,
        description: 'Size of the avatar',
      },
      {
        name: 'shape',
        type: "'circle' | 'square'",
        default: "'circle'",
        required: false,
        description: 'Shape of the avatar',
      },
      {
        name: 'color',
        type: "'primary' | 'secondary' | 'success' | 'warning' | 'error'",
        default: "'primary'",
        required: false,
        description: 'Background color for initials',
      },
    ],
    
    outputs: [],
    
    examples: [
      {
        title: 'Avatar with Image',
        description: 'Avatar displaying a user photo',
        typescript: '',
        template: `<ui-avatar 
  src="/assets/avatar.jpg" 
  alt="John Doe" 
  size="md" 
/>`,
      },
      {
        title: 'Avatar with Initials',
        description: 'Fallback to initials when no image',
        typescript: '',
        template: `<ui-avatar initials="JD" color="primary" />
<ui-avatar initials="AB" color="secondary" />`,
      },
      {
        title: 'Avatar Sizes',
        description: 'Different avatar sizes',
        typescript: '',
        template: `<ui-avatar initials="XS" size="xs" />
<ui-avatar initials="SM" size="sm" />
<ui-avatar initials="MD" size="md" />
<ui-avatar initials="LG" size="lg" />
<ui-avatar initials="XL" size="xl" />`,
      },
      {
        title: 'Avatar Shapes',
        description: 'Circle and square avatars',
        typescript: '',
        template: `<ui-avatar initials="JD" shape="circle" />
<ui-avatar initials="JD" shape="square" />`,
      },
    ],
    
    accessibility: {
      ariaSupport: [
        'Image has alt text for screen readers',
        'Initials announced as text content',
        'role="img" with aria-label when appropriate',
      ],
      keyboardNavigation: [],
      screenReaderNotes: 'Avatar image alt text or initials announced. Ensure alt text provides context about the person.',
    },
    
    bestPractices: [
      'Always provide alt text for images',
      'Use initials as fallback when image fails to load',
      'Keep initials to 1-2 characters',
      'Use consistent sizes across similar contexts',
      'Consider avatar groups for multiple users',
    ],
    
    relatedComponents: ['badge', 'chip'],
  },
  
  'tooltip': {
    id: 'tooltip',
    name: 'Tooltip',
    category: 'data-display',
    description: 'A floating label component that displays contextual information on hover or focus.',
    selector: 'ui-tooltip',
    
    inputs: [
      {
        name: 'content',
        type: 'string',
        required: true,
        description: 'Tooltip text content',
      },
      {
        name: 'position',
        type: "'top' | 'bottom' | 'left' | 'right'",
        default: "'top'",
        required: false,
        description: 'Position relative to target element',
      },
      {
        name: 'delay',
        type: 'number',
        default: '0',
        required: false,
        description: 'Delay in ms before showing tooltip',
      },
      {
        name: 'disabled',
        type: 'boolean',
        default: 'false',
        required: false,
        description: 'Disable tooltip display',
      },
    ],
    
    outputs: [],
    
    examples: [
      {
        title: 'Basic Tooltip',
        description: 'Tooltip on hover',
        typescript: '',
        template: `<ui-button>
  Hover me
  <ui-tooltip content="This is a helpful tooltip" />
</ui-button>`,
      },
      {
        title: 'Tooltip Positions',
        description: 'Different placement options',
        typescript: '',
        template: `<ui-button>
  Top
  <ui-tooltip content="Top tooltip" position="top" />
</ui-button>
<ui-button>
  Bottom
  <ui-tooltip content="Bottom tooltip" position="bottom" />
</ui-button>
<ui-button>
  Left
  <ui-tooltip content="Left tooltip" position="left" />
</ui-button>
<ui-button>
  Right
  <ui-tooltip content="Right tooltip" position="right" />
</ui-button>`,
      },
    ],
    
    accessibility: {
      ariaSupport: [
        'Tooltip has role="tooltip"',
        'Target has aria-describedby pointing to tooltip',
        'Shown on focus as well as hover',
      ],
      keyboardNavigation: [
        { key: 'Tab', description: 'Focus element shows tooltip' },
        { key: 'Escape', description: 'Dismisses tooltip' },
      ],
      screenReaderNotes: 'Tooltip content announced when target is focused or hovered. Content should supplement, not replace, visible labels.',
    },
    
    bestPractices: [
      'Keep tooltip text concise (1-2 sentences)',
      'Never put critical information only in tooltips',
      'Use for supplementary information or clarification',
      'Ensure tooltip does not cover important content',
      'Consider delay for frequently hovered elements',
    ],
    
    relatedComponents: ['popover'],
  },
  
  'chip': {
    id: 'chip',
    name: 'Chip',
    category: 'data-display',
    description: 'A compact component for representing small pieces of information like tags, filters, or selections.',
    selector: 'ui-chip',
    
    inputs: [
      {
        name: 'label',
        type: 'string',
        required: true,
        description: 'Text content of the chip',
      },
      {
        name: 'variant',
        type: "'filled' | 'outlined'",
        default: "'filled'",
        required: false,
        description: 'Visual style of the chip',
      },
      {
        name: 'color',
        type: "'primary' | 'secondary' | 'success' | 'warning' | 'error'",
        default: "'primary'",
        required: false,
        description: 'Color scheme',
      },
      {
        name: 'size',
        type: "'sm' | 'md'",
        default: "'md'",
        required: false,
        description: 'Size of the chip',
      },
      {
        name: 'removable',
        type: 'boolean',
        default: 'false',
        required: false,
        description: 'Show remove (X) button',
      },
      {
        name: 'disabled',
        type: 'boolean',
        default: 'false',
        required: false,
        description: 'Whether the chip is disabled',
      },
      {
        name: 'avatar',
        type: 'string',
        required: false,
        description: 'Avatar image URL to show',
      },
      {
        name: 'icon',
        type: 'string',
        required: false,
        description: 'Icon to display before label',
      },
    ],
    
    outputs: [
      {
        name: 'removed',
        type: 'void',
        description: 'Emitted when remove button is clicked',
      },
      {
        name: 'clicked',
        type: 'void',
        description: 'Emitted when chip is clicked (if not disabled)',
      },
    ],
    
    examples: [
      {
        title: 'Basic Chips',
        description: 'Simple chips for tags',
        typescript: '',
        template: `<ui-chip label="JavaScript" color="primary" />
<ui-chip label="TypeScript" color="secondary" />
<ui-chip label="Angular" color="success" />`,
      },
      {
        title: 'Removable Chips',
        description: 'Chips that can be removed',
        typescript: '',
        template: `<ui-chip 
  label="Filter: Active" 
  [removable]="true" 
  (removed)="onRemove()" 
/>`,
      },
      {
        title: 'Chips with Avatars',
        description: 'Chips showing user info',
        typescript: '',
        template: `<ui-chip 
  label="John Doe" 
  avatar="/assets/avatar.jpg"
  [removable]="true"
/>`,
      },
    ],
    
    accessibility: {
      ariaSupport: [
        'Clickable chips have button role',
        'Remove button has aria-label "Remove {label}"',
        'Disabled state indicated with aria-disabled',
      ],
      keyboardNavigation: [
        { key: 'Enter / Space', description: 'Click chip or remove button' },
        { key: 'Tab', description: 'Navigate between chips' },
      ],
      screenReaderNotes: 'Chip label announced. Remove button clearly labeled. State changes announced.',
    },
    
    bestPractices: [
      'Use chips for tags, filters, or selected items',
      'Keep chip labels short and descriptive',
      'Use semantic colors to indicate categories',
      'Make removable chips clearly indicate removal action',
      'Group related chips together',
    ],
    
    relatedComponents: ['badge', 'multi-select'],
  },
  
  'popover': {
    id: 'popover',
    name: 'Popover',
    category: 'data-display',
    description: 'A floating container for displaying rich content, triggered by click or hover on a target element.',
    selector: 'ui-popover',
    
    inputs: [
      {
        name: 'open',
        type: 'boolean',
        default: 'false',
        required: false,
        description: 'Whether the popover is visible',
      },
      {
        name: 'position',
        type: "'top' | 'bottom' | 'left' | 'right'",
        default: "'bottom'",
        required: false,
        description: 'Position relative to target',
      },
      {
        name: 'trigger',
        type: "'click' | 'hover'",
        default: "'click'",
        required: false,
        description: 'How to trigger the popover',
      },
      {
        name: 'closeOnClickOutside',
        type: 'boolean',
        default: 'true',
        required: false,
        description: 'Close when clicking outside',
      },
      {
        name: 'showArrow',
        type: 'boolean',
        default: 'true',
        required: false,
        description: 'Show pointing arrow',
      },
    ],
    
    outputs: [
      {
        name: 'openChange',
        type: 'boolean',
        description: 'Emitted when popover open state changes',
      },
    ],
    
    examples: [
      {
        title: 'Click Popover',
        description: 'Popover triggered by click',
        typescript: '',
        template: `<ui-button>
  Click me
  <ui-popover trigger="click" position="bottom">
    <h3>Popover Title</h3>
    <p>This is rich content inside a popover.</p>
    <ui-button size="sm">Action</ui-button>
  </ui-popover>
</ui-button>`,
      },
      {
        title: 'Hover Popover',
        description: 'Popover triggered by hover',
        typescript: '',
        template: `<ui-button>
  Hover me
  <ui-popover trigger="hover">
    <p>Hover content</p>
  </ui-popover>
</ui-button>`,
      },
    ],
    
    accessibility: {
      ariaSupport: [
        'Popover has role="dialog" or role="tooltip" based on content',
        'Target has aria-describedby or aria-controls',
        'Focus management for interactive popovers',
      ],
      keyboardNavigation: [
        { key: 'Escape', description: 'Closes the popover' },
        { key: 'Tab', description: 'Navigate within popover content' },
      ],
      screenReaderNotes: 'Popover content announced when opened. For interactive popovers, focus moves to content.',
    },
    
    bestPractices: [
      'Use for rich content (use Tooltip for simple text)',
      'Keep popover content focused and scannable',
      'Ensure popover does not cover critical UI',
      'Use click trigger for interactive content',
      'Provide clear way to close popover',
    ],
    
    relatedComponents: ['tooltip', 'modal', 'dropdown'],
  },
  
  'pagination': {
    id: 'pagination',
    name: 'Pagination',
    category: 'data-display',
    description: 'A component for navigating through paginated data with page numbers and controls.',
    selector: 'ui-pagination',
    
    inputs: [
      {
        name: 'totalItems',
        type: 'number',
        required: true,
        description: 'Total number of items',
      },
      {
        name: 'itemsPerPage',
        type: 'number',
        default: '10',
        required: false,
        description: 'Number of items per page',
      },
      {
        name: 'currentPage',
        type: 'number',
        default: '1',
        required: false,
        description: 'Currently active page (1-indexed)',
      },
      {
        name: 'maxVisiblePages',
        type: 'number',
        default: '7',
        required: false,
        description: 'Maximum number of page buttons to show',
      },
      {
        name: 'showPageSizeSelector',
        type: 'boolean',
        default: 'false',
        required: false,
        description: 'Show dropdown to change items per page',
      },
      {
        name: 'showFirstLast',
        type: 'boolean',
        default: 'true',
        required: false,
        description: 'Show first/last page buttons',
      },
      {
        name: 'disabled',
        type: 'boolean',
        default: 'false',
        required: false,
        description: 'Disable all pagination controls',
      },
    ],
    
    outputs: [
      {
        name: 'pageChange',
        type: 'number',
        description: 'Emitted when page changes',
      },
      {
        name: 'pageSizeChange',
        type: 'number',
        description: 'Emitted when items per page changes',
      },
    ],
    
    examples: [
      {
        title: 'Basic Pagination',
        description: 'Simple pagination controls',
        typescript: '',
        template: `<ui-pagination
  [totalItems]="100"
  [itemsPerPage]="10"
  [currentPage]="currentPage()"
  (pageChange)="currentPage.set($event)"
/>`,
      },
      {
        title: 'With Page Size Selector',
        description: 'Allow users to change items per page',
        typescript: '',
        template: `<ui-pagination
  [totalItems]="500"
  [itemsPerPage]="pageSize()"
  [currentPage]="currentPage()"
  [showPageSizeSelector]="true"
  (pageChange)="currentPage.set($event)"
  (pageSizeChange)="pageSize.set($event)"
/>`,
      },
    ],
    
    accessibility: {
      ariaSupport: [
        'Navigation role on pagination container',
        'Current page indicated with aria-current="page"',
        'Page buttons have descriptive aria-labels',
        'Disabled buttons have aria-disabled',
      ],
      keyboardNavigation: [
        { key: 'Tab', description: 'Navigate between page buttons' },
        { key: 'Enter / Space', description: 'Activate page button' },
      ],
      screenReaderNotes: 'Pagination navigation announced. Current page announced. Total pages announced.',
    },
    
    bestPractices: [
      'Show page size selector for large datasets',
      'Keep maxVisiblePages reasonable (5-9)',
      'Disable prev/next on first/last page',
      'Consider infinite scroll for mobile',
      'Display total count and current range',
    ],
    
    relatedComponents: ['table', 'list'],
  },
  
  'table': {
    id: 'table',
    name: 'Table',
    category: 'data-display',
    description: 'A data table component with sorting, selection, and responsive features for displaying structured data.',
    selector: 'ui-table',
    
    inputs: [
      {
        name: 'columns',
        type: 'TableColumn[]',
        required: true,
        description: 'Array of column definitions',
      },
      {
        name: 'data',
        type: 'any[]',
        required: true,
        description: 'Array of data rows',
      },
      {
        name: 'sortable',
        type: 'boolean',
        default: 'false',
        required: false,
        description: 'Enable column sorting',
      },
      {
        name: 'selectable',
        type: 'boolean',
        default: 'false',
        required: false,
        description: 'Enable row selection',
      },
      {
        name: 'hoverable',
        type: 'boolean',
        default: 'true',
        required: false,
        description: 'Highlight row on hover',
      },
      {
        name: 'striped',
        type: 'boolean',
        default: 'false',
        required: false,
        description: 'Alternate row colors',
      },
      {
        name: 'compact',
        type: 'boolean',
        default: 'false',
        required: false,
        description: 'Reduce row padding for denser display',
      },
      {
        name: 'loading',
        type: 'boolean',
        default: 'false',
        required: false,
        description: 'Show loading state',
      },
    ],
    
    outputs: [
      {
        name: 'sortChange',
        type: '{ column: string, direction: "asc" | "desc" }',
        description: 'Emitted when sort changes',
      },
      {
        name: 'rowClick',
        type: 'any',
        description: 'Emitted when a row is clicked',
      },
      {
        name: 'selectionChange',
        type: 'any[]',
        description: 'Emitted when selected rows change',
      },
    ],
    
    examples: [
      {
        title: 'Basic Table',
        description: 'Simple data table',
        typescript: '',
        template: `<ui-table
  [columns]="columns"
  [data]="tableData"
  [hoverable]="true"
/>`,
      },
      {
        title: 'Sortable Table',
        description: 'Table with sortable columns',
        typescript: '',
        template: `<ui-table
  [columns]="columns"
  [data]="tableData"
  [sortable]="true"
  (sortChange)="onSort($event)"
/>`,
      },
      {
        title: 'Selectable Table',
        description: 'Table with row selection',
        typescript: '',
        template: `<ui-table
  [columns]="columns"
  [data]="tableData"
  [selectable]="true"
  (selectionChange)="onSelectionChange($event)"
/>`,
      },
    ],
    
    accessibility: {
      ariaSupport: [
        'Table has role="table"',
        'Headers have role="columnheader"',
        'Sortable columns have aria-sort attribute',
        'Selected rows have aria-selected',
        'Row count announced with aria-rowcount',
      ],
      keyboardNavigation: [
        { key: 'Tab', description: 'Navigate between interactive elements' },
        { key: 'Space', description: 'Toggle row selection' },
        { key: 'Enter', description: 'Activate focused element' },
      ],
      screenReaderNotes: 'Table structure announced. Column headers read with each cell. Sort direction announced. Selection state announced.',
    },
    
    bestPractices: [
      'Use semantic column keys and headers',
      'Implement pagination for large datasets',
      'Provide loading state during data fetch',
      'Use compact mode for dense information',
      'Consider responsive behavior (cards on mobile)',
    ],
    
    relatedComponents: ['pagination', 'list'],
  },
  
  'list': {
    id: 'list',
    name: 'List',
    category: 'data-display',
    description: 'A component for displaying vertical lists of items with dividers, actions, and interactive features.',
    selector: 'ui-list',
    
    inputs: [
      {
        name: 'items',
        type: 'ListItem[]',
        required: true,
        description: 'Array of list items to display',
      },
      {
        name: 'dividers',
        type: 'boolean',
        default: 'true',
        required: false,
        description: 'Show dividers between items',
      },
      {
        name: 'hoverable',
        type: 'boolean',
        default: 'false',
        required: false,
        description: 'Highlight items on hover',
      },
      {
        name: 'dense',
        type: 'boolean',
        default: 'false',
        required: false,
        description: 'Reduce item padding',
      },
    ],
    
    outputs: [
      {
        name: 'itemClick',
        type: 'ListItem',
        description: 'Emitted when a list item is clicked',
      },
    ],
    
    examples: [
      {
        title: 'Basic List',
        description: 'Simple list of items',
        typescript: '',
        template: `<ui-list [items]="listItems" />`,
      },
      {
        title: 'Interactive List',
        description: 'List with hover and click',
        typescript: '',
        template: `<ui-list
  [items]="listItems"
  [hoverable]="true"
  (itemClick)="onItemClick($event)"
/>`,
      },
      {
        title: 'Dense List',
        description: 'Compact list without dividers',
        typescript: '',
        template: `<ui-list
  [items]="listItems"
  [dense]="true"
  [dividers]="false"
/>`,
      },
    ],
    
    accessibility: {
      ariaSupport: [
        'List has role="list"',
        'Each item has role="listitem"',
        'Interactive items have button role',
        'Item count announced',
      ],
      keyboardNavigation: [
        { key: 'Tab', description: 'Navigate between list items' },
        { key: 'Enter / Space', description: 'Activate focused item' },
        { key: 'Arrow Up / Down', description: 'Navigate items (optional)' },
      ],
      screenReaderNotes: 'List announced with item count. Each item content announced. Interactive items identified as clickable.',
    },
    
    bestPractices: [
      'Use for homogeneous content (similar structure)',
      'Keep list items scannable with clear hierarchy',
      'Use dividers for clarity with complex items',
      'Consider virtualization for very long lists',
      'Provide clear visual feedback for interactive items',
    ],
    
    relatedComponents: ['menu', 'table'],
  },
  
  // ===========================
  // FEEDBACK COMPONENTS
  // ===========================
  
  'alert': {
    id: 'alert',
    name: 'Alert',
    category: 'feedback',
    description: 'A prominent message component for displaying important information, warnings, or errors with optional actions.',
    selector: 'ui-alert',
    
    inputs: [
      {
        name: 'variant',
        type: "'success' | 'info' | 'warning' | 'error'",
        default: "'info'",
        required: false,
        description: 'Semantic variant affecting color and icon',
      },
      {
        name: 'title',
        type: 'string',
        required: false,
        description: 'Optional title/heading for the alert',
      },
      {
        name: 'closable',
        type: 'boolean',
        default: 'false',
        required: false,
        description: 'Show close button',
      },
      {
        name: 'icon',
        type: 'boolean',
        default: 'true',
        required: false,
        description: 'Show variant-appropriate icon',
      },
    ],
    
    outputs: [
      {
        name: 'closed',
        type: 'void',
        description: 'Emitted when alert is closed',
      },
    ],
    
    examples: [
      {
        title: 'Alert Variants',
        description: 'Different semantic alerts',
        typescript: '',
        template: `<ui-alert variant="success">
  <strong>Success!</strong> Your changes have been saved.
</ui-alert>

<ui-alert variant="info">
  <strong>Info:</strong> New features are available.
</ui-alert>

<ui-alert variant="warning">
  <strong>Warning:</strong> Your session will expire soon.
</ui-alert>

<ui-alert variant="error">
  <strong>Error:</strong> Failed to save changes.
</ui-alert>`,
      },
      {
        title: 'Closable Alert',
        description: 'Alert with close button',
        typescript: '',
        template: `<ui-alert 
  variant="info" 
  [closable]="true"
  (closed)="onAlertClosed()"
>
  This alert can be dismissed.
</ui-alert>`,
      },
      {
        title: 'Alert with Title',
        description: 'Alert with heading',
        typescript: '',
        template: `<ui-alert variant="warning" title="Important Notice">
  Please review your account settings before the deadline.
</ui-alert>`,
      },
    ],
    
    accessibility: {
      ariaSupport: [
        'Alert has role="alert" for important messages',
        'Status variant uses role="status" for non-critical updates',
        'Close button has aria-label',
      ],
      keyboardNavigation: [
        { key: 'Tab', description: 'Focus close button or links' },
        { key: 'Enter / Space', description: 'Activate close button' },
      ],
      screenReaderNotes: 'Alert content announced immediately for role="alert". Icon meaning conveyed through text or aria-label.',
    },
    
    bestPractices: [
      'Use semantic variants to convey message importance',
      'Keep alert messages concise and actionable',
      'Place alerts near related content or at top of page',
      'Use closable for non-critical, one-time messages',
      'Avoid stacking multiple alerts - prioritize most important',
    ],
    
    relatedComponents: ['toast', 'modal'],
  },
  
  'spinner': {
    id: 'spinner',
    name: 'Spinner',
    category: 'feedback',
    description: 'A loading indicator component for showing indeterminate progress or processing states.',
    selector: 'ui-spinner',
    
    inputs: [
      {
        name: 'size',
        type: "'sm' | 'md' | 'lg' | 'xl'",
        default: "'md'",
        required: false,
        description: 'Size of the spinner',
      },
      {
        name: 'color',
        type: "'primary' | 'secondary' | 'success' | 'warning' | 'error'",
        default: "'primary'",
        required: false,
        description: 'Color of the spinner',
      },
      {
        name: 'label',
        type: 'string',
        required: false,
        description: 'Accessibility label (announced to screen readers)',
      },
    ],
    
    outputs: [],
    
    examples: [
      {
        title: 'Basic Spinner',
        description: 'Simple loading spinner',
        typescript: '',
        template: `<ui-spinner label="Loading content..." />`,
      },
      {
        title: 'Spinner Sizes',
        description: 'Different spinner sizes',
        typescript: '',
        template: `<ui-spinner size="sm" />
<ui-spinner size="md" />
<ui-spinner size="lg" />
<ui-spinner size="xl" />`,
      },
      {
        title: 'Inline Spinner',
        description: 'Spinner in buttons or text',
        typescript: '',
        template: `<ui-button [loading]="true">
  <ui-spinner size="sm" />
  Processing...
</ui-button>`,
      },
    ],
    
    accessibility: {
      ariaSupport: [
        'Has role="status" for screen reader announcements',
        'aria-label provides context about loading state',
        'aria-live="polite" announces when spinner appears/disappears',
      ],
      keyboardNavigation: [],
      screenReaderNotes: 'Spinner presence announced with provided label. Consider announcing completion when loading finishes.',
    },
    
    bestPractices: [
      'Always provide descriptive label for context',
      'Use appropriate size for context (sm for buttons, lg for page loading)',
      'Consider showing spinner only after short delay (300ms) for fast operations',
      'Replace spinner with success/error feedback when complete',
      'For long operations, consider progress bar instead',
    ],
    
    relatedComponents: ['progress', 'button'],
  },
  
  'progress': {
    id: 'progress',
    name: 'Progress',
    category: 'feedback',
    description: 'A progress indicator component for showing determinate progress of operations or tasks.',
    selector: 'ui-progress',
    
    inputs: [
      {
        name: 'value',
        type: 'number',
        required: true,
        description: 'Current progress value (0-100)',
      },
      {
        name: 'variant',
        type: "'linear' | 'circular'",
        default: "'linear'",
        required: false,
        description: 'Visual style of progress indicator',
      },
      {
        name: 'color',
        type: "'primary' | 'secondary' | 'success' | 'warning' | 'error'",
        default: "'primary'",
        required: false,
        description: 'Color of the progress bar',
      },
      {
        name: 'size',
        type: "'sm' | 'md' | 'lg'",
        default: "'md'",
        required: false,
        description: 'Size of the progress indicator',
      },
      {
        name: 'showLabel',
        type: 'boolean',
        default: 'false',
        required: false,
        description: 'Show percentage label',
      },
      {
        name: 'indeterminate',
        type: 'boolean',
        default: 'false',
        required: false,
        description: 'Animated indeterminate state (ignores value)',
      },
    ],
    
    outputs: [],
    
    examples: [
      {
        title: 'Linear Progress',
        description: 'Horizontal progress bar',
        typescript: '',
        template: `<ui-progress [value]="45" [showLabel]="true" />`,
      },
      {
        title: 'Circular Progress',
        description: 'Circular progress indicator',
        typescript: '',
        template: `<ui-progress 
  variant="circular" 
  [value]="75" 
  [showLabel]="true" 
/>`,
      },
      {
        title: 'Indeterminate Progress',
        description: 'Unknown progress amount',
        typescript: '',
        template: `<ui-progress [indeterminate]="true" />`,
      },
      {
        title: 'Progress Colors',
        description: 'Semantic progress colors',
        typescript: '',
        template: `<ui-progress [value]="30" color="warning" />
<ui-progress [value]="70" color="success" />
<ui-progress [value]="90" color="error" />`,
      },
    ],
    
    accessibility: {
      ariaSupport: [
        'Has role="progressbar"',
        'aria-valuenow indicates current progress',
        'aria-valuemin and aria-valuemax define range',
        'aria-label or aria-labelledby provides context',
      ],
      keyboardNavigation: [],
      screenReaderNotes: 'Progress value announced. Changes in progress announced. Completion announced when reaching 100%.',
    },
    
    bestPractices: [
      'Use for operations with known progress (file uploads, installations)',
      'Update progress smoothly, avoid jumping values',
      'Show percentage label for clarity',
      'Use indeterminate when progress cannot be calculated',
      'Provide contextual information about what is progressing',
    ],
    
    relatedComponents: ['spinner', 'file-upload'],
  },
  
  'skeleton': {
    id: 'skeleton',
    name: 'Skeleton',
    category: 'feedback',
    description: 'A placeholder component that mimics content layout while data is loading, improving perceived performance.',
    selector: 'ui-skeleton',
    
    inputs: [
      {
        name: 'variant',
        type: "'text' | 'rectangular' | 'circular'",
        default: "'rectangular'",
        required: false,
        description: 'Shape of the skeleton',
      },
      {
        name: 'width',
        type: 'string | number',
        required: false,
        description: 'Width (CSS value or number in px)',
      },
      {
        name: 'height',
        type: 'string | number',
        required: false,
        description: 'Height (CSS value or number in px)',
      },
      {
        name: 'animation',
        type: "'pulse' | 'wave' | 'none'",
        default: "'pulse'",
        required: false,
        description: 'Animation style',
      },
    ],
    
    outputs: [],
    
    examples: [
      {
        title: 'Text Skeletons',
        description: 'Skeleton for text content',
        typescript: '',
        template: `<ui-skeleton variant="text" width="200px" />
<ui-skeleton variant="text" width="150px" />
<ui-skeleton variant="text" width="180px" />`,
      },
      {
        title: 'Card Skeleton',
        description: 'Skeleton matching card layout',
        typescript: '',
        template: `<ui-card>
  <ui-skeleton variant="rectangular" width="100%" height="200px" />
  <ui-skeleton variant="text" width="80%" />
  <ui-skeleton variant="text" width="60%" />
</ui-card>`,
      },
      {
        title: 'Avatar Skeleton',
        description: 'Circular skeleton for avatars',
        typescript: '',
        template: `<ui-skeleton variant="circular" width="40px" height="40px" />`,
      },
    ],
    
    accessibility: {
      ariaSupport: [
        'Has aria-busy="true" to indicate loading state',
        'Can use aria-label to describe what is loading',
        'Hidden from screen readers with aria-hidden when decorative',
      ],
      keyboardNavigation: [],
      screenReaderNotes: 'Skeleton is typically decorative. Ensure actual content is announced when it loads.',
    },
    
    bestPractices: [
      'Match skeleton layout to actual content structure',
      'Use for content that takes >1 second to load',
      'Show multiple skeletons for list/grid items',
      'Use wave animation sparingly for better performance',
      'Replace skeletons with actual content smoothly',
    ],
    
    relatedComponents: ['spinner', 'card'],
  },
  
  'toast': {
    id: 'toast',
    name: 'Toast',
    category: 'feedback',
    description: 'A non-intrusive notification component that appears temporarily to provide feedback about actions or events.',
    selector: 'ui-toast',
    
    inputs: [
      {
        name: 'message',
        type: 'string',
        required: true,
        description: 'Notification message text',
      },
      {
        name: 'variant',
        type: "'success' | 'info' | 'warning' | 'error'",
        default: "'info'",
        required: false,
        description: 'Semantic variant affecting color and icon',
      },
      {
        name: 'duration',
        type: 'number',
        default: '3000',
        required: false,
        description: 'Duration in ms before auto-dismiss (0 = no auto-dismiss)',
      },
      {
        name: 'closable',
        type: 'boolean',
        default: 'true',
        required: false,
        description: 'Show close button',
      },
      {
        name: 'position',
        type: "'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center'",
        default: "'top-right'",
        required: false,
        description: 'Position on screen',
      },
    ],
    
    outputs: [
      {
        name: 'closed',
        type: 'void',
        description: 'Emitted when toast is dismissed',
      },
    ],
    
    methods: [
      {
        name: 'show',
        parameters: '(message: string, variant?: ToastVariant, duration?: number)',
        returnType: 'void',
        description: 'Programmatically show a toast (via ToastService)',
      },
    ],
    
    examples: [
      {
        title: 'Toast Notifications',
        description: 'Different toast variants',
        typescript: `import { Component, inject } from '@angular/core';
import { ToastService } from '@ui-suite/components';

@Component({
  selector: 'app-example',
  template: \`
    <ui-button (clicked)="showToast()">Show Toast</ui-button>
  \`
})
export class ExampleComponent {
  private toastService = inject(ToastService);

  showToast() {
    this.toastService.show('Operation completed!', 'success');
  }
}`,
        template: `<!-- Toasts managed by ToastService -->
<ui-toast-container />`,
      },
      {
        title: 'Manual Toast Control',
        description: 'Control toast visibility manually',
        typescript: '',
        template: `<ui-toast
  message="This is a persistent toast"
  variant="info"
  [duration]="0"
  [closable]="true"
/>`,
      },
    ],
    
    accessibility: {
      ariaSupport: [
        'Has role="status" for non-critical messages',
        'Has role="alert" for error messages',
        'aria-live="polite" or "assertive" based on variant',
        'aria-atomic="true" ensures complete message is read',
      ],
      keyboardNavigation: [
        { key: 'Escape', description: 'Dismiss focused toast (if closable)' },
        { key: 'Tab', description: 'Focus close button' },
      ],
      screenReaderNotes: 'Toast message announced when shown. Multiple toasts announced in sequence. Avoid excessive toast frequency.',
    },
    
    bestPractices: [
      'Use for non-critical, transient feedback',
      'Keep messages brief and clear',
      'Use appropriate duration based on message length',
      'Avoid showing multiple toasts simultaneously',
      'Use semantic variants to convey message type',
    ],
    
    relatedComponents: ['alert', 'snackbar'],
  },
  
  // ===========================
  // NAVIGATION COMPONENTS
  // ===========================
  
  'breadcrumb': {
    id: 'breadcrumb',
    name: 'Breadcrumb',
    category: 'navigation',
    description: 'A navigation component showing the current page location within a hierarchical structure.',
    selector: 'ui-breadcrumb',
    
    inputs: [
      {
        name: 'items',
        type: 'BreadcrumbItem[]',
        required: true,
        description: 'Array of breadcrumb items',
      },
      {
        name: 'separator',
        type: 'string',
        default: "'/'",
        required: false,
        description: 'Separator character between items',
      },
      {
        name: 'maxItems',
        type: 'number',
        required: false,
        description: 'Maximum items to show (collapses middle items)',
      },
    ],
    
    outputs: [
      {
        name: 'itemClick',
        type: 'BreadcrumbItem',
        description: 'Emitted when a breadcrumb item is clicked',
      },
    ],
    
    examples: [
      {
        title: 'Basic Breadcrumb',
        description: 'Navigation breadcrumb trail',
        typescript: '',
        template: `<ui-breadcrumb [items]="breadcrumbItems" />

<!-- Where breadcrumbItems = [
  { label: 'Home', link: '/' },
  { label: 'Products', link: '/products' },
  { label: 'Category', link: '/products/category' },
  { label: 'Item' }
] -->`,
      },
      {
        title: 'Custom Separator',
        description: 'Breadcrumb with custom separator',
        typescript: '',
        template: `<ui-breadcrumb 
  [items]="breadcrumbItems" 
  separator=">" 
/>`,
      },
      {
        title: 'Collapsed Breadcrumb',
        description: 'Long path with collapsed middle items',
        typescript: '',
        template: `<ui-breadcrumb 
  [items]="longBreadcrumbItems" 
  [maxItems]="4"
/>`,
      },
    ],
    
    accessibility: {
      ariaSupport: [
        'Nav element with aria-label="Breadcrumb"',
        'Ordered list structure (ol)',
        'Current page has aria-current="page"',
        'Links have descriptive text',
      ],
      keyboardNavigation: [
        { key: 'Tab', description: 'Navigate between breadcrumb links' },
        { key: 'Enter', description: 'Follow breadcrumb link' },
      ],
      screenReaderNotes: 'Breadcrumb navigation announced. Path structure clear from list semantics. Current page identified.',
    },
    
    bestPractices: [
      'Show full hierarchy path from home to current page',
      'Make all items except current page clickable',
      'Use maxItems for very deep hierarchies (>5 levels)',
      'Keep breadcrumb labels concise',
      'Place breadcrumbs near top of page content',
    ],
    
    relatedComponents: ['navbar', 'menu'],
  },
  
  'menu': {
    id: 'menu',
    name: 'Menu',
    category: 'navigation',
    description: 'A vertical navigation menu component with support for nested submenus, icons, and dividers.',
    selector: 'ui-menu',
    
    inputs: [
      {
        name: 'items',
        type: 'MenuItem[]',
        required: true,
        description: 'Array of menu items (supports nesting)',
      },
      {
        name: 'collapsed',
        type: 'boolean',
        default: 'false',
        required: false,
        description: 'Collapse menu to icons only',
      },
    ],
    
    outputs: [
      {
        name: 'itemClick',
        type: 'MenuItem',
        description: 'Emitted when a menu item is clicked',
      },
    ],
    
    examples: [
      {
        title: 'Basic Menu',
        description: 'Vertical navigation menu',
        typescript: '',
        template: `<ui-menu [items]="menuItems" />

<!-- Where menuItems = [
  { label: 'Dashboard', icon: 'dashboard', link: '/' },
  { label: 'Products', icon: 'inventory', link: '/products' },
  { label: 'Orders', icon: 'shopping_cart', link: '/orders' },
  { divider: true },
  { label: 'Settings', icon: 'settings', link: '/settings' }
] -->`,
      },
      {
        title: 'Nested Menu',
        description: 'Menu with submenus',
        typescript: '',
        template: `<ui-menu [items]="nestedMenuItems" />

<!-- With nested children array -->`,
      },
      {
        title: 'Collapsed Menu',
        description: 'Icon-only compact menu',
        typescript: '',
        template: `<ui-menu [items]="menuItems" [collapsed]="true" />`,
      },
    ],
    
    accessibility: {
      ariaSupport: [
        'Nav element with role="navigation"',
        'Menu has role="menu"',
        'Menu items have role="menuitem"',
        'Expandable items have aria-expanded',
        'Submenus have aria-owns relationships',
      ],
      keyboardNavigation: [
        { key: 'Arrow Up / Down', description: 'Navigate menu items' },
        { key: 'Arrow Right', description: 'Expand submenu' },
        { key: 'Arrow Left', description: 'Collapse submenu' },
        { key: 'Enter / Space', description: 'Activate menu item' },
        { key: 'Escape', description: 'Close submenu' },
        { key: 'Home', description: 'Go to first item' },
        { key: 'End', description: 'Go to last item' },
      ],
      screenReaderNotes: 'Menu structure announced. Submenu relationships clear. Current selection announced.',
    },
    
    bestPractices: [
      'Keep menu hierarchy shallow (max 2-3 levels)',
      'Use clear, concise labels',
      'Group related items with dividers',
      'Use icons consistently for visual scanning',
      'Highlight active/current page',
    ],
    
    relatedComponents: ['navbar', 'drawer', 'list'],
  },
  
  'navbar': {
    id: 'navbar',
    name: 'Navbar',
    category: 'navigation',
    description: 'A horizontal navigation bar component for site-wide navigation with branding and actions.',
    selector: 'ui-navbar',
    
    inputs: [
      {
        name: 'title',
        type: 'string',
        required: false,
        description: 'Application or site title',
      },
      {
        name: 'logo',
        type: 'string',
        required: false,
        description: 'Logo image URL',
      },
      {
        name: 'fixed',
        type: 'boolean',
        default: 'false',
        required: false,
        description: 'Fix navbar to top of viewport',
      },
      {
        name: 'transparent',
        type: 'boolean',
        default: 'false',
        required: false,
        description: 'Transparent background (for hero sections)',
      },
    ],
    
    outputs: [],
    
    examples: [
      {
        title: 'Basic Navbar',
        description: 'Navigation bar with branding',
        typescript: '',
        template: `<ui-navbar title="My App" logo="/assets/logo.png">
  <nav>
    <a href="/">Home</a>
    <a href="/about">About</a>
    <a href="/contact">Contact</a>
  </nav>
  <div class="navbar-actions">
    <ui-button variant="outlined">Sign In</ui-button>
  </div>
</ui-navbar>`,
      },
      {
        title: 'Fixed Navbar',
        description: 'Navbar fixed to top',
        typescript: '',
        template: `<ui-navbar title="My App" [fixed]="true">
  <!-- navigation content -->
</ui-navbar>`,
      },
    ],
    
    accessibility: {
      ariaSupport: [
        'Has role="navigation"',
        'aria-label identifies navbar purpose',
        'Skip to content link for keyboard users',
      ],
      keyboardNavigation: [
        { key: 'Tab', description: 'Navigate between navbar links/buttons' },
        { key: 'Enter', description: 'Activate focused link/button' },
      ],
      screenReaderNotes: 'Navigation landmark announced. Links and actions announced in logical order.',
    },
    
    bestPractices: [
      'Keep navigation items to 5-7 for clarity',
      'Place primary actions on the right',
      'Use fixed navbar for long pages',
      'Ensure sufficient contrast for readability',
      'Consider mobile hamburger menu for responsive design',
    ],
    
    relatedComponents: ['menu', 'drawer', 'breadcrumb'],
  },
  
  'stepper': {
    id: 'stepper',
    name: 'Stepper',
    category: 'navigation',
    description: 'A component for guiding users through multi-step processes with progress indication.',
    selector: 'ui-stepper',
    
    inputs: [
      {
        name: 'steps',
        type: 'StepperStep[]',
        required: true,
        description: 'Array of step definitions',
      },
      {
        name: 'activeIndex',
        type: 'number',
        default: '0',
        required: false,
        description: 'Currently active step (0-indexed)',
      },
      {
        name: 'orientation',
        type: "'horizontal' | 'vertical'",
        default: "'horizontal'",
        required: false,
        description: 'Layout direction',
      },
      {
        name: 'linear',
        type: 'boolean',
        default: 'true',
        required: false,
        description: 'Require completing steps in order',
      },
    ],
    
    outputs: [
      {
        name: 'stepChange',
        type: 'number',
        description: 'Emitted when active step changes',
      },
    ],
    
    methods: [
      {
        name: 'next',
        parameters: '()',
        returnType: 'void',
        description: 'Move to next step',
      },
      {
        name: 'previous',
        parameters: '()',
        returnType: 'void',
        description: 'Move to previous step',
      },
      {
        name: 'goToStep',
        parameters: '(index: number)',
        returnType: 'void',
        description: 'Jump to specific step',
      },
    ],
    
    examples: [
      {
        title: 'Horizontal Stepper',
        description: 'Multi-step form process',
        typescript: '',
        template: `<ui-stepper 
  [steps]="steps" 
  [activeIndex]="currentStep()"
  (stepChange)="currentStep.set($event)"
>
  <!-- Step content goes here -->
</ui-stepper>

<!-- Where steps = [
  { label: 'Personal Info', completed: true },
  { label: 'Address', completed: false },
  { label: 'Payment', completed: false },
  { label: 'Review', completed: false }
] -->`,
      },
      {
        title: 'Vertical Stepper',
        description: 'Vertical layout for complex steps',
        typescript: '',
        template: `<ui-stepper 
  [steps]="steps" 
  orientation="vertical"
>
  <!-- Step content -->
</ui-stepper>`,
      },
    ],
    
    accessibility: {
      ariaSupport: [
        'Stepper has role="tablist" or nav',
        'Each step has role="tab"',
        'Step content has role="tabpanel"',
        'aria-current indicates active step',
        'Completed steps indicated with aria-label',
      ],
      keyboardNavigation: [
        { key: 'Arrow Left / Right', description: 'Navigate between steps (horizontal)' },
        { key: 'Arrow Up / Down', description: 'Navigate between steps (vertical)' },
        { key: 'Enter / Space', description: 'Go to focused step (if allowed)' },
        { key: 'Home', description: 'Go to first step' },
        { key: 'End', description: 'Go to last accessible step' },
      ],
      screenReaderNotes: 'Step progress announced (e.g., "Step 2 of 4"). Completed steps identified. Current step content announced.',
    },
    
    bestPractices: [
      'Use for processes with 3-7 steps',
      'Provide clear step labels',
      'Show progress visually (completed, current, upcoming)',
      'Allow users to return to previous steps',
      'Consider vertical layout for mobile',
      'Validate each step before allowing progression',
    ],
    
    relatedComponents: ['tabs', 'progress'],
  },
};

/**
 * Get metadata for a specific component
 */
export function getComponentMetadata(componentId: string) {
  return COMPONENT_METADATA[componentId];
}

/**
 * Check if metadata exists for a component
 */
export function hasComponentMetadata(componentId: string): boolean {
  return componentId in COMPONENT_METADATA;
}

