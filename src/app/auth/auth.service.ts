import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';
import { User } from './user.model'
import { Router } from '@angular/router';

export interface AuthResponseData{
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    kind: string;
    registered?: boolean;
}

@Injectable({providedIn:'root'})
export class AuthService{
    webKey = 'AIzaSyDgBd_hdpQR8d0SXdVbN_IY2j4qSDHY9UI';
    user = new BehaviorSubject<User>(null);
    private tokenExpirationTimer: any;

    constructor(private httpClient: HttpClient, private router: Router) { }

    signUp(email:string, password: string){
        let datos={
            email,
            password,
            returnSecureToken: true
        };
        let url= "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key="
        return this.httpClient.post<AuthResponseData>(url+this.webKey, datos)
        .pipe(catchError(this.handleError), tap(responseData=>{
            this.handleAuthentication(responseData.email, responseData.idToken, +responseData.expiresIn,responseData.localId);
        }));
    }

    login(email:string, password: string){
        let datos={
            email,
            password,
            returnSecureToken: true
        };
        let url= "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key="
        return this.httpClient.post<AuthResponseData>(url+this.webKey, datos)
            .pipe(catchError(this.handleError), tap(responseData=>{
                this.handleAuthentication(responseData.email, responseData.idToken, +responseData.expiresIn,responseData.localId);
            }));
    }

    private handleAuthentication(email: string, token: string, expiresIn: number, userId: string){
        const expirationDate = new Date(new Date().getTime()+ expiresIn * 1000);
        const user = new User(email, userId, token, expirationDate);
        this.user.next(user);
        localStorage.setItem('userData', JSON.stringify(user));
        this.autoLogout(expiresIn * 1000);
    }

    private handleError(errorResponse: HttpErrorResponse){
        let errorMessage= "Un error inesperado ocurrio";
        console.error(errorResponse.error.error.message);
        console.error(errorResponse);
        if(!errorResponse.error || !errorResponse.error.error){
            return throwError(errorMessage);
        } else {
            switch(errorResponse.error.error.message){
                case 'EMAIL_EXISTS': errorMessage = "El mail ya esta registrado. "; break;
                case 'EMAIL_NOT_FOUND': errorMessage = "El mail utilizado no existe. "; break;
                case 'INVALID_PASSWORD': errorMessage = "Contraseña invalida. "; break;
                case 'USER_DISABLED': errorMessage = "Usuario deshabilitado. "; break;
            }
            return throwError(errorMessage);
        }
    }

    autoLogin(){
        const userData: { email: string, id: string,_token: string, _tokenExpirationDate: string} = JSON.parse(localStorage.getItem('userData'));
        if (!userData) {
            return;
        } else {
            const loadedUser = new User(userData.email,userData.id,userData._token,new Date(userData._tokenExpirationDate));
            if(loadedUser.token){
                this.user.next(loadedUser);
                const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
                this.autoLogout(expirationDuration);
            }
        }
    }

    autoLogout(expirationDuration: number){
        this.tokenExpirationTimer = setTimeout(()=>{this.logout()}, expirationDuration);
    }

    logout(){
        this.user.next(null);
        this.router.navigate(['/auth']);
        localStorage.removeItem('userData');
        if(this.tokenExpirationTimer){
            clearTimeout(this.tokenExpirationTimer);
        }
        this.tokenExpirationTimer = null;
    }
}