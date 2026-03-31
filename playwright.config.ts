import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright Configuration
 * Optimized for command-line execution and automated report generation.
 */
export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  // Fails the build on CI if test.only is left in the code
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  
  // REQUIREMENT: A test report must be generated upon test execution.
  // We use the HTML reporter but set 'open: never' so it doesn't interrupt CLI workflows.
  reporter: [['html', { open: 'never' }]],
  
  use: {
    trace: 'on-first-retry',
    // Takes a screenshot automatically if an assertion fails
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  
  // Running only Chromium for faster execution while proving framework capability
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});