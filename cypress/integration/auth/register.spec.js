it('Registers the user', () => {
  cy.server();
  cy.route('POST', '/cash36/auth/user/register').as('register');

  cy.visit('/');
  cy.location('pathname').should('equal', '/login');

  cy.contains('Sign up').click();

  cy.location('pathname').should('equal', '/register');

  cy.get('input[name="username"]').type('username2@example.com');
  cy.get('input[name="password"]').type('Goodusername13@');
  cy.get('input[name="passwordConfirmation"]').type('Goodusername13@');

  cy.contains('Register').click();

  cy.wait('@register').then(response => {
    expect(response.status).to.equal(201);
  });

  cy.request('/cash36/compliance/confirm/public/check?code=e36isMagic').then(
    resp => {
      expect(resp.status).to.eq(200);
    }
  );

  cy.contains('Back to sign in').click();

  cy.location('pathname').should('equal', '/login');
});
