import { Locator, Page } from "playwright";
import { expect } from "playwright/test";

export class LoginPage {
    page: Page;
    loginButton: Locator;
    hudlLoginLink: Locator;
    emailInput: Locator;
    passwordInput: Locator;
    emailContinueButton: Locator;
    passwordContinueButton: Locator;
    navGroup: Locator;
    logoutLink: Locator;
    dropDownEmail: Locator;
    usernameError: Locator;
    passwordError: Locator;
    createAccountLink: Locator;
    googleButton: Locator;
    facebookButton: Locator;
    appleButton: Locator;
    forgotPasswordLink: Locator;

    constructor(page: Page) {
        this.page = page;
        this.loginButton = page.locator('a:text("Log in")');
        this.hudlLoginLink = page.locator('a[data-qa-id="login-hudl"]');
        this.createAccountLink = page.locator('a', { hasText: "Create Account" });
        this.forgotPasswordLink = page.locator('a', { hasText: "Forgot Password" });
        this.googleButton = page.locator('button[type="submit"][data-provider="google"]');
        this.facebookButton = page.locator('button[type="submit"][data-provider="facebook"]');
        this.appleButton = page.locator('button[type="submit"][data-provider="apple"]');
        this.emailInput = page.locator('#username');
        this.passwordInput = page.locator('#password');
        this.emailContinueButton = page.locator('button._button-login-id');
        this.passwordContinueButton = page.locator('button._button-login-password');
        this.navGroup = page.locator('div.hui-primarynav__group');
        this.logoutLink = page.locator('a[href="/logout"]');
        this.dropDownEmail = page.locator('.hui-globaluseritem__email');
        this.usernameError = page.locator('#error-element-username');
        this.passwordError = page.locator('#error-element-password');
    }

    async navigate() {
        // wait until dom content is loaded to prevent flakiness
        await this.page.goto('https://www.hudl.com', { waitUntil: 'domcontentloaded' });
        await this.loginButton.click();
        await this.hudlLoginLink.click();
    }

    async verifyRegisterLink() {
        expect.soft(this.createAccountLink).toBeVisible();
    }

    async verifySocialMediaLogin() {
        expect.soft(this.googleButton).toBeVisible();
        expect.soft(this.facebookButton).toBeVisible();
        expect.soft(this.appleButton).toBeVisible();
    }

    async verifyForgotPasswordLink() {
        expect(this.forgotPasswordLink).toBeVisible();
    }

    async login(username: string, password: string) {
        await this.emailInput.fill(username);
        await this.emailContinueButton.click();
        await this.passwordInput.fill(password);
        await this.passwordContinueButton.click();
    }

    async isLoggedIn() {
        // returning the email address in header once logged in
        await this.dropDownEmail.waitFor({ state: 'attached' });
        const result = await this.dropDownEmail.textContent();
        return result
    }

    async badUsername() {
        await this.emailInput.fill('foobar');
        await this.emailContinueButton.click();
        await this.usernameError.waitFor({ state: 'visible' });
        return await this.usernameError.textContent();
    }

    async badPassword(username: string) {
        await this.emailInput.fill(username);
        await this.emailContinueButton.click();
        await this.passwordInput.fill('foobar');
        await this.passwordContinueButton.click();
        await this.passwordError.waitFor({ state: 'visible' });
        return await this.passwordError.textContent();
    }

    async emptyEmail() {
        await this.emailInput.fill('')
        await this.emailContinueButton.click();
    }

    async emptyPassword(username: string) {
        await this.emailInput.fill(username);
        await this.emailContinueButton.click();
        await this.passwordInput.fill('');
        await this.passwordContinueButton.click();
    }

    async takePageScreenshot(screenshotName: string) {
        // compare screenshots to validate error message on empty field
        screenshotName += '.png';
        await this.page.evaluate(() => {
            window.scrollTo({ top: 0 });
        });
        await expect(this.page).toHaveScreenshot(screenshotName, {
            fullPage: true,
            maxDiffPixelRatio: 0.05,
        });
    }
}