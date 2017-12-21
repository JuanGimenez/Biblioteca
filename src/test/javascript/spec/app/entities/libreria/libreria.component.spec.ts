/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';

import { BibliotecaTestModule } from '../../../test.module';
import { LibreriaComponent } from '../../../../../../main/webapp/app/entities/libreria/libreria.component';
import { LibreriaService } from '../../../../../../main/webapp/app/entities/libreria/libreria.service';
import { Libreria } from '../../../../../../main/webapp/app/entities/libreria/libreria.model';

describe('Component Tests', () => {

    describe('Libreria Management Component', () => {
        let comp: LibreriaComponent;
        let fixture: ComponentFixture<LibreriaComponent>;
        let service: LibreriaService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BibliotecaTestModule],
                declarations: [LibreriaComponent],
                providers: [
                    LibreriaService
                ]
            })
            .overrideTemplate(LibreriaComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(LibreriaComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LibreriaService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new Libreria(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.librerias[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
