import { UnitProfile } from './unitProfile.model';
import { UnitOption } from './unitOptions.model';

export class Unit {

    constructor(
        public id?: number,
        public name?: string,
        public race?: string,
        public unitCategory?: string,
        public unitType?: string,
        public points?: number,
        public maxSize?: number,
        public minSize?: number,
        public profile?: UnitProfile,
        public rules?: any[],
        public unitOptions?: UnitOption[],
        public unitEquip?: UnitOption[]
        ){}
}