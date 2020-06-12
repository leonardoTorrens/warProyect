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

  constructor(private armyService: ArmyService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      if(this.id != null) {
        this.armyService.fetchData().subscribe(armys => {
          console.info("fetcheando data");
          this.army = armys[this.id];
          this.initForm();
        });
      } else {
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
      'race': new FormControl(race, Validators.required), 
    });
  }

  onCancel(){
    this.armyForm.reset();
    this.router.navigate(['../listArmy'],{relativeTo: this.route});
  }

  onSubmit(){
    const value = this.armyForm.value;
    let savedArmy = new Army(this.id, value.name, null, value.race, '');
    this.armyService.saveArmy(savedArmy);
    this.router.navigate(['../listArmy'],{relativeTo: this.route});
  }

}
