import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IEditorial } from 'app/shared/model/editorial.model';
import { Principal } from 'app/core';
import { EditorialService } from './editorial.service';

@Component({
    selector: 'jhi-editorial',
    templateUrl: './editorial.component.html'
})
export class EditorialComponent implements OnInit, OnDestroy {
    editorials: IEditorial[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private editorialService: EditorialService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.editorialService.query().subscribe(
            (res: HttpResponse<IEditorial[]>) => {
                this.editorials = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInEditorials();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IEditorial) {
        return item.id;
    }

    registerChangeInEditorials() {
        this.eventSubscriber = this.eventManager.subscribe('editorialListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
