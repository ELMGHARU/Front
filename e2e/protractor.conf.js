exports.config = {
  // Adresse du Selenium Server
  seleniumAddress: 'http://localhost:4444/wd/hub',

  // Chemin vers vos fichiers de test
  specs: ['src/specs/*.e2e-spec.ts'],

  // Configuration du navigateur
  capabilities: {
    browserName: 'chrome',
  },

  // Framework utilisé pour les tests
  framework: 'jasmine',

  // Options pour Jasmine
  jasmineNodeOpts: {
    defaultTimeoutInterval: 30000,
  },

  // Configure le compilateur TypeScript
  onPrepare: () => {
    require('ts-node').register({
      project: 'e2e/tsconfig.json', // Chemin vers votre fichier tsconfig
    });
  },
};
