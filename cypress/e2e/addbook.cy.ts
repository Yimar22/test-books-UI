import { DashboardPage, BookPage } from "../page/index";
let dashboard: DashboardPage;
let bookPage: BookPage;

describe("Verificando el proceso de agregar libro en el panel de la biblioteca", () => {
    beforeEach(() => {
        cy.clearCookies();
        cy.visit("http://localhost:4200/dashboard");
        dashboard = new DashboardPage();
        bookPage = new BookPage();
        dashboard.obtenerBotonLibrosPorPagina().click({ force: true });
        dashboard.obtenerBotonMaximoLibrosPorPagina().click({ force: true });
        dashboard.agregarLibro();
    });

    describe("Escenarios negativos", () => {
        it("No se debe crear un libro con un nombre y autor de espacio vacío.", () => {
            bookPage.guardarInformacionLibro(" ", " ");
            bookPage.guardarLibro().should("be.disabled");
        });

        it("No se debe crear un libro con un autor de espacio vacío.", () => {
            bookPage.guardarInformacionLibro("La quinta Ola", " ");
            bookPage.guardarLibro().should("be.disabled");
        });

        it("No se debe crear un libro con un nombre de espacio vacío.", () => {
            bookPage.guardarInformacionLibro(" ", "Rick Yancey");
            bookPage.guardarLibro().should("be.disabled");
        });
    });

    describe("Escenarios positivos", () => {
        it("Se debería agregar un libro con un autor", () => {
            //Actions
            bookPage.guardarInformacionLibro("La quinta Ola", "Rick Yancey");
            bookPage.guardarLibro().should('be.enabled').click({ force: true });
            cy.wait(1000);

            // Assertions
            dashboard.getBooksTableBody()
                .should("include.text", "La quinta Ola")
                .and("include.text", "Rick Yancey");
        });

        it("Se debería agregar un libro con más de un autor delimitado por ', ' ", () => {
            //Actions
            bookPage.guardarInformacionLibro("La Guerra de los Mundos", "H.G. Wells, Steven Spielberg");
            bookPage.guardarLibro().should('be.enabled').click({ force: true });
            cy.wait(1000);

            // Assertions
            dashboard.getBooksTableBody()
                .should("include.text", "La Guerra de los Mundos")
                .and("include.text", "H.G. Wells, Steven Spielbergs");
        });

        after(() => {
            dashboard.deleteRandomBooks([
                { name: "La quinta Ola", author: "Rick Yancey" },
                { name: "La Guerra de los Mundos", author: "H.G. Wells, Steven Spielberg" },
            ]
            );
        });
    });
});