it('Logs in the user', () => {
  cy.request(
    'http://localhost:8090/cash36/compliance/confirm/public/check?code=e36isMagic'
  ).then(resp => {
    expect(resp.status).to.eq(200);
  });

  cy.visit('/');
  cy.location('pathname').should('equal', '/login');

  cy.get('input[name="username"]').type('fox@example.com');
  cy.get('input[name="password"]').type('Goodusername13@');

  cy.contains('Login').click();

  cy.location('pathname').should('equal', '/');
});
