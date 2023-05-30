export interface JefeDepartmento {
    rfc: string,
    clave: string
}
export class JefeDptoClase {
    rfc !: string;
    nombre !: string;
    apellidos!: string;
    clave!: string;
    fecha_ingreso!: string;
    fecha_termina!: string;
    status!: number;
    departamento!: number
}
export interface JefeDptoInterface {
    rfc: string,
    nombre: string,
    apellidos: string,
    clave: string,
    fecha_ingreso: string,
    fecha_termina: string,
    status: number,
    departamento: number
}