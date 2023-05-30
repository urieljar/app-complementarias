export class AlumnoClase {
    no_control!: string;
    nip!: string;
    nombre!: string;
    a_paterno!: string;
    a_materno!: string;
    carrera!: string;
}
export class AlumnoClase2 {
    no_control!: string;
    nip!: string;
    nombre_completo!: string;
    carrera!: string;
}

export interface AlumnoForm{
    no_control:string;
    nombre_completo: string;
    nip: string;
    carrera: string;
}

export interface AlumnoInterface {
    no_control: string,
    nombre: string,
    a_paterno: string,
    a_materno: string,
    nip: string,
    carrera: string;
}

