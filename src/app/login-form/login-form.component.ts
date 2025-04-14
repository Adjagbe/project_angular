import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID  } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Login } from '../models/login/login';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../services/login/login.service';
import { NavbarComponent } from '../navbar/navbar.component';


@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [
    FormsModule, CommonModule, NavbarComponent
  ],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss'
})
export class LoginFormComponent implements OnInit {

  showLogin!: Login ;
  Logins!: Login[];
  id!:number





  ngOnInit(): void {
    this.id = Number(this.activatedRoute.snapshot.paramMap.get('id'))
    if(this.id){
      this.showLogin = this.LoginService.getLoginsById(this.id);
    }
   
  }

  constructor(@Inject(PLATFORM_ID) private platformId: Object,
  private router: Router,  private activatedRoute: ActivatedRoute, private LoginService:LoginService )
  { 
    if(isPlatformBrowser(this.platformId)){
      const localData = localStorage.getItem('loginData');
      if(localData!=null){
        this.Logins = JSON.parse(localData);
      }
    }
  }

  updateLogin() : void {
    this.Logins = this.Logins.filter((login) => login.id !== this.showLogin.id);
    this.Logins.push(this.showLogin);
    localStorage.setItem('loginData', JSON.stringify(this.Logins));
    this.router.navigate(['/login']);
  }
}
