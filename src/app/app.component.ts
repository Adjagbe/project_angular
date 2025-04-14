import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { RouterOutlet} from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { isPlatformBrowser, registerLocaleData } from '@angular/common';
import * as fr from '@angular/common/locales/fr'
import * as en from '@angular/common/locales/en'
import { LoginService } from './services/login/login.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NavbarComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private LoginService: LoginService,

  ) {
    registerLocaleData(fr.default)
    registerLocaleData(en.default)
    if (isPlatformBrowser(this.platformId)) {

    let login = localStorage.getItem('loginData');
    if (login == null){
      localStorage.setItem('loginData', JSON.stringify(this.LoginService.getLogins()))
    }
      
    }
  }
}
