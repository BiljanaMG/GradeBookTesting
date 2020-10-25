const Locators = require("../fixtures/Locators.json")
describe("Testovi za Login ", () => {

    // SMENE
    let correctEmail = "mileva@gmail.com"
    let correctPassword = "1234567aA"


    beforeEach("visit link", () => {
        cy.visit("/")
        // Prvi korak Login ranije registrovanog korisnika
        cy.get(Locators.Login.Email).eq(0).type(correctEmail)
        cy.get(Locators.Login.Password).eq(1).type(correctPassword)
        cy.get(Locators.Login.LoginButton).click()
        cy.wait(2000)
        // Drugi korak navigacija na stranicu za dodavanje profesora
        cy.get(Locators.Gradebooks.Header).eq(3).click()
        cy.get(Locators.Professors.DropDown).eq(1).click()
    })

    // *** Proffesors drop-down list ***
    //1 
    it("Professors drop-down list", () => {
        cy.get(Locators.Gradebooks.Header).eq(3).click()  // assert 
        cy.get(".dropdown-menu").click()
        cy.get(Locators.Professors.DropDown).eq(0).should("have.text", "All Professors")  // assert 
        cy.get(Locators.Professors.DropDown).eq(1).should("have.text", "Create Professor")  // assert 
    })


    // *** All Professors ***

    //1
    it("All Professors List Visability", () => {
        cy.get(Locators.Gradebooks.Header).eq(3).click()  // assert 
        cy.get(Locators.Professors.DropDown).eq(0).click()
        cy.wait(2000)
        cy.get(Locators.Professors.Title).eq(0).should("be.visible").and("have.text", "All Professors Page")  //
        cy.get(Locators.Professors.ProfFilterTitle).should("be.visible")
        cy.get(Locators.Professors.ProfFilterTitle).should("have.text", "Professors filter")
        cy.get(Locators.Professors.Filter).eq(0).should("be.visible")
        cy.get(Locators.Professors.Table).should("be.visible")
        cy.get(Locators.Professors.TableRow).eq(0).should('contain', 'FirstName')
        cy.get(Locators.Professors.TableRow).eq(0).should('contain', 'LastName')
        cy.get(Locators.Professors.TableRow).eq(0).should('contain', 'Picture')
        cy.get(Locators.Professors.TableRow).eq(0).should('contain', 'Gradebook')
    })

    //2
    it("Professors filter", () => {
        cy.get(Locators.Gradebooks.Header).eq(3).click()  // assert 
        cy.get(Locators.Professors.DropDown).eq(0).click()
        cy.wait(2000)
        cy.get(Locators.Professors.Filter).type("Mileva")
        cy.wait(2000)
        cy.contains("Mileva").should("be.visible")
    })

    // *** Create Professor ***
    //1
    it("Create Professor Page Visability", () => {
        cy.contains("Create Professor")
        cy.contains("First Name").should("be.visible")
        cy.contains("Last Name").should("be.visible")
        cy.get(Locators.CreateProfessor.ProfName).eq(0).should("be.visible")
        cy.get(Locators.CreateProfessor.ProfSurname).eq(1).should("be.visible")
        cy.get(Locators.CreateProfessor.AddImage).eq(0).should("be.visible").and("have.text", 'Add images') //
        cy.get(Locators.CreateProfessor.Submit).eq(1).should("be.visible").and("have.text", 'Submit')
    })
    //2
    it("Create Professor", () => {
        cy.get(Locators.CreateProfessor.ProfName).eq(0).type("Ivo")
        cy.get(Locators.CreateProfessor.ProfSurname).eq(1).type("Andic")
        cy.get(Locators.CreateProfessor.AddImage).eq(0).click() //
        cy.wait(2000)
        cy.get(Locators.CreateProfessor.ImageURL).type("https://upload.wikimedia.org/wikipedia/commons/7/75/S._Kragujevic%2C_Ivo_Andric%2C_1961.jpg")
        cy.get(Locators.CreateProfessor.Submit).eq(4).click()

    })
    //3
    it("Create Professor without 1st name", () => {
        cy.get(Locators.CreateProfessor.ProfSurname).eq(1).type("Andic")
        cy.get(Locators.CreateProfessor.AddImage).eq(0).click()//
        cy.wait(2000)
        cy.get(Locators.CreateProfessor.ImageURL).type("https://upload.wikimedia.org/wikipedia/commons/7/75/S._Kragujevic%2C_Ivo_Andric%2C_1961.jpg")
        cy.get(Locators.CreateProfessor.Submit).eq(4).click()
        cy.get(Locators.CreateProfessor.ProfName).then(($input) => {                             // assert za poruku koja iskoci
            expect($input[0].validationMessage).to.eq("Please fill out this field.")
        })
    })
    //4
    it("Create Professor without Last name", () => {
        cy.get(Locators.CreateProfessor.ProfName).eq(0).type("Ivo")
        cy.get(Locators.CreateProfessor.AddImage).eq(0).click() //
        cy.wait(2000)
        cy.get(Locators.CreateProfessor.ImageURL).type("https://upload.wikimedia.org/wikipedia/commons/7/75/S._Kragujevic%2C_Ivo_Andric%2C_1961.jpg")
        cy.get(Locators.CreateProfessor.Submit).eq(4).click()
        cy.get(Locators.CreateProfessor.ProfSurname).eq(1).then(($input) => {                             // assert za poruku koja iskoci
            expect($input[0].validationMessage).to.eq("Please fill out this field.")
        })
    })

    //5
    it("Create Professor without URL", () => {
        cy.get(Locators.CreateProfessor.ProfName).eq(0).type("Ivo")
        cy.get(Locators.CreateProfessor.ProfSurname).eq(1).type("Andic")
        cy.get(Locators.CreateProfessor.AddImage).eq(0).click() //
        cy.wait(2000)
        cy.get(Locators.CreateProfessor.Submit).eq(1).click()
        cy.get(Locators.CreateProfessor.ImageURL).then(($input) => {                             // assert za poruku koja iskoci
            expect($input[0].validationMessage).to.eq("Please fill out this field.")
        })
    })

    //6
    it("Create Professor without any data", () => {
        cy.get(Locators.CreateProfessor.ProfName).then(($input) => {                             // assert za poruku koja iskoci
            expect($input[0].validationMessage).to.eq("Please fill out this field.")
        })
    })

    //7
    it("Create Professor with 2 images", () => {
        cy.get(Locators.CreateProfessor.ProfName).eq(0).type("Ivo")
        cy.get(Locators.CreateProfessor.ProfSurname).eq(1).type("Andic")
        cy.get(Locators.CreateProfessor.AddImage).eq(0).click()
        cy.wait(2000)
        cy.get(Locators.CreateProfessor.ImageURL).type("https://upload.wikimedia.org/wikipedia/commons/7/75/S._Kragujevic%2C_Ivo_Andric%2C_1961.jpg")
        cy.get(Locators.CreateProfessor.AddImage).eq(0).click()
        cy.wait(2000)
        cy.get(Locators.CreateProfessor.ImageURL).eq(1).type("https://www.antikvarijat-phoenix.com/pic_nas/slike0647.jpg")
        cy.get(Locators.CreateProfessor.Submit).eq(7).click()

    })
    //8
    it("Create Professor with 2 images and remove one image", () => {
        cy.get(Locators.CreateProfessor.ProfName).eq(0).type("Ivo")
        cy.get(Locators.CreateProfessor.ProfSurname).eq(1).type("Andic")
        cy.get(Locators.CreateProfessor.AddImage).eq(0).click()
        cy.wait(2000)
        cy.get(Locators.CreateProfessor.ImageURL).type("https://upload.wikimedia.org/wikipedia/commons/7/75/S._Kragujevic%2C_Ivo_Andric%2C_1961.jpg")
        cy.get(Locators.CreateProfessor.AddImage).eq(0).click()
        cy.wait(2000)
        cy.get(Locators.CreateProfessor.ImageURL).eq(1).type("https://www.antikvarijat-phoenix.com/pic_nas/slike0647.jpg")
        cy.get(Locators.CreateProfessor.Submit).eq(1).click()
        cy.get(Locators.CreateProfessor.Submit).eq(4).click()

    })

    //9
    it("Create Professor with 2 images and Move one image up", () => {
        cy.get(Locators.CreateProfessor.ProfName).eq(0).type("Ivo")
        cy.get(Locators.CreateProfessor.ProfSurname).eq(1).type("Andic")
        cy.get(Locators.CreateProfessor.AddImage).eq(0).click()
        cy.wait(2000)
        cy.get(Locators.CreateProfessor.ImageURL).type("https://upload.wikimedia.org/wikipedia/commons/7/75/S._Kragujevic%2C_Ivo_Andric%2C_1961.jpg")
        cy.get(Locators.CreateProfessor.AddImage).eq(0).click()
        cy.wait(2000)
        cy.get(Locators.CreateProfessor.ImageURL).eq(1).type("https://www.antikvarijat-phoenix.com/pic_nas/slike0647.jpg")
        cy.get(Locators.CreateProfessor.Submit).eq(5).click()
        cy.get(Locators.CreateProfessor.Submit).eq(7).click()

    })

    //10
    it("Create Professor with 2 images and Move one image down", () => {
        cy.get(Locators.CreateProfessor.ProfName).eq(0).type("Ivo")
        cy.get(Locators.CreateProfessor.ProfSurname).eq(1).type("Andic")
        cy.get(Locators.CreateProfessor.AddImage).eq(0).click()
        cy.wait(2000)
        cy.get(Locators.CreateProfessor.ImageURL).type("https://upload.wikimedia.org/wikipedia/commons/7/75/S._Kragujevic%2C_Ivo_Andric%2C_1961.jpg")
        cy.get(Locators.CreateProfessor.AddImage).eq(0).click()
        cy.wait(2000)
        cy.get(Locators.CreateProfessor.ImageURL).eq(1).type("https://www.antikvarijat-phoenix.com/pic_nas/slike0647.jpg")
        cy.get(Locators.CreateProfessor.Submit).eq(3).click()
        cy.get(Locators.CreateProfessor.Submit).eq(7).click()

    })
    afterEach("Brisanje kes memorije", () => {
        cy.clearLocalStorage()
    })

})