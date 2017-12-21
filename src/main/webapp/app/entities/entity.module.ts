import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { BibliotecaLibroModule } from './libro/libro.module';
import { BibliotecaEjemplarModule } from './ejemplar/ejemplar.module';
import { BibliotecaEmpleadoModule } from './empleado/empleado.module';
import { BibliotecaLibreriaModule } from './libreria/libreria.module';
import { BibliotecaPrestamoModule } from './prestamo/prestamo.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        BibliotecaLibroModule,
        BibliotecaEjemplarModule,
        BibliotecaEmpleadoModule,
        BibliotecaLibreriaModule,
        BibliotecaPrestamoModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BibliotecaEntityModule {}
