describe('theme-builder-app-e2e', () => {
  beforeEach(() => cy.visit('/'));

  it('loads the theme builder and switches preview modes', () => {
    cy.contains('h1', 'Theme Builder').should('be.visible');
    cy.contains('button', 'Dark').click();

    cy.document().then((doc) => {
      expect(doc.documentElement.getAttribute('data-theme-mode')).to.equal('dark');
      expect(doc.documentElement.getAttribute('data-theme')).to.match(/-dark$/);
    });

    cy.contains('button', 'Light').click();

    cy.document().then((doc) => {
      expect(doc.documentElement.getAttribute('data-theme-mode')).to.equal('light');
      expect(doc.documentElement.getAttribute('data-theme')).to.match(/-light$/);
    });

    cy.contains('button', 'Export').click();
    cy.contains('h2', 'Export Theme').should('be.visible');
    cy.contains('button', 'Export as CSS Variables').should('be.visible');
    cy.contains('button', 'Export as JSON').should('be.visible');
    cy.contains('button', 'Export as TypeScript').should('be.visible');
    cy.contains('button', 'Cancel').click();
  });

  it('keeps token inputs in sync when undoing edits', () => {
    cy.contains('button', 'Light').click();

    cy.window().then((win) => {
      const original = win
        .getComputedStyle(win.document.documentElement)
        .getPropertyValue('--semantic-brand-primary')
        .trim();

      cy.wrap(original).as('originalBrandPrimary');
    });

    cy.get('.token-category')
      .first()
      .find('.mode-input-group')
      .first()
      .find('input[type="text"]')
      .first()
      .as('brandPrimaryInput');

    cy.get('@brandPrimaryInput').invoke('val', '#123456');
    cy.get('@brandPrimaryInput').trigger('input');
    cy.get('@brandPrimaryInput').trigger('change');
    cy.get('@brandPrimaryInput').should('have.value', '#123456');

    cy.window().then((win) => {
      expect(
        win
          .getComputedStyle(win.document.documentElement)
          .getPropertyValue('--semantic-brand-primary')
          .trim()
      ).to.equal('#123456');
    });

    cy.contains('button', 'Undo').click();

    cy.get('@originalBrandPrimary').then((originalBrandPrimary) => {
      cy.window().then((win) => {
        expect(
          win
            .getComputedStyle(win.document.documentElement)
            .getPropertyValue('--semantic-brand-primary')
            .trim()
        ).to.equal(originalBrandPrimary);
      });

      cy.get('@brandPrimaryInput').should('have.value', originalBrandPrimary);
    });

    cy.contains('button', 'Undo').should('be.disabled');
    cy.contains('button', 'Redo').should('not.be.disabled');
  });

  it('opens utility panels and applies presets to the active theme', () => {
    cy.contains('button', 'Light').click();

    cy.contains('button', 'A11y Check').click();
    cy.contains('h2', 'Accessibility Checker').should('be.visible');
    cy.contains('AAA').should('be.visible');

    cy.get('button[aria-label="Close accessibility checker"]').click();

    cy.contains('button', 'Colors').click();
    cy.contains('h2', 'Color Palette Generator').should('be.visible');
    cy.contains('button', 'Shades').click();
    cy.get('.generated-color-item').should('have.length', 7);

    cy.get('.preset-quick-button').first().click();

    cy.document().then((doc) => {
      expect(doc.documentElement.getAttribute('data-theme')).to.equal('material-light');
      expect(doc.documentElement.getAttribute('data-theme-mode')).to.equal('light');
    });

    cy.window().then((win) => {
      expect(
        win
          .getComputedStyle(win.document.documentElement)
          .getPropertyValue('--semantic-brand-primary')
          .trim()
      ).to.equal('#1976d2');
    });
  });
});
