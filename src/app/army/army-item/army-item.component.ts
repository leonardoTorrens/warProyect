import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-army-item',
  templateUrl: './army-item.component.html',
  styleUrls: ['./army-item.component.css']
})
export class ArmyItemComponent implements OnInit {

  @Input() army;

  constructor() { }

  ngOnInit(): void {
    
  }

}
