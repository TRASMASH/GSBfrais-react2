// @ts-check
import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/GSB Frais/);
});

test('get started link', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  // Click the get started link.
  await page.getByRole('link', { name: 'connexion' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Connexion' })).toBeVisible();
});

test('Loginwith valid credential', async ({ page }) => {
  await page.goto('http://localhost:3000/login');

  await page.fill('input[name="login"]', 'Andre');
  await page.fill('input[name="password"]', 'secret');
  await page.click('button[type="submit"]');
  await expect(page).toHaveURL('http://localhost:3000/dashboard');
});

test('Login with invalid credential', async ({ page }) => {
  await page.goto('http://localhost:3000/login');
  await page.fill('input[name="login"]', 'wrongUser');
  await page.fill('input[name="password"]', 'wrongPassword');
  await page.click('button[type="submit"]');

  
  page.on('dialog', async (dialog) => {
    expect(dialog.type()).toBe('alert');
    expect(dialog.message()).toBe('Echec de la connexion');
    await dialog.dismiss();
  });
});
test('rafraichir', async ({ page }) => {
  await page.goto('http://localhost:3000/login');

  await page.fill('input[name="login"]', 'Andre');
  await page.fill('input[name="password"]', 'secret');
  await page.click('button[type="submit"]');
  await expect(page).toHaveURL('http://localhost:3000/dashboard');

  await page.reload();
  await expect(page).toHaveURL('http://localhost:3000/dashboard');
});

