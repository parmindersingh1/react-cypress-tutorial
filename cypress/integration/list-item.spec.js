describe("List Items", () => {
  beforeEach(() => {
    cy.seedAndVisit();
  });
  it("properly displays completed items", () => {
    cy.get(".todo-list li")
      .filter(".completed")
      .should("have.length", 1)
      .and("contain", "Eggs")
      .find(".toggle")
      .should("be.checked");
  });

  it("Shows remaining todos in the footer", () => {
    cy.get(".todo-count").and("contain", 3);
    // .find(".toggle")
    // .should("be.checked")
  });

  it.only("Remove a todo", () => {
    cy.route({
      url: "/api/todos/1",
      method: "DELETE",
      status: 200,
      response: {},
    });
    cy.get(".todo-list li").as("list");

    cy.get("@list")
      .first()
      .find(".destroy")
      // .click({force: true});
      .invoke("show")
      .click();

    cy.get("@list")
    .should('have.length', 3)
    .and('not.contain', 'Milk')
  });
});
