import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { UnitService } from 'src/app/unit/unit.service';
import { Unit } from 'src/app/unit/unit.model';
import { SelectedUnit } from '../selectedUnit.model';
import { ArmyService } from '../../army.service';

@Component({
  selector: 'app-army-unit-add',
  templateUrl: './army-unit-add.component.html',
  styleUrls: ['./army-unit-add.component.css']
})
export class ArmyUnitAddComponent implements OnInit {

  @Input() selectedUnit: SelectedUnit;
  @Input() selectedUnitMode;
  addUnitForm: FormGroup;
  units = new Array<Unit>();
  options;

  constructor(private unitService: UnitService, private armyService: ArmyService) { }

  ngOnInit(): void {
    let unitOption = new FormArray([]);
    console.log(this.selectedUnit);
    this.unitService.fetchData().subscribe(units => {
      if(units) {
        this.units = units;
        if(this.selectedUnit.unit.unitOptions != null) {
          this.selectedUnit.unit.unitOptions.forEach(option => { 
            unitOption.push(
              new FormGroup({
                'name': new FormControl(option.name, Validators.required),
                'cost': new FormControl(option.cost, Validators.required),
                'unico': new FormControl(option.unico),
                'seleccionado': new FormControl(option.seleccionado),
              })
            );
          });
        }
      }
    });
    this.selectedUnit = this.selectedUnit ? this.selectedUnit : new SelectedUnit(-1, new Unit(), '', 0);
    
    this.addUnitForm = new FormGroup({
      'size': new FormControl(this.selectedUnit.size, Validators.required), 
      'name': new FormControl(this.selectedUnit.name, Validators.required), 
      'unit': new FormControl(this.selectedUnit.unit.id, Validators.required), 
      'options': unitOption,
    });
  }

  onOptionChange() {
    this.selectedUnit.unit = this.units[this.addUnitForm.value.unit];
    this.options = this.selectedUnit.unit.unitOptions;
    this.selectedUnit.size = this.selectedUnit.unit.minSize;
    this.addUnitForm.value.size = this.selectedUnit.unit.minSize;
    this.options.forEach(option => { 
      (<FormArray>this.addUnitForm.get('options')).push(
        new FormGroup({
          'name': new FormControl(option.name, Validators.required),
          'cost': new FormControl(option.cost, Validators.required),
          'unico': new FormControl(option.unico),
          'seleccionado': new FormControl(option.seleccionado),
        })
      );
    });
    console.log(this.selectedUnit);
  }

  onCancel() {
    this.selectedUnit = new SelectedUnit(0, new Unit(), '', 0);
    this.selectedUnitMode = '';
  }

  onSubmit() {
    const value = this.addUnitForm.value;
    this.selectedUnit.name = value.name;
    this.options.forEach((option, id) => { 
      this.options[id] = value.options[id];
    });
    this.armyService.addUnit(this.selectedUnit);
    console.log(this.selectedUnit);
    this.onCancel();
  }
}
