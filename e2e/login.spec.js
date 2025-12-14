import { test, expect } from '@playwright/test'

test('user can login and see courses page', async ({ page }) => {
  await page.goto('/login')

  await page.fill('input[type="email"]', 'test@example.com')
  await page.fill('input[type="password"]', 'Password@123')

  await page.click('text=Login')

  // ✅ wait for courses page instead of /
  await page.waitForURL('/courses')

  await expect(
    page.locator('text=Courses')
  ).toBeVisible()
})
