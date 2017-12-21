import { BaseEntity } from './../../shared';

export class Libreria implements BaseEntity {
    constructor(
        public id?: number,
        public codLibreria?: string,
        public capacidad?: number,
        public libros?: BaseEntity[],
    ) {
    }
}
