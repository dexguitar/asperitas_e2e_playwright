import { expect, Page, Locator } from "@playwright/test";

export default class BasePage {
    readonly page: Page;

    protected url?: string;

    readonly homeLink: Locator;
    readonly themeToggle: Locator;
    readonly loginLink: Locator;
    readonly signupLink: Locator;

    readonly logoutLinkPath: string;
    readonly userLinkPath: string;

    constructor(page: Page) {
        this.page = page;

        this.homeLink = page.locator("xpath=//header/a[text()='asperitas']");
        this.themeToggle = page.locator("xpath=//span[contains(@class, 'DarkButton')]");
        this.loginLink = page.locator("xpath=//a[@href='/login']");
        this.signupLink = page.locator("xpath=//a[@href='/signup']");

        this.logoutLinkPath = "//span[text()='log out']";
        this.userLinkPath = `//a[@href='/u/${process.env.TEST_USERNAME}']`;
    }

    async open(): Promise<void> {
        await this.page.goto(`${process.env.BASE_URL}${this.url || "/"}`);
    }

    async toggleTheme(): Promise<void> {
        await this.themeToggle.click();
    }
}