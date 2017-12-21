import { BaseEntity } from './../../shared';

export const enum Estado {
    'PRESTADO',
    'RESERVADO',
    'LIBRE'
}

export class Libro implements BaseEntity {
    constructor(
        public id?: number,
        public codLibro?: string,
        public estado?: Estado,
        public prestamos?: BaseEntity[],
        public ejemplar?: BaseEntity,
        public libreria?: BaseEntity,
    ) {
    }
}
