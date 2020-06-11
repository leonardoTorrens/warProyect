import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-campaign-item',
  templateUrl: './campaign-item.component.html',
  styleUrls: ['./campaign-item.component.css']
})
export class CampaignItemComponent implements OnInit {

  @Input() campaign;

  constructor() { }

  ngOnInit(): void {
  }

}
