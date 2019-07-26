import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IEditorial } from 'app/shared/model/editorial.model';
import { EditorialService } from './editorial.service';

@Component({
    selector: 'jhi-editorial-update',
    templateUrl: './editorial-update.component.html'
})
export class EditorialUpdateComponent implements OnInit {
    private _editorial: IEditorial;
    isSaving: boolean;

    constructor(private editorialService: EditorialService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ editorial }) => {
            this.editorial = editorial;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.editorial.id !== undefined) {
            this.subscribeToSaveResponse(this.editorialService.update(this.editorial.id, this.editorial));
        } else {
            this.subscribeToSaveResponse(this.editorialService.create(this.editorial));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IEditorial>>) {
        result.subscribe((res: HttpResponse<IEditorial>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get editorial() {
        return this._editorial;
    }

    set editorial(editorial: IEditorial) {
        this._editorial = editorial;
    }
}
