/**
 * Avatar Component
 * 
 * A themable avatar component supporting images, initials, and icons.
 * Includes status indicator and multiple sizes.
 */

import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  signal,
} from '@angular/core';
import { NgClass, NgStyle } from '@angular/common';

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
export type AvatarShape = 'circle' | 'square';
export type AvatarStatus = 'online' | 'offline' | 'away' | 'busy';

@Component({
  selector: 'ui-avatar',
  imports: [NgClass, NgStyle],
  templateUrl: './avatar.component.html',
  styleUrl: './avatar.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'hostClasses()',
  },
})
export class AvatarComponent {
  /**
   * Image source URL
   */
  readonly src = input<string | undefined>(undefined);

  /**
   * Alt text for image
   */
  readonly alt = input<string>('Avatar');

  /**
   * Initials to display (if no image)
   */
  readonly initials = input<string | undefined>(undefined);

  /**
   * Icon to display (emoji or text)
   */
  readonly icon = input<string | undefined>(undefined);

  /**
   * Avatar size
   */
  readonly size = input<AvatarSize>('md');

  /**
   * Avatar shape
   */
  readonly shape = input<AvatarShape>('circle');

  /**
   * Status indicator
   */
  readonly status = input<AvatarStatus | undefined>(undefined);

  /**
   * Show status indicator
   */
  readonly showStatus = input<boolean>(false);

  /**
   * Background color for initials/icon
   */
  readonly backgroundColor = input<string | undefined>(undefined);

  /**
   * Text color for initials/icon
   */
  readonly textColor = input<string | undefined>(undefined);

  /**
   * Internal image load error state
   */
  protected readonly imageError = signal(false);

  /**
   * Computed display mode
   */
  protected readonly displayMode = computed(() => {
    if (this.src() && !this.imageError()) {
      return 'image';
    }
    if (this.initials()) {
      return 'initials';
    }
    if (this.icon()) {
      return 'icon';
    }
    return 'fallback';
  });

  /**
   * Computed CSS classes
   */
  protected readonly avatarClasses = computed(() => ({
    'ui-avatar': true,
    [`ui-avatar--${this.size()}`]: true,
    [`ui-avatar--${this.shape()}`]: true,
    [`ui-avatar--${this.displayMode()}`]: true,
    'ui-avatar--with-status': this.showStatus() && !!this.status(),
  }));

  /**
   * Computed host classes
   */
  protected readonly hostClasses = computed(() => {
    return Object.entries(this.avatarClasses())
      .filter(([, value]) => value)
      .map(([key]) => key)
      .join(' ');
  });

  /**
   * Computed status classes
   */
  protected readonly statusClasses = computed(() => ({
    'ui-avatar-status': true,
    [`ui-avatar-status--${this.status()}`]: !!this.status(),
  }));

  /**
   * Computed initials (max 2 characters)
   */
  protected readonly computedInitials = computed(() => {
    const initials = this.initials();
    if (!initials) return '';
    return initials.slice(0, 2).toUpperCase();
  });

  /**
   * Computed inline styles
   */
  protected readonly inlineStyles = computed(() => {
    const styles: Record<string, string> = {};
    
    const bgColor = this.backgroundColor();
    const textColor = this.textColor();
    
    if (bgColor) {
      styles['backgroundColor'] = bgColor;
    }
    if (textColor) {
      styles['color'] = textColor;
    }
    
    return styles;
  });

  /**
   * Handle image load error
   */
  protected handleImageError(): void {
    this.imageError.set(true);
  }
}

