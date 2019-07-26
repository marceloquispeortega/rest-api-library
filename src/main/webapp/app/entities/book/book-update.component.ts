import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IBook } from 'app/shared/model/book.model';
import { BookService } from './book.service';
import { IAuthor } from 'app/shared/model/author.model';
import { AuthorService } from 'app/entities/author';
import { IArea } from 'app/shared/model/area.model';
import { AreaService } from 'app/entities/area';
import { IEditorial } from 'app/shared/model/editorial.model';
import { EditorialService } from 'app/entities/editorial';
import { ICountry } from 'app/shared/model/country.model';
import { CountryService } from 'app/entities/country';

@Component({
    selector: 'jhi-book-update',
    templateUrl: './book-update.component.html'
})
export class BookUpdateComponent implements OnInit {
    private _book: IBook;
    isSaving: boolean;

    authors: IAuthor[];

    areas: IArea[];

    editorials: IEditorial[];

    countries: ICountry[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private bookService: BookService,
        private authorService: AuthorService,
        private areaService: AreaService,
        private editorialService: EditorialService,
        private countryService: CountryService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ book }) => {
            this.book = book;
        });
        this.authorService.query().subscribe(
            (res: HttpResponse<IAuthor[]>) => {
                this.authors = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.areaService.query().subscribe(
            (res: HttpResponse<IArea[]>) => {
                this.areas = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.editorialService.query().subscribe(
            (res: HttpResponse<IEditorial[]>) => {
                this.editorials = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.countryService.query().subscribe(
            (res: HttpResponse<ICountry[]>) => {
                this.countries = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.book.id !== undefined) {
            this.subscribeToSaveResponse(this.bookService.update(this.book));
        } else {
            this.subscribeToSaveResponse(this.bookService.create(this.book));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IBook>>) {
        result.subscribe((res: HttpResponse<IBook>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackAuthorById(index: number, item: IAuthor) {
        return item.id;
    }

    trackAreaById(index: number, item: IArea) {
        return item.id;
    }

    trackEditorialById(index: number, item: IEditorial) {
        return item.id;
    }

    trackCountryById(index: number, item: ICountry) {
        return item.id;
    }

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }
    get book() {
        return this._book;
    }

    set book(book: IBook) {
        this._book = book;
    }
}
