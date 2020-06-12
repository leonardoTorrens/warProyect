import { Component, OnInit, Input } from '@angular/core';
import { Army } from '../army.model';
import { ArmyService } from '../army.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-army-item',
  templateUrl: './army-item.component.html',
  styleUrls: ['./army-item.component.css']
})
export class ArmyItemComponent implements OnInit {

  @Input() army: Army;

  constructor(private armyService: ArmyService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    
  }

  onDeleteArmy(){
    this.armyService.deleteArmy(this.army.id);
  }

  onEditArmy(){
    this.router.navigate(['../editArmy/'+this.army.id],{relativeTo: this.route});
  }
}
