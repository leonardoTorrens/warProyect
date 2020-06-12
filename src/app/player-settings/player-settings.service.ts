import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PlayerSettings } from './player-settings.model';
import { DataStorageService } from '../shared/data-storage.service';

@Injectable({
  providedIn: 'root'
})
export class PlayerSettingsService {
  url = 'https://ng-warhammer.firebaseio.com/playerSettings.json';
  playerSetting: PlayerSettings;

  constructor(private httpClient: HttpClient, private dataStorage: DataStorageService) { }

  createNewProfile(){
    console.log('create new profile');
    let userMail=this.dataStorage.getUserMail();
    this.dataStorage.setPlayerArmy('');
    this.saveSettings(new PlayerSettings('','',userMail));
  }

  getProfileSetting(){
    console.log('buscando informacion de perfil')
    let userMail = this.dataStorage.getUserMail();
    return this.fetchSettings().subscribe(settings => {
      settings.forEach(setting => {
        if(setting.mail === userMail){
          console.info('perfil encontrado '+setting.selectedArmy+' '+setting.userName);
          this.playerSetting = setting;
          this.dataStorage.setPlayerArmy(setting.selectedArmy);
          this.dataStorage.setUserName(setting.userName);
        }
      });
    });
  }

  fetchSettings(){
    return this.httpClient.get<PlayerSettings[]>(this.url);
  }

  updateSettings(race: string, userName: string){
    this.dataStorage.setPlayerArmy(race);
    this.dataStorage.setUserName(userName);
    let userMail=this.dataStorage.getUserMail();
    console.log('update settings '+userMail+' '+race+' '+userName);
    this.saveSettings(new PlayerSettings(race, userName, userMail));
  }

  saveSettings(playerSetting: PlayerSettings){
    let insertar = true;
    this.fetchSettings().subscribe(settings => {
      if(settings !== null) {
        console.info("configuraciones existentes ");
        settings.forEach((setting, id) => {
          if(setting.mail === playerSetting.mail) {
            settings[id] = playerSetting;
            insertar = false;
          }
        });
        if(insertar){
          settings.push(playerSetting);
        }
      } else {
        console.info("nueva configuracion ");
        settings = new Array<PlayerSettings>();
        settings.push(playerSetting);
      }
      console.log(settings);
      return this.httpClient.put(this.url, settings).subscribe(response=>{
        console.info(response);
      });
    });
  }
}
