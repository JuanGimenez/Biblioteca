/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { BibliotecaTestModule } from '../../../test.module';
import { EmpleadoDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/empleado/empleado-delete-dialog.component';
import { EmpleadoService } from '../../../../../../main/webapp/app/entities/empleado/empleado.service';

describe('Component Tests', () => {

    describe('Empleado Management Delete Component', () => {
        let comp: EmpleadoDeleteDialogComponent;
        let fixture: ComponentFixture<EmpleadoDeleteDialogComponent>;
        let service: EmpleadoService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BibliotecaTestModule],
                declarations: [EmpleadoDeleteDialogComponent],
                providers: [
                    EmpleadoService
                ]
            })
            .overrideTemplate(EmpleadoDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EmpleadoDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EmpleadoService);
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
