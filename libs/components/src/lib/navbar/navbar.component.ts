/**
 * Navbar Component
 * 
 * A responsive navigation bar with mobile menu support.
 * Provides consistent branding and navigation across the application.
 */

import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
  signal,
} from '@angular/core';
import { NgClass } from '@angular/common';

export interface NavbarLink {
  id: string;
  label: string;
  href?: string;
  active?: boolean;
  disabled?: boolean;
}

export type NavbarVariant = 'default' | 'sticky' | 'fixed';

@Component({
  selector: 'fui-navbar',
  imports: [NgClass],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'hostClasses()',
  },
})
export class NavbarComponent {
  /**
   * Navbar variant
   */
  readonly variant = input<NavbarVariant>('default');

  /**
   * Navigation links
   */
  readonly links = input<NavbarLink[]>([]);

  /**
   * Brand/Logo text
   */
  readonly brandText = input<string | undefined>(undefined);

  /**
   * Show mobile menu toggle
   */
  readonly showMobileToggle = input<boolean>(true);

  /**
   * Link click event
   */
  readonly linkClick = output<NavbarLink>();

  /**
   * Mobile menu open state
   */
  protected readonly mobileMenuOpen = signal(false);

  /**
   * Computed CSS classes
   */
  protected readonly navbarClasses = computed(() => ({
    'fui-navbar': true,
    [`fui-navbar--${this.variant()}`]: true,
    'fui-navbar--mobile-open': this.mobileMenuOpen(),
  }));

  /**
   * Computed host classes
   */
  protected readonly hostClasses = computed(() => {
    return Object.entries(this.navbarClasses())
      .filter(([, value]) => value)
      .map(([key]) => key)
      .join(' ');
  });

  /**
   * Toggle mobile menu
   */
  protected toggleMobileMenu(): void {
    this.mobileMenuOpen.update(open => !open);
  }

  /**
   * Close mobile menu
   */
  protected closeMobileMenu(): void {
    this.mobileMenuOpen.set(false);
  }

  /**
   * Handle link click
   */
  protected handleLinkClick(link: NavbarLink, event: Event): void {
    if (link.disabled) {
      event.preventDefault();
      return;
    }

    this.linkClick.emit(link);
    this.closeMobileMenu();
  }
}

