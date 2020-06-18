import { Component, OnInit, Input } from '@angular/core';
import { Army } from '../army.model';
import { ArmyService } from '../army.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SelectedUnit } from '../army-unit/selectedUnit.model';
import { Unit } from 'src/app/unit/unit.model';

@Component({
  selector: 'app-army-edit',
  templateUrl: './army-edit.component.html',
  styleUrls: ['./army-edit.component.css']
})
export class ArmyEditComponent implements OnInit {

  id: number;
  army: Army;
  selectedUnit = '';
  selectedUnitMode = '';

  @Input() units = new Array<SelectedUnit>();
  races = ['Orcos & Goblins', 'Elfos Altos', 'Elfos Silvanos', 'Elfos Oscuros', 'Demonios del Caos', 'Guerreros del Caos', 'Hombres Bestia', 'Enanos del Caos', 'Bretonia', 'El Imperio', 'Reinos Ogros', 'Reyes Funerarios', 'Condes Vampiros', 'Hombres Lagartos', 'Skavens', 'Enanos'];
  rulesSet = ['Ninguno', 'WinterStorm'];
  armyForm: FormGroup;
  editMode: boolean; 
  subscription;

  constructor(private armyService: ArmyService, private route: ActivatedRoute, private router: Router) { }

  ngOnDestroy(){
    console.log('destruyendo suscripcion');
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.subscription = this.armyService.armyUnitsChanged.subscribe((unit: SelectedUnit) => {
      console.log('pusheando unidad');
      if(this.units == null){
        this.units = new Array<SelectedUnit>();
      }
      this.units.push(unit);
    });
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      if(this.id != null) {
        console.log("Modo Edicion");
        this.editMode = true;
        this.armyService.fetchData().subscribe(armys => {
          console.info("fetcheando data");
          this.army = armys[this.id];
          this.units = this.army.units;
          this.initForm();
        });
      } else {
        this.editMode = false;
        console.log("Modo Creacion");
        this.initForm();
      }
    });
  }

  initForm(){
    let race, name, ruleSet;
    if(this.army != null){
      console.info("Estamos en modo edicion");
      console.info(this.army);
      name = this.army.name;
      race = this.army.race;
      ruleSet = this.army.ruleSet;
    } else {
      console.info("Estamos en modo creacion");
    }
    this.armyForm = new FormGroup({
      'name': new FormControl(name, Validators.required), 
      'race': new FormControl({value: race, disabled:this.editMode}, Validators.required),
      'ruleSet': new FormControl(ruleSet, Validators.required)
    });
  }

  onCancel(){
    this.armyForm.reset();
    if(this.editMode){
      this.router.navigate(['../../listArmy'], {relativeTo: this.route});
    } else {
      this.router.navigate(['../listArmy'], {relativeTo: this.route});
    }
  }

  onSubmit(){
    const value = this.armyForm.value;
    let savedArmy = new Army(this.id, value.name, new Array(), value.race, '', 0, value.ruleSet);
    console.info('raza ' +value.race);
    this.armyService.saveArmy(savedArmy);
    if(this.editMode){
      this.router.navigate(['../../listArmy'], {relativeTo: this.route});
    } else {
      this.router.navigate(['../listArmy'], {relativeTo: this.route});
    }
  }

  onAddUnit(){
    console.info('Agregando unidad al ejercito');
    this.selectedUnitMode = 'add';
  }
}
