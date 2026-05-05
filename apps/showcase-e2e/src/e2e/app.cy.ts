describe('showcase-e2e', () => {
  it('should render the carousel documentation page and navigate slides', () => {
    cy.visit('/components/data-display/carousel');

    cy.contains('h1', 'Carousel').should('be.visible');
    cy.get('[aria-label="Featured highlights"]').first().within(() => {
      cy.contains('Showing slide 1 of 4').should('be.visible');
      cy.get('button[aria-label="Next slide"]').click();
      cy.contains('Showing slide 2 of 4').should('be.visible');
    });

    cy.contains('Project any semantic slide content').should('be.visible');
  });

  it('should expose accessible carousel controls in the overview example', () => {
    cy.visit('/components/data-display/carousel');

    cy.get('[aria-label="Featured highlights"]').first().within(() => {
      cy.get('button[aria-label="Previous slide"]').should('exist');
      cy.get('button[aria-label="Next slide"]').should('exist');
      cy.contains('Showing slide 1 of 4').should('be.visible');
    });
  });

  it('should preserve the default theme family through a high-contrast reload round trip', () => {
    cy.visit('/');

    cy.get('button[aria-label^="Current theme:"]').click();
    cy.contains('button', 'High Contrast').click();

    cy.document()
      .its('documentElement')
      .should('have.attr', 'data-theme-mode', 'high-contrast')
      .and('have.attr', 'data-theme', 'high-contrast');

    cy.window().then((win) => {
      expect(win.localStorage.getItem('fui-suite-theme-family')).to.equal('default');
      expect(win.localStorage.getItem('fui-suite-theme-mode')).to.equal('high-contrast');
    });

    cy.reload();

    cy.document()
      .its('documentElement')
      .should('have.attr', 'data-theme-mode', 'high-contrast');

    cy.get('button[aria-label^="Current theme:"]').click();
    cy.contains('button', 'Light').click();

    cy.document()
      .its('documentElement')
      .should('have.attr', 'data-theme-mode', 'light')

    cy.get('button[aria-label^="Current theme:"]')
      .should('have.attr', 'aria-label', 'Current theme: Default Light');

    cy.window().then((win) => {
      expect(win.localStorage.getItem('fui-suite-theme-family')).to.equal('default');
      expect(win.localStorage.getItem('fui-suite-theme-mode')).to.equal('light');
      expect(win.localStorage.getItem('fui-suite-theme')).to.include('light');
    });
  });

  it('should render the dedicated getting-started guides', () => {
    cy.visit('/getting-started/installation');
    cy.contains('h1', 'Installation').should('be.visible');
    cy.contains('Develop In This Workspace').should('be.visible');

    cy.visit('/getting-started/usage');
    cy.contains('h1', 'Usage').should('be.visible');
    cy.contains('Standalone Component Imports').should('be.visible');

    cy.visit('/getting-started/theming');
    cy.contains('h1', 'Theming').should('be.visible');
    cy.contains('ThemeService Basics').should('be.visible');
  });
});
