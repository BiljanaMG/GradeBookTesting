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
        // Odabere prvi grade book iz tabele i klikne na njega
        cy.get('table a').first().click()
    })

    //1
    it("Add one comment", () => {
        cy.get(".form-control").type("mali komentar")
        cy.get(".btn").last().click()
        cy.wait(500)
        cy.get(".comments p").contains("mali komentar")
    })

    //2
    it("Delete one comment", () => {
        let uniqueComment = "mali komentar-" + uniqueText()
        cy.get(".form-control").type(uniqueComment)
        // Last button is submit comment button
        cy.get(".btn").last().click()
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
        cy.get(".btn").eq(2).click()
        cy.get(".form-control").eq(0).click().clear().type(uniqueName)
        cy.get(".btn").click()
        cy.wait(2000)
        cy.url().should("contains", "/gradebooks")
        cy.get("table td").should("contain", uniqueName)
    })

    //4
    it("Delete Gradebook title", () => {
        cy.wait(2000)
        // Chose delete button:
        cy.get(".container button").eq(0).click()
        cy.wait(2000)
        // Ok button:
        cy.get('button').eq(0).click()
        cy.wait(2000)
        cy.on('window:alert', (txt) => {
            //Mocha assertions
            expect(txt).to.contains('Are you sure?');
        })
        // Check if first is deleted
        cy.get("table td").first().contains("Struja").should("not.be.visible")
    })

    //5
    it("Add student without picture", () => {
        let uniqueName = "Petar-" + uniqueText()
        cy.wait(2000)
        cy.get(".btn").eq(0).click()
        cy.get(Locators.SingleGradebook.FirstName).type(uniqueName)
        cy.get(Locators.SingleGradebook.LastName).type("Petrovic")
        cy.get(".btn").last().click()
        cy.wait(2000)
        cy.get("table td").should("contain", uniqueName)
    })

    //6
    it("Add student with picture", () => {
        let uniqueName = "Petar-" + uniqueText()
        cy.wait(2000)
        cy.get(".btn").eq(0).click()
        cy.get(Locators.SingleGradebook.FirstName).type(uniqueName)
        cy.get(Locators.SingleGradebook.LastName).type("Petrovic")
        cy.get(".btn").eq(0).click()
        cy.get("input").last().type("https://upload.wikimedia.org/wikipedia/commons/7/75/S._Kragujevic%2C_Ivo_Andric%2C_1961.jpg")
        cy.get(".btn").last().click()
        cy.wait(2000)
        cy.get("table td").should("contain", uniqueName)
    })


    afterEach("Clearovanje cache", () => {
        cy.clearLocalStorage()
    })
})

