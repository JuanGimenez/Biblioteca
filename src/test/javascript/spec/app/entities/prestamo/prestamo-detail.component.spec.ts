/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';

import { BibliotecaTestModule } from '../../../test.module';
import { PrestamoDetailComponent } from '../../../../../../main/webapp/app/entities/prestamo/prestamo-detail.component';
import { PrestamoService } from '../../../../../../main/webapp/app/entities/prestamo/prestamo.service';
import { Prestamo } from '../../../../../../main/webapp/app/entities/prestamo/prestamo.model';

describe('Component Tests', () => {

    describe('Prestamo Management Detail Component', () => {
        let comp: PrestamoDetailComponent;
        let fixture: ComponentFixture<PrestamoDetailComponent>;
        let service: PrestamoService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BibliotecaTestModule],
                declarations: [PrestamoDetailComponent],
                providers: [
                    PrestamoService
                ]
            })
            .overrideTemplate(PrestamoDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PrestamoDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PrestamoService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new Prestamo(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.prestamo).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
