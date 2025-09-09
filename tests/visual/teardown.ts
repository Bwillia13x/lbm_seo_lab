import { test as teardown } from '@playwright/test';

// Teardown for visual regression tests
teardown('global teardown', async ({}) => {
  // Any global cleanup needed for visual tests
  console.log('Cleaning up visual regression tests...');
});
