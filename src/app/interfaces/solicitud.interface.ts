export class SolicitudClase {
    id!: string;
    status!: number;
    observacion!: string;
    created_at!: string;
    valor_numerico!: number;
    periodo!: string;
    alumno!: string;
    act_coordinada!: string;
}
export interface SolicitudInterface {
    id: string,
    status: number,
    observacion: string,
    created_at: string,
    valor_numerico: number,
    periodo: string,
    alumno: string,
    act_coordinada: string
}
