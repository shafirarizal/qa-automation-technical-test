import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { ProductsPage } from '../../pages/ProductsPage';
import { CartPage } from '../../pages/CartPage';
import { CheckoutPage } from '../../pages/CheckoutPage';

test.describe('Web UI Automation - Checkout Flow', () => {
  let loginPage: LoginPage;
  let productsPage: ProductsPage;
  let cartPage: CartPage;
  let checkoutPage: CheckoutPage;

  // Initialize Page Objects before each test
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    productsPage = new ProductsPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);
  });

  test('POSITIVE: Complete E2E checkout flow successfully', async ({ page }) => {
    // 1. Navigate to login page & 2. Log in using credentials
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    
    // 3. Confirm products page loads successfully
    await productsPage.verifyPageLoaded();
    
    // 4. Add product & 5. Verify correct item appears in cart
    await productsPage.addFirstProductToCart();
    await productsPage.goToCart();
    await cartPage.verifyItemInCart();
    
    // 6. Proceed to checkout and complete fields
    await cartPage.proceedToCheckout();
    await checkoutPage.fillCheckoutInformation('John', 'Doe', '12345');
    
    // 7. Finalise purchase & 8. Validate order confirmation message
    await checkoutPage.finishCheckout();
    await checkoutPage.verifyOrderSuccess();
  });

  test('NEGATIVE: Login with locked out user credentials should fail', async () => {
    // Validating authentication rejection
    await loginPage.goto();
    await loginPage.login('locked_out_user', 'secret_sauce');
    
    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toContainText('Sorry, this user has been locked out.');
  });

  test('EDGE: Checkout validation with missing postal code', async () => {
    // Validating form field requirements
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    await productsPage.addFirstProductToCart();
    await productsPage.goToCart();
    await cartPage.proceedToCheckout();

    // Intentionally leaving zip code blank to trigger validation
    await checkoutPage.fillCheckoutInformation('John', 'Doe', '');
    
    await expect(checkoutPage.errorMessage).toBeVisible();
    await expect(checkoutPage.errorMessage).toContainText('Error: Postal Code is required');
  });
});