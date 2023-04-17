import { DashboardPage } from "../page/index";
let dashboard: DashboardPage;

describe("Verificando el proceso de lectura de libros en el panel de la biblioteca", () => {
    beforeEach(() => {
        cy.clearCookies();
        cy.visit("http://localhost:4200/dashboard");
        dashboard = new DashboardPage();
    });

    describe("Casos negativos", () => {
        it("Leyendo un libro inexistente", () => {
            dashboard.obtenerBotonLibrosPorPagina().click({ force: true });
            dashboard.obtenerBotonMaximoLibrosPorPagina().click({ force: true });
            dashboard
                .obtenerFilasTabla()
                .get(".ant-table-cell")
                .should("not.contain", "Hola")
                .and("not.contain", "Mundo");
        });
    });

    describe("Casos positivos", () => {
        it("Leyendo un libro existente", () => {
            dashboard.obtenerBotonLibrosPorPagina().click({ force: true });
            dashboard.obtenerBotonMaximoLibrosPorPagina().click({ force: true });
            dashboard.verificarTituloAutorLibro(
                "CODE: The Hidden Language of Computer Hardware and Software",
                "Charles Petzold"
            );
        });

        it("Leyendo otro libro existente", () => {
            dashboard.obtenerBotonLibrosPorPagina().click({ force: true });
            dashboard.obtenerBotonMaximoLibrosPorPagina().click({ force: true });
            dashboard.verificarTituloAutorLibro(
                "The Art of Computer Programming",
                "Donald Knuth"
            );
        });

        it("Carga 10 libros en tamaño de paginación 10", () => {
            dashboard.obtenerFilasTabla().should("have.length", 10);
        });


        it("Carga todos los libros en tamaño de paginación 50", () => {
            dashboard.obtenerBotonLibrosPorPagina().click({ force: true });
            dashboard.obtenerBotonMaximoLibrosPorPagina().click({ force: true });
            dashboard.obtenerFilasTabla().should("have.length", 20);
        });
    });
});
