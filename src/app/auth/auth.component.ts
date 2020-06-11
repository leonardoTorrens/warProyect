import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, AuthResponseData } from './auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { PlayerSettingsService } from '../player-settings/player-settings.service';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent implements OnInit {
  isLoginMode  = true;
  isLoading = false;
  error: string = null;

  constructor(private authService: AuthService, private router: Router, private playerSettingsService: PlayerSettingsService, private dataStorage: DataStorageService) { }

  ngOnInit(): void {}

  onSwitchMode(){
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(authForm: NgForm){
    let authObs: Observable<AuthResponseData>;

    if(authForm.valid){
      const email = authForm.value.email;
      const pass = authForm.value.password;
      this.isLoading = true;
      if(this.isLoginMode) {
        authObs = this.authService.login(email,pass);
      } else {
        authObs = this.authService.signUp(email,pass);
      }
      authObs.subscribe(responseData => {
        this.dataStorage.setUserMail(email);
        console.info(responseData);
        this.isLoading = false;
        if(this.isLoginMode){
          this.router.navigate(['/home']);
        } else {
          this.playerSettingsService.createNewProfile();
          this.router.navigate(['/playerSettings']);
        }
      }, errorMessage => {
        this.error = errorMessage;
        this.isLoading = false;
      });
      authForm.reset();
    }
  }
}
