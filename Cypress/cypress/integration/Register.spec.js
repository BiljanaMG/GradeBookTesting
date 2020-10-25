//        *** LOKATORI ***

const Locators = require("../fixtures/Locators.json")
describe("Testovi za Register", () => {

    // SMENE
    let FirstName = "Mileva"
    let LastName = "Maric"
    let twoLastNames = "Maric Anstajn"
    let correctEmail = ""
    let EmailWithoutAT = "mileva.com"
    let EmailWithoutDOTcom = "mileva@"
    let incorrectEmail = "milevamaric?@.com"
    let correctPassword = "1234567aA"
    let correctPasswordConfirmation = "1234567aA"
    let smallPassword = "123"
    let smallPasswordConfirmation = "123"
    let noNumberPassword = "milevamaric"
    let noNumberPasswordConfirmation = "milevamaric"
    let onlyNumberPassword = "123456789"
    let onlyNumberPasswordConfirmation = "123456789"

    function uniqueEmail() { // funkcija za jedinstven mejl
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

        for (var i = 0; i < 10; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text + "@milevagmail.com";
    }

    beforeEach("visit link", () => {
        correctEmail = uniqueEmail();
        cy.visit("/")
        cy.url().should("contains", "https://gradebook")
        // Sa login stranice da predje na stranicu za registraciju
        cy.get("a.nav-link").eq(1).click()
        cy.wait(2000)
    })

    // *** FIRST NAME ***
    //1
    it("Create user without 1st Name", () => {
        cy.get(Locators.Register.LastName).type(LastName)
        cy.get(Locators.Register.Password).type(correctPassword)
        cy.get(Locators.Register.PasswordConfirmation).type(correctPasswordConfirmation)
        cy.get(Locators.Register.Email).type(correctEmail)
        cy.get(Locators.Register.Submit).click()

        cy.get(Locators.Register.FirstName).then(($input) => {                             // assert za poruku koja iskoci
            expect($input[0].validationMessage).to.eq("Please fill out this field.")
        })
    })

    //2 //!!! Ovaj test pada.  pasce test jer se ne pojavi poruka, a trebalo bi.
    it("Register with spaces as a 1st name", () => {
        cy.get(Locators.Register.FirstName).type("      ")
        cy.get(Locators.Register.LastName).type(LastName)
        cy.get(Locators.Register.Password).type(correctPassword)
        cy.get(Locators.Register.PasswordConfirmation).type(correctPasswordConfirmation)
        cy.get(Locators.Register.Email).type(correctEmail)
        cy.get(Locators.Register.Submit).click()

        cy.get(Locators.Register.FirstName).then(($input) => {
            expect($input[0].validationMessage).to.eq("Please fill out this field.")
        })
    })

    // *** LAST NAME ***

    //3
    it("Create user without 2nd Name", () => {
        cy.get(Locators.Register.FirstName).type(FirstName)
        cy.get(Locators.Register.Password).type(correctPassword)
        cy.get(Locators.Register.PasswordConfirmation).type(correctPasswordConfirmation)
        cy.get(Locators.Register.Email).type(correctEmail)
        cy.get(Locators.Register.Submit).click()
        cy.get(Locators.Register.LastName).then(($input) => {                             // assert za poruku koja iskoci
            expect($input[0].validationMessage).to.eq("Please fill out this field.")
        })
    })

    // 4 //!!! Ovaj test pada.  pasce test jer se ne pojavi poruka, a trebalo bi.
    it("Register with spaces as 2nd name", () => {
        cy.get(Locators.Register.FirstName).type(FirstName)
        cy.get(Locators.Register.LastName).type("    ")
        cy.get(Locators.Register.Email).type(correctEmail)
        cy.get(Locators.Register.Password).type(correctPassword)
        cy.get(Locators.Register.PasswordConfirmation).type(correctPasswordConfirmation)
        cy.get(Locators.Register.Submit).click()

        cy.get(Locators.Register.FirstName).then(($input) => {
            expect($input[0].validationMessage).to.eq("Please fill out this field.")
        })
    })

    //5
    it("Register with two last names", () => {
        cy.get(Locators.Register.FirstName).type(FirstName)
        cy.get(Locators.Register.LastName).type(twoLastNames)
        cy.get(Locators.Register.Password).type(correctPassword)
        cy.get(Locators.Register.PasswordConfirmation).type(correctPasswordConfirmation)
        cy.get(Locators.Register.Email).type(correctEmail)
        cy.get(Locators.Register.Submit).click()
        cy.wait(2000)
        cy.get(Locators.Header.Login).eq(0).should("be.visible")
        cy.contains("Sign out").should("be.visible")
    })

    // *** EMAIL ***
    // 6 
    it("Register without an email", () => {
        cy.get(Locators.Register.FirstName).type(FirstName)
        cy.get(Locators.Register.LastName).type(LastName)
        cy.get(Locators.Register.Password).type(correctPassword)
        cy.get(Locators.Register.PasswordConfirmation).type(correctPasswordConfirmation)
        cy.get(Locators.Register.Submit).click()
        cy.get(Locators.Register.Email).then(($input) => {                             // assert za poruku koja iskoci
            expect($input[0].validationMessage).to.eq("Please fill out this field.")
        })
    })

    // 7
    it("Register without @ in the e mail", () => {
        cy.get(Locators.Register.FirstName).type(FirstName)
        cy.get(Locators.Register.LastName).type(LastName)
        cy.get(Locators.Register.Password).type(correctPassword)
        cy.get(Locators.Register.PasswordConfirmation).type(correctPasswordConfirmation)
        cy.get(Locators.Register.Email).type(EmailWithoutAT)
        cy.get(Locators.Register.Submit).click()
        cy.get(Locators.Register.Email).then(($input) => {
            expect($input[0].validationMessage).to.eq("Please include an '@' in the email address. 'mileva.com' is missing an '@'.") // assert u pop-up
        })
    })

    // 8
    it("Register without .com in the e mail", () => {
        cy.get(Locators.Register.FirstName).type(FirstName)
        cy.get(Locators.Register.LastName).type(LastName)
        cy.get(Locators.Register.Password).type(correctPassword)
        cy.get(Locators.Register.PasswordConfirmation).type(correctPasswordConfirmation)
        cy.get(Locators.Register.Email).type(EmailWithoutDOTcom)
        cy.get(Locators.Register.Submit).click()
        cy.get(Locators.Register.Email).then(($input) => {
            expect($input[0].validationMessage).to.eq("Please enter a part following '@'. 'mileva@' is incomplete.") // assert u pop-up
        })
    })

    //9
    it("Register with spaces as an email", () => {
        cy.get(Locators.Register.FirstName).type(FirstName)
        cy.get(Locators.Register.LastName).type(LastName)
        cy.get(Locators.Register.Password).type(correctPassword)
        cy.get(Locators.Register.PasswordConfirmation).type(correctPasswordConfirmation)
        cy.get(Locators.Register.Email).type("         ")
        cy.get(Locators.Register.Submit).click()
        cy.get(Locators.Register.Email).then(($input) => {                             // assert za poruku koja iskoci
            expect($input[0].validationMessage).to.eq("Please fill out this field.")
        })
    })

    //10
    it("Login with incorrect email", () => {
        cy.get(Locators.Register.FirstName).type(FirstName)
        cy.get(Locators.Register.LastName).type(LastName)
        cy.get(Locators.Register.Password).type(correctPassword)
        cy.get(Locators.Register.PasswordConfirmation).type(correctPasswordConfirmation)
        cy.get(Locators.Register.Email).type(incorrectEmail)
        cy.get(Locators.Register.Submit).click()
        cy.get(Locators.Register.Email).then(($input) => {
            expect($input[0].validationMessage).to.eq("'.' is used at a wrong position in '.com'.") // assert popup-a
        })
    })

    // *** PASSWORD ***
    //11
    it("Create user without password", () => {
        const stub = cy.stub()
        cy.on('window:alert', stub)
        cy.get(Locators.Register.FirstName).type(FirstName)
        cy.get(Locators.Register.LastName).type(LastName)
        cy.get(Locators.Register.PasswordConfirmation).type(correctPasswordConfirmation)
        cy.get(Locators.Register.Email).type(correctEmail)

        cy.get('button').click()
        cy.then(() => {
            expect(stub.getCall(0)).to.be.calledWith('Your passwords doesn`t match, try again, please')
        })
    })


    //12
    it("Create user incorrect password less than 8 characters", () => {
        cy.get(Locators.Register.FirstName).type(FirstName)
        cy.get(Locators.Register.LastName).type(LastName)
        cy.get(Locators.Register.Password).type(smallPassword)
        cy.get(Locators.Register.PasswordConfirmation).type(smallPasswordConfirmation)
        cy.get(Locators.Register.Email).type(correctEmail)
        cy.get(Locators.Register.Submit).click()
        cy.get(Locators.Register.Password).then(($input) => {
            expect($input[0].validationMessage).to.eq("Please match the requested format.") // assert popup-a
        })
    })

    //13
    it("Login with incorrect password, 8 characters but no numbers", () => {
        cy.get(Locators.Register.FirstName).type(FirstName)
        cy.get(Locators.Register.LastName).type(LastName)
        cy.get(Locators.Register.Password).type(noNumberPassword)
        cy.get(Locators.Register.PasswordConfirmation).type(noNumberPasswordConfirmation)
        cy.get(Locators.Register.Email).type(correctEmail)
        cy.get(Locators.Register.Submit).click()
        cy.get(Locators.Register.Password).then(($input) => {
            expect($input[0].validationMessage).to.eq("Please match the requested format.") // assert popup-a
        })
    })

    //14 // !!! test pada zato sto registracija prolazi kada se za password stave samo brojevi
    it("Login with incorrect password, 8 characters but no letters", () => {
        cy.get(Locators.Register.FirstName).type(FirstName)
        cy.get(Locators.Register.LastName).type(LastName)
        cy.get(Locators.Register.Password).type(onlyNumberPassword)
        cy.get(Locators.Register.PasswordConfirmation).type(onlyNumberPasswordConfirmation)
        cy.get(Locators.Register.Email).type(correctEmail)
        cy.get(Locators.Register.Submit).click()
        cy.get(Locators.Register.Password).then(($input) => {
            expect($input[0].validationMessage).to.eq("Please match the requested format.")
        })
    })

    // *** CONFIRMATION PASSWORD ***
    //15

    it("Registration with invalid password confirmation", () => {
        const stub = cy.stub()
        cy.on('window:alert', stub)
        cy.get(Locators.Register.FirstName).type(FirstName)
        cy.get(Locators.Register.LastName).type(LastName)
        cy.get(Locators.Register.Password).type(correctPassword)
        cy.get(Locators.Register.PasswordConfirmation).type("pogresna_potvrda")
        cy.get(Locators.Register.Email).type(correctEmail)
        cy.get('button').click()
        cy.then(() => {
            expect(stub.getCall(0)).to.be.calledWith('Your passwords doesn`t match, try again, please')
        })
    })

    //16
    it("Create user without password confirm", () => {
        const stub = cy.stub()
        cy.on('window:alert', stub)
        cy.get(Locators.Register.FirstName).type(FirstName)
        cy.get(Locators.Register.LastName).type(LastName)
        cy.get(Locators.Register.Password).type(correctPassword)
        cy.get(Locators.Register.Email).type(correctEmail)
        cy.get('button').click()
        cy.then(() => {
            expect(stub.getCall(0)).to.be.calledWith('Your passwords doesn`t match, try again, please')
        })
    })


    // *** CHECK TERMS AND CONDITIONS ***
    //17 !!! Test pada zato sto je registracija mogouca iako nije cekiran Terms and Conditions
    it("Create user without accepted terms and conditions", () => {
        cy.get(Locators.Register.FirstName).type(FirstName)
        cy.get(Locators.Register.LastName).type(LastName)
        cy.get(Locators.Register.Password).type(correctPassword)
        cy.get(Locators.Register.PasswordConfirmation).type(correctPasswordConfirmation)
        cy.get(Locators.Register.Email).type(correctEmail)
        cy.get(Locators.Register.FormCheckInput).click()
        cy.get(Locators.Register.Submit).click()
        cy.get(Locators.Register.FormCheckInput).then(($input) => {
            expect($input[0].validationMessage).to.eq("The terms and conditions must be accepted.")
        })
    })

    // *** REGISTER ***
    // 18
    it("Register without any data", () => {
        cy.get(Locators.Register.Submit).click()
        cy.get(Locators.Register.FirstName).then(($input) => {                             // assert za poruku koja iskoci
            expect($input[0].validationMessage).to.eq("Please fill out this field.")
        })
    })

    //19
    it("Register with spaces in all fields", () => {
        cy.get(Locators.Register.FirstName).type("    ")
        cy.get(Locators.Register.LastName).type("    ")
        cy.get(Locators.Register.Email).type("    ")
        cy.get(Locators.Register.Password).type("    ")
        cy.get(Locators.Register.PasswordConfirmation).type("    ")
        cy.get(Locators.Register.FormCheckInput).click()
        cy.get(Locators.Register.Submit).click()
        cy.get(Locators.Register.Password).then(($input) => {                             // assert za poruku koja iskoci
            expect($input[0].validationMessage).to.eq("Please match the requested format.")
        })
    })

    // 20
    it("Registered with all correct data", () => {
        cy.get(Locators.Register.FirstName).type(FirstName)
        cy.get(Locators.Register.LastName).type(LastName)
        cy.get(Locators.Register.Password).type(correctPassword)
        cy.get(Locators.Register.PasswordConfirmation).type(correctPasswordConfirmation)
        cy.get(Locators.Register.Email).type(correctEmail)
        cy.get(Locators.Register.Submit).click()
        cy.get(Locators.Header.Login).eq(0).should("be.visible") // assert be.visible 
        cy.contains("Sign out").should("be.visible") // assert be.visible 
    })

    afterEach("Brisanje kes memorije", () => {               // AFTER EACH
        cy.clearLocalStorage()
    })

})