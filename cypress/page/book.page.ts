class BookPage {
  private botonGuardarLibro: string;
  private botonNombreLibro: string;
  private botonAutorLibro: string;
  private botonCancelarLibro: string;

  constructor() {
      this.botonGuardarLibro = '.ant-modal-footer > .ng-star-inserted:contains("Save")';
      this.botonCancelarLibro = '.ant-modal-footer > .ng-star-inserted:contains("Cancel")';
      this.botonNombreLibro = '#name';
      this.botonAutorLibro = '#author';
  }

  public guardarLibro() {
      return cy.get(this.botonGuardarLibro);
  }
  public guardarInformacionLibro(nombre: string, autor: string) {
      cy.get(this.botonNombreLibro).type(nombre);
      cy.wait(1000);
      cy.get(this.botonAutorLibro).type(autor);
  }

  public actualizarInformacionLibro(nombre?: string, autor?: string) {
      if (nombre) {
          cy.get(this.botonNombreLibro).clear();
          cy.get(this.botonNombreLibro).type(nombre);
      }
      if (autor) {
          cy.get(this.botonAutorLibro).clear();
          cy.get(this.botonAutorLibro).type(autor);
      }
  }

  public cancelarLibro() {
      return cy.get(this.botonCancelarLibro).click();
  }

  public limpiarCampos() {
      cy.get(this.botonNombreLibro).clear();
      cy.get(this.botonAutorLibro).clear();
  }
}
export { BookPage }