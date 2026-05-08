/**
 * Component Demo Viewer
 * Displays live interactive examples of components based on component ID and example data
 */

import { ChangeDetectionStrategy, Component, input, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService } from '@mfontecchio/components';
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
} from '@mfontecchio/components';

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
              <fui-button>Click Me</fui-button>
            }
            @if (exampleTitle() === 'Button Variants') {
              <div class="demo-row">
                <fui-button variant="filled">Filled</fui-button>
                <fui-button variant="outlined">Outlined</fui-button>
                <fui-button variant="text">Text</fui-button>
              </div>
            }
            @if (exampleTitle() === 'Button Sizes') {
              <div class="demo-row">
                <fui-button size="sm">Small</fui-button>
                <fui-button size="md">Medium</fui-button>
                <fui-button size="lg">Large</fui-button>
              </div>
            }
            @if (exampleTitle() === 'Disabled State') {
              <fui-button [disabled]="true">Disabled Button</fui-button>
            }
            @if (exampleTitle() === 'Loading State') {
              <fui-button [loading]="true">Loading...</fui-button>
            }
            @if (exampleTitle() === 'Full Width') {
              <fui-button [fullWidth]="true">Full Width Button</fui-button>
            }
          }

          <!-- INPUT DEMOS -->
          @case ('input') {
            @if (exampleTitle() === 'Basic Input') {
              <fui-input label="Email" placeholder="Enter your email" />
            }
            @if (exampleTitle() === 'Input Types') {
              <div class="demo-column">
                <fui-input type="email" label="Email" placeholder="email@example.com" />
                <fui-input type="password" label="Password" placeholder="Enter password" />
                <fui-input type="number" label="Age" placeholder="Enter age" />
                <fui-input type="tel" label="Phone" placeholder="(123) 456-7890" />
              </div>
            }
            @if (exampleTitle() === 'Input with Prefix Icon') {
              <fui-input label="Search" placeholder="Search..." prefixIcon="🔍" />
            }
            @if (exampleTitle() === 'Input with Suffix Icon') {
              <fui-input
                label="Password"
                type="password"
                placeholder="Enter password"
                suffixIcon="👁️"
              />
            }
            @if (exampleTitle() === 'Input with Custom Affixes') {
              <fui-input
                label="Website"
                placeholder="your-site"
                helperText="Projected prefix and suffix content stay inside the field."
              >
                <span prefix>https://</span>
                <span suffix>.com</span>
              </fui-input>
            }
            @if (exampleTitle() === 'Password Reveal Toggle') {
              <fui-input
                label="Password"
                type="password"
                placeholder="Enter password"
                [showPasswordToggle]="true"
              />
            }
            @if (exampleTitle() === 'Input with Error') {
              <fui-input
                label="Email"
                value="invalid-email"
                errorMessage="Please enter a valid email address"
              />
            }
            @if (exampleTitle() === 'Input with Helper Text') {
              <fui-input
                label="Username"
                placeholder="Enter username"
                helperText="Must be 3-20 characters, letters and numbers only"
              />
            }
            @if (exampleTitle() === 'Disabled Input') {
              <fui-input label="Email" value="user@example.com" [disabled]="true" />
            }
            @if (exampleTitle() === 'Required Input') {
              <fui-input label="Email" placeholder="Enter your email" [required]="true" />
            }
          }

          <!-- TEXTAREA DEMOS -->
          @case ('textarea') {
            @if (exampleTitle() === 'Basic Textarea') {
              <fui-textarea label="Description" placeholder="Enter description..." />
            }
            @if (exampleTitle() === 'Textarea with Rows') {
              <fui-textarea label="Comments" placeholder="Enter your comments..." [rows]="5" />
            }
            @if (exampleTitle() === 'Textarea with Character Limit') {
              <fui-textarea
                label="Bio"
                placeholder="Tell us about yourself..."
                [maxLength]="200"
                [showCharacterCount]="true"
              />
            }
            @if (exampleTitle() === 'Textarea with Helper Text') {
              <fui-textarea
                label="Feedback"
                placeholder="Share your thoughts..."
                helperText="Your feedback helps us improve."
              />
            }
            @if (exampleTitle() === 'Textarea with Error') {
              <fui-textarea
                label="Message"
                placeholder="Enter message..."
                errorMessage="Message is required"
              />
            }
            @if (exampleTitle() === 'Required Textarea') {
              <fui-textarea
                label="Required Field"
                placeholder="This field is required..."
                [required]="true"
              />
            }
            @if (exampleTitle() === 'Disabled Textarea') {
              <fui-textarea
                label="Readonly Content"
                value="This content cannot be edited."
                [disabled]="true"
              />
            }
          }

          <!-- CHECKBOX DEMOS -->
          @case ('checkbox') {
            @if (exampleTitle() === 'Basic Checkbox') {
              <fui-checkbox label="Accept terms and conditions" />
            }
            @if (exampleTitle() === 'Checkbox States') {
              <div class="demo-column">
                <fui-checkbox label="Unchecked" [checked]="false" />
                <fui-checkbox label="Checked" [checked]="true" />
                <fui-checkbox label="Indeterminate" [indeterminate]="true" />
              </div>
            }
            @if (exampleTitle() === 'Disabled Checkbox') {
              <div class="demo-column">
                <fui-checkbox label="Disabled unchecked" [disabled]="true" />
                <fui-checkbox label="Disabled checked" [checked]="true" [disabled]="true" />
              </div>
            }
            @if (exampleTitle() === 'Checkbox Group') {
              <div class="demo-column">
                <fui-checkbox label="JavaScript" />
                <fui-checkbox label="TypeScript" />
                <fui-checkbox label="Angular" />
              </div>
            }
          }

          <!-- RADIO DEMOS -->
          @case ('radio') {
            @if (exampleTitle() === 'Basic Radio Group') {
              <div class="demo-column">
                <fui-radio
                  name="plan"
                  value="free"
                  label="Free Plan"
                  [(selectedValue)]="selectedPlan"
                />
                <fui-radio
                  name="plan"
                  value="pro"
                  label="Pro Plan"
                  [(selectedValue)]="selectedPlan"
                />
                <fui-radio
                  name="plan"
                  value="enterprise"
                  label="Enterprise Plan"
                  [(selectedValue)]="selectedPlan"
                />
              </div>
            }
            @if (exampleTitle() === 'Radio with Pre-selection') {
              <div class="demo-column">
                <fui-radio name="size" value="sm" label="Small" [(selectedValue)]="selectedSize" />
                <fui-radio name="size" value="md" label="Medium" [(selectedValue)]="selectedSize" />
                <fui-radio name="size" value="lg" label="Large" [(selectedValue)]="selectedSize" />
              </div>
            }
            @if (exampleTitle() === 'Disabled Radio Options') {
              <div class="demo-column">
                <fui-radio
                  name="shipping"
                  value="standard"
                  label="Standard (5-7 days)"
                  [(selectedValue)]="selectedShipping"
                />
                <fui-radio
                  name="shipping"
                  value="express"
                  label="Express (2-3 days)"
                  [(selectedValue)]="selectedShipping"
                />
                <fui-radio
                  name="shipping"
                  value="overnight"
                  label="Overnight"
                  [disabled]="true"
                  [(selectedValue)]="selectedShipping"
                />
              </div>
            }
            @if (exampleTitle() === 'Radio States') {
              <div class="demo-column">
                <fui-radio name="state1" value="unchecked" label="Unchecked" />
                <fui-radio
                  name="state2"
                  value="disabled-unchecked"
                  label="Disabled Unchecked"
                  [disabled]="true"
                />
                <fui-radio
                  name="state3"
                  value="disabled-checked"
                  label="Disabled"
                  [disabled]="true"
                />
              </div>
            }
            @if (exampleTitle() === 'Payment Method Selection') {
              <div class="demo-column">
                <fui-radio
                  name="payment"
                  value="card"
                  label="Credit/Debit Card"
                  [(selectedValue)]="selectedPayment"
                />
                <fui-radio
                  name="payment"
                  value="paypal"
                  label="PayPal"
                  [(selectedValue)]="selectedPayment"
                />
                <fui-radio
                  name="payment"
                  value="bank"
                  label="Bank Transfer"
                  [(selectedValue)]="selectedPayment"
                />
              </div>
            }
          }

          <!-- SWITCH DEMOS -->
          @case ('switch') {
            @if (exampleTitle() === 'Basic Switch') {
              <fui-switch label="Enable notifications" />
            }
            @if (exampleTitle() === 'Switch States') {
              <div class="demo-column">
                <fui-switch label="Off" [checked]="false" />
                <fui-switch label="On" [checked]="true" />
              </div>
            }
            @if (exampleTitle() === 'Switch Sizes') {
              <div class="demo-column">
                <fui-switch label="Small" size="sm" />
                <fui-switch label="Medium" size="md" />
                <fui-switch label="Large" size="lg" />
              </div>
            }
            @if (exampleTitle() === 'Disabled Switch') {
              <div class="demo-column">
                <fui-switch label="Disabled off" [disabled]="true" />
                <fui-switch label="Disabled on" [checked]="true" [disabled]="true" />
              </div>
            }
          }

          <!-- SELECT DEMOS -->
          @case ('select') {
            @if (exampleTitle() === 'Basic Select') {
              <fui-select
                label="Country"
                [options]="sampleOptions()"
                placeholder="Select country"
              />
            }
            @if (exampleTitle() === 'Select with Pre-selection') {
              <fui-select label="Country" [options]="sampleOptions()" value="us" />
            }
            @if (exampleTitle() === 'Required Select') {
              <fui-select
                label="Priority"
                [options]="priorityOptions()"
                [required]="true"
                placeholder="Select priority"
              />
            }
            @if (exampleTitle() === 'Select with Error') {
              <fui-select
                label="Country"
                [options]="sampleOptions()"
                placeholder="Select country"
                errorMessage="Country is required"
              />
            }
            @if (exampleTitle() === 'Disabled Select') {
              <fui-select
                label="Country"
                [options]="sampleOptions()"
                value="us"
                [disabled]="true"
              />
            }
          }

          <!-- MULTI-SELECT DEMOS -->
          @case ('multi-select') {
            @if (exampleTitle() === 'Basic Multi-Select') {
              <fui-multi-select
                label="Skills"
                [options]="skillOptions()"
                placeholder="Select your skills"
              />
            }
            @if (exampleTitle() === 'Multi-Select with Pre-selection') {
              <fui-multi-select label="Skills" [options]="skillOptions()" [value]="['js', 'ts']" />
            }
            @if (exampleTitle() === 'Disabled Multi-Select') {
              <fui-multi-select
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
              <fui-slider label="Volume" [min]="0" [max]="100" [value]="50" />
            }
            @if (exampleTitle() === 'Slider with Steps') {
              <fui-slider label="Rating" [min]="0" [max]="10" [step]="2" [value]="6" />
            }
            @if (exampleTitle() === 'Range Slider') {
              <fui-slider
                label="Price Range"
                [min]="0"
                [max]="1000"
                [rangeValue]="priceRange()"
                (rangeValueChange)="priceRange.set($event)"
              />
            }
            @if (exampleTitle() === 'Disabled Slider') {
              <fui-slider label="Volume" [min]="0" [max]="100" [value]="75" [disabled]="true" />
            }
          }

          <!-- DATE PICKER DEMOS -->
          @case ('date-picker') {
            @if (exampleTitle() === 'Basic Date Picker') {
              <fui-date-picker label="Birth Date" placeholder="Select your birth date" />
            }
            @if (exampleTitle() === 'Date Picker with Pre-selected Date') {
              <fui-date-picker
                label="Appointment Date"
                placeholder="Select date"
                value="2024-12-15"
              />
            }
            @if (exampleTitle() === 'Date Picker with Date Range') {
              <fui-date-picker
                label="Start Date"
                placeholder="Select start date"
                min="2024-01-01"
                max="2024-12-31"
                helperText="Must be within 2024"
              />
            }
            @if (exampleTitle() === 'Required Date Picker') {
              <fui-date-picker
                label="Event Date"
                placeholder="Select date"
                [required]="true"
                helperText="This field is required"
              />
            }
            @if (exampleTitle() === 'Date Picker with Error') {
              <fui-date-picker
                label="Expiry Date"
                placeholder="Select expiry date"
                errorMessage="Please select a valid expiry date"
              />
            }
            @if (exampleTitle() === 'Disabled Date Picker') {
              <fui-date-picker
                label="Locked Date"
                placeholder="Not available"
                value="2024-01-15"
                [disabled]="true"
              />
            }
            @if (exampleTitle() === 'Booking Form') {
              <div class="demo-column">
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
              </div>
            }
          }

          <!-- FILE UPLOAD DEMOS -->
          @case ('file-upload') {
            @if (exampleTitle() === 'Basic File Upload') {
              <fui-file-upload label="Upload File" helperText="Choose a file to upload" />
            }
            @if (exampleTitle() === 'Multiple File Upload') {
              <fui-file-upload
                label="Upload Documents"
                [multiple]="true"
                helperText="You can select multiple files"
              />
            }
            @if (exampleTitle() === 'File Type Restrictions') {
              <fui-file-upload
                label="Upload PDF Documents"
                accept=".pdf"
                helperText="Only PDF files are accepted"
              />
            }
            @if (exampleTitle() === 'Image Upload') {
              <fui-file-upload
                label="Upload Images"
                accept="image/*"
                [multiple]="true"
                helperText="Supports JPG, PNG, GIF, and WebP"
              />
            }
            @if (exampleTitle() === 'File Size Limit') {
              <fui-file-upload
                label="Upload Profile Picture"
                accept="image/*"
                [maxSize]="2097152"
                helperText="Maximum file size: 2MB"
              />
            }
            @if (exampleTitle() === 'File Upload with Error') {
              <fui-file-upload
                label="Upload Resume"
                accept=".pdf,.doc,.docx"
                errorMessage="File size exceeds the maximum limit of 10MB"
                helperText="Please upload your resume (PDF or Word)"
              />
            }
            @if (exampleTitle() === 'Disabled Upload') {
              <fui-file-upload
                label="Upload Disabled"
                [disabled]="true"
                helperText="File upload is currently disabled"
              />
            }
            @if (exampleTitle() === 'Document Upload Form') {
              <div class="demo-column">
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
              </div>
            }
          }

          <!-- CARD DEMOS -->
          @case ('card') {
            @if (exampleTitle() === 'Basic Card') {
              <fui-card>
                <h3>Card Title</h3>
                <p>Card content goes here...</p>
              </fui-card>
            }
            @if (exampleTitle() === 'Card Variants') {
              <div class="demo-column">
                <fui-card variant="elevated">
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
                </fui-card>
              </div>
            }
          }

          <!-- ALERT DEMOS -->
          @case ('alert') {
            @if (exampleTitle() === 'Alert Variants') {
              <div class="demo-column">
                <fui-alert variant="info"> This is an informational message. </fui-alert>
                <fui-alert variant="success"> Operation completed successfully! </fui-alert>
                <fui-alert variant="warning"> Please review your input carefully. </fui-alert>
                <fui-alert variant="error"> An error occurred. Please try again. </fui-alert>
              </div>
            }
            @if (exampleTitle() === 'Dismissible Alert') {
              <fui-alert variant="info" [dismissible]="true">
                You can close this alert by clicking the X button.
              </fui-alert>
            }
            @if (exampleTitle() === 'Alert Sizes') {
              <div class="demo-column">
                <fui-alert variant="info" size="sm">Small alert message</fui-alert>
                <fui-alert variant="info" size="md">Medium alert message</fui-alert>
                <fui-alert variant="info" size="lg">Large alert message</fui-alert>
              </div>
            }
          }

          <!-- BADGE DEMOS -->
          @case ('badge') {
            @if (exampleTitle() === 'Badge Variants') {
              <div class="demo-row">
                <fui-badge variant="default">Default</fui-badge>
                <fui-badge variant="primary">Primary</fui-badge>
                <fui-badge variant="success">Success</fui-badge>
                <fui-badge variant="warning">Warning</fui-badge>
                <fui-badge variant="error">Error</fui-badge>
              </div>
            }
            @if (exampleTitle() === 'Badge Sizes') {
              <div class="demo-row">
                <fui-badge size="sm">Small</fui-badge>
                <fui-badge size="md">Medium</fui-badge>
                <fui-badge size="lg">Large</fui-badge>
              </div>
            }
            @if (exampleTitle() === 'Status Indicators') {
              <div class="demo-row">
                <fui-badge variant="success">Active</fui-badge>
                <fui-badge variant="warning">Pending</fui-badge>
                <fui-badge variant="error">Inactive</fui-badge>
              </div>
            }
            @if (exampleTitle() === 'Count Badges') {
              <div class="demo-row">
                <fui-badge variant="primary">5</fui-badge>
                <fui-badge variant="error">99+</fui-badge>
              </div>
            }
          }

          <!-- AVATAR DEMOS -->
          @case ('avatar') {
            @if (exampleTitle() === 'Avatar with Initials') {
              <fui-avatar text="JD" alt="John Doe" />
            }
            @if (exampleTitle() === 'Avatar Sizes') {
              <div class="demo-row">
                <fui-avatar text="SM" size="sm" />
                <fui-avatar text="MD" size="md" />
                <fui-avatar text="LG" size="lg" />
                <fui-avatar text="XL" size="xl" />
              </div>
            }
            @if (exampleTitle() === 'Avatar with Image') {
              <fui-avatar src="/avatar.jpg" alt="John Doe" text="JD" />
            }
            @if (exampleTitle() === 'User Profile Group') {
              <div class="demo-row">
                <fui-avatar text="JD" size="md" />
                <fui-avatar text="AS" size="md" />
                <fui-avatar text="MK" size="md" />
                <fui-avatar text="+3" size="md" />
              </div>
            }
          }

          <!-- TOOLTIP DEMOS -->
          @case ('tooltip') {
            @if (exampleTitle() === 'Basic Tooltip') {
              <fui-tooltip text="Click to save">
                <button>Save</button>
              </fui-tooltip>
            }
            @if (exampleTitle() === 'Tooltip Positions') {
              <div class="demo-row">
                <fui-tooltip text="Top tooltip" position="top">
                  <button>Top</button>
                </fui-tooltip>
                <fui-tooltip text="Bottom tooltip" position="bottom">
                  <button>Bottom</button>
                </fui-tooltip>
                <fui-tooltip text="Left tooltip" position="left">
                  <button>Left</button>
                </fui-tooltip>
                <fui-tooltip text="Right tooltip" position="right">
                  <button>Right</button>
                </fui-tooltip>
              </div>
            }
            @if (exampleTitle() === 'Icon with Tooltip') {
              <fui-tooltip text="More information">
                <button aria-label="More information"></button>
              </fui-tooltip>
            }
            @if (exampleTitle() === 'Link with Tooltip') {
              <fui-tooltip text="Opens in new tab">
                <a href="#">Documentation</a>
              </fui-tooltip>
            }
          }

          <!-- CHIP DEMOS -->
          @case ('chip') {
            @if (exampleTitle() === 'Basic Chip') {
              <fui-chip label="JavaScript" />
            }
            @if (exampleTitle() === 'Chip Variants') {
              <div class="demo-row">
                <fui-chip label="Default" variant="default" />
                <fui-chip label="Primary" variant="primary" />
                <fui-chip label="Success" variant="success" />
                <fui-chip label="Warning" variant="warning" />
                <fui-chip label="Error" variant="error" />
              </div>
            }
            @if (exampleTitle() === 'Chip Sizes') {
              <div class="demo-row">
                <fui-chip label="Small" size="sm" />
                <fui-chip label="Medium" size="md" />
                <fui-chip label="Large" size="lg" />
              </div>
            }
            @if (exampleTitle() === 'Removable Chips') {
              <div class="demo-row">
                <fui-chip label="JavaScript" [removable]="true" />
                <fui-chip label="TypeScript" [removable]="true" />
                <fui-chip label="Angular" [removable]="true" />
              </div>
            }
            @if (exampleTitle() === 'Disabled Chips') {
              <div class="demo-row">
                <fui-chip label="Disabled" [disabled]="true" />
                <fui-chip label="Disabled Removable" [removable]="true" [disabled]="true" />
              </div>
            }
            @if (exampleTitle() === 'Chip Collection') {
              <div class="demo-row">
                <fui-chip label="React" variant="primary" [removable]="true" />
                <fui-chip label="Vue" variant="primary" [removable]="true" />
                <fui-chip label="Angular" variant="primary" [removable]="true" />
                <fui-chip label="Svelte" variant="primary" [removable]="true" />
              </div>
            }
          }

          <!-- SPINNER DEMOS -->
          @case ('spinner') {
            @if (exampleTitle() === 'Basic Spinner') {
              <fui-spinner />
            }
            @if (exampleTitle() === 'Spinner Sizes') {
              <div class="demo-row">
                <fui-spinner size="sm" />
                <fui-spinner size="md" />
                <fui-spinner size="lg" />
              </div>
            }
            @if (exampleTitle() === 'Inline Loading') {
              <p>Loading data <fui-spinner size="sm" /></p>
            }
          }

          <!-- PROGRESS DEMOS -->
          @case ('progress') {
            @if (exampleTitle() === 'Basic Progress') {
              <fui-progress [value]="60" />
            }
            @if (exampleTitle() === 'Progress with Value') {
              <fui-progress [value]="75" [showValue]="true" />
            }
            @if (exampleTitle() === 'Progress Variants') {
              <div class="demo-column">
                <fui-progress [value]="30" variant="default" />
                <fui-progress [value]="100" variant="success" />
                <fui-progress [value]="70" variant="warning" />
                <fui-progress [value]="50" variant="error" />
              </div>
            }
            @if (exampleTitle() === 'Progress Stages') {
              <div class="demo-column">
                <fui-progress [value]="0" [showValue]="true" />
                <fui-progress [value]="25" [showValue]="true" />
                <fui-progress [value]="50" [showValue]="true" />
                <fui-progress [value]="75" [showValue]="true" />
                <fui-progress [value]="100" [showValue]="true" />
              </div>
            }
          }

          <!-- SKELETON DEMOS -->
          @case ('skeleton') {
            @if (exampleTitle() === 'Text Skeleton') {
              <div class="demo-column">
                <fui-skeleton variant="text" width="100%" />
                <fui-skeleton variant="text" width="80%" />
                <fui-skeleton variant="text" width="90%" />
              </div>
            }
            @if (exampleTitle() === 'Circular Skeleton') {
              <fui-skeleton variant="circular" width="40px" height="40px" />
            }
            @if (exampleTitle() === 'Rectangular Skeleton') {
              <fui-skeleton variant="rectangular" width="300px" height="200px" />
            }
            @if (exampleTitle() === 'Skeleton Variants') {
              <div class="demo-column">
                <fui-skeleton variant="text" width="200px" />
                <fui-skeleton variant="circular" width="50px" height="50px" />
                <fui-skeleton variant="rectangular" width="200px" height="100px" />
              </div>
            }
            @if (exampleTitle() === 'Card Loading Pattern') {
              <div class="demo-column">
                <fui-skeleton variant="circular" width="40px" height="40px" />
                <fui-skeleton variant="text" width="150px" />
                <fui-skeleton variant="rectangular" width="100%" height="150px" />
                <fui-skeleton variant="text" width="100%" />
                <fui-skeleton variant="text" width="80%" />
              </div>
            }
          }

          <!-- DIVIDER DEMOS -->
          @case ('divider') {
            @if (exampleTitle() === 'Horizontal Divider') {
              <div class="demo-column demo-column--full">
                <fui-divider />
                <div>Section 2</div>
              </div>
            }
            @if (exampleTitle() === 'Divider Variants') {
              <div class="demo-column demo-column--full">
                <p>Solid (default):</p>
                <fui-divider />
                <p>Dashed:</p>
                <fui-divider [dashed]="true" />
                <p>With Label:</p>
                <fui-divider label="OR" />
              </div>
            }
            @if (exampleTitle() === 'Vertical Divider') {
              <div class="demo-flex-row">
                <span>Item 1</span>
                <fui-divider orientation="vertical" class="demo-divider-height" />
                <span>Item 2</span>
                <fui-divider orientation="vertical" class="demo-divider-height" />
                <span>Item 3</span>
              </div>
            }
          }

          <!-- STACK DEMOS -->
          @case ('stack') {
            @if (exampleTitle() === 'Vertical Stack') {
              <fui-stack direction="vertical" [spacing]="4">
                <div class="demo-box">Item 1</div>
                <div class="demo-box">Item 2</div>
                <div class="demo-box">Item 3</div>
              </fui-stack>
            }
            @if (exampleTitle() === 'Horizontal Stack') {
              <fui-stack direction="horizontal" [spacing]="4">
                <div class="demo-box">Item 1</div>
                <div class="demo-box">Item 2</div>
                <div class="demo-box">Item 3</div>
              </fui-stack>
            }
            @if (exampleTitle() === 'Stack with Alignment') {
              <fui-stack direction="vertical" [spacing]="3" align="center">
                <div class="demo-box demo-box--wide">Centered Item 1</div>
                <div class="demo-box demo-box--wider">Centered Item 2</div>
                <div class="demo-box demo-box--narrow">Centered Item 3</div>
              </fui-stack>
            }
          }

          <!-- GRID DEMOS -->
          @case ('grid') {
            @if (exampleTitle() === '3-Column Grid') {
              <fui-grid [columns]="3" [gap]="4">
                <div class="demo-box">Item 1</div>
                <div class="demo-box">Item 2</div>
                <div class="demo-box">Item 3</div>
                <div class="demo-box">Item 4</div>
                <div class="demo-box">Item 5</div>
                <div class="demo-box">Item 6</div>
              </fui-grid>
            }
            @if (exampleTitle() === '4-Column Grid') {
              <fui-grid [columns]="4" [gap]="3">
                <div class="demo-box">Item 1</div>
                <div class="demo-box">Item 2</div>
                <div class="demo-box">Item 3</div>
                <div class="demo-box">Item 4</div>
                <div class="demo-box">Item 5</div>
                <div class="demo-box">Item 6</div>
                <div class="demo-box">Item 7</div>
                <div class="demo-box">Item 8</div>
              </fui-grid>
            }
          }

          <!-- MODAL DEMOS -->
          @case ('modal') {
            @if (exampleTitle() === 'Basic Modal') {
              <div>
                <fui-button (clicked)="isOpen.set(true)">Open Modal</fui-button>
                <fui-modal [open]="isOpen()" (closed)="isOpen.set(false)">
                  <h2>Modal Title</h2>
                  <p>This is a basic modal dialog. Click outside or press Escape to close.</p>
                  <fui-button (clicked)="isOpen.set(false)">Close</fui-button>
                </fui-modal>
              </div>
            }
            @if (exampleTitle() === 'Modal Sizes') {
              <div class="demo-row">
                <fui-button size="sm" (clicked)="isOpen.set(true)">Small Modal</fui-button>
                <fui-modal [open]="isOpen()" size="sm" (closed)="isOpen.set(false)">
                  <h3>Small Modal</h3>
                  <p>Compact modal for simple messages.</p>
                </fui-modal>
              </div>
            }
            @if (exampleTitle() === 'Modal without Backdrop Close') {
              <div>
                <fui-button (clicked)="isOpen.set(true)">Open Modal</fui-button>
                <fui-modal
                  [open]="isOpen()"
                  [closeOnBackdropClick]="false"
                  (closed)="isOpen.set(false)"
                >
                  <h2>Important Modal</h2>
                  <p>This modal can only be closed by clicking the button.</p>
                  <fui-button (clicked)="isOpen.set(false)">Close Modal</fui-button>
                </fui-modal>
              </div>
            }
          }

          <!-- TABS DEMOS -->
          @case ('tabs') {
            @if (exampleTitle() === 'Basic Tabs') {
              <fui-tabs>
                <fui-tab label="Profile">
                  <p>User profile information and settings.</p>
                </fui-tab>
                <fui-tab label="Settings">
                  <p>Application settings and preferences.</p>
                </fui-tab>
                <fui-tab label="Notifications">
                  <p>Notification preferences and history.</p>
                </fui-tab>
              </fui-tabs>
            }
            @if (exampleTitle() === 'Vertical Tabs') {
              <fui-tabs orientation="vertical">
                <fui-tab label="Account">
                  <p>Account settings and information.</p>
                </fui-tab>
                <fui-tab label="Security">
                  <p>Security and privacy settings.</p>
                </fui-tab>
              </fui-tabs>
            }
            @if (exampleTitle() === 'Tab Sizes') {
              <fui-tabs size="lg">
                <fui-tab label="Large Tab 1">
                  <p>Content for large tab.</p>
                </fui-tab>
                <fui-tab label="Large Tab 2">
                  <p>More content.</p>
                </fui-tab>
              </fui-tabs>
            }
          }

          <!-- ACCORDION DEMOS -->
          @case ('accordion') {
            @if (exampleTitle() === 'Single Mode Accordion') {
              <fui-accordion mode="single">
                <fui-accordion-item title="What is your return policy?">
                  <p>We offer a 30-day return policy on all items.</p>
                </fui-accordion-item>
                <fui-accordion-item title="How long does shipping take?">
                  <p>Standard shipping takes 5-7 business days.</p>
                </fui-accordion-item>
                <fui-accordion-item title="Do you ship internationally?">
                  <p>Yes, we ship to over 100 countries worldwide.</p>
                </fui-accordion-item>
              </fui-accordion>
            }
            @if (exampleTitle() === 'Multiple Mode Accordion') {
              <fui-accordion mode="multiple">
                <fui-accordion-item title="Section 1">
                  <p>Content for section 1.</p>
                </fui-accordion-item>
                <fui-accordion-item title="Section 2">
                  <p>Content for section 2.</p>
                </fui-accordion-item>
              </fui-accordion>
            }
            @if (exampleTitle() === 'Pre-expanded Accordion') {
              <fui-accordion [expanded]="[0]">
                <fui-accordion-item title="First Item (Expanded)">
                  <p>This item is expanded by default.</p>
                </fui-accordion-item>
                <fui-accordion-item title="Second Item">
                  <p>This item starts collapsed.</p>
                </fui-accordion-item>
              </fui-accordion>
            }
          }

          <!-- DRAWER DEMOS -->
          @case ('drawer') {
            @if (exampleTitle() === 'Left Drawer') {
              <div>
                <fui-button (clicked)="drawerLeft.set(true)">Open Navigation</fui-button>
                <fui-drawer
                  [open]="drawerLeft()"
                  title="Navigation"
                  position="left"
                  (openChange)="drawerLeft.set($event)"
                >
                  <nav class="demo-drawer-nav">
                    <a href="#" class="demo-drawer-nav__link">Dashboard</a>
                    <a href="#" class="demo-drawer-nav__link">Settings</a>
                    <a href="#" class="demo-drawer-nav__link">Profile</a>
                  </nav>
                </fui-drawer>
              </div>
            }
            @if (exampleTitle() === 'Right Drawer') {
              <div>
                <fui-button (clicked)="drawerRight.set(true)">Open Settings</fui-button>
                <fui-drawer
                  [open]="drawerRight()"
                  title="Settings"
                  position="right"
                  (openChange)="drawerRight.set($event)"
                >
                  <div class="demo-flex-col">
                    <div>
                      <h4 class="demo-section-label">Appearance</h4>
                      <fui-switch label="Dark Mode" />
                    </div>
                    <div>
                      <h4 class="demo-section-label">Notifications</h4>
                      <fui-switch label="Email Notifications" [checked]="true" />
                      <fui-switch label="Push Notifications" />
                    </div>
                  </div>
                </fui-drawer>
              </div>
            }
            @if (exampleTitle() === 'Top Drawer') {
              <div>
                <fui-button (clicked)="drawerTop.set(true)">Show Notifications</fui-button>
                <fui-drawer
                  [open]="drawerTop()"
                  title="Notifications"
                  position="top"
                  size="sm"
                  (openChange)="drawerTop.set($event)"
                >
                  <div class="demo-flex-col demo-flex-col--sm">
                    <div class="demo-notification-item">
                      <strong>New message from John</strong>
                      <p class="demo-notification-desc">Hey, are you available for a call?</p>
                    </div>
                    <div class="demo-notification-item">
                      <strong>System Update</strong>
                      <p class="demo-notification-desc">Your system will update tonight at 2 AM</p>
                    </div>
                    <div class="demo-notification-item">
                      <strong>Task completed</strong>
                      <p class="demo-notification-desc">Your report has been generated</p>
                    </div>
                  </div>
                </fui-drawer>
              </div>
            }
            @if (exampleTitle() === 'Bottom Drawer') {
              <div>
                <fui-button (clicked)="drawerBottom.set(true)">Show Actions</fui-button>
                <fui-drawer
                  [open]="drawerBottom()"
                  title="Actions"
                  position="bottom"
                  size="sm"
                  (openChange)="drawerBottom.set($event)"
                >
                  <div class="demo-flex-col demo-flex-col--xs">
                    <fui-button [fullWidth]="true"> Edit Item</fui-button>
                    <fui-button [fullWidth]="true" variant="outlined"> Duplicate</fui-button>
                    <fui-button [fullWidth]="true" variant="outlined"> Share</fui-button>
                    <fui-button [fullWidth]="true" variant="outlined"> Delete</fui-button>
                  </div>
                </fui-drawer>
              </div>
            }
            @if (exampleTitle() === 'Drawer with Footer') {
              <div>
                <fui-button (clicked)="drawerWithFooter.set(true)">Edit Profile</fui-button>
                <fui-drawer
                  [open]="drawerWithFooter()"
                  title="Edit Profile"
                  (openChange)="drawerWithFooter.set($event)"
                >
                  <div class="demo-flex-col">
                    <fui-input label="Full Name" placeholder="John Doe" value="John Doe" />
                    <fui-input
                      label="Email"
                      type="email"
                      placeholder="john@example.com"
                      value="john@example.com"
                    />
                    <fui-input label="Phone" type="tel" placeholder="+1 234 567 8900" />
                    <fui-textarea label="Bio" placeholder="Tell us about yourself..." [rows]="4" />
                  </div>
                  <div footer class="demo-footer-actions">
                    <fui-button variant="text" (clicked)="drawerWithFooter.set(false)"
                      >Cancel</fui-button
                    >
                    <fui-button (clicked)="drawerWithFooter.set(false)">Save Changes</fui-button>
                  </div>
                </fui-drawer>
              </div>
            }
            @if (exampleTitle() === 'Drawer Sizes') {
              <div class="demo-row">
                <fui-button size="sm" (clicked)="drawerSmall.set(true)">Small</fui-button>
                <fui-button size="sm" (clicked)="drawerMedium.set(true)">Medium</fui-button>
                <fui-button size="sm" (clicked)="drawerLarge.set(true)">Large</fui-button>

                <fui-drawer
                  [open]="drawerSmall()"
                  title="Small Drawer"
                  size="sm"
                  (openChange)="drawerSmall.set($event)"
                >
                  <p>This is a small drawer (20rem width).</p>
                </fui-drawer>

                <fui-drawer
                  [open]="drawerMedium()"
                  title="Medium Drawer"
                  size="md"
                  (openChange)="drawerMedium.set($event)"
                >
                  <p>This is a medium drawer (28rem width) - the default size.</p>
                </fui-drawer>

                <fui-drawer
                  [open]="drawerLarge()"
                  title="Large Drawer"
                  size="lg"
                  (openChange)="drawerLarge.set($event)"
                >
                  <p>This is a large drawer (36rem width) for more content.</p>
                </fui-drawer>
              </div>
            }
          }

          <!-- POPOVER DEMOS -->
          @case ('popover') {
            @if (exampleTitle() === 'Click Popover') {
              <fui-popover trigger="click">
                <fui-button trigger>Click Me</fui-button>
                <p>Popover content appears on click</p>
              </fui-popover>
            }
            @if (exampleTitle() === 'Hover Popover') {
              <fui-popover trigger="hover">
                <fui-button trigger>Hover over me</fui-button>
                <p>This appears on hover</p>
              </fui-popover>
            }
            @if (exampleTitle() === 'Popover Positions') {
              <div class="demo-row">
                <fui-popover position="top">
                  <fui-button trigger>Top</fui-button>
                  <p>Content above the button</p>
                </fui-popover>
                <fui-popover position="bottom">
                  <fui-button trigger>Bottom</fui-button>
                  <p>Content below the button</p>
                </fui-popover>
                <fui-popover position="left">
                  <fui-button trigger>Left</fui-button>
                  <p>Content to the left</p>
                </fui-popover>
                <fui-popover position="right">
                  <fui-button trigger>Right</fui-button>
                  <p>Content to the right</p>
                </fui-popover>
              </div>
            }
          }

          <!-- PAGINATION DEMOS -->
          @case ('pagination') {
            @if (exampleTitle() === 'Basic Pagination') {
              <fui-pagination
                [totalItems]="100"
                [pageSize]="10"
                [currentPage]="currentPage()"
                (pageChange)="currentPage.set($event)"
              />
            }
            @if (exampleTitle() === 'Large Dataset Pagination') {
              <fui-pagination [totalItems]="1000" [pageSize]="20" [currentPage]="1" />
            }
            @if (exampleTitle() === 'Small Page Size') {
              <fui-pagination [totalItems]="50" [pageSize]="5" [currentPage]="1" />
            }
          }

          <!-- TABLE DEMOS -->
          @case ('table') {
            @if (exampleTitle() === 'Basic Table') {
              <fui-table [columns]="columns()" [data]="users()"> </fui-table>
            }
            @if (exampleTitle() === 'Sortable Table') {
              <fui-table [columns]="sortableColumns()" [data]="users()"> </fui-table>
            }
            @if (exampleTitle() === 'Selectable Table') {
              <fui-table
                [columns]="columns()"
                [data]="users()"
                [selectable]="true"
                (selectionChange)="handleSelectionChange($event)"
              >
              </fui-table>
            }
          }

          <!-- LIST DEMOS -->
          @case ('list') {
            @if (exampleTitle() === 'Simple List') {
              <fui-list [items]="simpleListItems()"></fui-list>
            }
            @if (exampleTitle() === 'Divided List') {
              <fui-list [items]="simpleListItems()" variant="divided"></fui-list>
            }
            @if (exampleTitle() === 'Interactive List') {
              <fui-list [items]="simpleListItems()" [interactive]="true"></fui-list>
            }
          }

          <!-- CAROUSEL DEMOS -->
          @case ('carousel') {
            @if (exampleTitle() === 'Basic Carousel') {
              <fui-carousel class="carousel-demo" ariaLabel="Featured highlights">
                @for (slide of carouselSlides(); track slide.title) {
                  <fui-carousel-slide [label]="slide.title">
                    <article class="carousel-slide-card" [style.--carousel-accent]="slide.accent">
                      <p class="carousel-slide-eyebrow">{{ slide.eyebrow }}</p>
                      <h3 class="carousel-slide-title">{{ slide.title }}</h3>
                      <p class="carousel-slide-description">{{ slide.description }}</p>
                    </article>
                  </fui-carousel-slide>
                }
              </fui-carousel>
            }
            @if (exampleTitle() === 'Fade Transition') {
              <fui-carousel
                class="carousel-demo"
                variant="fade"
                ariaLabel="Fade transition example"
              >
                @for (slide of carouselSlides(); track slide.title) {
                  <fui-carousel-slide [label]="slide.title">
                    <article class="carousel-slide-card" [style.--carousel-accent]="slide.accent">
                      <p class="carousel-slide-eyebrow">{{ slide.eyebrow }}</p>
                      <h3 class="carousel-slide-title">{{ slide.title }}</h3>
                      <p class="carousel-slide-description">{{ slide.description }}</p>
                    </article>
                  </fui-carousel-slide>
                }
              </fui-carousel>
            }
            @if (exampleTitle() === 'Autoplay with Pause Control') {
              <fui-carousel
                class="carousel-demo"
                [autoplay]="true"
                [autoplayDelay]="3500"
                ariaLabel="Autoplaying customer stories"
              >
                @for (slide of carouselSlides(); track slide.title) {
                  <fui-carousel-slide [label]="slide.title">
                    <article class="carousel-slide-card" [style.--carousel-accent]="slide.accent">
                      <p class="carousel-slide-eyebrow">{{ slide.eyebrow }}</p>
                      <h3 class="carousel-slide-title">{{ slide.title }}</h3>
                      <p class="carousel-slide-description">{{ slide.description }}</p>
                    </article>
                  </fui-carousel-slide>
                }
              </fui-carousel>
            }
            @if (exampleTitle() === 'Multiple Visible Slides') {
              <fui-carousel class="carousel-demo" [visibleSlides]="2" ariaLabel="Product cards">
                @for (slide of carouselSlides(); track slide.title) {
                  <fui-carousel-slide [label]="slide.title">
                    <article
                      class="carousel-slide-card carousel-slide-card--compact"
                      [style.--carousel-accent]="slide.accent"
                    >
                      <p class="carousel-slide-eyebrow">{{ slide.eyebrow }}</p>
                      <h3 class="carousel-slide-title">{{ slide.title }}</h3>
                      <p class="carousel-slide-description">{{ slide.description }}</p>
                      <p class="carousel-slide-metric">{{ slide.metric }}</p>
                    </article>
                  </fui-carousel-slide>
                }
              </fui-carousel>
            }
            @if (exampleTitle() === 'Thumbnail Navigation') {
              <fui-carousel
                class="carousel-demo"
                [showThumbnails]="true"
                ariaLabel="Release highlights"
              >
                @for (slide of carouselSlides(); track slide.title) {
                  <fui-carousel-slide
                    [label]="slide.title"
                    [thumbnail]="slide.thumbnail"
                    [thumbnailAlt]="slide.title"
                  >
                    <article class="carousel-slide-card" [style.--carousel-accent]="slide.accent">
                      <p class="carousel-slide-eyebrow">{{ slide.eyebrow }}</p>
                      <h3 class="carousel-slide-title">{{ slide.title }}</h3>
                      <p class="carousel-slide-description">{{ slide.description }}</p>
                    </article>
                  </fui-carousel-slide>
                }
              </fui-carousel>
            }
            @if (exampleTitle() === 'No Loop') {
              <fui-carousel class="carousel-demo" [loop]="false" ariaLabel="Non-looping updates">
                @for (slide of carouselSlides(); track slide.title) {
                  <fui-carousel-slide [label]="slide.title">
                    <article class="carousel-slide-card" [style.--carousel-accent]="slide.accent">
                      <p class="carousel-slide-eyebrow">{{ slide.eyebrow }}</p>
                      <h3 class="carousel-slide-title">{{ slide.title }}</h3>
                      <p class="carousel-slide-description">{{ slide.description }}</p>
                    </article>
                  </fui-carousel-slide>
                }
              </fui-carousel>
            }
          }

          <!-- CODE BLOCK DEMOS -->
          @case ('code-block') {
            @if (exampleTitle() === 'Basic Code Block') {
              <fui-code-block [code]="typescriptCode()" language="typescript" title="TypeScript" />
            }
            @if (exampleTitle() === 'HTML Code') {
              <fui-code-block [code]="htmlCode()" language="html" title="HTML" />
            }
            @if (exampleTitle() === 'CSS Code') {
              <fui-code-block [code]="cssCode()" language="css" title="CSS" />
            }
            @if (exampleTitle() === 'JSON Data') {
              <fui-code-block [code]="jsonCode()" language="json" title="Configuration" />
            }
            @if (exampleTitle() === 'Custom Filename') {
              <fui-code-block
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
                <fui-button (clicked)="showToast('info')">Show Info Toast</fui-button>
                <fui-button (clicked)="showToast('success')">Show Success Toast</fui-button>
                <fui-button (clicked)="showToast('warning')">Show Warning Toast</fui-button>
                <fui-button (clicked)="showToast('error')">Show Error Toast</fui-button>
              </div>
            }
            @if (exampleTitle() === 'Custom Duration Toast') {
              <fui-button (clicked)="showLongToast()">Show Toast (5s)</fui-button>
            }
            @if (exampleTitle() === 'Action Feedback') {
              <fui-button (clicked)="showActionToast()">Save Changes</fui-button>
            }
          }

          <!-- BREADCRUMB DEMOS -->
          @case ('breadcrumb') {
            @if (exampleTitle() === 'Basic Breadcrumb') {
              <fui-breadcrumb [items]="breadcrumbs()"></fui-breadcrumb>
            }
            @if (exampleTitle() === 'Custom Separator') {
              <fui-breadcrumb [items]="breadcrumbs()" separator=">"></fui-breadcrumb>
            }
          }

          <!-- MENU DEMOS -->
          @case ('menu') {
            @if (exampleTitle() === 'Basic Dropdown Menu') {
              <fui-menu [items]="menuItems()">
                <fui-button trigger>Open Menu</fui-button>
              </fui-menu>
            }
            @if (exampleTitle() === 'Nested Menu') {
              <fui-menu [items]="nestedMenuItems()">
                <fui-button trigger>Actions ▾</fui-button>
              </fui-menu>
            }
          }

          <!-- CONTEXT MENU DEMOS -->
          @case ('context-menu') {
            @if (exampleTitle() === 'Basic Context Menu') {
              <fui-context-menu
                [items]="contextMenuItems()"
                (itemClick)="handleContextMenuClick($event)"
              >
                <div class="context-menu-demo-area">
                  <p class="demo-context-hint">
                    Right-click anywhere in this area<br />
                    to open the context menu
                  </p>
                </div>
              </fui-context-menu>
            }
            @if (exampleTitle() === 'File Explorer Context Menu') {
              <fui-context-menu
                [items]="fileContextMenuItems()"
                (itemClick)="handleContextMenuClick($event)"
              >
                <div class="file-item-demo">
                  <div class="file-icon">📄</div>
                  <span class="file-name">document.pdf</span>
                  <span class="file-hint">Right-click for options</span>
                </div>
              </fui-context-menu>
            }
            @if (exampleTitle() === 'Text Editor Context Menu') {
              <fui-context-menu
                [items]="editorContextMenuItems()"
                (itemClick)="handleContextMenuClick($event)"
              >
                <textarea class="editor-demo" placeholder="Right-click to format text...">
Sample text for editing</textarea
                >
              </fui-context-menu>
            }
          }

          <!-- NAVBAR DEMOS -->
          @case ('navbar') {
            @if (exampleTitle() === 'Basic Navbar') {
              <fui-navbar [links]="navLinks()"></fui-navbar>
            }
            @if (exampleTitle() === 'Sticky Navbar') {
              <fui-navbar [links]="navLinks()" variant="sticky"></fui-navbar>
            }
          }

          <!-- STEPPER DEMOS -->
          @case ('stepper') {
            @if (exampleTitle() === 'Horizontal Stepper') {
              <fui-stepper [steps]="steps()" [activeStep]="currentStep()" orientation="horizontal">
              </fui-stepper>
            }
            @if (exampleTitle() === 'Vertical Stepper') {
              <fui-stepper [steps]="steps()" [activeStep]="currentStep()" orientation="vertical">
              </fui-stepper>
            }
            @if (exampleTitle() === 'Form Wizard') {
              <fui-stepper [steps]="steps()" [activeStep]="currentStep()"> </fui-stepper>
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

      .demo-drawer-nav {
        display: flex;
        flex-direction: column;
        gap: var(--primitive-spacing-3);
      }

      .demo-drawer-nav__link {
        padding: var(--primitive-spacing-2);
        text-decoration: none;
        color: var(--semantic-text-primary);
        border-radius: var(--component-button-border-radius, 4px);
        transition: background var(--animation-duration-normal, 250ms)
          var(--animation-easing-default, ease-in-out);
      }

      .demo-drawer-nav__link:hover {
        background: var(--semantic-surface-background-secondary);
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
      :host ::ng-deep fui-input,
      :host ::ng-deep fui-textarea,
      :host ::ng-deep fui-select,
      :host ::ng-deep fui-multi-select,
      :host ::ng-deep fui-slider {
        width: 100%;
        max-width: 400px;
      }

      :host ::ng-deep fui-card {
        width: 100%;
        max-width: 500px;
      }

      :host ::ng-deep fui-alert {
        width: 100%;
        max-width: 600px;
      }

      :host ::ng-deep fui-stack,
      :host ::ng-deep fui-grid {
        width: 100%;
        max-width: 600px;
      }

      :host ::ng-deep fui-carousel {
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
          linear-gradient(
            145deg,
            color-mix(in srgb, var(--carousel-accent) 22%, white),
            transparent 70%
          ),
          linear-gradient(
            180deg,
            var(--semantic-surface-card),
            color-mix(
              in srgb,
              var(--carousel-accent) 12%,
              var(--semantic-surface-background-secondary)
            )
          );
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
        background-color: var(--semantic-surface-background-secondary);
        cursor: context-menu;
        transition: all var(--semantic-animation-duration-interactive, 150ms)
          var(--semantic-animation-easing-default, cubic-bezier(0.4, 0, 0.2, 1));
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
        transition: all var(--semantic-animation-duration-interactive, 150ms)
          var(--semantic-animation-easing-default, cubic-bezier(0.4, 0, 0.2, 1));
      }

      .file-item-demo:hover {
        background-color: var(--semantic-surface-background-secondary);
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

      /* Layout utility classes (replaces static inline styles) */
      .demo-column--full {
        width: 100%;
      }

      .demo-flex-row {
        display: flex;
        align-items: center;
        gap: 16px;
      }

      .demo-divider-height {
        height: 24px;
      }

      .demo-box {
        padding: 1rem;
        background: var(--semantic-surface-background-secondary);
        border-radius: 4px;
      }

      .demo-box--wide {
        padding-inline: 2rem;
        padding-block: 0.5rem;
      }

      .demo-box--wider {
        padding-inline: 3rem;
        padding-block: 0.5rem;
      }

      .demo-box--narrow {
        padding-inline: 1rem;
        padding-block: 0.5rem;
      }

      .demo-flex-col {
        display: flex;
        flex-direction: column;
        gap: 16px;
      }

      .demo-flex-col--sm {
        gap: 12px;
      }

      .demo-flex-col--xs {
        gap: 8px;
      }

      .demo-section-label {
        margin: 0 0 8px 0;
        font-size: 14px;
        color: var(--semantic-text-secondary);
      }

      .demo-notification-item {
        padding: 12px;
        background: var(--semantic-surface-background-secondary);
        border-radius: 6px;
      }

      .demo-notification-desc {
        margin: 4px 0 0 0;
        color: var(--semantic-text-secondary);
        font-size: 14px;
      }

      .demo-footer-actions {
        display: flex;
        gap: 8px;
        justify-content: flex-end;
      }

      .demo-context-hint {
        text-align: center;
        padding: 3rem 2rem;
        color: var(--semantic-text-secondary);
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
  protected readonly priceRange = signal<readonly [number, number]>([200, 800]);

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
      description:
        'Arrow keys, Home, End, focus visibility, autoplay pause, and reduced-motion support are built in.',
      metric: 'WCAG 2.1 AA aligned',
      accent: '#0f766e',
      thumbnail: 'A11y',
    },
    {
      eyebrow: 'Composition',
      title: 'Project any semantic slide content',
      description:
        'Slides accept native media, cards, marketing content, or custom layouts without a rigid slide data schema.',
      metric: 'Content-first API',
      accent: '#c2410c',
      thumbnail: 'API',
    },
    {
      eyebrow: 'Theming',
      title: 'Tokens drive every visual state',
      description:
        'Controls, indicators, thumbnails, and surfaces inherit primitive and semantic token values from the active theme.',
      metric: 'Theme-aware by default',
      accent: '#1d4ed8',
      thumbnail: 'Theme',
    },
    {
      eyebrow: 'Responsive',
      title: 'Single-slide or multi-slide layouts',
      description:
        'Use one visible slide for hero content or increase visibleSlides to preview adjacent content collections.',
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

  protected readonly htmlCode = signal(`<fui-button variant="filled" size="md">
  Click Me
</fui-button>`);

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
