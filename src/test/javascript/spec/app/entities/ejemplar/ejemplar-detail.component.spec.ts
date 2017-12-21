/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';

import { BibliotecaTestModule } from '../../../test.module';
import { EjemplarDetailComponent } from '../../../../../../main/webapp/app/entities/ejemplar/ejemplar-detail.component';
import { EjemplarService } from '../../../../../../main/webapp/app/entities/ejemplar/ejemplar.service';
import { Ejemplar } from '../../../../../../main/webapp/app/entities/ejemplar/ejemplar.model';

describe('Component Tests', () => {

    describe('Ejemplar Management Detail Component', () => {
        let comp: EjemplarDetailComponent;
        let fixture: ComponentFixture<EjemplarDetailComponent>;
        let service: EjemplarService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BibliotecaTestModule],
                declarations: [EjemplarDetailComponent],
                providers: [
                    EjemplarService
                ]
            })
            .overrideTemplate(EjemplarDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EjemplarDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EjemplarService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new Ejemplar(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.ejemplar).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
