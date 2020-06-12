import { Component, OnInit } from '@angular/core';
import { Unit } from '../unit.model';
import { UnitService } from '../unit.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-unit-list',
  templateUrl: './unit-list.component.html',
  styleUrls: ['./unit-list.component.css']
})
export class UnitListComponent implements OnInit {

  subscription: Subscription;
  units: Unit[];
  races = ['', 'Orcos & Goblins', 'Elfos Altos', 'Elfos Silvanos', 'Elfos Oscuros', 'Demonios del Caos', 'Guerreros del Caos', 'Hombres Bestia', 'Enanos del Caos', 'Bretonia', 'El Imperio', 'Reinos Ogros', 'Reyes Funerarios', 'Condes Vampiros', 'Hombres Lagartos', 'Skavens', 'Enanos'];
  raceForm: FormGroup;
  constructor(private unitService: UnitService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.subscription = this.unitService.unitsChanged.subscribe((units: Unit[]) => {
      this.units = units;
    });
    this.raceForm = new FormGroup({
      'race': new FormControl(null, Validators.required)
    });
    this.units = new Array();
  }

  onOptionChange() {
    console.info('cambio la opcion');
    this.units = new Array();
    this.unitService.fetchData().subscribe(units => {
      console.info(units);
      units.forEach((unit) => {
        if(unit.race === this.raceForm.value.race) {
          this.units.push(unit);
        }
      });
    });
  }

  onAddUnit(){
    this.router.navigate(['../addUnit'],{relativeTo: this.route});
  }

}
