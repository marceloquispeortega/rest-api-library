import { IBook } from 'app/shared/model//book.model';

export interface IEditorial {
    id?: number;
    name?: string;
    address?: string;
    books?: IBook[];
}

export class Editorial implements IEditorial {
    constructor(public id?: number, public name?: string, public address?: string, public books?: IBook[]) {}
}
