import { nxE2EPreset } from '@nx/cypress/plugins/cypress-preset';
import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    ...nxE2EPreset(__filename, {
      cypressDir: 'src',
      webServerCommands: {
        default: 'pnpm exec nx run showcase:serve',
        production: 'pnpm exec nx run showcase:serve-static',
      },
      ciWebServerCommand: 'pnpm exec nx run showcase:serve-static',
      ciBaseUrl: 'http://localhost:4200',
    }),
    baseUrl: 'http://localhost:4200',
    specPattern: 'apps/showcase-e2e/src/e2e/**/*.cy.ts',
    supportFile: 'apps/showcase-e2e/src/support/e2e.ts',
  },
});
