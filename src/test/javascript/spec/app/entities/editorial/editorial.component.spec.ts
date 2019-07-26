/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { LibraryTestModule } from '../../../test.module';
import { EditorialComponent } from 'app/entities/editorial/editorial.component';
import { EditorialService } from 'app/entities/editorial/editorial.service';
import { Editorial } from 'app/shared/model/editorial.model';

describe('Component Tests', () => {
    describe('Editorial Management Component', () => {
        let comp: EditorialComponent;
        let fixture: ComponentFixture<EditorialComponent>;
        let service: EditorialService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [LibraryTestModule],
                declarations: [EditorialComponent],
                providers: []
            })
                .overrideTemplate(EditorialComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(EditorialComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EditorialService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Editorial(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.editorials[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
