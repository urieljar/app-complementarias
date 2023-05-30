export class Alumno{
    constructor(
        public no_control: string |undefined,
        public nombre_completo: string |undefined,
        public carrera: string |undefined,
        public nip?: string |undefined
    ){
        
    }
}