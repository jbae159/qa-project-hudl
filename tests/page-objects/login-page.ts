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

    constructor(page: Page) {
        this.page = page;
        this.loginButton = page.locator('a:text("Log in")');
        this.hudlLoginLink = page.locator('a[data-qa-id="login-hudl"]');
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
        await this.page.goto('https://www.hudl.com');
        await this.loginButton.click();
        await this.hudlLoginLink.click();
    }

    async login(username: string, password: string) {
        await this.emailInput.fill(username);
        await this.emailContinueButton.click();
        await this.passwordInput.fill(password);
        await this.passwordContinueButton.click();
    }

    async isLoggedIn() {
        await this.dropDownEmail.waitFor({ state: 'attached' });
        const result = await this.dropDownEmail.textContent();
        return result
    }

    async badUsername() {
        await this.emailInput.fill('foobar');
        await this.emailContinueButton.click();
        await this.usernameError.waitFor({ state: 'visible' });
        return true
    }

    async badPassword(username: string) {
        await this.emailInput.fill(username);
        await this.emailContinueButton.click();
        await this.passwordInput.fill('foobar');
        await this.passwordContinueButton.click();
        await this.passwordError.waitFor({ state: 'visible' });
        return true
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