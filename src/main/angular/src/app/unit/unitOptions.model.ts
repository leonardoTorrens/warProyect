export class UnitOption {
    //si unico es verdadero, el costo solo se aplica una vez. si es falso, el costo se aplica por cada miniatura de la unidad
    constructor(public name: string, public cost: number, public unico: boolean, public seleccionado?: boolean) {}
}