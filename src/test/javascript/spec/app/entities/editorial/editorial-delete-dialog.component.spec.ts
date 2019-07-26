/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { LibraryTestModule } from '../../../test.module';
import { EditorialDeleteDialogComponent } from 'app/entities/editorial/editorial-delete-dialog.component';
import { EditorialService } from 'app/entities/editorial/editorial.service';

describe('Component Tests', () => {
    describe('Editorial Management Delete Component', () => {
        let comp: EditorialDeleteDialogComponent;
        let fixture: ComponentFixture<EditorialDeleteDialogComponent>;
        let service: EditorialService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [LibraryTestModule],
                declarations: [EditorialDeleteDialogComponent]
            })
                .overrideTemplate(EditorialDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(EditorialDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EditorialService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it(
                'Should call delete service on confirmDelete',
                inject(
                    [],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });
});
