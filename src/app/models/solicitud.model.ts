export class Solicitud {
    constructor(
        public id_periodo: string,
        public periodo_actual:string,
        public periodo: string,
        public created_at: string,
        public id_actcomplementaria:string,
        public act_especifica: string,
        public credito:string,
        public tipo_act:string,
        public alumno: string,
        public no_control: string,
        public carrera: string,
        public valor_numerico: number,
        public id_coordinador:string,
        public id_jdepto: string,
        public observacion?: string,
        public status?: number,
        public id?: string
    ) {
        
    }
}
export class SolicitudAlumno {
    constructor(
        public periodo: string,
        public created_at: string,
        public act_complementaria: string,
        public alumno: string,
        public no_control: string,
        public carrera: string,
        public credito: string,
        public valor_numerico?: number,
        public observacion?: string,
        public tipo?: string,
        public id?: string
    ) {

    }
}
