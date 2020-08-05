import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RuleSet {

  constructor() { }

  validarReglas(ruleSet: string) {
    let result: boolean;
    switch(ruleSet){
      case 'Ninguno': result = true; break;
      case 'WinterStorm': result = this.validarWinterStorm(); break;
      default: result = false;
    }
    return true;
  }

  validarWinterStorm(){
    return true;
  }
}
