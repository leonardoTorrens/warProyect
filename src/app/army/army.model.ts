import { Unit } from '../unit/unit.model';

export class Army {
    constructor(public id: number, public name: string, public units: Unit[], public race: string, public user: string) {}
}