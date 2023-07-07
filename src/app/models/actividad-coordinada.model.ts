export class ActividadCoordinada {
    constructor(
        //public act_gnral: string | undefined,
        public act_complementaria: string,
        public status: number,
        public coordinador: string,
        public id?: string
    ) { }
}
export class ActividadCoordinadas {
    constructor(
        public id_actcoordinada: string,
        public id_actcomplementaria:string,
        public act_gnral:string,
        public act_especifica:string,
        public lugar:string,
        public num_participantes:string,
        public tiempo:string,
        public credito:string,
        public status:number,
        public tipo:string,
        public coordinador: string
    ) { }
}
export class ActividadCoordinadaJdepto {
    constructor(
        public id_actcoordinada: string,
        public id_actcomplementaria: string,
        public act_gnral: string,
        public act_especifica: string,
        public lugar: string,
        public num_participantes: string,
        public tiempo: string,
        public credito: string,
        public status: number,
        public tipo: string,
        public coordinador: string
    ) { }
}