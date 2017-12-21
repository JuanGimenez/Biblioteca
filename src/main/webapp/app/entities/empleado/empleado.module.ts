import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BibliotecaSharedModule } from '../../shared';
import {
    EmpleadoService,
    EmpleadoPopupService,
    EmpleadoComponent,
    EmpleadoDetailComponent,
    EmpleadoDialogComponent,
    EmpleadoPopupComponent,
    EmpleadoDeletePopupComponent,
    EmpleadoDeleteDialogComponent,
    empleadoRoute,
    empleadoPopupRoute,
} from './';

const ENTITY_STATES = [
    ...empleadoRoute,
    ...empleadoPopupRoute,
];

@NgModule({
    imports: [
        BibliotecaSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        EmpleadoComponent,
        EmpleadoDetailComponent,
        EmpleadoDialogComponent,
        EmpleadoDeleteDialogComponent,
        EmpleadoPopupComponent,
        EmpleadoDeletePopupComponent,
    ],
    entryComponents: [
        EmpleadoComponent,
        EmpleadoDialogComponent,
        EmpleadoPopupComponent,
        EmpleadoDeleteDialogComponent,
        EmpleadoDeletePopupComponent,
    ],
    providers: [
        EmpleadoService,
        EmpleadoPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BibliotecaEmpleadoModule {}
