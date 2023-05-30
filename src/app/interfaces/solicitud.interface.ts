export class SolicitudClase {
    id!: string;
    status!: number;
    observacion!: string;
    created_at!: string;
    valor_numerico!: number;
    periodo!: string;
    jdepto!: string;
    alumno!: string;
    act_complementaria!: string;
}
export interface SolicitudInterface {
    id: string,
    status: number,
    observacion: string,
    created_at: string,
    valor_numerico: number,
    periodo: string,
    jdepto: string,
    alumno: string,
    act_complementaria: string
}
