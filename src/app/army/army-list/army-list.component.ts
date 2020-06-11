import { Component, OnInit } from '@angular/core';
import { Army } from '../army.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-army-list',
  templateUrl: './army-list.component.html',
  styleUrls: ['./army-list.component.css']
})
export class ArmyListComponent implements OnInit {

  armys: Army[];

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void { }

  onAddArmy(){
    this.router.navigate(['../addArmy'],{relativeTo: this.route});
  }
}
