import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  playerArmy: string;
  mail: string;
  userName: string;

  getUserMail(){
    return this.mail;
  }

  setUserMail(mail: string){
    this.mail = mail;
  }

  getPlayerArmy(){
    return this.playerArmy;
  }

  setPlayerArmy(playerArmy: string) {
    this.playerArmy = playerArmy;
  }

  getUserName(){
    return this.userName;
  }

  setUserName(userName: string){
    this.userName = userName;
  }
}
