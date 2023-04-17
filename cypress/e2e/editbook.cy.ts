import { DashboardPage, BookPage } from "../page/index";

let dashboard: DashboardPage;
let bookPage: BookPage;

describe("Verifying Updating Process of a Book in the Dashboard", () => {
  let nombreParaActualizar: string | number | string[] | undefined;
  let autorParaActualizar: string | number | string[] | undefined;
  let previousBookName;
  let previousBookAuthor;

  beforeEach(() => {
    cy.clearCookies();
    cy.visit("http://localhost:4200/dashboard");
    cy.wait(1000);
    dashboard = new DashboardPage();
    bookPage = new BookPage();
    dashboard.agregarLibro();
    bookPage.guardarInformacionLibro("La quinta Ola", "Rick Yancey");
    bookPage.guardarLibro().click({ force: true });
    dashboard.obtenerBotonLibrosPorPagina().click({ force: true });
    dashboard.obtenerBotonMaximoLibrosPorPagina().click({ force: true });

    cy.get("#name").invoke("val").then((name) => {
      nombreParaActualizar = name;
    });
    cy.get("#author").invoke("val").then((author) => {
      autorParaActualizar = author;
    });

 //   dashboard.hacerClicEditarLibro("La quinta Ola");
  });

  describe("Casos negativos", () => {
    beforeEach(() => {
      bookPage.limpiarCampos();
    });

    it("ERROR: No se debe editar un libro con un nombre y autor de espacio vacío.", () => {
      bookPage.actualizarInformacionLibro(" ", " ");
      cy.wait(1000);
      bookPage.guardarLibro().should("be.disabled");
    });

    afterEach(() => {
      dashboard.verificarLibroEnPanel("La quinta Ola");
      dashboard.eliminarLibro();
    });
  });

  describe("Casos positivos", () => {
    it("Se debe editar el nombre y el autor del libro.", () => {
      bookPage.actualizarInformacionLibro("Divergente", "Veronica Roth");
      bookPage.guardarLibro().should("be.enabled");
      bookPage.guardarLibro().click({ force: true });

      dashboard.verificarTituloAutorLibro(
        "Divergente",
        "Veronica Roth"
      );
      dashboard
        .obtenerFilasTabla()
        .should("not.have.text", nombreParaActualizar);
    });

    after(() => {
      dashboard.verificarLibroEnPanel("Divergente");
      dashboard.eliminarLibro();
    });

    it("Se debe editar el nombre del libro.", () => {
      bookPage.actualizarInformacionLibro("La Guerra de los Mundos");
      bookPage.guardarLibro().should("be.enabled");
      bookPage.guardarLibro().click({ force: true });

      dashboard
        .obtenerFilasTabla()
        .should("not.have.text", nombreParaActualizar);
    });

    after(() => {
      dashboard.verificarLibroEnPanel("La Guerra de los Mundos");
      dashboard.eliminarLibro();
    });

    it("Se debe editar el autor del libro.", () => {
      bookPage.actualizarInformacionLibro(undefined, "H.G. Wells, Steven Spielberg");
      bookPage.guardarLibro().should("be.enabled");
      bookPage.guardarLibro().click({ force: true });

      dashboard
        .obtenerFilasTabla()
        .should("not.have.text", autorParaActualizar);
    });

    after(() => {
      dashboard.verificarLibroEnPanel("La quinta Ola");
      dashboard.eliminarLibro();
    });
  });
});
