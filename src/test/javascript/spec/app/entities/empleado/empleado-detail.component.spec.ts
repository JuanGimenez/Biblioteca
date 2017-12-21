/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';

import { BibliotecaTestModule } from '../../../test.module';
import { EmpleadoDetailComponent } from '../../../../../../main/webapp/app/entities/empleado/empleado-detail.component';
import { EmpleadoService } from '../../../../../../main/webapp/app/entities/empleado/empleado.service';
import { Empleado } from '../../../../../../main/webapp/app/entities/empleado/empleado.model';

describe('Component Tests', () => {

    describe('Empleado Management Detail Component', () => {
        let comp: EmpleadoDetailComponent;
        let fixture: ComponentFixture<EmpleadoDetailComponent>;
        let service: EmpleadoService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BibliotecaTestModule],
                declarations: [EmpleadoDetailComponent],
                providers: [
                    EmpleadoService
                ]
            })
            .overrideTemplate(EmpleadoDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EmpleadoDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EmpleadoService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new Empleado(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.empleado).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
