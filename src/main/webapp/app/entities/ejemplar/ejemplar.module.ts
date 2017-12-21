import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BibliotecaSharedModule } from '../../shared';
import {
    EjemplarService,
    EjemplarPopupService,
    EjemplarComponent,
    EjemplarDetailComponent,
    EjemplarDialogComponent,
    EjemplarPopupComponent,
    EjemplarDeletePopupComponent,
    EjemplarDeleteDialogComponent,
    ejemplarRoute,
    ejemplarPopupRoute,
} from './';

const ENTITY_STATES = [
    ...ejemplarRoute,
    ...ejemplarPopupRoute,
];

@NgModule({
    imports: [
        BibliotecaSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        EjemplarComponent,
        EjemplarDetailComponent,
        EjemplarDialogComponent,
        EjemplarDeleteDialogComponent,
        EjemplarPopupComponent,
        EjemplarDeletePopupComponent,
    ],
    entryComponents: [
        EjemplarComponent,
        EjemplarDialogComponent,
        EjemplarPopupComponent,
        EjemplarDeleteDialogComponent,
        EjemplarDeletePopupComponent,
    ],
    providers: [
        EjemplarService,
        EjemplarPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BibliotecaEjemplarModule {}
