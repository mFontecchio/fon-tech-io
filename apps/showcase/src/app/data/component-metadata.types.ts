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
 * Complete component metadata
 */
export interface ComponentMetadata {
  id: string;
  name: string;
  category: 'form' | 'layout' | 'data-display' | 'feedback' | 'navigation';
  description: string;
  selector: string;
  inputs: InputMetadata[];
  outputs: OutputMetadata[];
  methods?: MethodMetadata[];
  examples: ExampleMetadata[];
  accessibility?: AccessibilityMetadata;
  bestPractices?: string[];
  relatedComponents?: string[];
}

