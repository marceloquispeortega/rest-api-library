import { IBook } from 'app/shared/model//book.model';

export interface IAuthor {
    id?: number;
    name?: string;
    nationality?: string;
    books?: IBook[];
}

export class Author implements IAuthor {
    constructor(public id?: number, public name?: string, public nationality?: string, public books?: IBook[]) {}
}
