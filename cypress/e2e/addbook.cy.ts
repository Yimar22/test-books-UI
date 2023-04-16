import { DashboardPage, BookPage } from "../page/index";
let dashboard: DashboardPage;
let bookPage: BookPage;

describe("Verificando el proceso de agregar libro en el panel de la biblioteca", () => {
    beforeEach(() => {
        cy.clearCookies();
        cy.visit("http://localhost:4200/dashboard");
        dashboard = new DashboardPage();
        bookPage = new BookPage();
        dashboard.obtenerBotonLibrosPorPagina().click();
        dashboard.obtenerBotonMaximoLibrosPorPagina().click();
        dashboard.agregarLibro();
    });

    describe("Escenarios negativos", () => {
        it("ERROR: No se debe crear un libro con un nombre y autor de espacio vacío.", () => {
            bookPage.guardarInformacionLibro(" ", " ");
            bookPage.guardarLibro().should("be.disabled");
        });

        it("ERROR: No se debe crear un libro con un autor de espacio vacío.", () => {
            bookPage.guardarInformacionLibro("El mapa de los anhelos", " ");
            bookPage.guardarLibro().should("be.disabled");
        });

        it("ERROR: No se debe crear un libro con un nombre de espacio vacío.", () => {
            bookPage.guardarInformacionLibro(" ", "Alice Kellen");
            bookPage.guardarLibro().should("be.disabled");
        });
    });

    describe("Escenarios positivos", () => {
        it("should add a book with one author to the Dashboard", () => {
            //Actions
            bookPage.guardarInformacionLibro("Moby-Dick", "Herman Melville");
            bookPage.guardarLibro().should('be.enabled').click();
            cy.wait(1000);

            // Assertions
            dashboard.getBooksTableBody()
                .should("include.text", "Moby-Dick")
                .and("include.text", "Herman Melville");
        });

        it("should add a book with more than one author delimited by ', ' to the Dashboard", () => {
            //Actions
            bookPage.guardarInformacionLibro("Hamlet", "Herman Melville, William Shakespeare");
            bookPage.guardarLibro().should('be.enabled').click();
            cy.wait(1000);

            // Assertions
            dashboard.getBooksTableBody()
                .should("include.text", "Hamlet")
                .and("include.text", "Herman Melville, William Shakespeare");
        });

        after(() => {
            dashboard.deleteRandomBooks([
                { name: "Moby-Dick", author: "Herman Melville" },
                { name: "Hamlet", author: "Herman Melville, William Shakespeare" },
            ]
            );
        });
    });
});