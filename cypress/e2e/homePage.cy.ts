describe("template spec", () => {
  it("test e2e", function () {
    cy.visit("http://localhost:5173");

    cy.get("#root h1.font-semibold").click();
    cy.get("#root div.grid-cols-1 div:nth-child(2) p.font-semibold").click();
    cy.get("#root div.grid-cols-1 div:nth-child(3) p.font-semibold").click();
    cy.get("#root a.hover\\:underline").click();
    cy.get('[name="email"]').click();
    cy.get('[name="email"]').type("admin@example.com");
    cy.get('[name="password"]').click();
    cy.get('[name="password"]').type("Admin123!");
    cy.get("#root button.border").click();
    cy.get('[name="password"]').click();
    cy.get('[name="password"]').type("Admin123!");
    cy.get('[name="email"]').click();
    cy.get('[name="email"]').type("admin@example.com");
    cy.get("#root button.border").click();
    cy.get("#root button.text-white").click();
    cy.get('[name="title"]').type("cypress test");
    cy.get('[name="ownerId"]').select("P2HJh78Pjq5qIESayX3V1UtdpFLkgHt6");
    cy.get('[name="note"]').click();
    cy.get("#radix-_r_1_ button.bg-primary").click();
    cy.get("#root tr:nth-child(17) td.font-medium.truncate").click();
    cy.get(
      "#root div.group-data-\\[size\\=sm\\]\\/card\\:px-3.space-y-4 div:nth-child(1)",
    ).click();
    cy.get("#assign-owner").select("mVafPQxPLlFAKpBFGox1VQG2Qam70pyf");
    cy.get("#root div:nth-child(1) > button.border").click();
  });
});
