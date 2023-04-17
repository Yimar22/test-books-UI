import { BookPage, DashboardPage } from "../page/index";
let dashboard: DashboardPage;
let bookPage: BookPage;

describe("Verificando el proceso de eliminar libros en el panel de la biblioteca", () => {
    beforeEach(() => {
        cy.clearCookies();
        cy.visit("http://localhost:4200/dashboard");
        dashboard = new DashboardPage();
        bookPage = new BookPage();
        dashboard.agregarLibro();
        bookPage.guardarInformacionLibro("Fahrenheit 451", "Ray Bradbury");
        cy.wait(3000);

        bookPage.guardarLibro().click({ force: true });
        dashboard.agregarLibro();
        cy.wait(1000);
        bookPage.guardarInformacionLibro("1984", "George Orwell");
        cy.wait(2000);

        bookPage.guardarLibro().click({ force: true });
        // cy.wait(1000);
        dashboard.obtenerBotonLibrosPorPagina().click({ force: true });
        dashboard.obtenerBotonMaximoLibrosPorPagina().click({ force: true });
    });

    describe("Casos positivos", () => {
        it("Eliminar un libro", () => {
            //Actions
            dashboard.verificarLibroEnPanel("Programming Pearls");
            dashboard.eliminarLibro().click();
            cy.wait(1000);

            // Assertions
            dashboard.obtenerFilasTabla()
                .get(".ant-table-cell")
                .should("not.contain", "Programming Pearls");
        });

        it("Eliminar 2 libros", () => {
            //Actions
            dashboard.verificarLibroEnPanel("1984");
            cy.wait(1000);

            dashboard.eliminarLibro().click();
            cy.wait(1000);
            
            dashboard.verificarLibroEnPanel("Fahrenheit 451");
            cy.wait(1000);
            dashboard.eliminarLibro().click();
            cy.wait(1000);

            

            dashboard.obtenerFilasTabla()
                .get(".ant-table-cell")
                .should("not.contain", "Fahrenheit 451");

                dashboard.obtenerFilasTabla()
                .get(".ant-table-cell")
                .should("not.contain", "1984");
        })

        it("Eliminar todos los libros de una página", () => {
            //Acciones
            dashboard.eliminarTodosLosLibros();

            // Afirmaciones

            dashboard.obtenerBotonLibrosPorPagina().should('not.exist');
        });
    });
});
