import { Unit } from 'src/app/unit/unit.model';

export class SelectedUnit {
    constructor(public id: number, public unit: Unit, public name: string, public size: number) { }
}