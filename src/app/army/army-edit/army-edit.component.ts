import { Component, OnInit } from '@angular/core';
import { Army } from '../army.model';
import { ArmyService } from '../army.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-army-edit',
  templateUrl: './army-edit.component.html',
  styleUrls: ['./army-edit.component.css']
})
export class ArmyEditComponent implements OnInit {

  id: number;
  army: Army;
  races = ['Orcos & Goblins', 'Elfos Altos', 'Elfos Silvanos', 'Elfos Oscuros', 'Demonios del Caos', 'Guerreros del Caos', 'Hombres Bestia', 'Enanos del Caos', 'Bretonia', 'El Imperio', 'Reinos Ogros', 'Reyes Funerarios', 'Condes Vampiros', 'Hombres Lagartos', 'Skavens', 'Enanos'];
  armyForm: FormGroup;
  editMode: boolean; 

  constructor(private armyService: ArmyService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      if(this.id != null) {
        console.log("Modo Edicion");
        this.editMode = true;
        this.armyService.fetchData().subscribe(armys => {
          console.info("fetcheando data");
          this.army = armys[this.id];
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
    let race, name;
    if(this.army != null){
      console.info("Estamos en modo edicion");
      name = this.army.name;
      race = this.army.race;
    } else {
      console.info("Estamos en modo creacion");
    }
    this.armyForm = new FormGroup({
      'name': new FormControl(name, Validators.required), 
      'race': new FormControl({value: race, disabled:this.editMode}, Validators.required) 
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
    let savedArmy = new Army(this.id, value.name, new Array(), value.race, '', 0);
    this.armyService.saveArmy(savedArmy);
    if(this.editMode){
      this.router.navigate(['../../listArmy'], {relativeTo: this.route});
    } else {
      this.router.navigate(['../listArmy'], {relativeTo: this.route});
    }
  }

  onAddUnit(){
    console.info('Agregando unidad al ejercito');
  }
}
