/// <reference types="cypress"/>

describe("left banner test", () =>{
    beforeEach(() =>{
        //set-up
        cy.visit('http://localhost:4200/dashboard')
    })

    it("Loaded web-page state",() =>{
        cy.get("nz-sider")
        .invoke("attr","ng-reflect-nz-collapsed")
        .should("eq","false")

        cy.get(".ant-menu-submenu.ant-menu-submenu-inline.ant-menu-submenu-selected.ant-menu-submenu-open")
        .should("exist")
    })

    it("Validate link",() =>{
        cy.get('a')
        .eq(0)
        .invoke('attr', 'href')
        .then(href => {

        cy.request(href)
        .its('status')
        .should('eq', 200);

        });
    })

    it("Validate img src",() =>{
        cy.get('img')
        .eq(0)
        .invoke('attr', 'src')
        .then(href => {

        cy.request(href)
        .its('status')
        .should('eq', 200);

        });
    })

    it("Closing banner",() =>{
        cy.get('.header-trigger').click()
        
        cy.get("nz-sider")
        .invoke("attr","ng-reflect-nz-collapsed")
        .should("eq","true")
    })


    it("Opening banner",() =>{
        cy.get('.header-trigger').click().click()

        cy.get("nz-sider")
        .invoke("attr","ng-reflect-nz-collapsed")
        .should("eq","false")
    })

    it("Link correctitude",() =>{
        cy.get("a")
        .eq(0)
        .invoke("attr", "href")
        .should("eq","https://ng.ant.design/")
    })

    it("Open overview on click",() =>{
        cy.get('.ant-menu-submenu-title').click().click()

        cy.get(".ant-menu-submenu.ant-menu-submenu-inline.ant-menu-submenu-selected.ant-menu-submenu-open")
        .should("exist")
    })

    it("Close overview on click",() =>{
        cy.get('.ant-menu-submenu-title').click()

        cy.get(".ant-menu-submenu.ant-menu-submenu-inline.ant-menu-submenu-selected.ant-menu-submenu-open")
        .should("not.exist")
    })

})
