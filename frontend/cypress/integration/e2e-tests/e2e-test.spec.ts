describe("Automated e2e test", () => {
  before(() => {
    cy.visit("/");
  });

  it("Renders header", () => {
    cy.get(".header").should("exist");
  });

  it("Searches for 'The Dark Knight' returns only 'Dark Knight' movies", () => {
    cy.get(".MuiInputBase-input").clear();
    cy.get(".MuiInputBase-input").type("The Dark Knight");
    cy.wait(1000); // Wait for search to be compleete

    // Check that only two movies renders
    cy.get("#filmgrid-wrapper")
      .contains(".film", "The Dark Knight")
      .should("exist");

    cy.get("#filmgrid-wrapper")
      .contains(".film", "The Dark Knight Rises")
      .should("exist");

    cy.get("#filmgrid-wrapper").children().children().should("have.length", 2);
  });

  it("Filters on year 2010's returns only 'The Dark Knight Rises'", () => {
    cy.get("#\\32 010\\'s-checkbox").check();

    cy.get("#filmgrid-wrapper")
      .contains(".film", "The Dark Knight Rises")
      .should("exist");

    cy.get("#filmgrid-wrapper").children().children().should("have.length", 1);
  });

  it("Shows modal when clicked", () => {
    cy.get(
      ":nth-child(1) > :nth-child(1) > .MuiPaper-root > .MuiButtonBase-root > .MuiCardMedia-root"
    ).click();

    cy.get("#modalBox").should("exist");
    cy.get("#info > h6").should("have.text", "The Dark Knight Rises");
  });

  it("Should change the rating when rated", () => {
    let ratingBefore;
    let ratingAfter;

    cy.get("#filmFacts > h6:nth-child(4)").then(($ratingDOMObject) => {
      ratingBefore = parseInt($ratingDOMObject.text().slice(-7));
      console.log("BEFORE: ", ratingBefore);
    });

    cy.get(".css-dqr9h-MuiRating-label").first().click();
    cy.get("#rating-selector").within(() => {
      cy.get("input").first().check({ force: true });
    });

    cy.get("#filmFacts > h6:nth-child(4)").then(($ratingDOMObject) => {
      ratingAfter = parseInt($ratingDOMObject.text().slice(-7));
      console.log("AFTER: ", ratingAfter);
      expect(ratingAfter).equal(ratingBefore + 1);
    });
  });

  it("Closes window correctly", () => {
    cy.get("#exitButton").click();
    cy.get("#modalBox").should("not.exist");
  });

  it("Resets search", () => {
    cy.get("#\\32 010\\'s-checkbox").uncheck();
    cy.get(":nth-child(3) > .MuiIconButton-label > .MuiSvgIcon-root").click();
    cy.get("#filmgrid-wrapper")
      .children()
      .children()
      .should("have.length", 250); // TODO: Change this to number of films per page when paginated
  });
});
