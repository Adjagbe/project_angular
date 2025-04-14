import { Injectable } from '@angular/core';
import { Login } from '../../models/login/login';
import { LOGIN_DATA } from '../../login-form/data';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() { }

  getLogins() : Login[]{
    return LOGIN_DATA;
  }

  LOGIN_DATAS : Login[]=[]

  getLoginsById(id: number): Login {
    if (typeof window !== 'undefined' && localStorage) {
      const localData = localStorage.getItem('loginData');
      if (localData != null) {
        this.LOGIN_DATAS = JSON.parse(localData);
      }
    }
    return this.LOGIN_DATAS.find((login) => login.id == id)!;
  }
}
