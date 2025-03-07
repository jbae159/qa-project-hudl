import { test, expect } from '@playwright/test';
import { LoginPage } from '../page-objects/login-page';
import { log } from 'console';

const username = process.env.HUDL_USERNAME || '';
const password = process.env.HUDL_PASSWORD || '';

test.describe('Login Test Suiite', () => {
    test('Login with valid credentials', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.navigate();
        await loginPage.login(username, password);
        const loggedIn = await loginPage.isLoggedIn();
        expect(loggedIn).toBe(username);
    });

    test('Login with invalid username', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.navigate();
        const usernameErrorMsg = await loginPage.badUsername();
        expect(usernameErrorMsg).toBe(true)
    })

    test('Login with invalid password', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.navigate();
        const passwordErrorMsg = await loginPage.badPassword(username);
        expect(passwordErrorMsg).toBe(true)
    })

    test('Login with empty username field', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.navigate();
        await loginPage.emptyEmail();
        await loginPage.takePageScreenshot('login-username-empty-error');
    })

    test('Login with empty password field', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.navigate();
        await loginPage.emptyPassword(username);
        await loginPage.takePageScreenshot('login-password-empty-error');
    })
})