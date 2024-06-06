describe('Agenda de Contatos', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000'); 
  });

  it('Deve adicionar um novo contato', () => {
    cy.get('input[name="name"]').type('Novo Contato');
    cy.get('input[name="email"]').type('novo@example.com');
    cy.get('input[name="phone"]').type('999999999');
    cy.contains('Adicionar').click();
    cy.contains('Novo Contato').should('be.visible');
    cy.contains('novo@example.com').should('be.visible');
    cy.contains('999999999').should('be.visible');
  });

  it('Deve editar um contato existente', () => {
    cy.contains('Editar').first().click();
    cy.get('input[name="name"]').clear().type('Contato Editado');
    cy.get('input[name="email"]').clear().type('editado@example.com');
    cy.get('input[name="phone"]').clear().type('111111111');
    cy.contains('Atualizar').click();
    cy.contains('Contato Editado').should('be.visible');
    cy.contains('editado@example.com').should('be.visible');
    cy.contains('111111111').should('be.visible');
  });

  it('Deve deletar um contato', () => {
    cy.contains('Deletar').first().click();
    cy.get('ul').should('not.contain', 'João Souza');
  });
});
