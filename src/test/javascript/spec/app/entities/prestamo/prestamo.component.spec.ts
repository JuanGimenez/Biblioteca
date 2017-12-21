/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';

import { BibliotecaTestModule } from '../../../test.module';
import { PrestamoComponent } from '../../../../../../main/webapp/app/entities/prestamo/prestamo.component';
import { PrestamoService } from '../../../../../../main/webapp/app/entities/prestamo/prestamo.service';
import { Prestamo } from '../../../../../../main/webapp/app/entities/prestamo/prestamo.model';

describe('Component Tests', () => {

    describe('Prestamo Management Component', () => {
        let comp: PrestamoComponent;
        let fixture: ComponentFixture<PrestamoComponent>;
        let service: PrestamoService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BibliotecaTestModule],
                declarations: [PrestamoComponent],
                providers: [
                    PrestamoService
                ]
            })
            .overrideTemplate(PrestamoComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PrestamoComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PrestamoService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new Prestamo(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.prestamos[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
