describe('Login page', () => {
  beforeEach(() => {
    cy.visit('/');

    cy.get('input[name="email"]').as('email');
    cy.get('input[name="password"]').as('password');
    cy.get('button[type="submit"]').as('submit');
  });

  describe('Rendering', () => {
    it('should render login page', () => {
      cy.get('@email').should('be.visible');
      cy.get('@submit').should('be.visible');
    });
  });

  describe('Validation', () => {
    it('should show error message when credentials are empty', () => {
      cy.get('@submit').click();
      cy.get('[data-cy="error-message"]').contains(
        'Please enter email address'
      );
      cy.get('[data-cy="error-message"]').contains('Please enter password');
    });

    it('should show error message when credentials are invalid', () => {
      cy.get('@email').type('hello');
      cy.get('@password').type('world');
      cy.get('@submit').click();
      cy.get('[data-cy="error-message"]').contains(
        'Please enter valid email address'
      );
      cy.get('[data-cy="error-message"]').contains(
        'Password must be at least 6 characters long'
      );
    });
  });

  describe('Login', () => {
    it('should login successfully with valid credentials', () => {
      cy.get('@email').type('test@gmail.com');
      cy.get('@password').type('123456');
      cy.get('@submit').click();
      cy.url().should('include', '/dashboard');
      cy.contains('its a protected route');
    });
  });
});

export {};
