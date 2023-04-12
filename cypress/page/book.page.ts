import { uniqueNamesGenerator, Config, names } from 'unique-names-generator';

type SelectorMap = {
    [key: string]: string
  }
  
class BookPage {
    private saveBookButton: string;
    private nameBookButton: string;
    private authorBookButton: string;
    private cancelBookButton: string;

    private readonly bookNameInput: string;
    private readonly bookAuthorInput: string;
    private readonly saveButton: string;

    constructor() {
        this.saveBookButton ='.ant-modal-footer > .ng-star-inserted:contains("Save")';
        this.cancelBookButton ='.ant-modal-footer > .ng-star-inserted:contains("Cancel")';
        this.nameBookButton = '#name';
        this.authorBookButton = '#author';
        this.bookNameInput = '#name';
        this.bookAuthorInput = '#author';
        this.saveButton = '.ant-modal-footer > .ant-btn-primary';
    }

    public saveBook() {
        return cy.get(this.saveBookButton);
    }

    public saveInfoBook(name: string, author: string) {
        cy.get(this.nameBookButton).type(name);
        cy.get(this.authorBookButton).type(author);
    }

    public cancelBook() {
        return cy.get(this.cancelBookButton).click();
    }

    public getSaveButton() {
        return cy.get(this.saveButton);
    }

    public enterBookInformation(bookName: string, bookAuthor: string) {
        cy.get(this.bookNameInput).click().wait(1000).type(bookName);
        cy.get(this.bookAuthorInput).click().type(bookAuthor);
    }

    public updateBookInformation(attributes: string[], newValues: string[]) {
        const selectors: SelectorMap = {
          Name: this.bookNameInput,
          Author: this.bookAuthorInput,
        };
        attributes.forEach((attribute, index) => {
          cy.get(selectors[attribute]).click().clear().type(newValues[index]);
        });
      }

    public generateRandomBookInfo() {
        const customConfig: Config = {
            dictionaries: [names, names],
            length: 2,
            separator: ' ',
        };
        const bookName: string = uniqueNamesGenerator(customConfig);
        const bookAuthor: string = uniqueNamesGenerator(customConfig);
        return { name: bookName, author: bookAuthor };
    }
}

export { BookPage };