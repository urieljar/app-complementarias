export class JefeDptos{
    constructor(
        public rfc: string,
        public nombre_completo: string,
        public fecha_ingreso: string,
        public fecha_termina:string,
        public status: number,
        public departamento: string,
        public clave?: string,
        
    ) {

    }
}