import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';

// Load env variables from the .env file
dotenv.config();

export default defineConfig({
  testDir: './tests/e2e',
  outputDir: './tempArtifacts',
  testMatch: /.*\.(test)\.(ts|js)$/,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 0 : 0,
  workers: process.env.CI ? 15 : 1,
  reporter: [
    ['list'],
    ['html', { outputFolder: './testResults' }]
  ],
  /* Shared settings for all the projects below. */
  use: {
    video: 'on',
    trace: 'on',
    actionTimeout: 60 * 1000,
    headless: true,
    viewport: {
      width: 1600,
      height: 900
    },
  },

  fullyParallel: true,
  projects: [
    {
      name: 'Chrome',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
