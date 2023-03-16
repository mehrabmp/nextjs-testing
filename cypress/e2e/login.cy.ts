describe('template spec', () => {
  it('should render login page', () => {
    cy.visit('/');
    cy.get('h1').contains('Welcome back').should('be.visible');
  });
});

export {};
