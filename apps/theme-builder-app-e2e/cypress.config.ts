import { nxE2EPreset } from '@nx/cypress/plugins/cypress-preset';
import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    ...nxE2EPreset(__filename, {
      cypressDir: 'src',
      webServerCommands: {
        default: 'pnpm exec nx run theme-builder-app:serve --port=4300',
        production: 'pnpm exec nx run theme-builder-app:serve-static --port=4300',
      },
      ciWebServerCommand: 'pnpm exec nx run theme-builder-app:serve-static --port=4300',
      ciBaseUrl: 'http://localhost:4300',
    }),
    baseUrl: 'http://localhost:4300',
  },
});
