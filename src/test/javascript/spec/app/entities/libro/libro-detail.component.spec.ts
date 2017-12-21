/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';

import { BibliotecaTestModule } from '../../../test.module';
import { LibroDetailComponent } from '../../../../../../main/webapp/app/entities/libro/libro-detail.component';
import { LibroService } from '../../../../../../main/webapp/app/entities/libro/libro.service';
import { Libro } from '../../../../../../main/webapp/app/entities/libro/libro.model';

describe('Component Tests', () => {

    describe('Libro Management Detail Component', () => {
        let comp: LibroDetailComponent;
        let fixture: ComponentFixture<LibroDetailComponent>;
        let service: LibroService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BibliotecaTestModule],
                declarations: [LibroDetailComponent],
                providers: [
                    LibroService
                ]
            })
            .overrideTemplate(LibroDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(LibroDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LibroService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new Libro(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.libro).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
