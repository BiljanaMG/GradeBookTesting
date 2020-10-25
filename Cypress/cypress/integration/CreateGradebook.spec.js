const Locators = require("../fixtures/Locators.json") // dodato za lokatore
describe("Testovi za Login ", () => { // izasao iz integration,usao u fixtures i poziva Lokatore

  // SMENE
  let correctEmail = "mileva@gmail.com"
  let correctPassword = "1234567aA"
  let fullName

  function uniqueText() {  // funkcija za jedinstven tekst
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    for (var i = 0; i < 10; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  }

  beforeEach("visit link", () => {
    let unique = uniqueText()
    fullName = "Ivo-" + unique + " " + "Andric"
    cy.visit("/")
    // Prvi korak je login korisnika
    cy.get(Locators.Login.Email).eq(0).type(correctEmail)
    cy.get(Locators.Login.Password).eq(1).type(correctPassword)
    cy.get(Locators.Login.LoginButton).click()
    cy.wait(2000)
    // drugi korak je kreiranje novog profesora
    cy.get(Locators.Gradebooks.Header).eq(3).click()
    cy.get(Locators.Professors.DropDown).eq(1).click()
    cy.get(Locators.CreateProfessor.ProfName).eq(0).type("Ivo-" + unique)
    cy.get(Locators.CreateProfessor.ProfSurname).eq(1).type("Andric")
    cy.get(Locators.CreateProfessor.AddImage).eq(0).click()
    cy.wait(2000)
    cy.get(Locators.CreateProfessor.ImageURL).type("https://upload.wikimedia.org/wikipedia/commons/7/75/S._Kragujevic%2C_Ivo_Andric%2C_1961.jpg")
    cy.get(Locators.CreateProfessor.Submit).eq(4).click()
    // Treci korak je da se predje na Crate Gradebook stranicu
    cy.get(Locators.Gradebooks.Header).eq(2).click()
    cy.wait(2000)
  })

  //1 
  it("Create Gradebook Page Visability", () => {
    cy.contains("Create Gradebook Page")
    cy.get(Locators.CreateGradebook.Form).eq(0).should("be.visible").and("have.text", "Gradebook title")
    cy.get(Locators.CreateGradebook.Input).eq(0).should("be.visible")
    cy.get(Locators.CreateGradebook.Form).eq(1).should("be.visible")
    cy.get(Locators.CreateGradebook.Input).eq(1).should("be.visible")
    cy.get(Locators.CreateGradebook.Submit).eq(0).should("be.visible").and("have.text", 'Submit')
  })

  //2
  it("Create Gradebook with new proffesor", () => {
    cy.get(Locators.CreateGradebook.Input).eq(0).type("Struja")
    cy.get("select").select(fullName)
    cy.get(Locators.CreateGradebook.Submit).click()
    cy.wait(2000)
    cy.url().should("contains", "/gradebooks")
  })

  //3
  it("Create Gradebook without Title", () => {
    cy.get("select").select(fullName)
    cy.get(Locators.CreateGradebook.Submit).click()
    cy.get(Locators.CreateGradebook.Alert).should("contain", "The given data was invalid.")
    cy.get(Locators.CreateGradebook.Alert).should("contain", "The title field is required.")
  })

  //4
  it("Create Gradebook without professor", () => {
    cy.get(Locators.CreateGradebook.Input).eq(0).type("Struja")
    cy.get(Locators.CreateGradebook.Submit).click()
    cy.get(Locators.CreateGradebook.Alert).should("contain", "The given data was invalid.")
    cy.get(Locators.CreateGradebook.Alert).should("contain", "The professor id field is required.")
  })

  //5
  it("Create Gradebook without professor and title", () => {
    cy.get(Locators.CreateGradebook.Submit).click()
    cy.get(Locators.CreateGradebook.Alert).should("contain", "The given data was invalid.")
    cy.get(Locators.CreateGradebook.Alert).should("contain", "The title field is required.")
    cy.get(Locators.CreateGradebook.Alert).should("contain", "The professor id field is required.")
  })

  afterEach("Brisanje kes memorije", () => {
    cy.clearLocalStorage()
  })
})