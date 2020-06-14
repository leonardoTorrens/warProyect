import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataStorageService } from '../shared/data-storage.service';
import { Subject } from 'rxjs';
import { MagicalObject } from './magical-object.model';

@Injectable({
  providedIn: 'root'
})
export class MagicalObjectService {

  url = 'https://ng-warhammer.firebaseio.com/magicObject.json';
  magicalChanged = new Subject<MagicalObject[]>();

  constructor(private httpClient: HttpClient, private dataStorage: DataStorageService) { }

  fetchMagicalObject() {
    let magicalObjects = new Array<MagicalObject>();

    return magicalObjects;
  }

  fetchData() {
    return this.httpClient.get<MagicalObject[]>(this.url);
  }

  deleteMagicalObject(index: number) {
    //esta mal el delete
    this.fetchData().subscribe(magicalObjects => {
      this.magicalChanged.next(magicalObjects.slice());
      magicalObjects.splice(index, 1);
      this.httpClient.put(this.url, magicalObjects).subscribe(response => {
        console.info(response);
      });
    });
  }

  saveMagicalObject(magicalObject: MagicalObject) {
    this.fetchData().subscribe(magicalObjects => {
      if(magicalObjects !== null) {
        if(magicalObject.id == null) {
            magicalObject.id= magicalObjects.length - 1;
          console.info('Objeto Magico Nuevo. ');
          magicalObjects.push(magicalObject);
        } else {
          console.info('Objeto Magico Actualizado');
          magicalObjects[magicalObject.id] = magicalObject;
        }
      } else {
        magicalObject.id = 0;
        console.info("Primer Objeto Magico. ");
        magicalObjects = new Array<MagicalObject>();
        magicalObjects.push(magicalObject);
      }
      this.httpClient.put(this.url, magicalObject).subscribe(response=>{
        console.info(response);
      });
    });
  }
}
