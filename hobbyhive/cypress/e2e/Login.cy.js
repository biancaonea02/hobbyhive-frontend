/* eslint-disable no-undef */
describe("Login", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/log-in");
  });

  it("checks the username input", () => {
    cy.get("[data-cy=username]").should("be.visible");
  });

  it("checks the password input", () => {
    cy.get("[data-cy=password]").should("be.visible");
  });

  it("checks the password input", () => {
    cy.get("[data-cy=login-button]").should("be.visible");
  });

  it("allows entering a username", () => {
    const username = "bianca_soop";
    cy.get('[data-cy="username"] input').as("usernameInput");
    cy.get("@usernameInput").type(username).invoke("change");
    cy.get("@usernameInput").should("have.value", username);
  });

  it("allows entering a password", () => {
    const password = "test";
    cy.get('[data-cy="password"] input').as("passwordInput");
    cy.get("@passwordInput").type(password).invoke("change");
    cy.get("@passwordInput").should("have.value", password);
  });

  it("successfully submits the login form with valid credentials", () => {
    const username = "bianca_soop";
    const password = "test";
    cy.get('[data-cy="username"]').type(username);
    cy.get('[data-cy="password"]').type(password);
    cy.get('[data-cy="login-button"]').click();
    cy.url().should("eq", "http://localhost:3000/feed");
  });
});
