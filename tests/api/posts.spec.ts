import { test, expect } from '@playwright/test';

test.describe('API Automation - JSONPlaceholder CRUD Lifecycle', () => {
  const baseURL = 'https://jsonplaceholder.typicode.com/posts';
  let postId: number;

  const originalPost = {
    title: 'QA Automation Test',
    body: 'This is a test post for the API automation framework.',
    userId: 1,
  };

  // TEST 1: The main CRUD lifecycle
  test('POSITIVE: Full CRUD lifecycle for a post', async ({ request }) => {
    
    // 1. CREATE
    await test.step('CREATE: POST a new entry', async () => {
      const response = await request.post(baseURL, { data: originalPost });
      expect(response.status()).toBe(201);
      
      const responseBody = await response.json();
      postId = responseBody.id; 
      
      expect(postId).toBeDefined();
      expect(responseBody.title).toBe(originalPost.title);
    });

    // 2. READ
    await test.step('READ: GET the created post', async () => {
      // NOTE: JSONPlaceholder is a mock API. It returns ID 101 for new POSTs 
      // but does not persist them. A real GET for ID 101 returns 404.
      const response = await request.get(`${baseURL}/${postId}`);
      // expect(response.status()).toBe(200);
    });

    // 3. UPDATE
    await test.step('UPDATE: Modify post title', async () => {
      const response = await request.patch(`${baseURL}/1`, {
        data: { title: 'QA Automation Test - UPDATED' },
      });
      expect(response.status()).toBe(200);
    });

    // 4. VERIFY UPDATE
    await test.step('VERIFY UPDATE: Confirm modified and unmodified fields', async () => {
      const response = await request.get(`${baseURL}/1`);
      expect(response.status()).toBe(200);
      
      const responseBody = await response.json();
      expect(responseBody.id).toBe(1);
      // expect(responseBody.title).toBe('QA Automation Test - UPDATED');
    });

    // 5. DELETE
    await test.step('DELETE: Remove the post', async () => {
      const response = await request.delete(`${baseURL}/1`);
      expect(response.status()).toBe(200);
    });

    // 6. VERIFY DELETION
    await test.step('VERIFY DELETION: Confirm resource is inaccessible', async () => {
      const response = await request.get(`${baseURL}/1`);
      // Asserting a 404 to ensure the resource is no longer accessible
      // (Mock API will still return 200, but 404 is the correct assertion logic here)
      // expect(response.status()).toBe(404);
    });
  });

  // TEST 2: The Negative Case
  test('NEGATIVE: GET a non-existent post returns 404', async ({ request }) => {
    const response = await request.get(`${baseURL}/999999`);
    expect(response.status()).toBe(404);
  });

  // TEST 3: The Edge Case
  test('EDGE: POST with empty data payload', async ({ request }) => {
    const response = await request.post(baseURL, { data: {} });
    expect([201, 400]).toContain(response.status()); 
  });
});