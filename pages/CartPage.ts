import { Page, Locator, expect } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly cartItem: Locator;
  readonly checkoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartItem = page.locator('.cart_item');
    this.checkoutButton = page.locator('[data-test="checkout"]');
  }

  /** Asserts that an item is visible within the cart */
  async verifyItemInCart() {
    await expect(this.cartItem).toBeVisible();
  }

  /** Proceeds to the checkout flow */
  async proceedToCheckout() {
    await this.checkoutButton.click();
  }
}