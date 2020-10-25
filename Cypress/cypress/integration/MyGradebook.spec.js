const Locators = require("../fixtures/Locators.json") // dodato za lokatore
describe("Testovi za Login ", () => {                     // izasao iz integration,usao u fixtures i poziva Lokatore

  // SMENE
  let correctEmail
  let correctPassword = "1234567aA"
  let fullName
  let firstName
  let lastName
  let uniqueBook

  function uniqueText() { // funkcija za jedinstven tekst
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    for (var i = 0; i < 10; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  }

  function uniqueEmail() { // funkcija za jedinstven mejl
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    for (var i = 0; i < 10; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text + "@milevagmail.com";
  }

  beforeEach("visit link", () => {
    // Priprema podataka za novog korisnika
    correctEmail = uniqueEmail()
    firstName = "Jovana" + uniqueText();
    lastName = "Jovanic"
    fullName = firstName + " " + lastName
    uniqueBook = "book" + uniqueText();
    cy.visit("/")
    cy.get("a.nav-link").eq(1).click()
    cy.wait(2000)
    // Registracija novog korisnika
    cy.get(Locators.Register.FirstName).type(firstName)
    cy.get(Locators.Register.LastName).type(lastName)
    cy.get(Locators.Register.Password).type(correctPassword)
    cy.get(Locators.Register.PasswordConfirmation).type(correctPassword)
    cy.get(Locators.Register.Email).type(correctEmail)
    cy.get(Locators.Register.Submit).click()
    cy.wait(2000)
    cy.get(Locators.Gradebooks.Header).eq(2).click()
    cy.wait(2000)
    // Kreira novi gradebook za registrovanog korisnika
    cy.get(".form-control").eq(0).type(uniqueBook)
    cy.get("select").select(fullName)
    cy.get(Locators.MyGradebook.Button).click()
    cy.wait(2000)
    // Ide na MyGradebook stranicu
    cy.get(Locators.Gradebooks.Header).eq(1).click()
    cy.wait(2000)
  })
  // 1  //!!! test padne jer komentar nije prikazan. Tek kada ponovo dodjemo na stranicu komentar postane vidljiv.
  it("Add one comment", () => {
    cy.get(".form-control").type("mali komentar")
    cy.get(Locators.MyGradebook.Button).last().click()
    cy.get(".comments p").contains("mali komentar")
  })

  //2 //!!! test padne jer delete opcija nije vidljiva nakon sto se doda komentar
  it("Delete one comment", () => {
    let uniqueComment = "mali komentar-" + uniqueText()
    cy.get(".form-control").type(uniqueComment)
    // Last button is submit comment button
    cy.get(Locators.MyGradebook.Button).last().click()
    cy.wait(500)
    cy.get(".comments-box").contains(uniqueComment)
    //Last button in .comments-box is delete button that we need for latest comment
    cy.get(".comments-box .btn").last().click()
    cy.wait(500)
    cy.get(".comments-box").contains(uniqueComment).should("not.be.visible")
  })

  //3
  it("Edit Gradebook title", () => {
    let uniqueName = "Struja-" + uniqueText()
    cy.wait(2000)
    cy.get(Locators.MyGradebook.Button).eq(2).click()
    cy.get(".form-control").eq(0).click().clear().type(uniqueName)
    cy.get(Locators.MyGradebook.Button).click()
    cy.wait(2000)
    cy.url().should("contains", "/gradebooks")
  })

  //4
  it("Delete Gradebook", () => {
    cy.wait(2000)
    // Chose delete button:
    cy.get(".container button").eq(1).click()
    cy.wait(2000)
    // Ok button:
    cy.get('button').eq(0).click()
    cy.wait(2000)
    cy.on('window:alert', (txt) => {
      //Mocha assertions
      expect(txt).to.contains('Are you sure?');
    })
    cy.url().should("contains", "gradebooks")
  })

  //5
  it("Add student without picture", () => {
    let uniqueName = "Petar-" + uniqueText()
    cy.wait(2000)
    cy.get(Locators.MyGradebook.Button).eq(0).click()
    cy.get(Locators.MyGradebook.FirstName).type(uniqueName)
    cy.get(Locators.MyGradebook.LastName).type("Petrovic")
    cy.get(Locators.MyGradebook.Button).last().click()
    cy.wait(2000)
    cy.get("table td").should("contain", uniqueName)
  })

  //6
  it("Add student with picture", () => {
    let uniqueName = "Petar-" + uniqueText()
    cy.wait(2000)
    cy.get(Locators.MyGradebook.Button).eq(0).click()
    cy.get(Locators.MyGradebook.FirstName).type(uniqueName)
    cy.get(Locators.MyGradebook.LastName).type("Petrovic")
    cy.get(Locators.MyGradebook.Button).eq(0).click()
    cy.get("input").last().type("https://upload.wikimedia.org/wikipedia/commons/7/75/S._Kragujevic%2C_Ivo_Andric%2C_1961.jpg")
    cy.get(Locators.MyGradebook.Button).last().click()
    cy.wait(2000)
    cy.get("table td").should("contain", uniqueName)
  })


  afterEach("Brisanje kes memorije", () => {
    cy.clearLocalStorage()
  })
})