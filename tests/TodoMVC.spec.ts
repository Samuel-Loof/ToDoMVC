const { test, expect } = require('@playwright/test');

test.describe('TodoMVC tests', () => {
  test.beforeEach(async ({ page }) => {
  
    await page.goto('http://127.0.0.1:5500/');
  });

  test('createTodo', async ({ page }) => {
    let todoInput = page.locator('#input');
    await todoInput.fill('Brad Pitt');
    await todoInput.press('Enter');

    await expect(page.locator('#todoList').locator('text=Brad Pitt')).toBeVisible();
  }); 

  test('verify todo count updates for a single item', async ({ page }) => {
    let todoInput = page.locator('#input');
    await page.locator('#input').fill('Red panda');
    await todoInput.press('Enter');
  
    // Confirm that the page shows "1 item left"
    await expect(page.locator('.todo-count')).toContainText('1 item left');
  
    // Mark the todo as completed
    await page.locator('#todoList li:nth-child(1) .custom-checkbox-label').click();
  
    // Confirm that the page now shows "0 items left"
    await expect(page.locator('.todo-count')).toContainText('0 items left');
  });
  
  test('verify todo count updates correctly with multple items', async ({ page }) => {
  
    const items = ['Brad', 'Pitt', 'Red panda'];
    for (const item of items) {
      await page.locator('#input').fill(item);
      await page.locator('#input').press('Enter');
    }
  
    // Mark the first todo as completed
    await page.locator('#todoList li:nth-child(1) .custom-checkbox-label').click();
  
    // Confirm that the page shows "2 items left"
    await expect(page.locator('.todo-count')).toContainText('2 items left');
  });
  
});


