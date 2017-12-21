import { BaseEntity } from './../../shared';

export class Prestamo implements BaseEntity {
    constructor(
        public id?: number,
        public codigoPrestamo?: string,
        public fechaPrestado?: any,
        public fechasDevuelto?: any,
        public libro?: BaseEntity,
        public empleado?: BaseEntity,
    ) {
    }
}
