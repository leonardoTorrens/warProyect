import { Component, OnInit, Input } from '@angular/core';
import { ArmyService } from '../../army.service';
import { SelectedUnit } from '../selectedUnit.model';

@Component({
  selector: 'app-army-unit-item',
  templateUrl: './army-unit-item.component.html',
  styleUrls: ['./army-unit-item.component.css']
})
export class ArmyUnitItemComponent implements OnInit {

  @Input() unit: SelectedUnit;
  @Input() units;
  subscription;

  rulesString = 'Nada. ';
  opcionesString = 'Nada. ';
  equipmentString = 'Nada. ';
  cost = 0;

  constructor(private armyService: ArmyService) { }

  ngOnInit(): void {
    console.log('construyendo armyitem comp')
    this.subscription = this.armyService.armyUnitsChanged.subscribe((unit: SelectedUnit) => {
      console.log('pusheando unidad');
      this.units.push(unit);
    });
    this.cost = this.unit.size * this.unit.unit.points;
    if(this.unit.unit.rules != null ) { 
      if( this.unit.unit.rules.length === 1){
        this.rulesString = this.unit.unit.rules[0].name;
      } else {
        this.rulesString = '';
        for(let rule of this.unit.unit.rules){
          console.info(rule.name);
          this.rulesString = this.rulesString+rule.name+', ';
        }
      }
    }
    if(this.unit.unit.unitOptions != null ) { 
      if( this.unit.unit.unitOptions.length === 1 && this.unit.unit.unitOptions[0].seleccionado){
        this.opcionesString = this.unit.unit.unitOptions[0].name;
        if(this.unit.unit.unitOptions[0].unico){
          this.cost += +this.unit.unit.unitOptions[0].cost;
        } else {
          this.cost += (+this.unit.unit.unitOptions[0].cost * this.unit.size);
        }
      } else {
        this.opcionesString = '';
        for(let opcion of this.unit.unit.unitOptions){
          console.info(opcion.name);
          if(opcion.seleccionado) {
            this.opcionesString = this.opcionesString + opcion.name+', ';
            if(this.unit.unit.unitOptions[0].unico){
              this.cost += +opcion.cost;
            } else {
              this.cost += (+opcion.cost * this.unit.size);
            }
          }
        }
      }
    }
    if(this.unit.unit.unitEquip != null ) { 
      if( this.unit.unit.unitEquip.length === 1){
        this.equipmentString = this.unit.unit.unitEquip[0].name;
      } else {
        this.equipmentString = '';
        for(let equip of this.unit.unit.unitEquip){
          console.info(equip.name);
          this.equipmentString = this.equipmentString + equip.name+', ';
        }
      }
    }
  }

  ngOnDestroy(){
    console.log('destruyendo suscripcion');
    this.subscription.unsubscribe();
  }

  onDeleteUnit(){

  }

  onEditUnit(){

  }
}
