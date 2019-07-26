import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { LibraryAreaModule } from './area/area.module';
import { LibraryCountryModule } from './country/country.module';
import { LibraryBookModule } from './book/book.module';
import { LibraryAuthorModule } from './author/author.module';
import { LibraryEditorialModule } from './editorial/editorial.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
    imports: [
        LibraryAreaModule,
        LibraryCountryModule,
        LibraryBookModule,
        LibraryAuthorModule,
        LibraryEditorialModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LibraryEntityModule {}
