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
