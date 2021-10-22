beforeEach(() => {
  cy.visit("/");
});

describe("Testing that redux state updates correctly", () => {
  it("renders", () => {
    cy.get(".header").should("exist");
  });

  it("Checkbox renders", () => {
    cy.get("#\\31 950\\'s-checkbox").check();
    cy.get("#\\31 950\\'s-checkbox").should("be.enabled");

    cy.window()
      .its("store")
      .invoke("getState")
      .its("yearFilter")
      .its("value")
      .should("deep.equal", {
        "1950's": true,
        "1960's": false,
        "1970's": false,
        "1980's": false,
        "1990's": false,
        "2000's": false,
        "2010's": false,
      });
  });
});
