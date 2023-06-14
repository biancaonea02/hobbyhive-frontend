/* eslint-disable no-undef */
describe("Feed", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/log-in");
    const username = "bianca_soop";
    const password = "test";
    cy.get('[data-cy="username"]').type(username);
    cy.get('[data-cy="password"]').type(password);
    cy.get('[data-cy="login-button"]').click();
    cy.url().should("eq", "http://localhost:3000/feed");
  });

  const loading = true;

  it("displays", () => {
    if (loading) {
      cy.get('[data-cy="card-skeleton"]').should("be.visible");
    } else {
      cy.get('[data-cy="post"]').should("be.visible");
    }
  });
});
