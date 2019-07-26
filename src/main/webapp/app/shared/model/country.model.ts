import { IBook } from 'app/shared/model//book.model';

export interface ICountry {
    id?: number;
    code?: string;
    name?: string;
    books?: IBook[];
}

export class Country implements ICountry {
    constructor(public id?: number, public code?: string, public name?: string, public books?: IBook[]) {}
}
