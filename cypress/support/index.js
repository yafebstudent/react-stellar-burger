beforeEach(function() {
  if (Cypress.config("firstRun")) {
    cy.exec("your command");
    Cypress.config("firstRun", false);
  }
});

afterEach(function() {
  Cypress.config("firstRun", true);
});
