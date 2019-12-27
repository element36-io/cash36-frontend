import './commands';

// run before all tests, register many users
before(() => {
  cy.registerUser('anon@e36.io', 'Goodusername13@');
  cy.registerUser('mouse@e36.io', 'Goodusername13@');
  cy.registerUser('fox@e36.io', 'Goodusername13@');
  cy.registerUser('elephant@e36.io', 'Goodusername13@');
  cy.registerUser('whale@e36.io', 'Goodusername13@');
});
