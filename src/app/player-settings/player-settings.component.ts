import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DataStorageService } from '../shared/data-storage.service';
import { PlayerSettingsService } from './player-settings.service';

@Component({
  selector: 'app-player-settings',
  templateUrl: './player-settings.component.html',
  styleUrls: ['./player-settings.component.css']
})
export class PlayerSettingsComponent implements OnInit {

  races = ['Orcos & Goblins', 'Elfos Altos', 'Elfos Silvanos', 'Elfos Oscuros', 'Demonios del Caos', 'Guerreros del Caos', 'Hombres Bestia', 'Enanos del Caos', 'Bretonia', 'El Imperio', 'Reinos Ogros', 'Reyes Funerarios', 'Condes Vampiros', 'Hombres Lagartos', 'Skavens', 'Enanos'];
  settingsForm: FormGroup;
  constructor(private dataStorage: DataStorageService, private settingsService: PlayerSettingsService) { }

  ngOnInit(): void {
    this.settingsForm = new FormGroup({
      'race': new FormControl(null, Validators.required), 
      'name': new FormControl(null, Validators.required)
    });
    let userMail=this.dataStorage.getUserMail();
    this.settingsService.fetchSettings().subscribe(settings => {
      settings.forEach(setting => {
        if(setting.mail === userMail){
          console.log('army '+setting.selectedArmy);
          console.log('user '+setting.userName);
          let selectedRace = setting.selectedArmy === '' ? null : setting.selectedArmy;
          let userName = setting.userName === '' ? null : setting.userName;
          this.settingsForm = new FormGroup({
            'race': new FormControl(selectedRace, Validators.required), 
            'name': new FormControl(userName, Validators.required)
          });
          this.dataStorage.setPlayerArmy(setting.selectedArmy);
          this.dataStorage.setUserName(setting.userName);
        }
      });
    });
  }

  onCancel(){
    this.settingsForm.reset();
  }

  onSubmit(){
    const value = this.settingsForm.value;
    this.settingsService.updateSettings(value.race, value.name);
  }
}
