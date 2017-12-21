import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BibliotecaSharedModule } from '../../shared';
import {
    LibroService,
    LibroPopupService,
    LibroComponent,
    LibroDetailComponent,
    LibroDialogComponent,
    LibroPopupComponent,
    LibroDeletePopupComponent,
    LibroDeleteDialogComponent,
    libroRoute,
    libroPopupRoute,
} from './';

const ENTITY_STATES = [
    ...libroRoute,
    ...libroPopupRoute,
];

@NgModule({
    imports: [
        BibliotecaSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        LibroComponent,
        LibroDetailComponent,
        LibroDialogComponent,
        LibroDeleteDialogComponent,
        LibroPopupComponent,
        LibroDeletePopupComponent,
    ],
    entryComponents: [
        LibroComponent,
        LibroDialogComponent,
        LibroPopupComponent,
        LibroDeleteDialogComponent,
        LibroDeletePopupComponent,
    ],
    providers: [
        LibroService,
        LibroPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BibliotecaLibroModule {}
