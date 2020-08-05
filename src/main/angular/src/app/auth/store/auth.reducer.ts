import { User } from '../user.model';

const initialState: State = {
    user: null
}
export interface State {
    user: User;
  }

export function authReducer(state, action){
    return state;
}