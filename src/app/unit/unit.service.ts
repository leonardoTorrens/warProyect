import { Injectable } from '@angular/core';
import { Unit } from './unit.model';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UnitService {

  unitsChanged = new Subject<Unit[]>();
  url = 'https://ng-warhammer.firebaseio.com/unit.json';

  constructor(private httpClient: HttpClient) { }

  saveUnit(unit: Unit) {
    let insertar = true;
    this.fetchData().subscribe(units => {
      console.log(units);
      if(units !== null) {
        units.forEach((unitInList, id) => {
          if(unit.name === unitInList.name && unit.race === unitInList.race) {
            unit.id = id;
            console.info('Actualizando unidad. ');
            units[id] = unit;
            insertar = false;
          }
        });
        if(insertar) {
          unit.id= units.length - 1;
          console.info('Unidad Nueva. ');
          units.push(unit);
        }
      } else {
        console.info("Primera unidad. ");
        units = new Array<Unit>();
        units.push(unit);
      }
      this.httpClient.put(this.url, units).subscribe(response=>{
        console.info(response);
      });
    });
  }

  fetchData() {
    return this.httpClient.get<Unit[]>(this.url);
  }

  deleteUnit(index: number) {
    this.fetchData().subscribe(units => {
      this.unitsChanged.next(units.slice());
      units.splice(index, 1);
      this.httpClient.put(this.url, units).subscribe(response => {
        console.info(response);
      });
    });
  }


}
