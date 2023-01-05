import { Page, Locator } from "@playwright/test";
import Post from "../data/post";
import BasePage from "./basePage";

export default class CreatePostPage extends BasePage {
    readonly page: Page;

    readonly linkTypeBtn: Locator;
    readonly textTypeBtn: Locator;

    readonly titleField: string;
    readonly urlField: string;
    readonly textField: string;

    readonly createPostBtn: Locator;

    constructor(page: Page) {
        super(page);

        this.page = page;

        this.linkTypeBtn = page.locator("xpath=//label[@for='link']");
        this.textTypeBtn = page.locator("xpath=//label[@for='text']");

        this.titleField = "//input[@name='title']";
        this.urlField = "//input[@name='url']";
        this.textField = "//textarea[@name='text']";

        this.createPostBtn = page.locator("xpath=//button[text()='create post']");
    }

    async createPost(post: Post): Promise<void> {
        if (post.type === "link") {
            this.linkTypeBtn.click();
            this.page.fill(this.urlField, post.url || '');
        } else if (post.type === "text") {
            this.textTypeBtn.click();
            this.page.fill(this.textField, post.text || '');
        }

        await this.page.locator('select[name=category]').selectOption(post.category);

        await this.page.fill(this.titleField, post.title || '');

        await this.createPostBtn.click();
    }
}