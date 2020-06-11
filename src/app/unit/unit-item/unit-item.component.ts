import { Component, OnInit, Input } from '@angular/core';
import { Unit } from '../unit.model';
import { Router, ActivatedRoute } from '@angular/router';
import { UnitService } from '../unit.service';

@Component({
  selector: 'app-unit-item',
  templateUrl: './unit-item.component.html',
  styleUrls: ['./unit-item.component.css']
})
export class UnitItemComponent implements OnInit {
  displayedSize = '';
  rulesString = 'Nada. ';
  opcionesString = 'Nada. ';
  equipmentString = 'Nada. ';
  @Input() unit: Unit;

  constructor(private route: ActivatedRoute, private router: Router, private unitService: UnitService) { }

  ngOnInit(): void {
    if (this.unit.maxSize == 0) {
      this.displayedSize = `${this.unit.minSize}+`;
    } else {
      this.displayedSize = `${this.unit.minSize}-${this.unit.maxSize}`;
    }
    if(this.unit.rules != null ) { 
      if( this.unit.rules.length === 1){
        this.rulesString = this.unit.rules[0].name;
      } else {
        this.rulesString = '';
        for(let rule of this.unit.rules){
          console.info(rule.name);
          this.rulesString = this.rulesString+rule.name+', ';
        }
      }
    }
    if(this.unit.unitOptions != null ) { 
      if( this.unit.unitOptions.length === 1){
        this.opcionesString = this.unit.unitOptions[0].name;
      } else {
        this.opcionesString = '';
        for(let opcion of this.unit.unitOptions){
          console.info(opcion.name);
          this.opcionesString = this.opcionesString + opcion.name+', ';
        }
      }
    }
    if(this.unit.unitEquip != null ) { 
      if( this.unit.unitEquip.length === 1){
        this.equipmentString = this.unit.unitEquip[0].name;
      } else {
        this.equipmentString = '';
        for(let equip of this.unit.unitEquip){
          console.info(equip.name);
          this.equipmentString = this.equipmentString + equip.name+', ';
        }
      }
    }
  }

  onEditUnit(){
    console.warn("Edit Unit "+this.unit.id);
    this.router.navigate(['../editUnit/'+this.unit.id],{relativeTo: this.route});
  }

  onDeleteUnit(){
    console.warn("Delete Unit "+this.unit.id);
    this.unitService.deleteUnit(this.unit.id);
  }
}
