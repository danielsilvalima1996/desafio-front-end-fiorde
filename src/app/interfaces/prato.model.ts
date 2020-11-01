import { Restaurante } from './restaurante.model';

export interface Prato {
    id?: number,
    idRestaurante: Restaurante,
    prato: string,
    preco: number
}