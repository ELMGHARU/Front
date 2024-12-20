import { Builder, By, until } from 'selenium-webdriver';
import { Options } from 'selenium-webdriver/chrome';

describe('Selenium Integration with Jasmine', () => {
  let driver;

  beforeAll(async () => {
    const chromeOptions = new Options();
    driver = await new Builder()
      .forBrowser('chrome')
      .setChromeOptions(chromeOptions)
      .build();
  });

  afterAll(async () => {
    await driver.quit();
  });

  it('should open the Angular app and check the title', async () => {
    await driver.get('http://localhost:4200'); // Lancer l'application Angular
    const title = await driver.getTitle();
    expect(title).toBe('Angular App'); // Assurez-vous que le titre est correct
  });

  it('should find an element by id', async () => {
    const loginButton = await driver.findElement(By.id('login-button'));
    expect(loginButton).toBeTruthy(); // Vérifiez que le bouton de login existe
  });
});
