import { test, expect } from '@playwright/test';
import * as dotenv from 'dotenv';
import { PostCategories, PostTypes } from '../data/enums';
import Post from '../data/post';
import CreatePostPage from '../pages/createPostPage';
import LoginPage from '../pages/loginPage';
import MainPostsPage from '../pages/mainPostsPage';

let mainPostsPage: MainPostsPage;
let loginPage: LoginPage;
let createPostPage: CreatePostPage;

test.beforeAll(async () => {
  dotenv.config();
});

test.beforeEach(async ({page}) => {
  loginPage = new LoginPage(page);
  mainPostsPage = new MainPostsPage(page);
  createPostPage = new CreatePostPage(page);

  await loginPage.open();
  await loginPage.logIn();
});

test.describe('posts tests @posts', () => {
  test('create post @positive', async () => {
    const validLinkPost = new Post(
      PostTypes.LINK,
      PostCategories.MUSIC,
      'Valid link post',
      'http://example.com'
    );

    await mainPostsPage.goToCreatePostPage();

    await createPostPage.createPost(validLinkPost);
  });
});

// test.describe('toggle theme tests', () => {
  // test('check toggle @positive @themeToggle', async ({page}) => {
    // const bodyColor = await page.$eval('body', el => {
    //   getComputedStyle(el).backgroundColor;
    // });

    // console.log(bodyColor);
    
    // expect(bodyColor).toBe('rgb(244, 246, 248)');

    // await loginPage.themeToggle.click();

    // expect(bodyColor).toBe('rgb(27, 27, 27)');
//   });
// });
