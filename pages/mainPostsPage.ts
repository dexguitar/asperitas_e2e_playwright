import { Page, Locator } from "@playwright/test";
import BasePage from "./basePage";

export default class MainPostsPage extends BasePage {
    readonly page: Page;

    readonly createPostBtn: Locator;

    constructor(page: Page) {
        super(page);

        this.page = page;

        this.createPostBtn = page.locator("xpath=(//a[contains(@class, 'Button') and @href='/createpost'])[2]");
    }

    async goToCreatePostPage(): Promise<void> {
        await this.createPostBtn.click();
    }
}