describe("App initilization", () => {
  it("Loads todos on page lOad", () => {
    cy.seedAndVisit();
    cy.get(".todo-list li").should("have.length", 4);
  });

  it("Display an error on failure", () => {
    cy.server();
    cy.route({
      url: "/api/todos",
      method: "GET",
      status: 500,
      reponse: {},
    });

    cy.visit("/");
    cy.get(".todo-list li").should("not.exist");

    cy.get(".error").should("be.visible");
  });
});
