describe('Agenda de Contatos', () => {
  beforeEach(() => {
    cy.visit('https://agenda-contatos-react.vercel.app/');
  });

  it('Deve adicionar um novo contato', () => {
    cy.intercept('GET', '**/api/contatos').as('getContacts');

    cy.get('input[placeholder="Nome"]').type('Novo Contato');
    cy.get('input[placeholder="E-mail"]').type('novo@example.com');
    cy.get('input[placeholder="Telefone"]').type('999999999');

    cy.get('button.adicionar[type="submit"]').click(); // updated line to select the correct button

    cy.contains('Novo Contato').should('be.visible');
    cy.contains('novo@example.com').should('be.visible');
    cy.contains('999999999').should('be.visible');
  });

  it('Deve editar um contato existente', () => {
    cy.contains('Editar').first().click();
    cy.get('input[placeholder="Nome"]').clear().type('Contato Editado');
    cy.get('input[placeholder="E-mail"]').clear().type('editado@example.com');
    cy.get('input[placeholder="Telefone"]').clear().type('111111111');
    cy.get('button.alterar[type="submit"]').click(); // updated line to select the correct button
    cy.contains('Contato Editado').should('be.visible');
    cy.contains('editado@example.com').should('be.visible');
    cy.contains('111111111').should('be.visible');
  });

  it('Deve deletar um contato', () => {
    cy.contains('Deletar').first().click();
    cy.get('ul').should('not.contain', 'João Souza');
  });
});
