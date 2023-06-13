export interface ActCoordinadaInterface {
    id: string,
    status: number,
    act_complementaria: string,
    coordinador: string,
}
export class ActCoordinadaClase {
    id!: string;
    status!: number;
    act_complementaria!: string;
    coordinador!: string;
}
export class ActCoordinadaClase2 {
    id_actcoordinada!: string;
    act_especifica!: string;
    id_actcomplementaria!: string;
    act_gnral!: string;
    lugar!: string;
    credito!: string;
    num_participantes!: string;
    tiempo!: string;
    status!: string;
    tipo!: string;
    coordinador!: string;
}
