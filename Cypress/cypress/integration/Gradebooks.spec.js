const Locators = require("../fixtures/Locators.json") // dodato za lokatore
describe("Testovi za Login ", () => {                     // izasao iz integration,usao u fixtures i poziva Lokatore

    // SMENE
    let correctEmail = "mileva@gmail.com"
    let correctPassword = "1234567aA"


    beforeEach("visit link", () => {
        cy.visit("/")
        // Prvi korak je logovanje korisnika "mileva@gmail.com" koji je ranije registrovan
        cy.get(Locators.Login.Email).eq(0).type(correctEmail)
        cy.get(Locators.Login.Password).eq(1).type(correctPassword)
        cy.get(Locators.Login.LoginButton).click()
        cy.wait(2000)
    })

    //1
    it("Heder Visability", () => {
        cy.get(Locators.Gradebooks.Header).eq(0).should("be.visible").and("have.text", "Gradebooks")  // assert 
        cy.get(Locators.Gradebooks.Header).eq(1).should("be.visible").and("have.text", "My Gradebook")  // assert 
        cy.get(Locators.Gradebooks.Header).eq(2).should("be.visible").and("have.text", "Create Gradebook")  // assert 
        cy.get(Locators.Gradebooks.Header).eq(3).should("be.visible").and("have.text", "\n        Professors\n      ")  // assert 
        cy.get(Locators.Gradebooks.Header).eq(4).should("be.visible").and("have.text", "Sign out")  // assert 
    })

    //2
    it("Find Gradebook", () => {
        cy.get(Locators.Gradebooks.Filter).type("Struja")
        cy.get(Locators.Gradebooks.Search).eq(0).click()
        cy.wait(2000)
        cy.contains("Struja").should("be.visible")
    })

    //3
    it("Gradebook Filter for unknown Gradebook", () => {
        cy.get(Locators.Gradebooks.Filter).type("ljubicica")
        cy.get(Locators.Gradebooks.Search).eq(0).click()
        cy.wait(2000)
        cy.contains("ljubicica").should("not.be.visible")
    })

    //4
    it("All Gradebooks Page Visability", () => {
        cy.get(Locators.Gradebooks.Title).should("be.visible").and("have.text", ' All Gradebooks Page')
        cy.get(Locators.Gradebooks.GradebookFilterTitle).should("be.visible").and("have.text", "Gradebook Filter")
        cy.get(Locators.Gradebooks.Search).eq(0).should("be.visible").and("have.text", "Search")
        cy.get(Locators.Gradebooks.Table).should("be.visible")
        cy.get(Locators.Gradebooks.TableRow).eq(0).should('contain', 'Gradebook')
        cy.get(Locators.Gradebooks.TableRow).eq(0).should('contain', 'Professor')
        cy.get(Locators.Gradebooks.TableRow).eq(0).should('contain', 'Created at')
        cy.get(Locators.Gradebooks.Search).eq(1).should("be.visible").and("have.text", 'Previous')
        cy.get(Locators.Gradebooks.Search).eq(2).should("be.visible").and("have.text", 'Next')
    })

    //5
    it("On one page the 10 Gradebooks are visible", () => {
        cy.get(Locators.Gradebooks.TableRow).eq(10).should("be.visible")
    })

    //6
    it("On one page the 11th Gradebook is not visible", () => {
        cy.get(Locators.Gradebooks.TableRow).eq(11).should("not.be.visible")
    })

    //7
    it("Pagination Previous enabled on second page", () => {
        cy.get(Locators.Gradebooks.TableRow).eq(10).should("be.visible")
        cy.get(Locators.Gradebooks.Search).eq(1).should("be.disabled").and("have.text", 'Previous') //Previous button NE moze da se klikne jer se nalazimo na PRVOJ stranici
        cy.get(Locators.Gradebooks.Search).eq(2).click()
        cy.wait(2000)
        cy.get(Locators.Gradebooks.Search).eq(1).should("not.be.disabled").and("have.text", 'Previous')//Previous button MOZE da se klikne jer se nalazimo na DRUGOJ stranici
        cy.get(Locators.Gradebooks.TableRow).eq(10).should("be.visible")

    })

    afterEach("Clearovanje cache", () => {
        cy.clearLocalStorage()
    })



})

