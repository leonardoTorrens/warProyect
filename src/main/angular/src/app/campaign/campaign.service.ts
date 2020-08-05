import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataStorageService } from '../shared/data-storage.service';
import { Campaign } from './campaign.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CampaignService {

  url = 'https://ng-warhammer.firebaseio.com/campaign.json';
  campaignsChanged = new Subject<Campaign[]>();

  constructor(private httpClient: HttpClient, private dataStorage: DataStorageService) { }

  fetchCampaigns() {
    let orderedCampaigns = new Array<Campaign>();
    let userName = this.dataStorage.getUserName();
    this.fetchData().subscribe(campaigns => {
      campaigns.forEach((campaign, index) => {
        if(campaign.owner = userName){
          campaigns.splice(index, 1);
          orderedCampaigns.push(campaign);
        }
      });
      Array.prototype.push.apply(orderedCampaigns, campaigns);
    });
    console.info(orderedCampaigns);
    return orderedCampaigns;
  }

  fetchData() {
    return this.httpClient.get<Campaign[]>(this.url);
  }

  //esta mal el delete
  deleteCampaign(index: number) {
    this.fetchData().subscribe(campaigns => {
      this.campaignsChanged.next(campaigns.slice());
      campaigns.splice(index, 1);
      this.httpClient.put(this.url, campaigns).subscribe(response => {
        console.info(response);
      });
    });
  }

  saveCampaign(campaign: Campaign) {
    campaign.owner = this.dataStorage.getUserName();
    this.fetchData().subscribe(campaigns => {
      if(campaigns !== null) {
        if(campaign.id == null) {
          campaign.id= campaigns.length - 1;
          console.info('Campaña Nueva. ');
          campaigns.push(campaign);
        } else {
          console.info('Campaña Actualizada');
          campaigns[campaign.id] = campaign;
        }
      } else {
        campaign.id = 0;
        console.info("Primera Campaña. ");
        campaigns = new Array<Campaign>();
        campaigns.push(campaign);
      }
      this.httpClient.put(this.url, campaigns).subscribe(response=>{
        console.info(response);
      });
    });
  }
}
