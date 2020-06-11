import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataStorageService } from '../shared/data-storage.service';
import { Campaign } from './campaign.model';

@Injectable({
  providedIn: 'root'
})
export class CampaignService {

  url = 'https://ng-warhammer.firebaseio.com/campaign.json';

  constructor(private httpClient: HttpClient, private dataStorage: DataStorageService) { }

  fetchData(){
    return this.httpClient.get<Campaign[]>(this.url);
  }

  saveCampaign(campaign: Campaign){
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
