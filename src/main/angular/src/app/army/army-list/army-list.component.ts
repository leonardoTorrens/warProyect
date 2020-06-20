import { Component, OnInit } from '@angular/core';
import { Army } from '../army.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ArmyService } from '../army.service';

@Component({
  selector: 'app-army-list',
  templateUrl: './army-list.component.html',
  styleUrls: ['./army-list.component.css']
})
export class ArmyListComponent implements OnInit {

  armys: Army[];

  constructor(private route: ActivatedRoute, private router: Router, private armyService: ArmyService) { }

  ngOnInit(): void {
    this.armys = new Array();
    this.armyService.armysChanged.subscribe((army: Army[]) => {
      this.armys = army;
    });
    this.armyService.fetchArmys();
    console.info(this.armys);
  }

  onAddArmy(){
    this.router.navigate(['../addArmy'],{relativeTo: this.route});
  }
}
