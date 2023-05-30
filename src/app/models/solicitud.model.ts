export class Solicitud {
    constructor(
        public periodo: string,
        public jdepto: string,
        public created_at: string,
        public act_complementaria: string,
        public alumno: string,
        public no_control: string,
        public carrera: string,
        public valor_numerico?: number,
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
