import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LibrarySharedModule } from 'app/shared';
import {
    EditorialComponent,
    EditorialDetailComponent,
    EditorialUpdateComponent,
    EditorialDeletePopupComponent,
    EditorialDeleteDialogComponent,
    editorialRoute,
    editorialPopupRoute
} from './';

const ENTITY_STATES = [...editorialRoute, ...editorialPopupRoute];

@NgModule({
    imports: [LibrarySharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        EditorialComponent,
        EditorialDetailComponent,
        EditorialUpdateComponent,
        EditorialDeleteDialogComponent,
        EditorialDeletePopupComponent
    ],
    entryComponents: [EditorialComponent, EditorialUpdateComponent, EditorialDeleteDialogComponent, EditorialDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LibraryEditorialModule {}
