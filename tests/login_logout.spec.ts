import { test, expect } from '@playwright/test';
import * as dotenv from 'dotenv';
import LoginPage from '../pages/loginPage';

let loginPage: LoginPage;

test.beforeAll(async () => {
  dotenv.config();
});

test.beforeEach(async ({page}) => {
  loginPage = new LoginPage(page);
  await loginPage.open();
});

test.describe('login tests @login', () => {
  test('login with valid credentials @positive', async () => {
    await loginPage.logIn();

    await expect(
      loginPage.page.locator(`xpath=//header//a[@href='/u/${process.env.TEST_USERNAME}']`)
    ).toBeVisible();
  });

  test('login with only username or password @negative', async () => {
    await loginPage.page.fill(loginPage.usernameField, process.env.TEST_USERNAME as string);

    await loginPage.logInBtn.click();

    let passwordHint = await loginPage.getFieldHint(loginPage.passwordField);

    expect(passwordHint).toBe('required');

    await loginPage.page.fill(loginPage.usernameField, '');
    await loginPage.page.fill(loginPage.passwordField, process.env.TEST_PASSWORD as string);

    await loginPage.logInBtn.click();

    let usernameHint = await loginPage.getFieldHint(loginPage.usernameField);

    expect(usernameHint).toBe('required');
  });

  test('login with invalid password @negative', async () => {
    await loginPage.page.fill(loginPage.usernameField, process.env.TEST_USERNAME as string);
    await loginPage.page.fill(loginPage.passwordField, 'invalid password');

    await loginPage.logInBtn.click();

    await expect(loginPage.passwordErrorNotification).toBeVisible();

    const notificationText = await loginPage.passwordErrorNotification.textContent();
    await expect(notificationText).toBe('invalid password');
  });

  test('login with no credentials @negative', async () => {
    await loginPage.logInBtn.click();

    const usernameHint = await loginPage.getFieldHint(loginPage.usernameField);
    const passwordHint = await loginPage.getFieldHint(loginPage.passwordField);

    expect(usernameHint).toBe("required");
    expect(passwordHint).toBe("required");
  });

  test('log out @positive', async () => {
    await loginPage.logIn();

    await expect(
      loginPage.page.locator(`xpath=//header//a[@href='/u/${process.env.TEST_USERNAME}']`)
    ).toBeVisible();

    await loginPage.logOut();

    await expect(loginPage.loginLink).toBeVisible();
    await expect(loginPage.signupLink).toBeVisible();
  });

});