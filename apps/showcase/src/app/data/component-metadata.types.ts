/**
 * Component Metadata Type Definitions
 * Defines the structure for component API documentation
 */

export type ComponentCategory = 'form' | 'layout' | 'data-display' | 'feedback' | 'navigation';

export interface ComponentInput {
  name: string;
  type: string;
  default?: string;
  required: boolean;
  description: string;
}

export interface ComponentOutput {
  name: string;
  type: string;
  description: string;
}

export interface ComponentMethod {
  name: string;
  parameters: string;
  returnType: string;
  description: string;
}

export interface KeyboardShortcut {
  key: string;
  description: string;
}

export interface AccessibilityInfo {
  ariaSupport: string[];
  keyboardNavigation: KeyboardShortcut[];
  screenReaderNotes: string;
}

export interface CodeExample {
  title: string;
  description: string;
  typescript: string;
  template: string;
  styles?: string;
}

export interface ComponentMetadata {
  id: string; // e.g., 'button', 'input'
  name: string; // e.g., 'Button', 'Input'
  category: ComponentCategory;
  description: string;
  selector: string;
  
  // API
  inputs: ComponentInput[];
  outputs: ComponentOutput[];
  methods?: ComponentMethod[];
  
  // Documentation
  examples: CodeExample[];
  
  // Accessibility
  accessibility: AccessibilityInfo;
  
  // Additional Info
  bestPractices?: string[];
  relatedComponents?: string[]; // IDs of related components
}

export interface ComponentMetadataMap {
  [componentId: string]: ComponentMetadata;
}

