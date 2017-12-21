import { BaseEntity } from './../../shared';

export const enum Language {
    'FRENCH',
    'ENGLISH',
    'SPANISH'
}

export class Ejemplar implements BaseEntity {
    constructor(
        public id?: number,
        public isbn?: string,
        public tituloLibro?: string,
        public autor?: string,
        public numeroEjemplares?: number,
        public ejemplaresDisponibles?: number,
        public idioma?: Language,
        public libros?: BaseEntity[],
    ) {
    }
}
