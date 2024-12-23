import { browser, by, element, ElementFinder } from 'protractor';

export class AppPage {
  navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl) as Promise<unknown>;
  }

  getTitleText(): Promise<string> {
    return element(by.css('h1')).getText() as Promise<string>;
  }

  async login(username: string, password: string): Promise<void> {
    await element(by.id('username')).sendKeys(username);
    await element(by.id('password')).sendKeys(password);
    await element(by.css('button[type="submit"]')).click();
  }

  getWelcomeMessage(): ElementFinder {
    return element(by.css('.welcome-message'));
  }
}
