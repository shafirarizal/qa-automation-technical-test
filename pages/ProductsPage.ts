import { Page, Locator, expect } from '@playwright/test';

export class ProductsPage {
  readonly page: Page;
  readonly title: Locator;
  readonly firstAddToCartButton: Locator;
  readonly cartIcon: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.locator('.title');
    this.firstAddToCartButton = page.locator('button.btn_inventory').first();
    this.cartIcon = page.locator('.shopping_cart_link');
  }

  /** Asserts that the products page has loaded successfully */
  async verifyPageLoaded() {
    await expect(this.title).toHaveText('Products');
  }

  /** Adds the first available product to the shopping cart */
  async addFirstProductToCart() {
    await this.firstAddToCartButton.click();
  }

  /** Clicks the cart icon to navigate to the cart page */
  async goToCart() {
    await this.cartIcon.click();
  }
}