import { SelectedUnit } from './army-unit/selectedUnit.model';

export class Army {
    constructor(public id: number, public name: string, public units: SelectedUnit[], public race: string, public user: string, public totalCost: number, public ruleSet: string) {}
}