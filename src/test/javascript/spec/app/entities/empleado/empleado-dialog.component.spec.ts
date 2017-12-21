/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { BibliotecaTestModule } from '../../../test.module';
import { EmpleadoDialogComponent } from '../../../../../../main/webapp/app/entities/empleado/empleado-dialog.component';
import { EmpleadoService } from '../../../../../../main/webapp/app/entities/empleado/empleado.service';
import { Empleado } from '../../../../../../main/webapp/app/entities/empleado/empleado.model';

describe('Component Tests', () => {

    describe('Empleado Management Dialog Component', () => {
        let comp: EmpleadoDialogComponent;
        let fixture: ComponentFixture<EmpleadoDialogComponent>;
        let service: EmpleadoService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BibliotecaTestModule],
                declarations: [EmpleadoDialogComponent],
                providers: [
                    EmpleadoService
                ]
            })
            .overrideTemplate(EmpleadoDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EmpleadoDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EmpleadoService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Empleado(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.empleado = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'empleadoListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Empleado();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.empleado = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'empleadoListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
