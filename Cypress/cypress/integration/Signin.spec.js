const Locators = require("../fixtures/Locators.json")
describe("Testovi za Login ", () => {

    // SMENE
    let correctEmail = "mileva@gmail.com"
    let correctPassword = "1234567aA"
    let invalidEmailFirst = "test123123@test.com"
    let invalidEmailType = "test?test.com"
    let shortPassword = "123"
    let NoNumbersPassword = "nonumbers"

    beforeEach("visit link", () => {
        cy.visit("/")
        cy.url().should("contains", "/login")
    })

    //1
    it("Visibility login", () => {
        cy.get(Locators.Login.PleaseLogin).should("be.visible").and("have.text", "Please login")
        cy.get(Locators.Login.LoginButton).should("be.visible")
        cy.get(Locators.Login.Email).eq(0).should("be.visible")
        cy.get(Locators.Login.Password).eq(1).should("be.visible")
    })

    //2    
    it("Successfull login", () => {
        cy.get(Locators.Login.Email).eq(0).type(correctEmail)
        cy.get(Locators.Login.Password).eq(1).type(correctPassword)
        cy.get(Locators.Login.LoginButton).click()
        cy.wait(2000)
        //cy.server()
        //cy.route("GET","https://gradebook.vivifyideas.com/gradebooks").as("sacekajLogin")
        //cy.wait("@sacekajLogin")
        cy.get(Locators.Header.Login).eq(3).should("be.visible")
    })

    //3
    it("Logout", () => {
        cy.url().should("contains", "/login") // assert contains - da je user bio na login stranici
        cy.get(Locators.Login.Email).eq(0).type(correctEmail)
        cy.get(Locators.Login.Password).eq(1).type(correctPassword)
        cy.get(Locators.Login.LoginButton).click()
        cy.wait(2000)
        cy.get(Locators.Header.Login).eq(4).should("be.visible")
        cy.get(Locators.Header.Login).eq(4).click()
    })
    // *** Passwword ***

    //4
    it("Login without password", () => {
        cy.get(Locators.Login.Email).eq(0).type(correctEmail)
        cy.get(Locators.Login.LoginButton).click()
        cy.get(Locators.Login.Password).eq(1).then(($input) => {
            expect($input[0].validationMessage).to.eq("Please fill out this field.")
        })
    })

    //5 // Test pada !!! popup treba da iskace Korisnik ostane na Login stranici.
    it("Login with short password", () => {
        cy.get(Locators.Login.Email).eq(0).type(correctEmail)
        cy.get(Locators.Login.Password).eq(1).type(shortPassword)
        cy.get(Locators.Login.LoginButton).click()
        cy.get(Locators.Login.Password).eq(1).then(($input) => {
            expect($input[0].validationMessage).to.eq("Please match the requested format.")
        })
    })

    //6 // Test pada !!! popup treba da iskace Korisnik ostane na Login stranici.
    it("Login with password with no numbers", () => {
        cy.get(Locators.Login.Email).eq(0).type(correctEmail)
        cy.get(Locators.Login.Password).eq(1).type(NoNumbersPassword)
        cy.get(Locators.Login.LoginButton).click()
        cy.get(Locators.Login.Password).eq(1).then(($input) => {
            expect($input[0].validationMessage).to.eq("Please match the requested format.")
        })
    })

    // *** Email ***
    //7 // Test pada !!! popup treba da iskace Korisnik ostane na Login stranici.
    it("Login with incorrect email", () => {
        cy.get(Locators.Login.Email).eq(0).type(invalidEmailFirst)
        cy.get(Locators.Login.Password).eq(1).type(correctPassword)
        cy.get(Locators.Login.LoginButton).click()
        cy.get(Locators.Login.Email).eq(0).then(($input) => {
            expect($input[0].validationMessage).to.eq("Bad Credentials")
        })
    })

    //8 // Test pada !!! popup treba da iskace Korisnik ostane na Login stranici.
    it("Login with incorrect email type", () => {
        cy.get(Locators.Login.Email).eq(0).type(invalidEmailType)
        cy.get(Locators.Login.Password).eq(1).type(correctPassword)
        cy.get(Locators.Login.LoginButton).click()
        cy.get(Locators.Login.Email).eq(0).then(($input) => {
            expect($input[0].validationMessage).to.eq("Bad Email type")
        })
    })

    //9
    it("Login without email", () => {
        cy.get(Locators.Login.Password).eq(1).type(correctPassword)
        cy.get(Locators.Login.LoginButton).click()
        cy.get(Locators.Login.Password).eq(0).then(($input) => {
            expect($input[0].validationMessage).to.eq("Please fill out this field.") // popup iskace
        })
    })

    //10
    it("All empty fields", () => {
        cy.get(Locators.Login.LoginButton).click()
        cy.get(Locators.Login.Password).eq(0).then(($input) => {
            expect($input[0].validationMessage).to.eq("Please fill out this field.") // popup iskace
        })
    })

    afterEach("Clearovanje cache", () => {
        cy.clearLocalStorage()
    })

})

