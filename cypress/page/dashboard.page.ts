class DashboardPage {
  private botonAgregarLibro: string;
  private botonEliminarLibro: string;
  private botonEditarLibro: string;
  //private botonLibrosPorPagina: string;
  private botonSeleccionarTodosLosLibros : string;
  private filasTabla: string;
  private botonPagina: string;
  private cambiadorTamanoPaginacion: string;
  private opcionTamanoPaginacion: string;
  private readonly booksTableBody : string;
  private readonly botonLibrosPorPagina : string;
  private readonly botonMaximoLibrosPorPagina : string;

  constructor() {
    this.botonAgregarLibro = '.ant-btn-primary > .ng-star-inserted';
    this.botonEliminarLibro = '.ant-btn.table-button > .ng-star-inserted:contains("Delete")';
    this.botonSeleccionarTodosLosLibros = '.ant-table-selection > .ant-checkbox-wrapper > .ant-checkbox > .ant-checkbox-input';
   // this.botonLibrosPorPagina = '.ant-select-selection-item.ng-star-inserted[ng-reflect-label="50 / page"]';
    this.filasTabla = ".ant-table-tbody > .ant-table-row.ng-star-inserted";
    this.botonEditarLibro = "button.ant-btn-primary.ant-btn-circle";
    this.botonPagina = '.ng-star-inserted > .ant-pagination-item.ng-star-inserted > .ng-star-inserted';
    this.cambiadorTamanoPaginacion = '.ng-star-inserted > .ant-pagination-options.ng-star-inserted > .ant-select.ant-pagination-options-size-changer';
    this.opcionTamanoPaginacion = '.ant-select-item > .ant-select-item-option-content';
    this.booksTableBody = '.ant-spin-container';
    this.botonLibrosPorPagina = '.ant-select-selector';
    this.botonMaximoLibrosPorPagina = '[title="50 / page"] > .ant-select-item-option-content';

  }

  public agregarLibro() {
    cy.wait(1000); // Agrega una espera de 1 segundo.

    cy.get(this.botonAgregarLibro).first().click({ force: true });
  }

  public eliminarLibro() {
    return cy.get(this.botonEliminarLibro).click();
  }

  public obtenerBotonLibrosPorPagina() {
    return cy.get(this.botonLibrosPorPagina).click({ force: true });
  }

  public obtenerFilasTabla() {
    return cy.get(this.filasTabla);
  }

  public obtenerPrimerBotonEditarLibro() {
    cy.get(this.botonEditarLibro).eq(0).click();
  }

  public verificarTituloAutorLibro(titulo: string, autor: string) {
    this.obtenerFilasTabla()
      .get(".ant-table-cell")
      .should("contain", titulo)
      .and("contain", autor);
  }

  public cambiarPagina(numero: number) {
    const paginaACambiar = this.botonPagina + `:contains("${numero}")`;
    return cy.get(paginaACambiar).click();
  }

  public cambiarTamanoPaginacion(tamano: string) {
    cy.get(this.cambiadorTamanoPaginacion).click({ force: true });
    const nuevoTamano = this.opcionTamanoPaginacion + `:contains("${tamano}")`;
   // cy.get(nuevoTamano).click({ force: true });
    cy.get(nuevoTamano, { timeout: 10000 }).click({ force: true });

  }

  public verificarLibroEnPanel(titulo: string) {
    cy.wait(2000); // Espera 2 segundos
    this.obtenerFilasTabla()
    .contains('td', titulo)
    .parent()
    .find('[type="checkbox"]')
    .check();
  }

  public hacerClicEditarLibro(titulo: string) {
    cy.wait(2000); // Agrega una espera de 2 segundos.
    this.obtenerFilasTabla()
      .contains('td', titulo, { timeout: 20000 })
      .parent()
      .find('.anticon-edit')
      .click({ force: true });
  }

  public obtenerPrimeraFilaTabla() {
    return cy.get(this.filasTabla)
      .eq(0);
  }

  public getBooksTableBody() {
    return cy.get(this.booksTableBody);
}

public obtenerBotonMaximoLibrosPorPagina() {
  return cy.get(this.botonMaximoLibrosPorPagina).click({ force: true });
}

public eliminarTodosLosLibros() {
  cy.get(this.botonSeleccionarTodosLosLibros).click();
  this.eliminarLibro().click();
}

public deleteRandomBooks(randomBookList: any[]) {
        for (let i = 0; i < randomBookList.length; i++) {
            this.verificarLibroEnPanel(randomBookList[i]['name']);
            this.eliminarLibro().click();
            cy.wait(1000);
        }
    }
}

export { DashboardPage };
