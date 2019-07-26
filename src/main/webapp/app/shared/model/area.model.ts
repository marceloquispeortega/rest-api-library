import { IBook } from 'app/shared/model//book.model';

export interface IArea {
    id?: number;
    code?: string;
    name?: string;
    description?: string;
    books?: IBook[];
}

export class Area implements IArea {
    constructor(public id?: number, public code?: string, public name?: string, public description?: string, public books?: IBook[]) {}
}
