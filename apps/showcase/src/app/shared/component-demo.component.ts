/**
 * Component Demo Viewer
 * Displays live interactive examples of components based on component ID and example data
 */

import { ChangeDetectionStrategy, Component, input, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService } from '@ui-suite/components';
import {
  ButtonComponent,
  InputComponent,
  TextareaComponent,
  CheckboxComponent,
  RadioComponent,
  SwitchComponent,
  SelectComponent,
  SelectOption,
  MultiSelectComponent,
  SliderComponent,
  DatePickerComponent,
  FileUploadComponent,
  CardComponent,
  ModalComponent,
  TabsComponent,
  TabComponent,
  AccordionComponent,
  AccordionItemComponent,
  DrawerComponent,
  AlertComponent,
  BadgeComponent,
  AvatarComponent,
  ChipComponent,
  TooltipComponent,
  PopoverComponent,
  PaginationComponent,
  TableComponent,
  ListComponent,
  CarouselComponent,
  CarouselSlideComponent,
  CodeBlockComponent,
  SpinnerComponent,
  ProgressComponent,
  SkeletonComponent,
  BreadcrumbComponent,
  MenuComponent,
  ContextMenuComponent,
  NavbarComponent,
  StepperComponent,
  DividerComponent,
  StackComponent,
  GridComponent,
} from '@ui-suite/components';

@Component({
  selector: 'app-component-demo',
  standalone: true,
  imports: [
    CommonModule,
    ButtonComponent,
    InputComponent,
    TextareaComponent,
    CheckboxComponent,
    RadioComponent,
    SwitchComponent,
    SelectComponent,
    MultiSelectComponent,
    SliderComponent,
    DatePickerComponent,
    FileUploadComponent,
    CardComponent,
    ModalComponent,
    TabsComponent,
    TabComponent,
    AccordionComponent,
    AccordionItemComponent,
    DrawerComponent,
    AlertComponent,
    BadgeComponent,
    AvatarComponent,
    ChipComponent,
    TooltipComponent,
    PopoverComponent,
    PaginationComponent,
    TableComponent,
    ListComponent,
    CarouselComponent,
    CarouselSlideComponent,
    CodeBlockComponent,
    SpinnerComponent,
    ProgressComponent,
    SkeletonComponent,
    BreadcrumbComponent,
    MenuComponent,
    ContextMenuComponent,
    NavbarComponent,
    StepperComponent,
    DividerComponent,
    StackComponent,
    GridComponent,
  ],
  template: `
    <div class="component-demo">
      <div class="demo-container">
        @switch (componentId()) {
          <!-- BUTTON DEMOS -->
          @case ('button') {
            @if (exampleTitle() === 'Basic Usage') {
              <ui-button>Click Me</ui-button>
            }
            @if (exampleTitle() === 'Button Variants') {
              <div class="demo-row">
                <ui-button variant="filled">Filled</ui-button>
                <ui-button variant="outlined">Outlined</ui-button>
                <ui-button variant="text">Text</ui-button>
              </div>
            }
            @if (exampleTitle() === 'Button Sizes') {
              <div class="demo-row">
                <ui-button size="sm">Small</ui-button>
                <ui-button size="md">Medium</ui-button>
                <ui-button size="lg">Large</ui-button>
              </div>
            }
            @if (exampleTitle() === 'Disabled State') {
              <ui-button [disabled]="true">Disabled Button</ui-button>
            }
            @if (exampleTitle() === 'Loading State') {
              <ui-button [loading]="true">Loading...</ui-button>
            }
            @if (exampleTitle() === 'Full Width') {
              <ui-button [fullWidth]="true">Full Width Button</ui-button>
            }
          }

          <!-- INPUT DEMOS -->
          @case ('input') {
            @if (exampleTitle() === 'Basic Input') {
              <ui-input label="Email" placeholder="Enter your email" />
            }
            @if (exampleTitle() === 'Input Types') {
              <div class="demo-column">
                <ui-input type="email" label="Email" placeholder="email@example.com" />
                <ui-input type="password" label="Password" placeholder="Enter password" />
                <ui-input type="number" label="Age" placeholder="Enter age" />
                <ui-input type="tel" label="Phone" placeholder="(123) 456-7890" />
              </div>
            }
            @if (exampleTitle() === 'Input with Prefix Icon') {
              <ui-input label="Search" placeholder="Search..." prefixIcon="🔍" />
            }
            @if (exampleTitle() === 'Input with Suffix Icon') {
              <ui-input
                label="Password"
                type="password"
                placeholder="Enter password"
                suffixIcon="👁️"
              />
            }
            @if (exampleTitle() === 'Input with Custom Affixes') {
              <ui-input label="Website" placeholder="your-site" helperText="Projected prefix and suffix content stay inside the field.">
                <span prefix>https://</span>
                <span suffix>.com</span>
              </ui-input>
            }
            @if (exampleTitle() === 'Password Reveal Toggle') {
              <ui-input
                label="Password"
                type="password"
                placeholder="Enter password"
                [showPasswordToggle]="true"
              />
            }
            @if (exampleTitle() === 'Input with Error') {
              <ui-input
                label="Email"
                value="invalid-email"
                errorMessage="Please enter a valid email address"
              />
            }
            @if (exampleTitle() === 'Input with Helper Text') {
              <ui-input
                label="Username"
                placeholder="Enter username"
                helperText="Must be 3-20 characters, letters and numbers only"
              />
            }
            @if (exampleTitle() === 'Disabled Input') {
              <ui-input label="Email" value="user@example.com" [disabled]="true" />
            }
            @if (exampleTitle() === 'Required Input') {
              <ui-input label="Email" placeholder="Enter your email" [required]="true" />
            }
          }

          <!-- TEXTAREA DEMOS -->
          @case ('textarea') {
            @if (exampleTitle() === 'Basic Textarea') {
              <ui-textarea label="Description" placeholder="Enter description..." />
            }
            @if (exampleTitle() === 'Textarea with Rows') {
              <ui-textarea label="Comments" placeholder="Enter your comments..." [rows]="5" />
            }
            @if (exampleTitle() === 'Textarea with Character Limit') {
              <ui-textarea
                label="Bio"
                placeholder="Tell us about yourself..."
                [maxLength]="200"
                [showCharacterCount]="true"
              />
            }
            @if (exampleTitle() === 'Textarea with Helper Text') {
              <ui-textarea
                label="Feedback"
                placeholder="Share your thoughts..."
                helperText="Your feedback helps us improve."
              />
            }
            @if (exampleTitle() === 'Textarea with Error') {
              <ui-textarea
                label="Message"
                placeholder="Enter message..."
                errorMessage="Message is required"
              />
            }
            @if (exampleTitle() === 'Required Textarea') {
              <ui-textarea
                label="Required Field"
                placeholder="This field is required..."
                [required]="true"
              />
            }
            @if (exampleTitle() === 'Disabled Textarea') {
              <ui-textarea
                label="Readonly Content"
                value="This content cannot be edited."
                [disabled]="true"
              />
            }
          }

          <!-- CHECKBOX DEMOS -->
          @case ('checkbox') {
            @if (exampleTitle() === 'Basic Checkbox') {
              <ui-checkbox label="Accept terms and conditions" />
            }
            @if (exampleTitle() === 'Checkbox States') {
              <div class="demo-column">
                <ui-checkbox label="Unchecked" [checked]="false" />
                <ui-checkbox label="Checked" [checked]="true" />
                <ui-checkbox label="Indeterminate" [indeterminate]="true" />
              </div>
            }
            @if (exampleTitle() === 'Disabled Checkbox') {
              <div class="demo-column">
                <ui-checkbox label="Disabled unchecked" [disabled]="true" />
                <ui-checkbox label="Disabled checked" [checked]="true" [disabled]="true" />
              </div>
            }
            @if (exampleTitle() === 'Checkbox Group') {
              <div class="demo-column">
                <ui-checkbox label="JavaScript" />
                <ui-checkbox label="TypeScript" />
                <ui-checkbox label="Angular" />
              </div>
            }
          }

          <!-- RADIO DEMOS -->
          @case ('radio') {
            @if (exampleTitle() === 'Basic Radio Group') {
              <div class="demo-column">
                <ui-radio
                  name="plan"
                  value="free"
                  label="Free Plan"
                  [(modelValue)]="selectedPlan"
                />
                <ui-radio name="plan" value="pro" label="Pro Plan" [(modelValue)]="selectedPlan" />
                <ui-radio
                  name="plan"
                  value="enterprise"
                  label="Enterprise Plan"
                  [(modelValue)]="selectedPlan"
                />
              </div>
            }
            @if (exampleTitle() === 'Radio with Pre-selection') {
              <div class="demo-column">
                <ui-radio name="size" value="sm" label="Small" [(modelValue)]="selectedSize" />
                <ui-radio name="size" value="md" label="Medium" [(modelValue)]="selectedSize" />
                <ui-radio name="size" value="lg" label="Large" [(modelValue)]="selectedSize" />
              </div>
            }
            @if (exampleTitle() === 'Disabled Radio Options') {
              <div class="demo-column">
                <ui-radio
                  name="shipping"
                  value="standard"
                  label="Standard (5-7 days)"
                  [(modelValue)]="selectedShipping"
                />
                <ui-radio
                  name="shipping"
                  value="express"
                  label="Express (2-3 days)"
                  [(modelValue)]="selectedShipping"
                />
                <ui-radio
                  name="shipping"
                  value="overnight"
                  label="Overnight"
                  [disabled]="true"
                  [(modelValue)]="selectedShipping"
                />
              </div>
            }
            @if (exampleTitle() === 'Radio States') {
              <div class="demo-column">
                <ui-radio name="state1" value="unchecked" label="Unchecked" />
                <ui-radio
                  name="state2"
                  value="disabled-unchecked"
                  label="Disabled Unchecked"
                  [disabled]="true"
                />
                <ui-radio
                  name="state3"
                  value="disabled-checked"
                  label="Disabled"
                  [disabled]="true"
                />
              </div>
            }
            @if (exampleTitle() === 'Payment Method Selection') {
              <div class="demo-column">
                <ui-radio
                  name="payment"
                  value="card"
                  label="Credit/Debit Card"
                  [(modelValue)]="selectedPayment"
                />
                <ui-radio
                  name="payment"
                  value="paypal"
                  label="PayPal"
                  [(modelValue)]="selectedPayment"
                />
                <ui-radio
                  name="payment"
                  value="bank"
                  label="Bank Transfer"
                  [(modelValue)]="selectedPayment"
                />
              </div>
            }
          }

          <!-- SWITCH DEMOS -->
          @case ('switch') {
            @if (exampleTitle() === 'Basic Switch') {
              <ui-switch label="Enable notifications" />
            }
            @if (exampleTitle() === 'Switch States') {
              <div class="demo-column">
                <ui-switch label="Off" [checked]="false" />
                <ui-switch label="On" [checked]="true" />
              </div>
            }
            @if (exampleTitle() === 'Switch Sizes') {
              <div class="demo-column">
                <ui-switch label="Small" size="sm" />
                <ui-switch label="Medium" size="md" />
                <ui-switch label="Large" size="lg" />
              </div>
            }
            @if (exampleTitle() === 'Disabled Switch') {
              <div class="demo-column">
                <ui-switch label="Disabled off" [disabled]="true" />
                <ui-switch label="Disabled on" [checked]="true" [disabled]="true" />
              </div>
            }
          }

          <!-- SELECT DEMOS -->
          @case ('select') {
            @if (exampleTitle() === 'Basic Select') {
              <ui-select label="Country" [options]="sampleOptions()" placeholder="Select country" />
            }
            @if (exampleTitle() === 'Select with Pre-selection') {
              <ui-select label="Country" [options]="sampleOptions()" value="us" />
            }
            @if (exampleTitle() === 'Required Select') {
              <ui-select
                label="Priority"
                [options]="priorityOptions()"
                [required]="true"
                placeholder="Select priority"
              />
            }
            @if (exampleTitle() === 'Select with Error') {
              <ui-select
                label="Country"
                [options]="sampleOptions()"
                placeholder="Select country"
                error="Country is required"
              />
            }
            @if (exampleTitle() === 'Disabled Select') {
              <ui-select label="Country" [options]="sampleOptions()" value="us" [disabled]="true" />
            }
          }

          <!-- MULTI-SELECT DEMOS -->
          @case ('multi-select') {
            @if (exampleTitle() === 'Basic Multi-Select') {
              <ui-multi-select
                label="Skills"
                [options]="skillOptions()"
                placeholder="Select your skills"
              />
            }
            @if (exampleTitle() === 'Multi-Select with Pre-selection') {
              <ui-multi-select label="Skills" [options]="skillOptions()" [value]="['js', 'ts']" />
            }
            @if (exampleTitle() === 'Disabled Multi-Select') {
              <ui-multi-select
                label="Skills"
                [options]="skillOptions()"
                [value]="['js']"
                [disabled]="true"
              />
            }
          }

          <!-- SLIDER DEMOS -->
          @case ('slider') {
            @if (exampleTitle() === 'Basic Slider') {
              <ui-slider label="Volume" [min]="0" [max]="100" [value]="50" />
            }
            @if (exampleTitle() === 'Slider with Steps') {
              <ui-slider label="Rating" [min]="0" [max]="10" [step]="2" [value]="6" />
            }
            @if (exampleTitle() === 'Range Slider') {
              <ui-slider
                label="Price Range"
                [min]="0"
                [max]="1000"
                [value]="200"
                [valueEnd]="800"
              />
            }
            @if (exampleTitle() === 'Disabled Slider') {
              <ui-slider label="Volume" [min]="0" [max]="100" [value]="75" [disabled]="true" />
            }
          }

          <!-- DATE PICKER DEMOS -->
          @case ('date-picker') {
            @if (exampleTitle() === 'Basic Date Picker') {
              <ui-date-picker label="Birth Date" placeholder="Select your birth date" />
            }
            @if (exampleTitle() === 'Date Picker with Pre-selected Date') {
              <ui-date-picker
                label="Appointment Date"
                placeholder="Select date"
                value="2024-12-15"
              />
            }
            @if (exampleTitle() === 'Date Picker with Date Range') {
              <ui-date-picker
                label="Start Date"
                placeholder="Select start date"
                min="2024-01-01"
                max="2024-12-31"
                helperText="Must be within 2024"
              />
            }
            @if (exampleTitle() === 'Required Date Picker') {
              <ui-date-picker
                label="Event Date"
                placeholder="Select date"
                [required]="true"
                helperText="This field is required"
              />
            }
            @if (exampleTitle() === 'Date Picker with Error') {
              <ui-date-picker
                label="Expiry Date"
                placeholder="Select expiry date"
                errorMessage="Please select a valid expiry date"
              />
            }
            @if (exampleTitle() === 'Disabled Date Picker') {
              <ui-date-picker
                label="Locked Date"
                placeholder="Not available"
                value="2024-01-15"
                [disabled]="true"
              />
            }
            @if (exampleTitle() === 'Booking Form') {
              <div class="demo-column">
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
              </div>
            }
          }

          <!-- FILE UPLOAD DEMOS -->
          @case ('file-upload') {
            @if (exampleTitle() === 'Basic File Upload') {
              <ui-file-upload label="Upload File" helperText="Choose a file to upload" />
            }
            @if (exampleTitle() === 'Multiple File Upload') {
              <ui-file-upload
                label="Upload Documents"
                [multiple]="true"
                helperText="You can select multiple files"
              />
            }
            @if (exampleTitle() === 'File Type Restrictions') {
              <ui-file-upload
                label="Upload PDF Documents"
                accept=".pdf"
                helperText="Only PDF files are accepted"
              />
            }
            @if (exampleTitle() === 'Image Upload') {
              <ui-file-upload
                label="Upload Images"
                accept="image/*"
                [multiple]="true"
                helperText="Supports JPG, PNG, GIF, and WebP"
              />
            }
            @if (exampleTitle() === 'File Size Limit') {
              <ui-file-upload
                label="Upload Profile Picture"
                accept="image/*"
                [maxSize]="2097152"
                helperText="Maximum file size: 2MB"
              />
            }
            @if (exampleTitle() === 'File Upload with Error') {
              <ui-file-upload
                label="Upload Resume"
                accept=".pdf,.doc,.docx"
                errorMessage="File size exceeds the maximum limit of 10MB"
                helperText="Please upload your resume (PDF or Word)"
              />
            }
            @if (exampleTitle() === 'Disabled Upload') {
              <ui-file-upload
                label="Upload Disabled"
                [disabled]="true"
                helperText="File upload is currently disabled"
              />
            }
            @if (exampleTitle() === 'Document Upload Form') {
              <div class="demo-column">
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
              </div>
            }
          }

          <!-- CARD DEMOS -->
          @case ('card') {
            @if (exampleTitle() === 'Basic Card') {
              <ui-card>
                <h3>Card Title</h3>
                <p>Card content goes here...</p>
              </ui-card>
            }
            @if (exampleTitle() === 'Card Variants') {
              <div class="demo-column">
                <ui-card variant="elevated">
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
                </ui-card>
              </div>
            }
          }

          <!-- ALERT DEMOS -->
          @case ('alert') {
            @if (exampleTitle() === 'Alert Variants') {
              <div class="demo-column">
                <ui-alert variant="info"> This is an informational message. </ui-alert>
                <ui-alert variant="success"> Operation completed successfully! </ui-alert>
                <ui-alert variant="warning"> Please review your input carefully. </ui-alert>
                <ui-alert variant="error"> An error occurred. Please try again. </ui-alert>
              </div>
            }
            @if (exampleTitle() === 'Dismissible Alert') {
              <ui-alert variant="info" [dismissible]="true">
                You can close this alert by clicking the X button.
              </ui-alert>
            }
            @if (exampleTitle() === 'Alert Sizes') {
              <div class="demo-column">
                <ui-alert variant="info" size="sm">Small alert message</ui-alert>
                <ui-alert variant="info" size="md">Medium alert message</ui-alert>
                <ui-alert variant="info" size="lg">Large alert message</ui-alert>
              </div>
            }
          }

          <!-- BADGE DEMOS -->
          @case ('badge') {
            @if (exampleTitle() === 'Badge Variants') {
              <div class="demo-row">
                <ui-badge variant="default">Default</ui-badge>
                <ui-badge variant="primary">Primary</ui-badge>
                <ui-badge variant="success">Success</ui-badge>
                <ui-badge variant="warning">Warning</ui-badge>
                <ui-badge variant="error">Error</ui-badge>
              </div>
            }
            @if (exampleTitle() === 'Badge Sizes') {
              <div class="demo-row">
                <ui-badge size="sm">Small</ui-badge>
                <ui-badge size="md">Medium</ui-badge>
                <ui-badge size="lg">Large</ui-badge>
              </div>
            }
            @if (exampleTitle() === 'Status Indicators') {
              <div class="demo-row">
                <ui-badge variant="success">Active</ui-badge>
                <ui-badge variant="warning">Pending</ui-badge>
                <ui-badge variant="error">Inactive</ui-badge>
              </div>
            }
            @if (exampleTitle() === 'Count Badges') {
              <div class="demo-row">
                <ui-badge variant="primary">5</ui-badge>
                <ui-badge variant="error">99+</ui-badge>
              </div>
            }
          }

          <!-- AVATAR DEMOS -->
          @case ('avatar') {
            @if (exampleTitle() === 'Avatar with Initials') {
              <ui-avatar text="JD" alt="John Doe" />
            }
            @if (exampleTitle() === 'Avatar Sizes') {
              <div class="demo-row">
                <ui-avatar text="SM" size="sm" />
                <ui-avatar text="MD" size="md" />
                <ui-avatar text="LG" size="lg" />
                <ui-avatar text="XL" size="xl" />
              </div>
            }
            @if (exampleTitle() === 'Avatar with Image') {
              <ui-avatar src="/avatar.jpg" alt="John Doe" text="JD" />
            }
            @if (exampleTitle() === 'User Profile Group') {
              <div class="demo-row">
                <ui-avatar text="JD" size="md" />
                <ui-avatar text="AS" size="md" />
                <ui-avatar text="MK" size="md" />
                <ui-avatar text="+3" size="md" />
              </div>
            }
          }

          <!-- TOOLTIP DEMOS -->
          @case ('tooltip') {
            @if (exampleTitle() === 'Basic Tooltip') {
              <ui-tooltip text="Click to save">
                <button>Save</button>
              </ui-tooltip>
            }
            @if (exampleTitle() === 'Tooltip Positions') {
              <div class="demo-row">
                <ui-tooltip text="Top tooltip" position="top">
                  <button>Top</button>
                </ui-tooltip>
                <ui-tooltip text="Bottom tooltip" position="bottom">
                  <button>Bottom</button>
                </ui-tooltip>
                <ui-tooltip text="Left tooltip" position="left">
                  <button>Left</button>
                </ui-tooltip>
                <ui-tooltip text="Right tooltip" position="right">
                  <button>Right</button>
                </ui-tooltip>
              </div>
            }
            @if (exampleTitle() === 'Icon with Tooltip') {
              <ui-tooltip text="More information">
                <button></button>
              </ui-tooltip>
            }
            @if (exampleTitle() === 'Link with Tooltip') {
              <ui-tooltip text="Opens in new tab">
                <a href="#">Documentation</a>
              </ui-tooltip>
            }
          }

          <!-- CHIP DEMOS -->
          @case ('chip') {
            @if (exampleTitle() === 'Basic Chip') {
              <ui-chip label="JavaScript" />
            }
            @if (exampleTitle() === 'Chip Variants') {
              <div class="demo-row">
                <ui-chip label="Default" variant="default" />
                <ui-chip label="Primary" variant="primary" />
                <ui-chip label="Success" variant="success" />
                <ui-chip label="Warning" variant="warning" />
                <ui-chip label="Error" variant="error" />
              </div>
            }
            @if (exampleTitle() === 'Chip Sizes') {
              <div class="demo-row">
                <ui-chip label="Small" size="sm" />
                <ui-chip label="Medium" size="md" />
                <ui-chip label="Large" size="lg" />
              </div>
            }
            @if (exampleTitle() === 'Removable Chips') {
              <div class="demo-row">
                <ui-chip label="JavaScript" [removable]="true" />
                <ui-chip label="TypeScript" [removable]="true" />
                <ui-chip label="Angular" [removable]="true" />
              </div>
            }
            @if (exampleTitle() === 'Disabled Chips') {
              <div class="demo-row">
                <ui-chip label="Disabled" [disabled]="true" />
                <ui-chip label="Disabled Removable" [removable]="true" [disabled]="true" />
              </div>
            }
            @if (exampleTitle() === 'Chip Collection') {
              <div class="demo-row">
                <ui-chip label="React" variant="primary" [removable]="true" />
                <ui-chip label="Vue" variant="primary" [removable]="true" />
                <ui-chip label="Angular" variant="primary" [removable]="true" />
                <ui-chip label="Svelte" variant="primary" [removable]="true" />
              </div>
            }
          }

          <!-- SPINNER DEMOS -->
          @case ('spinner') {
            @if (exampleTitle() === 'Basic Spinner') {
              <ui-spinner />
            }
            @if (exampleTitle() === 'Spinner Sizes') {
              <div class="demo-row">
                <ui-spinner size="sm" />
                <ui-spinner size="md" />
                <ui-spinner size="lg" />
              </div>
            }
            @if (exampleTitle() === 'Inline Loading') {
              <p>Loading data <ui-spinner size="sm" /></p>
            }
          }

          <!-- PROGRESS DEMOS -->
          @case ('progress') {
            @if (exampleTitle() === 'Basic Progress') {
              <ui-progress [value]="60" />
            }
            @if (exampleTitle() === 'Progress with Value') {
              <ui-progress [value]="75" [showValue]="true" />
            }
            @if (exampleTitle() === 'Progress Variants') {
              <div class="demo-column">
                <ui-progress [value]="30" variant="default" />
                <ui-progress [value]="100" variant="success" />
                <ui-progress [value]="70" variant="warning" />
                <ui-progress [value]="50" variant="error" />
              </div>
            }
            @if (exampleTitle() === 'Progress Stages') {
              <div class="demo-column">
                <ui-progress [value]="0" [showValue]="true" />
                <ui-progress [value]="25" [showValue]="true" />
                <ui-progress [value]="50" [showValue]="true" />
                <ui-progress [value]="75" [showValue]="true" />
                <ui-progress [value]="100" [showValue]="true" />
              </div>
            }
          }

          <!-- SKELETON DEMOS -->
          @case ('skeleton') {
            @if (exampleTitle() === 'Text Skeleton') {
              <div class="demo-column">
                <ui-skeleton variant="text" width="100%" />
                <ui-skeleton variant="text" width="80%" />
                <ui-skeleton variant="text" width="90%" />
              </div>
            }
            @if (exampleTitle() === 'Circular Skeleton') {
              <ui-skeleton variant="circular" width="40px" height="40px" />
            }
            @if (exampleTitle() === 'Rectangular Skeleton') {
              <ui-skeleton variant="rectangular" width="300px" height="200px" />
            }
            @if (exampleTitle() === 'Skeleton Variants') {
              <div class="demo-column">
                <ui-skeleton variant="text" width="200px" />
                <ui-skeleton variant="circular" width="50px" height="50px" />
                <ui-skeleton variant="rectangular" width="200px" height="100px" />
              </div>
            }
            @if (exampleTitle() === 'Card Loading Pattern') {
              <div class="demo-column">
                <ui-skeleton variant="circular" width="40px" height="40px" />
                <ui-skeleton variant="text" width="150px" />
                <ui-skeleton variant="rectangular" width="100%" height="150px" />
                <ui-skeleton variant="text" width="100%" />
                <ui-skeleton variant="text" width="80%" />
              </div>
            }
          }

          <!-- DIVIDER DEMOS -->
          @case ('divider') {
            @if (exampleTitle() === 'Horizontal Divider') {
              <div class="demo-column" style="width: 100%;">
                <div>Section 1</div>
                <ui-divider />
                <div>Section 2</div>
              </div>
            }
            @if (exampleTitle() === 'Divider Variants') {
              <div class="demo-column" style="width: 100%;">
                <p>Solid (default):</p>
                <ui-divider />
                <p>Dashed:</p>
                <ui-divider [dashed]="true" />
                <p>With Label:</p>
                <ui-divider label="OR" />
              </div>
            }
            @if (exampleTitle() === 'Vertical Divider') {
              <div style="display: flex; align-items: center; gap: 16px;">
                <span>Item 1</span>
                <ui-divider orientation="vertical" style="height: 24px;" />
                <span>Item 2</span>
                <ui-divider orientation="vertical" style="height: 24px;" />
                <span>Item 3</span>
              </div>
            }
          }

          <!-- STACK DEMOS -->
          @case ('stack') {
            @if (exampleTitle() === 'Vertical Stack') {
              <ui-stack direction="vertical" [spacing]="4">
                <div
                  style="padding: 1rem; background: var(--semantic-surface-subtle); border-radius: 4px;"
                >
                  Item 1
                </div>
                <div
                  style="padding: 1rem; background: var(--semantic-surface-subtle); border-radius: 4px;"
                >
                  Item 2
                </div>
                <div
                  style="padding: 1rem; background: var(--semantic-surface-subtle); border-radius: 4px;"
                >
                  Item 3
                </div>
              </ui-stack>
            }
            @if (exampleTitle() === 'Horizontal Stack') {
              <ui-stack direction="horizontal" [spacing]="4">
                <div
                  style="padding: 1rem; background: var(--semantic-surface-subtle); border-radius: 4px;"
                >
                  Item 1
                </div>
                <div
                  style="padding: 1rem; background: var(--semantic-surface-subtle); border-radius: 4px;"
                >
                  Item 2
                </div>
                <div
                  style="padding: 1rem; background: var(--semantic-surface-subtle); border-radius: 4px;"
                >
                  Item 3
                </div>
              </ui-stack>
            }
            @if (exampleTitle() === 'Stack with Alignment') {
              <ui-stack direction="vertical" [spacing]="3" align="center">
                <div
                  style="padding: 0.5rem 2rem; background: var(--semantic-surface-subtle); border-radius: 4px;"
                >
                  Centered Item 1
                </div>
                <div
                  style="padding: 0.5rem 3rem; background: var(--semantic-surface-subtle); border-radius: 4px;"
                >
                  Centered Item 2
                </div>
                <div
                  style="padding: 0.5rem 1rem; background: var(--semantic-surface-subtle); border-radius: 4px;"
                >
                  Centered Item 3
                </div>
              </ui-stack>
            }
          }

          <!-- GRID DEMOS -->
          @case ('grid') {
            @if (exampleTitle() === '3-Column Grid') {
              <ui-grid [columns]="3" [gap]="4">
                <div
                  style="padding: 1rem; background: var(--semantic-surface-subtle); border-radius: 4px;"
                >
                  Item 1
                </div>
                <div
                  style="padding: 1rem; background: var(--semantic-surface-subtle); border-radius: 4px;"
                >
                  Item 2
                </div>
                <div
                  style="padding: 1rem; background: var(--semantic-surface-subtle); border-radius: 4px;"
                >
                  Item 3
                </div>
                <div
                  style="padding: 1rem; background: var(--semantic-surface-subtle); border-radius: 4px;"
                >
                  Item 4
                </div>
                <div
                  style="padding: 1rem; background: var(--semantic-surface-subtle); border-radius: 4px;"
                >
                  Item 5
                </div>
                <div
                  style="padding: 1rem; background: var(--semantic-surface-subtle); border-radius: 4px;"
                >
                  Item 6
                </div>
              </ui-grid>
            }
            @if (exampleTitle() === '4-Column Grid') {
              <ui-grid [columns]="4" [gap]="3">
                <div
                  style="padding: 1rem; background: var(--semantic-surface-subtle); border-radius: 4px;"
                >
                  Item 1
                </div>
                <div
                  style="padding: 1rem; background: var(--semantic-surface-subtle); border-radius: 4px;"
                >
                  Item 2
                </div>
                <div
                  style="padding: 1rem; background: var(--semantic-surface-subtle); border-radius: 4px;"
                >
                  Item 3
                </div>
                <div
                  style="padding: 1rem; background: var(--semantic-surface-subtle); border-radius: 4px;"
                >
                  Item 4
                </div>
                <div
                  style="padding: 1rem; background: var(--semantic-surface-subtle); border-radius: 4px;"
                >
                  Item 5
                </div>
                <div
                  style="padding: 1rem; background: var(--semantic-surface-subtle); border-radius: 4px;"
                >
                  Item 6
                </div>
                <div
                  style="padding: 1rem; background: var(--semantic-surface-subtle); border-radius: 4px;"
                >
                  Item 7
                </div>
                <div
                  style="padding: 1rem; background: var(--semantic-surface-subtle); border-radius: 4px;"
                >
                  Item 8
                </div>
              </ui-grid>
            }
          }

          <!-- MODAL DEMOS -->
          @case ('modal') {
            @if (exampleTitle() === 'Basic Modal') {
              <div>
                <ui-button (clicked)="isOpen.set(true)">Open Modal</ui-button>
                <ui-modal [open]="isOpen()" (closed)="isOpen.set(false)">
                  <h2>Modal Title</h2>
                  <p>This is a basic modal dialog. Click outside or press Escape to close.</p>
                  <ui-button (clicked)="isOpen.set(false)">Close</ui-button>
                </ui-modal>
              </div>
            }
            @if (exampleTitle() === 'Modal Sizes') {
              <div class="demo-row">
                <ui-button size="sm" (clicked)="isOpen.set(true)">Small Modal</ui-button>
                <ui-modal [open]="isOpen()" size="sm" (closed)="isOpen.set(false)">
                  <h3>Small Modal</h3>
                  <p>Compact modal for simple messages.</p>
                </ui-modal>
              </div>
            }
            @if (exampleTitle() === 'Modal without Backdrop Close') {
              <div>
                <ui-button (clicked)="isOpen.set(true)">Open Modal</ui-button>
                <ui-modal
                  [open]="isOpen()"
                  [closeOnBackdropClick]="false"
                  (closed)="isOpen.set(false)"
                >
                  <h2>Important Modal</h2>
                  <p>This modal can only be closed by clicking the button.</p>
                  <ui-button (clicked)="isOpen.set(false)">Close Modal</ui-button>
                </ui-modal>
              </div>
            }
          }

          <!-- TABS DEMOS -->
          @case ('tabs') {
            @if (exampleTitle() === 'Basic Tabs') {
              <ui-tabs>
                <ui-tab label="Profile">
                  <p>User profile information and settings.</p>
                </ui-tab>
                <ui-tab label="Settings">
                  <p>Application settings and preferences.</p>
                </ui-tab>
                <ui-tab label="Notifications">
                  <p>Notification preferences and history.</p>
                </ui-tab>
              </ui-tabs>
            }
            @if (exampleTitle() === 'Vertical Tabs') {
              <ui-tabs orientation="vertical">
                <ui-tab label="Account">
                  <p>Account settings and information.</p>
                </ui-tab>
                <ui-tab label="Security">
                  <p>Security and privacy settings.</p>
                </ui-tab>
              </ui-tabs>
            }
            @if (exampleTitle() === 'Tab Sizes') {
              <ui-tabs size="lg">
                <ui-tab label="Large Tab 1">
                  <p>Content for large tab.</p>
                </ui-tab>
                <ui-tab label="Large Tab 2">
                  <p>More content.</p>
                </ui-tab>
              </ui-tabs>
            }
          }

          <!-- ACCORDION DEMOS -->
          @case ('accordion') {
            @if (exampleTitle() === 'Single Mode Accordion') {
              <ui-accordion mode="single">
                <ui-accordion-item title="What is your return policy?">
                  <p>We offer a 30-day return policy on all items.</p>
                </ui-accordion-item>
                <ui-accordion-item title="How long does shipping take?">
                  <p>Standard shipping takes 5-7 business days.</p>
                </ui-accordion-item>
                <ui-accordion-item title="Do you ship internationally?">
                  <p>Yes, we ship to over 100 countries worldwide.</p>
                </ui-accordion-item>
              </ui-accordion>
            }
            @if (exampleTitle() === 'Multiple Mode Accordion') {
              <ui-accordion mode="multiple">
                <ui-accordion-item title="Section 1">
                  <p>Content for section 1.</p>
                </ui-accordion-item>
                <ui-accordion-item title="Section 2">
                  <p>Content for section 2.</p>
                </ui-accordion-item>
              </ui-accordion>
            }
            @if (exampleTitle() === 'Pre-expanded Accordion') {
              <ui-accordion [expanded]="[0]">
                <ui-accordion-item title="First Item (Expanded)">
                  <p>This item is expanded by default.</p>
                </ui-accordion-item>
                <ui-accordion-item title="Second Item">
                  <p>This item starts collapsed.</p>
                </ui-accordion-item>
              </ui-accordion>
            }
          }

          <!-- DRAWER DEMOS -->
          @case ('drawer') {
            @if (exampleTitle() === 'Left Drawer') {
              <div>
                <ui-button (clicked)="drawerLeft.set(true)">Open Navigation</ui-button>
                <ui-drawer
                  [open]="drawerLeft()"
                  title="Navigation"
                  position="left"
                  (openChange)="drawerLeft.set($event)"
                >
                  <nav style="display: flex; flex-direction: column; gap: 12px;">
                    <a
                      href="#"
                      style="padding: 8px; text-decoration: none; color: var(--semantic-text-primary); border-radius: 4px; transition: background 0.2s;"
                      onmouseover="this.style.background='var(--semantic-surface-subtle)'"
                      onmouseout="this.style.background='transparent'"
                    >
                      Dashboard</a
                    >
                    <a
                      href="#"
                      style="padding: 8px; text-decoration: none; color: var(--semantic-text-primary); border-radius: 4px; transition: background 0.2s;"
                      onmouseover="this.style.background='var(--semantic-surface-subtle)'"
                      onmouseout="this.style.background='transparent'"
                    >
                      Settings</a
                    >
                    <a
                      href="#"
                      style="padding: 8px; text-decoration: none; color: var(--semantic-text-primary); border-radius: 4px; transition: background 0.2s;"
                      onmouseover="this.style.background='var(--semantic-surface-subtle)'"
                      onmouseout="this.style.background='transparent'"
                    >
                      Profile</a
                    >
                  </nav>
                </ui-drawer>
              </div>
            }
            @if (exampleTitle() === 'Right Drawer') {
              <div>
                <ui-button (clicked)="drawerRight.set(true)">Open Settings</ui-button>
                <ui-drawer
                  [open]="drawerRight()"
                  title="Settings"
                  position="right"
                  (openChange)="drawerRight.set($event)"
                >
                  <div style="display: flex; flex-direction: column; gap: 16px;">
                    <div>
                      <h4
                        style="margin: 0 0 8px 0; font-size: 14px; color: var(--semantic-text-secondary);"
                      >
                        Appearance
                      </h4>
                      <ui-switch label="Dark Mode" />
                    </div>
                    <div>
                      <h4
                        style="margin: 0 0 8px 0; font-size: 14px; color: var(--semantic-text-secondary);"
                      >
                        Notifications
                      </h4>
                      <ui-switch label="Email Notifications" [checked]="true" />
                      <ui-switch label="Push Notifications" />
                    </div>
                  </div>
                </ui-drawer>
              </div>
            }
            @if (exampleTitle() === 'Top Drawer') {
              <div>
                <ui-button (clicked)="drawerTop.set(true)">Show Notifications</ui-button>
                <ui-drawer
                  [open]="drawerTop()"
                  title="Notifications"
                  position="top"
                  size="sm"
                  (openChange)="drawerTop.set($event)"
                >
                  <div style="display: flex; flex-direction: column; gap: 12px;">
                    <div
                      style="padding: 12px; background: var(--semantic-surface-subtle); border-radius: 6px;"
                    >
                      <strong>New message from John</strong>
                      <p
                        style="margin: 4px 0 0 0; color: var(--semantic-text-secondary); font-size: 14px;"
                      >
                        Hey, are you available for a call?
                      </p>
                    </div>
                    <div
                      style="padding: 12px; background: var(--semantic-surface-subtle); border-radius: 6px;"
                    >
                      <strong>System Update</strong>
                      <p
                        style="margin: 4px 0 0 0; color: var(--semantic-text-secondary); font-size: 14px;"
                      >
                        Your system will update tonight at 2 AM
                      </p>
                    </div>
                    <div
                      style="padding: 12px; background: var(--semantic-surface-subtle); border-radius: 6px;"
                    >
                      <strong>Task completed</strong>
                      <p
                        style="margin: 4px 0 0 0; color: var(--semantic-text-secondary); font-size: 14px;"
                      >
                        Your report has been generated
                      </p>
                    </div>
                  </div>
                </ui-drawer>
              </div>
            }
            @if (exampleTitle() === 'Bottom Drawer') {
              <div>
                <ui-button (clicked)="drawerBottom.set(true)">Show Actions</ui-button>
                <ui-drawer
                  [open]="drawerBottom()"
                  title="Actions"
                  position="bottom"
                  size="sm"
                  (openChange)="drawerBottom.set($event)"
                >
                  <div style="display: flex; flex-direction: column; gap: 8px;">
                    <ui-button [fullWidth]="true"> Edit Item</ui-button>
                    <ui-button [fullWidth]="true" variant="outlined"> Duplicate</ui-button>
                    <ui-button [fullWidth]="true" variant="outlined"> Share</ui-button>
                    <ui-button [fullWidth]="true" variant="outlined"> Delete</ui-button>
                  </div>
                </ui-drawer>
              </div>
            }
            @if (exampleTitle() === 'Drawer with Footer') {
              <div>
                <ui-button (clicked)="drawerWithFooter.set(true)">Edit Profile</ui-button>
                <ui-drawer
                  [open]="drawerWithFooter()"
                  title="Edit Profile"
                  (openChange)="drawerWithFooter.set($event)"
                >
                  <div style="display: flex; flex-direction: column; gap: 16px;">
                    <ui-input label="Full Name" placeholder="John Doe" value="John Doe" />
                    <ui-input
                      label="Email"
                      type="email"
                      placeholder="john@example.com"
                      value="john@example.com"
                    />
                    <ui-input label="Phone" type="tel" placeholder="+1 234 567 8900" />
                    <ui-textarea label="Bio" placeholder="Tell us about yourself..." [rows]="4" />
                  </div>
                  <div footer style="display: flex; gap: 8px; justify-content: flex-end;">
                    <ui-button variant="text" (clicked)="drawerWithFooter.set(false)"
                      >Cancel</ui-button
                    >
                    <ui-button (clicked)="drawerWithFooter.set(false)">Save Changes</ui-button>
                  </div>
                </ui-drawer>
              </div>
            }
            @if (exampleTitle() === 'Drawer Sizes') {
              <div class="demo-row">
                <ui-button size="sm" (clicked)="drawerSmall.set(true)">Small</ui-button>
                <ui-button size="sm" (clicked)="drawerMedium.set(true)">Medium</ui-button>
                <ui-button size="sm" (clicked)="drawerLarge.set(true)">Large</ui-button>

                <ui-drawer
                  [open]="drawerSmall()"
                  title="Small Drawer"
                  size="sm"
                  (openChange)="drawerSmall.set($event)"
                >
                  <p>This is a small drawer (20rem width).</p>
                </ui-drawer>

                <ui-drawer
                  [open]="drawerMedium()"
                  title="Medium Drawer"
                  size="md"
                  (openChange)="drawerMedium.set($event)"
                >
                  <p>This is a medium drawer (28rem width) - the default size.</p>
                </ui-drawer>

                <ui-drawer
                  [open]="drawerLarge()"
                  title="Large Drawer"
                  size="lg"
                  (openChange)="drawerLarge.set($event)"
                >
                  <p>This is a large drawer (36rem width) for more content.</p>
                </ui-drawer>
              </div>
            }
          }

          <!-- POPOVER DEMOS -->
          @case ('popover') {
            @if (exampleTitle() === 'Click Popover') {
              <ui-popover trigger="click">
                <ui-button trigger>Click Me</ui-button>
                <p>Popover content appears on click</p>
              </ui-popover>
            }
            @if (exampleTitle() === 'Hover Popover') {
              <ui-popover trigger="hover">
                <ui-button trigger>Hover over me</ui-button>
                <p>This appears on hover</p>
              </ui-popover>
            }
            @if (exampleTitle() === 'Popover Positions') {
              <div class="demo-row">
                <ui-popover position="top">
                  <ui-button trigger>Top</ui-button>
                  <p>Content above the button</p>
                </ui-popover>
                <ui-popover position="bottom">
                  <ui-button trigger>Bottom</ui-button>
                  <p>Content below the button</p>
                </ui-popover>
                <ui-popover position="left">
                  <ui-button trigger>Left</ui-button>
                  <p>Content to the left</p>
                </ui-popover>
                <ui-popover position="right">
                  <ui-button trigger>Right</ui-button>
                  <p>Content to the right</p>
                </ui-popover>
              </div>
            }
          }

          <!-- PAGINATION DEMOS -->
          @case ('pagination') {
            @if (exampleTitle() === 'Basic Pagination') {
              <ui-pagination
                [totalItems]="100"
                [pageSize]="10"
                [currentPage]="currentPage()"
                (pageChange)="currentPage.set($event)"
              />
            }
            @if (exampleTitle() === 'Large Dataset Pagination') {
              <ui-pagination [totalItems]="1000" [pageSize]="20" [currentPage]="1" />
            }
            @if (exampleTitle() === 'Small Page Size') {
              <ui-pagination [totalItems]="50" [pageSize]="5" [currentPage]="1" />
            }
          }

          <!-- TABLE DEMOS -->
          @case ('table') {
            @if (exampleTitle() === 'Basic Table') {
              <ui-table [columns]="columns()" [data]="users()"> </ui-table>
            }
            @if (exampleTitle() === 'Sortable Table') {
              <ui-table [columns]="sortableColumns()" [data]="users()"> </ui-table>
            }
            @if (exampleTitle() === 'Selectable Table') {
              <ui-table
                [columns]="columns()"
                [data]="users()"
                [selectable]="true"
                (selectionChange)="handleSelectionChange($event)"
              >
              </ui-table>
            }
          }

          <!-- LIST DEMOS -->
          @case ('list') {
            @if (exampleTitle() === 'Simple List') {
              <ui-list [items]="simpleListItems()"></ui-list>
            }
            @if (exampleTitle() === 'Divided List') {
              <ui-list [items]="simpleListItems()" variant="divided"></ui-list>
            }
            @if (exampleTitle() === 'Interactive List') {
              <ui-list [items]="simpleListItems()" [interactive]="true"></ui-list>
            }
          }

          <!-- CAROUSEL DEMOS -->
          @case ('carousel') {
            @if (exampleTitle() === 'Basic Carousel') {
              <ui-carousel class="carousel-demo" ariaLabel="Featured highlights">
                @for (slide of carouselSlides(); track slide.title) {
                  <ui-carousel-slide [label]="slide.title">
                    <article class="carousel-slide-card" [style.--carousel-accent]="slide.accent">
                      <p class="carousel-slide-eyebrow">{{ slide.eyebrow }}</p>
                      <h3 class="carousel-slide-title">{{ slide.title }}</h3>
                      <p class="carousel-slide-description">{{ slide.description }}</p>
                    </article>
                  </ui-carousel-slide>
                }
              </ui-carousel>
            }
            @if (exampleTitle() === 'Fade Transition') {
              <ui-carousel class="carousel-demo" variant="fade" ariaLabel="Fade transition example">
                @for (slide of carouselSlides(); track slide.title) {
                  <ui-carousel-slide [label]="slide.title">
                    <article class="carousel-slide-card" [style.--carousel-accent]="slide.accent">
                      <p class="carousel-slide-eyebrow">{{ slide.eyebrow }}</p>
                      <h3 class="carousel-slide-title">{{ slide.title }}</h3>
                      <p class="carousel-slide-description">{{ slide.description }}</p>
                    </article>
                  </ui-carousel-slide>
                }
              </ui-carousel>
            }
            @if (exampleTitle() === 'Autoplay with Pause Control') {
              <ui-carousel
                class="carousel-demo"
                [autoplay]="true"
                [autoplayDelay]="3500"
                ariaLabel="Autoplaying customer stories"
              >
                @for (slide of carouselSlides(); track slide.title) {
                  <ui-carousel-slide [label]="slide.title">
                    <article class="carousel-slide-card" [style.--carousel-accent]="slide.accent">
                      <p class="carousel-slide-eyebrow">{{ slide.eyebrow }}</p>
                      <h3 class="carousel-slide-title">{{ slide.title }}</h3>
                      <p class="carousel-slide-description">{{ slide.description }}</p>
                    </article>
                  </ui-carousel-slide>
                }
              </ui-carousel>
            }
            @if (exampleTitle() === 'Multiple Visible Slides') {
              <ui-carousel
                class="carousel-demo"
                [visibleSlides]="2"
                ariaLabel="Product cards"
              >
                @for (slide of carouselSlides(); track slide.title) {
                  <ui-carousel-slide [label]="slide.title">
                    <article class="carousel-slide-card carousel-slide-card--compact" [style.--carousel-accent]="slide.accent">
                      <p class="carousel-slide-eyebrow">{{ slide.eyebrow }}</p>
                      <h3 class="carousel-slide-title">{{ slide.title }}</h3>
                      <p class="carousel-slide-description">{{ slide.description }}</p>
                      <p class="carousel-slide-metric">{{ slide.metric }}</p>
                    </article>
                  </ui-carousel-slide>
                }
              </ui-carousel>
            }
            @if (exampleTitle() === 'Thumbnail Navigation') {
              <ui-carousel class="carousel-demo" [showThumbnails]="true" ariaLabel="Release highlights">
                @for (slide of carouselSlides(); track slide.title) {
                  <ui-carousel-slide [label]="slide.title" [thumbnail]="slide.thumbnail" [thumbnailAlt]="slide.title">
                    <article class="carousel-slide-card" [style.--carousel-accent]="slide.accent">
                      <p class="carousel-slide-eyebrow">{{ slide.eyebrow }}</p>
                      <h3 class="carousel-slide-title">{{ slide.title }}</h3>
                      <p class="carousel-slide-description">{{ slide.description }}</p>
                    </article>
                  </ui-carousel-slide>
                }
              </ui-carousel>
            }
            @if (exampleTitle() === 'No Loop') {
              <ui-carousel class="carousel-demo" [loop]="false" ariaLabel="Non-looping updates">
                @for (slide of carouselSlides(); track slide.title) {
                  <ui-carousel-slide [label]="slide.title">
                    <article class="carousel-slide-card" [style.--carousel-accent]="slide.accent">
                      <p class="carousel-slide-eyebrow">{{ slide.eyebrow }}</p>
                      <h3 class="carousel-slide-title">{{ slide.title }}</h3>
                      <p class="carousel-slide-description">{{ slide.description }}</p>
                    </article>
                  </ui-carousel-slide>
                }
              </ui-carousel>
            }
          }

          <!-- CODE BLOCK DEMOS -->
          @case ('code-block') {
            @if (exampleTitle() === 'Basic Code Block') {
              <ui-code-block [code]="typescriptCode()" language="typescript" title="TypeScript" />
            }
            @if (exampleTitle() === 'HTML Code') {
              <ui-code-block [code]="htmlCode()" language="html" title="HTML" />
            }
            @if (exampleTitle() === 'CSS Code') {
              <ui-code-block [code]="cssCode()" language="css" title="CSS" />
            }
            @if (exampleTitle() === 'JSON Data') {
              <ui-code-block [code]="jsonCode()" language="json" title="Configuration" />
            }
            @if (exampleTitle() === 'Custom Filename') {
              <ui-code-block
                [code]="componentCode()"
                language="typescript"
                title="Component"
                filename="example.component.ts"
              />
            }
          }

          <!-- TOAST DEMOS -->
          @case ('toast') {
            @if (exampleTitle() === 'Toast Variants') {
              <div class="demo-column">
                <ui-button (clicked)="showToast('info')">Show Info Toast</ui-button>
                <ui-button (clicked)="showToast('success')">Show Success Toast</ui-button>
                <ui-button (clicked)="showToast('warning')">Show Warning Toast</ui-button>
                <ui-button (clicked)="showToast('error')">Show Error Toast</ui-button>
              </div>
            }
            @if (exampleTitle() === 'Custom Duration Toast') {
              <ui-button (clicked)="showLongToast()">Show Toast (5s)</ui-button>
            }
            @if (exampleTitle() === 'Action Feedback') {
              <ui-button (clicked)="showActionToast()">Save Changes</ui-button>
            }
          }

          <!-- BREADCRUMB DEMOS -->
          @case ('breadcrumb') {
            @if (exampleTitle() === 'Basic Breadcrumb') {
              <ui-breadcrumb [items]="breadcrumbs()"></ui-breadcrumb>
            }
            @if (exampleTitle() === 'Custom Separator') {
              <ui-breadcrumb [items]="breadcrumbs()" separator=">"></ui-breadcrumb>
            }
          }

          <!-- MENU DEMOS -->
          @case ('menu') {
            @if (exampleTitle() === 'Basic Dropdown Menu') {
              <ui-menu [items]="menuItems()">
                <ui-button trigger>Open Menu</ui-button>
              </ui-menu>
            }
            @if (exampleTitle() === 'Nested Menu') {
              <ui-menu [items]="nestedMenuItems()">
                <ui-button trigger>Actions ▾</ui-button>
              </ui-menu>
            }
          }

          <!-- CONTEXT MENU DEMOS -->
          @case ('context-menu') {
            @if (exampleTitle() === 'Basic Context Menu') {
              <ui-context-menu
                [items]="contextMenuItems()"
                (itemClick)="handleContextMenuClick($event)"
              >
                <div class="context-menu-demo-area">
                  <p
                    style="text-align: center; padding: 3rem 2rem; color: var(--semantic-text-secondary);"
                  >
                    Right-click anywhere in this area<br />
                    to open the context menu
                  </p>
                </div>
              </ui-context-menu>
            }
            @if (exampleTitle() === 'File Explorer Context Menu') {
              <ui-context-menu
                [items]="fileContextMenuItems()"
                (itemClick)="handleContextMenuClick($event)"
              >
                <div class="file-item-demo">
                  <div class="file-icon">📄</div>
                  <span class="file-name">document.pdf</span>
                  <span class="file-hint">Right-click for options</span>
                </div>
              </ui-context-menu>
            }
            @if (exampleTitle() === 'Text Editor Context Menu') {
              <ui-context-menu
                [items]="editorContextMenuItems()"
                (itemClick)="handleContextMenuClick($event)"
              >
                <textarea class="editor-demo" placeholder="Right-click to format text...">
Sample text for editing</textarea
                >
              </ui-context-menu>
            }
          }

          <!-- NAVBAR DEMOS -->
          @case ('navbar') {
            @if (exampleTitle() === 'Basic Navbar') {
              <ui-navbar [links]="navLinks()"></ui-navbar>
            }
            @if (exampleTitle() === 'Sticky Navbar') {
              <ui-navbar [links]="navLinks()" variant="sticky"></ui-navbar>
            }
          }

          <!-- STEPPER DEMOS -->
          @case ('stepper') {
            @if (exampleTitle() === 'Horizontal Stepper') {
              <ui-stepper [steps]="steps()" [activeStep]="currentStep()" orientation="horizontal">
              </ui-stepper>
            }
            @if (exampleTitle() === 'Vertical Stepper') {
              <ui-stepper [steps]="steps()" [activeStep]="currentStep()" orientation="vertical">
              </ui-stepper>
            }
            @if (exampleTitle() === 'Form Wizard') {
              <ui-stepper [steps]="steps()" [activeStep]="currentStep()"> </ui-stepper>
            }
          }

          @default {
            <div class="demo-placeholder">
              <p>Live demo coming soon for this example</p>
            </div>
          }
        }
      </div>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
        width: 100%;
      }

      .component-demo {
        width: 100%;
      }

      .demo-container {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
      }

      .demo-row {
        display: flex;
        gap: var(--primitive-spacing-4);
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
      }

      .demo-column {
        display: flex;
        flex-direction: column;
        gap: var(--primitive-spacing-3);
        align-items: flex-start;
      }

      .demo-placeholder {
        text-align: center;
        color: var(--semantic-text-tertiary);
        font-style: italic;
        padding: var(--primitive-spacing-6);
      }

      /* Ensure components have appropriate sizing */
      :host ::ng-deep ui-input,
      :host ::ng-deep ui-textarea,
      :host ::ng-deep ui-select,
      :host ::ng-deep ui-multi-select,
      :host ::ng-deep ui-slider {
        width: 100%;
        max-width: 400px;
      }

      :host ::ng-deep ui-card {
        width: 100%;
        max-width: 500px;
      }

      :host ::ng-deep ui-alert {
        width: 100%;
        max-width: 600px;
      }

      :host ::ng-deep ui-stack,
      :host ::ng-deep ui-grid {
        width: 100%;
        max-width: 600px;
      }

      :host ::ng-deep ui-carousel {
        width: 100%;
        max-width: 720px;
      }

      .carousel-demo {
        width: 100%;
      }

      .carousel-slide-card {
        display: grid;
        align-content: end;
        gap: var(--primitive-spacing-3);
        min-height: 18rem;
        padding: var(--primitive-spacing-6);
        background:
          linear-gradient(145deg, color-mix(in srgb, var(--carousel-accent) 22%, white), transparent 70%),
          linear-gradient(180deg, var(--semantic-surface-card), color-mix(in srgb, var(--carousel-accent) 12%, var(--semantic-surface-background-secondary)));
        color: var(--semantic-text-primary);
      }

      .carousel-slide-card--compact {
        min-height: 16rem;
        border-right: 1px solid var(--semantic-border-subtle);
      }

      .carousel-slide-eyebrow {
        margin: 0;
        color: var(--semantic-text-secondary);
        font-size: var(--primitive-font-size-sm);
        text-transform: uppercase;
        letter-spacing: 0.08em;
      }

      .carousel-slide-title {
        margin: 0;
        font-size: clamp(1.5rem, 2.5vw, 2.25rem);
        line-height: 1.1;
      }

      .carousel-slide-description {
        margin: 0;
        max-width: 42ch;
        color: var(--semantic-text-secondary);
      }

      .carousel-slide-metric {
        margin: 0;
        color: var(--semantic-brand-primary);
        font-weight: var(--primitive-font-weight-semibold);
      }

      /* Context menu demo styles */
      .context-menu-demo-area {
        min-height: 200px;
        width: 100%;
        max-width: 500px;
        border: 2px dashed var(--semantic-border-default);
        border-radius: var(--primitive-border-radius-md);
        background-color: var(--semantic-surface-subtle);
        cursor: context-menu;
        transition: all 0.2s ease;
      }

      .context-menu-demo-area:hover {
        border-color: var(--semantic-brand-primary);
        background-color: var(--semantic-surface-card);
      }

      .file-item-demo {
        display: flex;
        align-items: center;
        gap: var(--primitive-spacing-3);
        padding: var(--primitive-spacing-4);
        border: 1px solid var(--semantic-border-default);
        border-radius: var(--primitive-border-radius-md);
        background-color: var(--semantic-surface-card);
        cursor: context-menu;
        max-width: 400px;
        transition: all 0.2s ease;
      }

      .file-item-demo:hover {
        background-color: var(--semantic-surface-subtle);
        border-color: var(--semantic-brand-primary);
      }

      .file-icon {
        font-size: 2rem;
      }

      .file-name {
        flex: 1;
        font-weight: var(--primitive-font-weight-medium);
        color: var(--semantic-text-primary);
      }

      .file-hint {
        font-size: var(--primitive-font-size-xs);
        color: var(--semantic-text-tertiary);
        font-style: italic;
      }

      .editor-demo {
        width: 100%;
        max-width: 500px;
        min-height: 150px;
        padding: var(--primitive-spacing-4);
        border: 1px solid var(--semantic-border-default);
        border-radius: var(--primitive-border-radius-md);
        background-color: var(--semantic-surface-card);
        color: var(--semantic-text-primary);
        font-family: var(--primitive-font-family-mono);
        font-size: var(--primitive-font-size-sm);
        resize: vertical;
        cursor: text;
      }

      .editor-demo:focus {
        outline: 2px solid var(--semantic-state-focus-ring);
        outline-offset: 2px;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComponentDemoComponent {
  /**
   * Component ID to determine which demo to show
   */
  readonly componentId = input.required<string>();

  /**
   * Example title to determine which specific example to show
   */
  readonly exampleTitle = input.required<string>();

  /**
   * Loading state for button demos
   */
  protected readonly isLoading = signal(false);

  /**
   * Sample select options
   */
  protected readonly sampleOptions = signal<SelectOption[]>([
    { value: 'us', label: 'United States' },
    { value: 'uk', label: 'United Kingdom' },
    { value: 'ca', label: 'Canada' },
  ]);

  /**
   * Priority options for select
   */
  protected readonly priorityOptions = signal<SelectOption[]>([
    { value: 'low', label: 'Low' },
    { value: 'medium', label: 'Medium' },
    { value: 'high', label: 'High' },
  ]);

  /**
   * Skill options for multi-select
   */
  protected readonly skillOptions = signal<SelectOption[]>([
    { value: 'js', label: 'JavaScript' },
    { value: 'ts', label: 'TypeScript' },
    { value: 'angular', label: 'Angular' },
    { value: 'react', label: 'React' },
    { value: 'vue', label: 'Vue' },
  ]);

  /**
   * Modal open state
   */
  protected readonly isOpen = signal(false);

  /**
   * Drawer open states for different positions
   */
  protected readonly drawerLeft = signal(false);
  protected readonly drawerRight = signal(false);
  protected readonly drawerTop = signal(false);
  protected readonly drawerBottom = signal(false);
  protected readonly drawerWithFooter = signal(false);

  /**
   * Drawer size demo states
   */
  protected readonly drawerSmall = signal(false);
  protected readonly drawerMedium = signal(false);
  protected readonly drawerLarge = signal(false);

  /**
   * Current pagination page
   */
  protected readonly currentPage = signal(1);

  /**
   * Radio button states (PrimeNG-style model binding)
   */
  protected readonly selectedPlan = signal<string | undefined>(undefined);
  protected readonly selectedSize = signal<string>('md'); // Pre-selected
  protected readonly selectedShipping = signal<string | undefined>(undefined);
  protected readonly selectedPayment = signal<string>('card'); // Pre-selected

  /**
   * Table columns definition
   */
  protected readonly columns = signal([
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'role', label: 'Role' },
  ]);

  /**
   * Sortable table columns definition
   */
  protected readonly sortableColumns = signal([
    { key: 'name', label: 'Name', sortable: true },
    { key: 'email', label: 'Email', sortable: true },
    { key: 'role', label: 'Role', sortable: true },
  ]);

  /**
   * Table data (users)
   */
  protected readonly users = signal([
    { name: 'John Doe', email: 'john@example.com', role: 'Admin' },
    { name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
    { name: 'Bob Johnson', email: 'bob@example.com', role: 'User' },
  ]);

  /**
   * Simple list items
   */
  protected readonly simpleListItems = signal([
    { id: 1, label: 'First item' },
    { id: 2, label: 'Second item' },
    { id: 3, label: 'Third item' },
  ]);

  /**
   * Sample carousel slides.
   */
  protected readonly carouselSlides = signal([
    {
      eyebrow: 'Accessibility',
      title: 'Built for keyboard-first navigation',
      description: 'Arrow keys, Home, End, focus visibility, autoplay pause, and reduced-motion support are built in.',
      metric: 'WCAG 2.1 AA aligned',
      accent: '#0f766e',
      thumbnail: 'A11y',
    },
    {
      eyebrow: 'Composition',
      title: 'Project any semantic slide content',
      description: 'Slides accept native media, cards, marketing content, or custom layouts without a rigid slide data schema.',
      metric: 'Content-first API',
      accent: '#c2410c',
      thumbnail: 'API',
    },
    {
      eyebrow: 'Theming',
      title: 'Tokens drive every visual state',
      description: 'Controls, indicators, thumbnails, and surfaces inherit primitive and semantic token values from the active theme.',
      metric: 'Theme-aware by default',
      accent: '#1d4ed8',
      thumbnail: 'Theme',
    },
    {
      eyebrow: 'Responsive',
      title: 'Single-slide or multi-slide layouts',
      description: 'Use one visible slide for hero content or increase visibleSlides to preview adjacent content collections.',
      metric: 'Adaptive layouts',
      accent: '#7c3aed',
      thumbnail: 'Grid',
    },
  ]);

  /**
   * Code Block Examples
   */
  protected readonly typescriptCode = signal(`function greet(name: string): string {
  return \`Hello, \${name}!\`;
}`);

  protected readonly htmlCode = signal(`<ui-button variant="filled" size="md">
  Click Me
</ui-button>`);

  protected readonly cssCode = signal(`.button {
  padding: 10px 20px;
  border-radius: 4px;
  background-color: #007bff;
  color: white;
}`);

  protected readonly jsonCode = signal(`{
  "name": "UI Component Suite",
  "version": "1.0.0",
  "author": "Your Team"
}`);

  protected readonly componentCode = signal(`@Component({
  selector: 'app-example',
  template: '<div>Example</div>'
})
export class ExampleComponent {}`);

  /**
   * Breadcrumb items
   */
  protected readonly breadcrumbs = signal([
    { label: 'Home', url: '/' },
    { label: 'Products', url: '/products' },
    { label: 'Electronics', url: '/products/electronics' },
  ]);

  /**
   * Menu items for dropdown
   */
  protected readonly menuItems = signal([
    { id: 'item1', label: 'Menu Item 1' },
    { id: 'item2', label: 'Menu Item 2' },
    { id: 'item3', label: 'Menu Item 3' },
  ]);

  /**
   * Nested menu items
   */
  protected readonly nestedMenuItems = signal([
    { id: 'item1', label: 'Item 1' },
    {
      id: 'item2',
      label: 'Item 2',
      submenu: [
        { id: 'sub1', label: 'Subitem 1' },
        { id: 'sub2', label: 'Subitem 2' },
      ],
    },
  ]);

  /**
   * Navigation links for navbar
   */
  protected readonly navLinks = signal([
    { id: 'home', label: 'Home', href: '/' },
    { id: 'about', label: 'About', href: '/about' },
    { id: 'contact', label: 'Contact', href: '/contact' },
  ]);

  /**
   * Context menu items - basic
   */
  protected readonly contextMenuItems = signal([
    { id: 'cut', label: 'Cut', shortcut: 'Ctrl+X' },
    { id: 'copy', label: 'Copy', shortcut: 'Ctrl+C' },
    { id: 'paste', label: 'Paste', shortcut: 'Ctrl+V' },
    { id: 'divider-1', label: '', divider: true },
    { id: 'delete', label: 'Delete', shortcut: 'Del' },
  ]);

  /**
   * Context menu items - file explorer
   */
  protected readonly fileContextMenuItems = signal([
    { id: 'open', label: 'Open', shortcut: 'Enter' },
    {
      id: 'open-with',
      label: 'Open With',
      submenu: [
        { id: 'notepad', label: 'Notepad' },
        { id: 'vscode', label: 'VS Code' },
        { id: 'other', label: 'Choose another app...' },
      ],
    },
    { id: 'divider-1', label: '', divider: true },
    { id: 'cut', label: 'Cut', shortcut: 'Ctrl+X' },
    { id: 'copy', label: 'Copy', shortcut: 'Ctrl+C' },
    { id: 'paste', label: 'Paste', shortcut: 'Ctrl+V', disabled: true },
    { id: 'divider-2', label: '', divider: true },
    { id: 'rename', label: 'Rename', shortcut: 'F2' },
    { id: 'delete', label: 'Delete', shortcut: 'Del' },
    { id: 'divider-3', label: '', divider: true },
    { id: 'properties', label: 'Properties', shortcut: 'Alt+Enter' },
  ]);

  /**
   * Context menu items - text editor
   */
  protected readonly editorContextMenuItems = signal([
    { id: 'cut', label: 'Cut', shortcut: 'Ctrl+X' },
    { id: 'copy', label: 'Copy', shortcut: 'Ctrl+C' },
    { id: 'paste', label: 'Paste', shortcut: 'Ctrl+V' },
    { id: 'divider-1', label: '', divider: true },
    { id: 'select-all', label: 'Select All', shortcut: 'Ctrl+A' },
    { id: 'divider-2', label: '', divider: true },
    {
      id: 'format',
      label: 'Format',
      submenu: [
        { id: 'bold', label: 'Bold', shortcut: 'Ctrl+B' },
        { id: 'italic', label: 'Italic', shortcut: 'Ctrl+I' },
        { id: 'underline', label: 'Underline', shortcut: 'Ctrl+U' },
      ],
    },
  ]);

  /**
   * Stepper steps
   */
  protected readonly steps = signal([
    { id: 'step1', label: 'Personal Info', description: 'Enter your details' },
    { id: 'step2', label: 'Address', description: 'Enter your address' },
    { id: 'step3', label: 'Review', description: 'Review and submit' },
  ]);

  /**
   * Current stepper step
   */
  protected readonly currentStep = signal(0);

  /**
   * Handle loading demo button click
   */
  protected handleLoadingDemo(): void {
    this.isLoading.set(true);
    setTimeout(() => {
      this.isLoading.set(false);
    }, 2000);
  }

  /**
   * Toast service
   */
  private readonly toastService = inject(ToastService);

  /**
   * Show toast notification
   */
  protected showToast(variant: 'info' | 'success' | 'warning' | 'error'): void {
    const messages = {
      info: 'This is an informational message',
      success: 'Success! Operation completed',
      warning: 'Warning: Please check your input',
      error: 'Error: Something went wrong',
    };
    this.toastService.show(messages[variant], variant);
  }

  /**
   * Show custom duration toast
   */
  protected showLongToast(): void {
    this.toastService.show('This message stays longer', 'info', 5000);
  }

  /**
   * Show action feedback toast
   */
  protected showActionToast(): void {
    this.toastService.success('Changes saved successfully');
  }

  /**
   * Handle table selection change
   */
  protected handleSelectionChange(selectedIndices: number[]): void {
    console.log('Selected rows:', selectedIndices);
    this.toastService.info(`${selectedIndices.length} row(s) selected`);
  }

  /**
   * Handle context menu item click
   */
  protected handleContextMenuClick(item: any): void {
    console.log('Context menu item clicked:', item);
    this.toastService.info(`Action: ${item.label}`);
  }
}
