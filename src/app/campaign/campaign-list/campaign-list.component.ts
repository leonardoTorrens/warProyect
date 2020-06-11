import { Component, OnInit } from '@angular/core';
import { Campaign } from '../campaign.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-campaign-list',
  templateUrl: './campaign-list.component.html',
  styleUrls: ['./campaign-list.component.css']
})
export class CampaignListComponent implements OnInit {

  campaigns: Campaign [];
  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
  }

  onCreateCampaign() {
    this.router.navigate(['../addCampaign'],{relativeTo: this.route});
  }
}
