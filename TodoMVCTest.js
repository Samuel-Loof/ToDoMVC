const { test, expect } = require('@playwright/test');

test.describe('Todo Application Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Adjust the URL to where your todo application is hosted
    await page.goto('http://127.0.0.1:5500/');
  });

  test('create a new todo item', async ({ page }) => {
    // Replace '#input' with the correct selector for your input field if different
    let todoInput = page.locator('#input');
    await todoInput.fill('Learn Playwright');
    await todoInput.press('Enter');

    // Verify the new todo item is added to the list
    // Adjust the selector as needed to target the list or individual todo items
    await expect(page.locator('#todoList').locator('text=Learn Playwright')).toBeVisible();
  });

  

});
