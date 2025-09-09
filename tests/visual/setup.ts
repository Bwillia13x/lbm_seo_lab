import { test as setup } from '@playwright/test';

// Setup for visual regression tests
setup('global setup', async ({}) => {
  // Any global setup needed for visual tests
  console.log('Setting up visual regression tests...');
});
