import { Injectable } from '@angular/core';
import { Spell } from './spell.model';
import { HttpClient } from '@angular/common/http';
import { DataStorageService } from '../shared/data-storage.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpellService {

  url = 'https://ng-warhammer.firebaseio.com/spells.json';
  spellsChanged = new Subject<Spell[]>();

  constructor(private httpClient: HttpClient, private dataStorage: DataStorageService) { }

  fetchSpell() {
    let spells = new Array<Spell>();

    return spells;
  }

  fetchData() {
    return this.httpClient.get<Spell[]>(this.url);
  }

  deleteSpell(index: number) {
    //esta mal el delete
    this.fetchData().subscribe(spells => {
      this.spellsChanged.next(spells.slice());
      spells.splice(index, 1);
      this.httpClient.put(this.url, spells).subscribe(response => {
        console.info(response);
      });
    });
  }

  saveSpell(spell: Spell) {
    this.fetchData().subscribe(spells => {
      if(spells !== null) {
        if(spell.id == null) {
          spell.id= spells.length - 1;
          console.info('Hechizo Nuevo. ');
          spells.push(spell);
        } else {
          console.info('Hechizo Actualizado');
          spells[spell.id] = spell;
        }
      } else {
        spell.id = 0;
        console.info("Primer Hechizo. ");
        spells = new Array<Spell>();
        spells.push(spell);
      }
      this.httpClient.put(this.url, spell).subscribe(response=>{
        console.info(response);
      });
    });
  }
}
