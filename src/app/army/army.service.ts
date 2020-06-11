import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Army } from './army.model';
import { HttpClient } from '@angular/common/http';
import { DataStorageService } from '../shared/data-storage.service';

@Injectable({
  providedIn: 'root'
})
export class ArmyService {

  url = 'https://ng-warhammer.firebaseio.com/army.json';
  armysChanged = new Subject<Army[]>();

  constructor(private httpClient: HttpClient, private dataStorage: DataStorageService) { }

  fetchArmys() {
    this.fetchData().subscribe(armys => {
      this.armysChanged.next(armys.filter(army => {army.user == this.dataStorage.getUserName()}));
      console.log(armys.filter(army=>{army.user == this.dataStorage.getUserName()}));
    });
  }

  fetchData() {
    return this.httpClient.get<Army[]>(this.url);
  }

  saveArmy(army: Army){
    this.fetchData().subscribe(armys => {
      if(armys !== null) {
        if(army.id == null) {
          army.id = armys.length - 1;
          console.info('Ejercito Nuevo. ');
          armys.push(army);
        } else {
          console.info('Ejercito Actualizado');
          armys[army.id] = army;
        }
      } else {
        console.info("Primer Ejercito. ");
        armys = new Array<Army>();
        armys.push(army);
      }
      this.httpClient.put(this.url, armys).subscribe(response=>{
        console.info(response);
      });
    });
  }
}
