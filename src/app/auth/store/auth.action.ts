import { User } from '../user.model';
import { Action } from '@ngrx/store';

export const LOGIN = 'LOGIN';

export class login implements Action {
    constructor(public payload: User){}
    readonly type = LOGIN;
}