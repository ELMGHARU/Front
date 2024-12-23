import { browser, by, element } from 'protractor';

describe('App Tests', () => {
  beforeEach(async () => {
    await browser.get('/');
  });

  it('should display welcome message', async () => {
    const heading = element(by.css('h1'));
    expect(await heading.getText()).toEqual('Welcome');
  });

  it('should login successfully', async () => {
    // Trouver les éléments
    const usernameInput = element(by.id('username'));
    const passwordInput = element(by.id('password'));
    const submitButton = element(by.css('button[type="submit"]'));

    // Remplir le formulaire
    await usernameInput.sendKeys('testuser');
    await passwordInput.sendKeys('password123');
    await submitButton.click();

    // Vérifier le résultat
    const welcomeMessage = element(by.css('.welcome-message'));
    expect(await welcomeMessage.getText()).toContain('Bienvenue');
  });
});
