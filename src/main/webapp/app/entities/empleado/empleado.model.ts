import { BaseEntity } from './../../shared';

export class Empleado implements BaseEntity {
    constructor(
        public id?: number,
        public codEmpleado?: string,
        public nombreEmpleado?: string,
        public apellidoEmpleado?: string,
        public departamentoEmpleado?: string,
        public email?: string,
        public telefono?: string,
        public prestamos?: BaseEntity[],
    ) {
    }
}
