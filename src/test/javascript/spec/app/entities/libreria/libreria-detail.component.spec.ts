/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';

import { BibliotecaTestModule } from '../../../test.module';
import { LibreriaDetailComponent } from '../../../../../../main/webapp/app/entities/libreria/libreria-detail.component';
import { LibreriaService } from '../../../../../../main/webapp/app/entities/libreria/libreria.service';
import { Libreria } from '../../../../../../main/webapp/app/entities/libreria/libreria.model';

describe('Component Tests', () => {

    describe('Libreria Management Detail Component', () => {
        let comp: LibreriaDetailComponent;
        let fixture: ComponentFixture<LibreriaDetailComponent>;
        let service: LibreriaService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BibliotecaTestModule],
                declarations: [LibreriaDetailComponent],
                providers: [
                    LibreriaService
                ]
            })
            .overrideTemplate(LibreriaDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(LibreriaDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LibreriaService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new Libreria(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.libreria).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
