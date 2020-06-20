import { Component, OnInit } from '@angular/core';
import { CampaignService } from '../campaign.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Campaign } from '../campaign.model';
import { FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-campaign-edit',
  templateUrl: './campaign-edit.component.html',
  styleUrls: ['./campaign-edit.component.css']
})
export class CampaignEditComponent implements OnInit {

  campaign: Campaign;
  id: number;
  campaignForm: FormGroup;

  constructor(private campaignService: CampaignService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      if(this.id != null) {
        this.campaignService.fetchData().subscribe(campaigns => {
          console.info("fetcheando data");
          this.campaign = campaigns[this.id];
          this.initForm();
        });
      } else {
        this.initForm();
      }
    });
  }

  initForm() {
    let name;
    if(this.campaign != null){
      console.info("Estamos en modo edicion");
      name = this.campaign.name;
    }
    this.campaignForm = new FormGroup({
      'name': new FormControl(name, Validators.required)
    });
  }

  onCancel() {
    this.campaignForm.reset();
    this.router.navigate(['../../listCampaign'],{relativeTo: this.route});
  }

  onSubmit() {
    const value = this.campaignForm.value;
    let savedCampaign = new Campaign(this.id, value.name, '');
    this.campaignService.saveCampaign(savedCampaign);
    this.router.navigate(['../../listCampaign'],{relativeTo: this.route});
  }
}
