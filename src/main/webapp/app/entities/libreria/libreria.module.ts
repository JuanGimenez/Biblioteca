import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BibliotecaSharedModule } from '../../shared';
import {
    LibreriaService,
    LibreriaPopupService,
    LibreriaComponent,
    LibreriaDetailComponent,
    LibreriaDialogComponent,
    LibreriaPopupComponent,
    LibreriaDeletePopupComponent,
    LibreriaDeleteDialogComponent,
    libreriaRoute,
    libreriaPopupRoute,
} from './';

const ENTITY_STATES = [
    ...libreriaRoute,
    ...libreriaPopupRoute,
];

@NgModule({
    imports: [
        BibliotecaSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        LibreriaComponent,
        LibreriaDetailComponent,
        LibreriaDialogComponent,
        LibreriaDeleteDialogComponent,
        LibreriaPopupComponent,
        LibreriaDeletePopupComponent,
    ],
    entryComponents: [
        LibreriaComponent,
        LibreriaDialogComponent,
        LibreriaPopupComponent,
        LibreriaDeleteDialogComponent,
        LibreriaDeletePopupComponent,
    ],
    providers: [
        LibreriaService,
        LibreriaPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BibliotecaLibreriaModule {}
