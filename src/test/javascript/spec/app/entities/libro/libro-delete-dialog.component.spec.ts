/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { BibliotecaTestModule } from '../../../test.module';
import { LibroDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/libro/libro-delete-dialog.component';
import { LibroService } from '../../../../../../main/webapp/app/entities/libro/libro.service';

describe('Component Tests', () => {

    describe('Libro Management Delete Component', () => {
        let comp: LibroDeleteDialogComponent;
        let fixture: ComponentFixture<LibroDeleteDialogComponent>;
        let service: LibroService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BibliotecaTestModule],
                declarations: [LibroDeleteDialogComponent],
                providers: [
                    LibroService
                ]
            })
            .overrideTemplate(LibroDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(LibroDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LibroService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
