import { Builder, By, until, WebDriver } from 'selenium-webdriver';
import 'chromedriver';

describe('Mon Application Angular', () => {
  let driver: WebDriver;

  beforeAll(async () => {
    driver = await new Builder()
      .forBrowser('chrome')
      .build();
  });

  afterAll(async () => {
    if (driver) {
      await driver.quit();
    }
  });

  beforeEach(async () => {
    await driver.get('http://localhost:4200');
  });

  it('devrait afficher le titre de l\'application', async () => {
    const title = await driver.findElement(By.css('h1')).getText();
    expect(title).toBeDefined();
  });
});
