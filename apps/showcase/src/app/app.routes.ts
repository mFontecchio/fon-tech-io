import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent),
  },
  {
    path: 'components',
    loadComponent: () => import('./pages/components/components-overview.component').then(m => m.ComponentsOverviewComponent),
  },
  {
    path: 'components/:category/:name',
    loadComponent: () => import('./pages/components/component-detail.component').then(m => m.ComponentDetailComponent),
  },
  {
    path: 'theme-builder',
    loadComponent: () => import('@ui-suite/theme-builder').then(m => m.ThemeBuilderComponent),
  },
  {
    path: 'getting-started',
    loadComponent: () => import('./pages/getting-started/getting-started-overview.component').then(m => m.GettingStartedOverviewComponent),
  },
  {
    path: 'getting-started/installation',
    loadComponent: () => import('./pages/getting-started/installation.component').then(m => m.InstallationComponent),
  },
  {
    path: 'getting-started/usage',
    loadComponent: () => import('./pages/getting-started/usage.component').then(m => m.UsageComponent),
  },
  {
    path: 'getting-started/theming',
    loadComponent: () => import('./pages/getting-started/theming.component').then(m => m.ThemingComponent),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
