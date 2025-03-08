import { test, expect } from '@playwright/test';
import { LoginPage } from '../page-objects/login-page';

// username and password from .env file
const username = process.env.HUDL_USERNAME || '';
const password = process.env.HUDL_PASSWORD || '';

test.describe('Login Page Functionality', () => {
    test('should allow login with valid credentials', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.navigate();
        await loginPage.login(username, password);
        const loggedIn = await loginPage.isLoggedIn();
        expect(loggedIn).toBe(username);
    });

    test('should display error for invalid username', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.navigate();
        const usernameErrorMsg = await loginPage.badUsername();
        expect(usernameErrorMsg?.trim()).toContain('Enter a valid email.');
    });

    test('should display error for invalid password', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.navigate();
        const passwordErrorMsg = await loginPage.badPassword(username);
        expect(passwordErrorMsg?.trim()).toContain('Your email or password is incorrect. Try again.');
    });

    test('should display error when username field is empty', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.navigate();
        await loginPage.emptyEmail();
        await loginPage.takePageScreenshot('login-username-empty-error');
    });

    test('should display error when password field is empty', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.navigate();
        await loginPage.emptyPassword(username);
        await loginPage.takePageScreenshot('login-password-empty-error');
    });

    test('should display OAuth and account links on the login page', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.navigate();
        await page.waitForLoadState('load');
        await loginPage.verifyRegisterLink();
        await loginPage.verifySocialMediaLogin();
        await loginPage.emailInput.fill(username);
        await loginPage.emailContinueButton.click();
        await loginPage.verifyForgotPasswordLink();
    });
});