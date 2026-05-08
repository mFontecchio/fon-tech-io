/**
 * Home Page Component
 * Landing page with component showcase
 */

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ButtonComponent, CardComponent } from '@mfontecchio/components';
import { getAllComponentMetadata } from '../../data/component-metadata';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, ButtonComponent, CardComponent],
  template: `
    <div class="home-page">
      <section class="hero" aria-label="Introduction">
        <h1 class="hero-title">
          Fon.tech.io <br /><span class="hero-subtitle">UI Component Suite</span>
        </h1>
        <p class="hero-description">
          A comprehensive collection of {{ componentCount }} accessible, themable Angular components
          built with Angular 20+ and modern best practices.
        </p>
        <div class="hero-actions">
          <a routerLink="/getting-started/installation">
            <fui-button variant="filled" size="lg"> Get Started </fui-button>
          </a>
          <a routerLink="/components/form/button">
            <fui-button variant="outlined" size="lg"> Browse Components </fui-button>
          </a>
        </div>
      </section>

      <section class="features" aria-label="Features">
        <fui-card class="feature-card">
          <h3>Fully Themable</h3>
          <p>Customize every aspect with our 3-tier design token system</p>
        </fui-card>

        <fui-card class="feature-card">
          <h3>Accessible</h3>
          <p>WCAG 2.1 AA compliant with full keyboard navigation</p>
        </fui-card>

        <fui-card class="feature-card">
          <h3>Modern Stack</h3>
          <p>Built with Angular 20+, signals, and standalone components</p>
        </fui-card>

        <fui-card class="feature-card">
          <h3>{{ componentCount }} Components</h3>
          <p>Forms, layouts, data display, feedback, and navigation</p>
        </fui-card>

        <fui-card class="feature-card">
          <h3>Developer Friendly</h3>
          <p>Comprehensive API docs and interactive examples</p>
        </fui-card>

        <fui-card class="feature-card">
          <h3>Dark Mode</h3>
          <p>Built-in dark mode with smooth transitions</p>
        </fui-card>
      </section>

      <section class="quick-links" aria-label="Quick links">
        <h2>Quick Links</h2>
        <div class="link-grid">
          <a routerLink="/getting-started/installation" class="link-card">
            <h3>Installation</h3>
            <p>Get up and running in minutes</p>
          </a>

          <a routerLink="/theme-builder" class="link-card">
            <h3>Theme Builder</h3>
            <p>Create your custom theme</p>
          </a>

          <a routerLink="/components/form/button" class="link-card">
            <h3>Components</h3>
            <p>Explore all {{ componentCount }} documented components</p>
          </a>
        </div>
      </section>
    </div>
  `,
  styles: [
    `
      .home-page {
        padding: var(--primitive-spacing-8) var(--primitive-spacing-6);
        max-width: 1200px;
        margin: 0 auto;
      }

      .hero {
        text-align: center;
        padding: var(--primitive-spacing-12) 0;
        margin-bottom: var(--primitive-spacing-12);
      }

      .hero-title {
        font-size: clamp(2rem, 8vw + 1rem, 4.5rem);
        transition: font-size 0.5s ease;
        line-height: 1.2;
        font-weight: var(--primitive-font-weight-bold);
        color: var(--semantic-text-primary);
        margin-bottom: var(--primitive-spacing-4);
        background: linear-gradient(
          135deg,
          var(--semantic-brand-primary) 0%,
          var(--primitive-accent-600) 25%,
          var(--semantic-brand-primary) 50%,
          var(--primitive-accent-600) 75%,
          var(--semantic-brand-primary) 100%
        );
        background-size: 200% 200%;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        animation: hero-gradient-shift var(--semantic-animation-duration-showcase-gradient, 14s)
          var(--semantic-animation-easing-default, cubic-bezier(0.4, 0, 0.2, 1)) infinite;
      }

      @keyframes hero-gradient-shift {
        0% {
          background-position: 0% 50%;
        }
        50% {
          background-position: 100% 50%;
        }
        100% {
          background-position: 0% 50%;
        }
      }

      .hero-description {
        font-size: var(--primitive-font-size-xl);
        color: var(--semantic-text-secondary);
        max-width: 700px;
        margin: 0 auto var(--primitive-spacing-8);
        line-height: 1.6;
      }

      .hero-actions {
        display: flex;
        gap: var(--primitive-spacing-4);
        justify-content: center;
        flex-wrap: wrap;
      }

      .hero-actions a {
        text-decoration: none;
      }

      .features {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: var(--primitive-spacing-6);
        margin-bottom: var(--primitive-spacing-12);
      }

      .feature-card {
        text-align: center;
        padding: var(--primitive-spacing-6);
      }

      .feature-card h3 {
        font-size: var(--primitive-font-size-lg);
        font-weight: var(--primitive-font-weight-bold);
        margin-bottom: var(--primitive-spacing-3);
        color: var(--semantic-text-primary);
      }

      .feature-card p {
        color: var(--semantic-text-secondary);
        font-size: var(--primitive-font-size-sm);
      }

      .quick-links {
        margin-bottom: var(--primitive-spacing-8);
      }

      .quick-links h2 {
        text-align: center;
        font-size: 2rem;
        margin-bottom: var(--primitive-spacing-6);
        color: var(--semantic-text-primary);
      }

      .link-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: var(--primitive-spacing-6);
      }

      .link-card {
        padding: var(--primitive-spacing-6);
        background-color: var(--semantic-surface-card);
        border: 1px solid var(--semantic-border-default);
        border-radius: var(--primitive-border-radius-lg);
        text-decoration: none;
        transition: all var(--semantic-animation-duration-interactive, 150ms)
          var(--semantic-animation-easing-default, cubic-bezier(0.4, 0, 0.2, 1));
      }

      .link-card:hover {
        border-color: var(--semantic-brand-primary);
        box-shadow: var(--primitive-shadow-md);
        transform: translateY(-2px);
      }

      .link-card h3 {
        font-size: var(--primitive-font-size-lg);
        font-weight: var(--primitive-font-weight-bold);
        margin-bottom: var(--primitive-spacing-2);
        color: var(--semantic-text-primary);
      }

      .link-card p {
        color: var(--semantic-text-secondary);
        font-size: var(--primitive-font-size-sm);
      }

      @media (max-width: 768px) {
        .hero-title {
          font-size: 2.5rem;
        }

        .hero-description {
          font-size: var(--primitive-font-size-lg);
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  protected readonly componentCount = getAllComponentMetadata().length;
}
