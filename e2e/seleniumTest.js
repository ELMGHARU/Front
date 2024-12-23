const { Builder, By } = require('selenium-webdriver');
const assert = require('assert');

(async function example() {
    // Démarre le navigateur
    let driver = await new Builder().forBrowser('chrome').build();

    try {
        // Ouvre la page
        await driver.get('http://localhost:4200');

        // Récupère le titre de la page
        let title = await driver.getTitle();

        // Vérifie si le titre est celui attendu
        assert.strictEqual(title, 'AngularStarter', 'Le titre de la page est incorrect');

        console.log("Test réussi : Le titre est correct");
    } catch (err) {
        console.error("Erreur de test: " + err);
    } finally {
        // Ferme le navigateur
        await driver.quit();
    }
})();
