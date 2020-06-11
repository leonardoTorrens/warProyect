import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { UnitService } from '../unit.service';
import { Unit } from '../unit.model';
import { UnitProfile } from '../unitProfile.model';
import { UnitOption } from '../unitOptions.model';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-unit-edit',
  templateUrl: './unit-edit.component.html',
  styleUrls: ['./unit-edit.component.css']
})
export class UnitEditComponent implements OnInit {

  unitTypes = ['Comandante','Heroe','Unidad Basica', 'Unidad Especial','Unidad Singular'];
  unitCategorys = ['Infanteria','Infanteria Monstruosa','Caballeria','Caballeria Monstruosa','Maquina de Guerra','Bestia Monstruosa','Monstruo','Bestia de Guerra','Unica','Enjambre'];
  races = ['Orcos & Goblins', 'Elfos Altos', 'Elfos Silvanos', 'Elfos Oscuros', 'Demonios del Caos', 'Guerreros del Caos', 'Hombres Bestia', 'Enanos del Caos', 'Bretonia', 'El Imperio', 'Reinos Ogros', 'Reyes Funerarios', 'Condes Vampiros', 'Hombres Lagartos', 'Skavens', 'Enanos'];

  unitForm: FormGroup;

  id: number;
  unidad: Unit;
  constructor(private unitService: UnitService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      if(this.id != null){
        this.unitService.fetchData().subscribe(units => {
          console.info("fetcheando data");
          this.unidad = units[this.id];
          this.initForm();
        });
      } else {
        this.initForm();
      }
    });
  }

  initForm(){
    let equipments= new FormArray([]),
    unitRules = new FormArray([]),
    unitOption = new FormArray([]),
    name, race, maxSize, minSize, points, unitCategory, unitType,
    movement, weaponSkill, ballisticSkill, toughness, strength, wounds, iniciative, leadership;

    if(this.unidad != null){
      console.info("Estamos en modo edicion");
      name = this.unidad.name;
      race = this.unidad.race;
      maxSize = this.unidad.maxSize;
      minSize = this.unidad.minSize;
      points = this.unidad.points;
      unitCategory = this.unidad.unitCategory;
      unitType = this.unidad.unitType;
      movement = this.unidad.profile.movement;
      weaponSkill = this.unidad.profile.weaponSkill;
      ballisticSkill = this.unidad.profile.ballisticSkill;
      toughness = this.unidad.profile.toughness;
      strength = this.unidad.profile.strength;
      wounds = this.unidad.profile.wounds;
      iniciative = this.unidad.profile.iniciative;
      leadership = this.unidad.profile.leadership;
      if(this.unidad.unitEquip != null) {
        this.unidad.unitEquip.forEach(equip => { 
          equipments.push(
            new FormGroup({
              'name': new FormControl(equip.name, Validators.required),
              'cost': new FormControl(0, Validators.required),
              'unico': new FormControl(true, Validators.required)
            })
          );
       });
      }
      if(this.unidad.unitOptions != null) {
        this.unidad.unitOptions.forEach(option => { 
          unitOption.push(
            new FormGroup({
              'name': new FormControl(option.name, Validators.required),
              'cost': new FormControl(option.cost, Validators.required),
              'unico': new FormControl(option.unico)
            })
          );
        });
      }
      if(this.unidad.rules != null) {
        this.unidad.rules.forEach(rule => { 
          unitRules.push(
            new FormGroup({
              'name': new FormControl(rule.name, Validators.required),
            })
          );
        });
      }
    } else {
      console.info("Estamos en modo creacion");
    }

    this.unitForm = new FormGroup({
      'name': new FormControl(name, Validators.required), 
      'race': new FormControl(race, Validators.required), 
      'maxSize': new FormControl(maxSize, Validators.required), 
      'minSize': new FormControl(minSize, Validators.required), 
      'points': new FormControl(points, Validators.required), 
      'unitCategory': new FormControl(unitCategory, Validators.required), 
      'unitType': new FormControl(unitType, Validators.required), 
      'movement': new FormControl(movement, Validators.required), 
      'weaponSkill': new FormControl(weaponSkill, [Validators.required,Validators.max(10),Validators.min(0)]), 
      'ballisticSkill': new FormControl(ballisticSkill, Validators.required), 
      'toughness': new FormControl(toughness, Validators.required), 
      'strength': new FormControl(strength, Validators.required), 
      'wounds': new FormControl(wounds, Validators.required), 
      'iniciative': new FormControl(iniciative, Validators.required), 
      'leadership': new FormControl(leadership, Validators.required), 
      'rules': unitRules,
      'options': unitOption,
      'equipments': equipments
    });
  }

  onCancel(){
    this.unitForm.reset();
    this.router.navigate(['../../listUnit'],{relativeTo: this.route});
  }

  onSubmit(){
    const value = this.unitForm.value;
    console.info(value);
    let savedProfile = new UnitProfile(value.movement,value.weaponSkill,value.ballisticSkill,value.toughness,value.strength,value.wounds,value.iniciative,value.leadership);
    let savedUnit = new Unit(0 ,value.name,value.race,value.unitCategory,value.unitType,value.points,value.maxSize,value.minSize,savedProfile,value.rules, value.options, value.equipments);
    this.unitService.saveUnit(savedUnit);
    this.router.navigate(['../../listUnit'],{relativeTo: this.route});
  }

  onAddRule(){
    this.addRule(null);
  }

  onDeleteRule(id: number){
    (<FormArray>this.unitForm.get('rules')).removeAt(id);
  }

  onDeleteOption(id: number){
    (<FormArray>this.unitForm.get('options')).removeAt(id);
  }

  onAddOption(){
    this.addOption(null, null, null)
  }

  onDeleteEquip(id: number){
    (<FormArray>this.unitForm.get('equipments')).removeAt(id);
  }

  onAddEquip(){
    this.addEquip(null);
  }

  private addRule(rule){
    (<FormArray>this.unitForm.get('rules')).push(
      new FormGroup({
        'name': new FormControl(rule, Validators.required),
      })
    );
  }

  private addOption(name, cost, unico){
    (<FormArray>this.unitForm.get('options')).push(
      new FormGroup({
        'name': new FormControl(name, Validators.required),
        'cost': new FormControl(cost, Validators.required),
        'unico': new FormControl(unico)
      })
    );
  }

  private addEquip(equip){
  //el costo y unico del equipo son valores default ocultos.
  (<FormArray>this.unitForm.get('equipments')).push(
    new FormGroup({
      'name': new FormControl(equip, Validators.required),
      'cost': new FormControl(0, Validators.required),
      'unico': new FormControl(true, Validators.required)
    })
  );
  }
}
