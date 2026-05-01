describe('showcase-e2e', () => {
  beforeEach(() => {
    cy.visit('/components/data-display/carousel');
    cy.injectAxe();
  });

  it('should render the carousel documentation page and navigate slides', () => {
    cy.contains('h1', 'Carousel').should('be.visible');
    cy.get('[aria-label="Featured highlights"]').first().within(() => {
      cy.contains('Showing slide 1 of 4').should('be.visible');
      cy.get('button[aria-label="Next slide"]').click();
      cy.contains('Showing slide 2 of 4').should('be.visible');
    });

    cy.contains('Project any semantic slide content').should('be.visible');
  });

  it('should have no detectable accessibility violations in the overview carousel', () => {
    cy.checkA11y('[aria-label="Featured highlights"]');
  });
});
