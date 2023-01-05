import { Page, Locator } from "@playwright/test";
import BasePage from "./basePage";

export default class LoginPage extends BasePage {
    readonly page: Page;

    readonly usernameField: string;
    readonly usernameHint: Locator;

    readonly passwordField: string;
    readonly passwordHint: Locator;

    readonly logInBtn: Locator;

    readonly passwordErrorNotification: Locator;

    constructor(page: Page) {
        super(page);

        this.page = page;

        this.url = '/login';

        this.usernameField = "//input[@name='username']";
        this.passwordField = "//input[@name='password']";

        this.logInBtn = page.locator("xpath=//button[text()='log in']");

        this.passwordErrorNotification = page.locator(
            "xpath=//*[contains(@class, 'ErrorNotification') and text()='invalid password']"
        );
    }

    async getFieldHint(fieldLocator: string): Promise<any> {
        const el = this.page.locator(`xpath=${fieldLocator}/preceding-sibling::span`);
        return await el.textContent() as string;
    }

    async logIn(): Promise<void> {
        await this.page.fill(this.usernameField, process.env.TEST_USERNAME as string);
        await this.page.fill(this.passwordField, process.env.TEST_PASSWORD as string);

        await this.logInBtn.click();
    }

    async logOut(): Promise<void> {
        await this.page.locator(`xpath=${this.logoutLinkPath}`).click();
    }
}