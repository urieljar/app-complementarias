export class ActividadComple {
    constructor(
        public act_gnral: string| undefined,
        public act_especifica: string,
        public credito: number,
        public lugar: string,
        public num_participantes: string,
        public tiempo: string,
        public descripcion: string,
        public tipo: string,
        public id?: string
    ){}
}