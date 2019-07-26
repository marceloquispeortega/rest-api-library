import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IEditorial } from 'app/shared/model/editorial.model';

@Component({
    selector: 'jhi-editorial-detail',
    templateUrl: './editorial-detail.component.html'
})
export class EditorialDetailComponent implements OnInit {
    editorial: IEditorial;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ editorial }) => {
            this.editorial = editorial;
        });
    }

    previousState() {
        window.history.back();
    }
}
