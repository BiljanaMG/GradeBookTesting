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
        cy.get(Locators.SingleGradebook.Input).type("mali komentar")
        cy.get(Locators.SingleGradebook.Button).last().click()
        cy.wait(500)
        cy.get(".comments p").contains("mali komentar")
    })

    //2
    it("Delete one comment", () => {
        let uniqueComment = "mali komentar-" + uniqueText()
        cy.get(Locators.SingleGradebook.Input).type(uniqueComment)
        // Last button is submit comment button
        cy.get(Locators.SingleGradebook.Button).last().click()
        cy.wait(500)
        cy.get(Locators.SingleGradebook.Comment).contains(uniqueComment)
        //Last button in .comments-box is delete button that we need for latest comment
        cy.get(".comments-box .btn").last().click()
        cy.wait(500)
        cy.get(Locators.SingleGradebook.Comment).contains(uniqueComment).should("not.be.visible")
    })

    //3
    it("Edit Gradebook title", () => {
        let uniqueName = "Struja-" + uniqueText()
        cy.wait(2000)
        cy.get(Locators.SingleGradebook.Button).eq(2).click()
        cy.get(Locators.SingleGradebook.Input).eq(0).click().clear().type(uniqueName)
        cy.get(Locators.SingleGradebook.Button).click()
        cy.wait(2000)
        cy.url().should("contains", "/gradebooks")
        cy.get(Locators.SingleGradebook.TableD).should("contain", uniqueName)
    })

    //4
    it("Delete Gradebook title", () => {
        cy.wait(2000)
        // Chose delete button:
        cy.get(Locators.SingleGradebook.Container).eq(0).click()
        cy.wait(2000)
        // Ok button:
        cy.get('button').eq(0).click()
        cy.wait(2000)
        cy.on('window:alert', (txt) => {
            //Mocha assertions
            expect(txt).to.contains('Are you sure?');
        })
        // Check if first is deleted
        cy.get(Locators.SingleGradebook.TableD).first().contains("Struja").should("not.be.visible")
    })

    //5
    it("Add student without picture", () => {
        let uniqueName = "Petar-" + uniqueText()
        cy.wait(2000)
        cy.get(Locators.SingleGradebook.Button).eq(0).click()
        cy.get(Locators.SingleGradebook.FirstName).type(uniqueName)
        cy.get(Locators.SingleGradebook.LastName).type("Petrovic")
        cy.get(Locators.SingleGradebook.Button).last().click()
        cy.wait(2000)
        cy.get(Locators.SingleGradebook.TableD).should("contain", uniqueName)
    })

    //6
    it("Add student with picture", () => {
        let uniqueName = "Petar-" + uniqueText()
        cy.wait(2000)
        cy.get(Locators.SingleGradebook.Button).eq(0).click()
        cy.get(Locators.SingleGradebook.FirstName).type(uniqueName)
        cy.get(Locators.SingleGradebook.LastName).type("Petrovic")
        cy.get(Locators.SingleGradebook.Button).eq(0).click()
        cy.get("input").last().type("https://upload.wikimedia.org/wikipedia/commons/7/75/S._Kragujevic%2C_Ivo_Andric%2C_1961.jpg")
        cy.get(Locators.SingleGradebook.Button).last().click()
        cy.wait(2000)
        cy.get(Locators.SingleGradebook.TableD).should("contain", uniqueName)
    })


    afterEach("Clearovanje cache", () => {
        cy.clearLocalStorage()
    })
})

