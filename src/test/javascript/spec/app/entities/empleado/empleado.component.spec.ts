/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';

import { BibliotecaTestModule } from '../../../test.module';
import { EmpleadoComponent } from '../../../../../../main/webapp/app/entities/empleado/empleado.component';
import { EmpleadoService } from '../../../../../../main/webapp/app/entities/empleado/empleado.service';
import { Empleado } from '../../../../../../main/webapp/app/entities/empleado/empleado.model';

describe('Component Tests', () => {

    describe('Empleado Management Component', () => {
        let comp: EmpleadoComponent;
        let fixture: ComponentFixture<EmpleadoComponent>;
        let service: EmpleadoService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BibliotecaTestModule],
                declarations: [EmpleadoComponent],
                providers: [
                    EmpleadoService
                ]
            })
            .overrideTemplate(EmpleadoComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EmpleadoComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EmpleadoService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new Empleado(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.empleados[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
