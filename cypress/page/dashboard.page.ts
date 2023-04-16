class DashboardPage {
  private botonAgregarLibro: string;
  private botonEliminarLibro: string;
  private botonEditarLibro: string;
  //private botonLibrosPorPagina: string;
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
    cy.get(this.botonAgregarLibro).click();
  }

  public eliminarLibro() {
    return cy.get(this.botonEliminarLibro).click();
  }

  public obtenerBotonLibrosPorPagina() {
    return cy.get(this.botonLibrosPorPagina).click();
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
    cy.get(this.cambiadorTamanoPaginacion).click();
    const nuevoTamano = this.opcionTamanoPaginacion + `:contains("${tamano}")`;
    cy.get(nuevoTamano).click();
  }

  public verificarLibroEnPanel(titulo: string) {
    this.obtenerFilasTabla()
      .contains('td', titulo)
      .siblings()
      .find("input[type='checkbox']")
      .check();
  }

  public hacerClicEditarLibro(titulo: string) {
    this.obtenerFilasTabla()
      .contains('td', titulo)
      .parent()
      .find('.anticon-edit')
      .click();
  }

  public obtenerPrimeraFilaTabla() {
    return cy.get(this.filasTabla)
      .eq(0);
  }

  public getBooksTableBody() {
    return cy.get(this.booksTableBody);
}

public obtenerBotonMaximoLibrosPorPagina() {
  return cy.get(this.botonMaximoLibrosPorPagina);
}
public checkBookButton(bookName: string) {
  this.getBooksTableBody().contains('td', bookName).parent().find('[type="checkbox"]').check();
}

public deleteRandomBooks(randomBookList: any[]) {
        for (let i = 0; i < randomBookList.length; i++) {
            this.checkBookButton(randomBookList[i]['name']);
            this.eliminarLibro().click();
            cy.wait(1000);
        }
    }
}

export { DashboardPage };
