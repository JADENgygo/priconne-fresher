/// <reference types="cypress" />

describe("ui test", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("ui test", () => {
    cy.get("[data-cy=backgroundImageList").click();
    cy.get("[data-cy=backgroundImageName3")
      .click()
      .should("have.value", "darkness.webp");
    cy.get("[data-cy=lootBoxType")
      .clear()
      .type("loot box type")
      .should("have.value", "loot box type");
    cy.get("[data-cy=star").select("4").should("have.value", "4");
    cy.get("[data-cy=characterName")
      .clear()
      .type("character name")
      .should("have.value", "character name");
    cy.get("[data-cy=characterStyle")
      .clear()
      .type("character style")
      .should("have.value", "character style");
    cy.get("[data-cy=cv").clear().type("cv").should("have.value", "cv");
    cy.get("[data-cy=position").select("2").should("have.value", "2");
    cy.get("[data-cy=hp").clear().type("0").should("have.value", "0");
    cy.get("[data-cy=attack").clear().type("0").should("have.value", "0");
    cy.get("[data-cy=magicAttack").clear().type("0").should("have.value", "0");
    cy.get("[data-cy=defense").clear().type("0").should("have.value", "0");
    cy.get("[data-cy=magicDefense").clear().type("0").should("have.value", "0");
    cy.get("[data-cy=rank").clear().type("0").should("have.value", "0");
    cy.get("[data-cy=level").clear().type("0").should("have.value", "0");
    cy.get("[data-cy=description")
      .clear()
      .type("description")
      .should("have.value", "description");
    cy.get("[data-cy=quote")
      .clear()
      .type("quote")
      .should("have.value", "quote");
    cy.get("[data-cy=copyright")
      .clear()
      .type("copyright")
      .should("have.value", "copyright");
    cy.get("[data-cy=supplement")
      .clear()
      .type("supplement")
      .should("have.value", "supplement");
    cy.get("[data-cy=ribbonColor")
      .invoke("val", "#000000")
      .should("have.value", "#000000");
    cy.get("[data-cy=statusAndDescriptionColor")
      .invoke("val", "#000000")
      .should("have.value", "#000000");
    cy.get("[data-cy=quoteColor")
      .invoke("val", "#000000")
      .should("have.value", "#000000");
  });
});
