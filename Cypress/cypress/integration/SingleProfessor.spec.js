const Locators = require("../fixtures/Locators.json")
describe("Testovi za Login ", () => {

    // SMENE
    let correctEmail = "mileva@gmail.com"
    let correctPassword = "1234567aA"

    function uniqueText() {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

        for (var i = 0; i < 10; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        return text;
    }

    beforeEach("visit link", () => {
        cy.visit("/")
        // Prvi korak je logovanje ranije registrovanog korisnika
        cy.get(Locators.Login.Email).eq(0).type(correctEmail)
        cy.get(Locators.Login.Password).eq(1).type(correctPassword)
        cy.get(Locators.Login.LoginButton).click()
        cy.wait(2500)
        // Odabere prvog profesora iz tabele i klikne na njega
        cy.get('table td').eq(1).click()
    })

    //1
    it("Visability Single Professor Page", () => {

        cy.get("h3").should("be.visible").and("have.text", 'Single Professor Page')
        cy.get(Locators.SingleProfessor.Table).should("be.visible")
        cy.get(Locators.SingleProfessor.Table).eq(0).should('contain', 'Professor')
        cy.get(Locators.SingleProfessor.Table).eq(0).should('contain', 'Gradebook')
        cy.get(Locators.SingleProfessor.Table).eq(0).should('contain', 'Image')
        cy.get(Locators.SingleProfessor.Table).eq(0).should('contain', 'Number of students')
    })


    //2
    it("Redirect from Single Professor Page to Single Gradebook Page", () => {
        cy.url().should("contains", "single-professor")
        cy.get('table td a').eq(0).click()
        cy.url().should("contains", "single-gradebook")
        cy.url().should("contains", "gradebook")
    })


    afterEach("Clearovanje cache", () => {
        cy.clearLocalStorage()
    })
})

