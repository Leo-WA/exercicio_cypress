describe('Contact Management', () => {
    const baseUrl = 'http://localhost:3000';
  
    beforeEach(() => {
      cy.visit(baseUrl);
    });
  
    it('should add a new contact', () => {
      cy.get('input[name="name"]').type('John Doe');
      cy.get('input[name="email"]').type('john.doe@example.com');
      cy.get('input[name="phone"]').type('1234567890');
      cy.contains('Adicionar').click();
      
     
      cy.contains('John Doe').should('be.visible');
    });
  
    it('should edit a contact', () => {
     
      cy.contains('John Doe').parent().find('button').contains('Editar').click();
      cy.get('input[name="name"]').clear().type('John Doe Updated');
      cy.get('input[name="email"]').clear().type('john.updated@example.com');
      cy.get('input[name="phone"]').clear().type('0987654321');
      cy.contains('Atualizar').click();
      
     
      cy.contains('John Doe Updated').should('be.visible');
    });
  
    it('should delete a contact', () => {
     
      cy.contains('John Doe Updated').parent().find('button').contains('Deletar').click();
      
     
      cy.contains('John Doe Updated').should('not.exist');
    });
  });
  