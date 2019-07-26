import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IEditorial } from 'app/shared/model/editorial.model';
import { EditorialService } from './editorial.service';

@Component({
    selector: 'jhi-editorial-delete-dialog',
    templateUrl: './editorial-delete-dialog.component.html'
})
export class EditorialDeleteDialogComponent {
    editorial: IEditorial;

    constructor(private editorialService: EditorialService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.editorialService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'editorialListModification',
                content: 'Deleted an editorial'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-editorial-delete-popup',
    template: ''
})
export class EditorialDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ editorial }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(EditorialDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.editorial = editorial;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
