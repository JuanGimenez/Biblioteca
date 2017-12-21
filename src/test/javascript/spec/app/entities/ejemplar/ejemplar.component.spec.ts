/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';

import { BibliotecaTestModule } from '../../../test.module';
import { EjemplarComponent } from '../../../../../../main/webapp/app/entities/ejemplar/ejemplar.component';
import { EjemplarService } from '../../../../../../main/webapp/app/entities/ejemplar/ejemplar.service';
import { Ejemplar } from '../../../../../../main/webapp/app/entities/ejemplar/ejemplar.model';

describe('Component Tests', () => {

    describe('Ejemplar Management Component', () => {
        let comp: EjemplarComponent;
        let fixture: ComponentFixture<EjemplarComponent>;
        let service: EjemplarService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BibliotecaTestModule],
                declarations: [EjemplarComponent],
                providers: [
                    EjemplarService
                ]
            })
            .overrideTemplate(EjemplarComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EjemplarComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EjemplarService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new Ejemplar(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.ejemplars[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
