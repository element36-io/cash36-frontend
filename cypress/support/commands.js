import 'cypress-file-upload';

Cypress.Commands.add(
  'uploadFile',
  (fixtureFileName, inputSelector, mimeType = '') => {
    return cy.get(inputSelector).then(subject => {
      return cy
        .fixture(fixtureFileName, 'base64')
        .then(Cypress.Blob.base64StringToBlob)
        .then(blob => {
          const el = subject[0];
          const nameSegments = fixtureFileName.split('/');
          const name = nameSegments[nameSegments.length - 1];
          const testFile = new File([blob], name, { type: mimeType });
          const dataTransfer = new DataTransfer();
          dataTransfer.items.add(testFile);
          el.files = dataTransfer.files;
          el.dispatchEvent(new Event('change'));
          return subject;
        })
        .then(() => cy.wait(1000));
    });
  }
);

Cypress.Commands.add(
  'attachFile',
  {
    prevSubject: 'element'
  },
  ($input, fname, type) => {
    cy.fixture(fname).then(content => {
      return Cypress.Blob.base64StringToBlob(content).then(blob => {
        const file = new File([blob], fname, { type });
        const dt = new DataTransfer();
        dt.items.add(file);
        $input[0].files = dt.files;
      });
    });
  }
);

Cypress.Commands.add('registerUser', (username, password) => {
  cy.server();
  cy.route('POST', '/cash36/auth/user/register').as('register');
  cy.visit('/');
  cy.location('pathname').should('equal', '/login');

  cy.contains('Sign up').click();

  cy.location('pathname').should('equal', '/register');

  cy.get('input[name="username"]').type(username);
  cy.get('input[name="password"]').type(password);
  cy.get('input[name="passwordConfirmation"]').type(password);

  cy.contains('Register').click();

  cy.wait('@register').then(response => {
    if (response.status === 400) {
      cy.log('its 400');
    } else {
      cy.contains('Back to sign in').click();

      cy.location('pathname').should('equal', '/login');
    }
  });

  // cy.request(
  //   'http://localhost:8090/cash36/compliance/confirm/public/check?code=e36isMagic'
  // ).then(resp => {
  //   expect(resp.status).to.eq(200);
  // });
});
