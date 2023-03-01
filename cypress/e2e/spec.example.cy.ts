describe("sample spec", () => {
  it("passes", () => {
    cy.visit("/ui-components");
    /* ==== Generated with Cypress Studio ==== */
    cy.get(':nth-child(11) > .btn').click();
    /* ==== End Cypress Studio ==== */
    cy.get('.modal-dialog ').should('exist');
  })
  it("failed",()=>{
    cy.visit("/ui-components");

    /* ==== Generated with Cypress Studio ==== */
    cy.get('#inputText').type('hello123');
    /* ==== End Cypress Studio ==== */
    cy.get('#inputText').should('have.value','hello');

  })
})