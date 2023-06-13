export class PeriodoClase {
    id!: string;
    mes_ini!: string;
    mes_fin!: string;
    anio!: string;
    status!: number;
}
export class PeriodoClase2 {
    public id!: string;
    public periodo!: string;
    public status!: number;
}
export interface PeriodoInterface{
    id: string,
    mes_ini: string,
    mes_fin: string,
    anio: string,
    status: number,
}
