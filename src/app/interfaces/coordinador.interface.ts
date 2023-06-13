export interface CoordinadorForm {
    rfc: string,
    clave: string
}
export class CoordinadorClase {
    rfc !: string;
    av !: string;
    nombre !: string;
    apellidos!: string;
    clave!: string;
    status!: number;
    jdepto!: string;
}
export interface CoordinadorInterface {
    rfc: string,
    av: string,
    nombre: string,
    apellidos: string,
    clave: string,
    status: number,
    jdepto: string,
}