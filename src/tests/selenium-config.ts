import { Builder, WebDriver } from 'selenium-webdriver';
import { Options } from 'selenium-webdriver/chrome';

export class SeleniumConfig {
  private driver: WebDriver;

  // Méthode d'initialisation pour configurer et créer l'instance de WebDriver
  async setup() {
    try {
      const chromeOptions = new Options();

      // Optionnel : Configuration du navigateur pour le mode sans tête (headless)
      chromeOptions.addArguments('--headless');  // Lancer Chrome sans interface graphique
      chromeOptions.addArguments('--disable-gpu');  // Désactiver le GPU (utile pour certains environnements sans affichage)
      chromeOptions.addArguments('--window-size=1920x1080');  // Spécifier la taille de la fenêtre du navigateur

      // Création de l'instance WebDriver
      this.driver = await new Builder()
        .forBrowser('chrome')
        .setChromeOptions(chromeOptions)
        .build();

      console.log('Le WebDriver a été initialisé avec succès');
    } catch (error) {
      console.error('Erreur lors de la configuration du WebDriver:', error);
      throw error;  // Relancer l'erreur pour l'attraper dans les tests
    }
  }

  // Méthode pour fermer proprement le driver après utilisation
  async tearDown() {
    try {
      await this.driver.quit();
      console.log('Le WebDriver a été correctement fermé');
    } catch (error) {
      console.error('Erreur lors de la fermeture du WebDriver:', error);
    }
  }

  // Getter pour obtenir l'instance du driver
  getDriver() {
    return this.driver;
  }
}
