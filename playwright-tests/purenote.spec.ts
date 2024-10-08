import dotenv from "dotenv";
import { test, expect } from "@playwright/test";

dotenv.config();

const purenoteUrl = process.env.PURENOTE_ROOT_URL || "https://purenote.io";
const firebaseTimeout = { timeout: 20000 };

test("has title and logo", async ({ page }) => {
  await page.goto(purenoteUrl);

  await expect(page).toHaveTitle(/Pure Note/);

  const navbarBrand = page.locator('a.navbar-brand[href="/"]');
  await expect(navbarBrand).toBeVisible();

  const logoImage = navbarBrand.locator('img[src="/logo-name.png"]');
  await expect(logoImage).toBeVisible();
});

test("login", async ({ page, isMobile }) => {
  const email = "fengzhe1983+pntest1@gmail.com";
  const password = "XAX.pea!axe7ypz!nct";

  await page.goto(purenoteUrl);

  if (isMobile) {
    await page.click('button.navbar-toggler[aria-label="Toggle navigation"]');
    await page.waitForSelector('a.btn:has-text("Login")');
  }

  await page.click('a.btn:has-text("Login")');
  await page.fill('input[name="email"]', email);
  await page.fill('input[name="password"]', password);
  await page.click('button:has-text("Login")');

  const selector = isMobile ? `div.notes-list` : `p:has-text("${email}")`;
  await page.waitForSelector(selector, firebaseTimeout);
  await expect(page.locator(selector)).toBeVisible();
});

test("register", async ({ page, isMobile }) => {
  const email = `fengzhe1983+pntest${Date.now()}tobedeleted@gmail.com`;
  const password = "test12__sdfsdaf*dtobedeleted";

  await page.goto(purenoteUrl);

  if (isMobile) {
    await page.click('button.navbar-toggler[aria-label="Toggle navigation"]');
    await page.waitForSelector('a.btn:has-text("Login")');
  }

  await page.click('a.btn:has-text("Register")');
  await page.fill('input[name="email"]', email);
  await page.fill('input[name="password"]', password);
  await page.fill('input[name="confirmpassword"]', password);
  await page.click('button:has-text("Register")');

  const selector = isMobile ? `div.notes-list` : `p:has-text("${email}")`;
  await page.waitForSelector(selector, firebaseTimeout);
  await expect(page.locator(selector)).toBeVisible();
});
