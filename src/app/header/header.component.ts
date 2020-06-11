import { Component, OnInit } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  imagePathLogo = 'https://www.kindpng.com/picc/m/83-832544_warhammer-logo-transparent-background-hd-png-download.png';
  private userSub: Subscription;
  isAuthenticated = false;

  constructor(private dataStorage: DataStorageService, private authSerive: AuthService) { }
 
  ngOnInit() {
    this.userSub = this.authSerive.user.subscribe(user =>{
      this.isAuthenticated = !user ? false : true; //this.isAuthenticated = !!user; ->opcion del video de doble negacion
    });  
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

  logout() {
    this.authSerive.logout();
  }
}
