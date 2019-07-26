import { IAuthor } from 'app/shared/model//author.model';
import { IArea } from 'app/shared/model//area.model';
import { IEditorial } from 'app/shared/model//editorial.model';
import { ICountry } from 'app/shared/model//country.model';

export const enum Language {
    FRENCH = 'FRENCH',
    ENGLISH = 'ENGLISH',
    SPANISH = 'SPANISH'
}

export interface IBook {
    id?: number;
    title?: string;
    description?: string;
    isbn?: string;
    year?: number;
    language?: Language;
    authors?: IAuthor[];
    area?: IArea;
    editorial?: IEditorial;
    country?: ICountry;
}

export class Book implements IBook {
    constructor(
        public id?: number,
        public title?: string,
        public description?: string,
        public isbn?: string,
        public year?: number,
        public language?: Language,
        public authors?: IAuthor[],
        public area?: IArea,
        public editorial?: IEditorial,
        public country?: ICountry
    ) {}
}
