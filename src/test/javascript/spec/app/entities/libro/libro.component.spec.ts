/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';

import { BibliotecaTestModule } from '../../../test.module';
import { LibroComponent } from '../../../../../../main/webapp/app/entities/libro/libro.component';
import { LibroService } from '../../../../../../main/webapp/app/entities/libro/libro.service';
import { Libro } from '../../../../../../main/webapp/app/entities/libro/libro.model';

describe('Component Tests', () => {

    describe('Libro Management Component', () => {
        let comp: LibroComponent;
        let fixture: ComponentFixture<LibroComponent>;
        let service: LibroService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BibliotecaTestModule],
                declarations: [LibroComponent],
                providers: [
                    LibroService
                ]
            })
            .overrideTemplate(LibroComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(LibroComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LibroService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new Libro(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.libros[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
