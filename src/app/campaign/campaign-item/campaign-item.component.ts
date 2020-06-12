import { Component, OnInit, Input } from '@angular/core';
import { CampaignService } from '../campaign.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-campaign-item',
  templateUrl: './campaign-item.component.html',
  styleUrls: ['./campaign-item.component.css']
})
export class CampaignItemComponent implements OnInit {

  @Input() campaign;

  constructor(private campaignService: CampaignService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    
  }

  onDeleteArmy(){
    this.campaignService.deleteCampaign(this.campaign.id);
  }

  onEditArmy(){
    this.router.navigate(['../editCampaign>/'+this.campaign.id],{relativeTo: this.route});
  }
}
