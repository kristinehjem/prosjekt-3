// describe("Checkbox redux tests", () => {
//   before(() => {
//     cy.visit("/");
//   });

//   it("renders", () => {
//     cy.get(".header").should("exist");
//   });

//   it("All checkboxes renders", () => {
//     cy.get("#\\31 950\\'s-checkbox").should("exist");
//     cy.get("#\\31 960\\'s-checkbox").should("exist");
//     cy.get("#\\31 970\\'s-checkbox").should("exist");
//     cy.get("#\\31 980\\'s-checkbox").should("exist");
//     cy.get("#\\31 990\\'s-checkbox").should("exist");
//     cy.get("#\\32 000\\'s-checkbox").should("exist");
//     cy.get("#\\32 010\\'s-checkbox").should("exist");
//   });

//   it("Redux state updates when 1960-checkbox AND 2000-checkbox is checked", () => {
//     cy.get("#\\31 960\\'s-checkbox").check();
//     cy.get("#\\31 960\\'s-checkbox").should("be.enabled");

//     cy.get("#\\32 000\\'s-checkbox").check();
//     cy.get("#\\32 000\\'s-checkbox").should("be.enabled");

//     cy.window()
//       .its("store")
//       .invoke("getState")
//       .its("yearFilter")
//       .its("value")
//       .should("deep.equal", {
//         "1950's": false,
//         "1960's": true,
//         "1970's": false,
//         "1980's": false,
//         "1990's": false,
//         "2000's": true,
//         "2010's": false,
//       });
//   });

//   it("Redux state updates when 1950-checkbox is un-checked", () => {
//     cy.get("#\\31 950\\'s-checkbox").uncheck();
//     cy.get("#\\31 950\\'s-checkbox").should("be.enabled");

//     cy.window()
//       .its("store")
//       .invoke("getState")
//       .its("yearFilter")
//       .its("value")
//       .should("deep.equal", {
//         "1950's": false,
//         "1960's": true,
//         "1970's": false,
//         "1980's": false,
//         "1990's": false,
//         "2000's": true,
//         "2010's": false,
//       });
//   });
// });

// describe("Search field redux tests", () => {
//   before(() => {
//     cy.visit("/");
//   });

//   it("Searchfield renders", () => {
//     cy.get(".MuiInputBase-input").should("exist");
//   });

//   it("Update redux state when passed input", () => {
//     const searchInput = "The Dark Knight";
//     cy.get(".MuiInputBase-input").clear();
//     cy.get(".MuiInputBase-input").type(searchInput + "{enter}");

//     cy.wait(1000); // Wait for store to update

//     cy.window()
//       .its("store")
//       .invoke("getState")
//       .its("searchFilter")
//       .its("value")
//       .its("title")
//       .should("equal", searchInput);
//   });
// });

describe("Movie modal redux tests", () => {
  before(() => {
    cy.visit("/");
  });

  it("Displays the highest ranked movie", () => {
    cy.get(
      ":nth-child(1) > :nth-child(1) > .MuiPaper-root > .MuiButtonBase-root > .MuiCardMedia-root"
    ).click();
  });

  it("Updates redux state with correct movie with highest rating", () => {
    cy.window()
      .its("store")
      .invoke("getState")
      .its("modalInfo")
      .its("value")
      .its("rank")
      .should("equal", "1");
  });
});
