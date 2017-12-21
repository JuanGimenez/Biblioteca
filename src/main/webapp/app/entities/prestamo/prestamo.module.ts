import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BibliotecaSharedModule } from '../../shared';
import {
    PrestamoService,
    PrestamoPopupService,
    PrestamoComponent,
    PrestamoDetailComponent,
    PrestamoDialogComponent,
    PrestamoPopupComponent,
    PrestamoDeletePopupComponent,
    PrestamoDeleteDialogComponent,
    prestamoRoute,
    prestamoPopupRoute,
} from './';

const ENTITY_STATES = [
    ...prestamoRoute,
    ...prestamoPopupRoute,
];

@NgModule({
    imports: [
        BibliotecaSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        PrestamoComponent,
        PrestamoDetailComponent,
        PrestamoDialogComponent,
        PrestamoDeleteDialogComponent,
        PrestamoPopupComponent,
        PrestamoDeletePopupComponent,
    ],
    entryComponents: [
        PrestamoComponent,
        PrestamoDialogComponent,
        PrestamoPopupComponent,
        PrestamoDeleteDialogComponent,
        PrestamoDeletePopupComponent,
    ],
    providers: [
        PrestamoService,
        PrestamoPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BibliotecaPrestamoModule {}
