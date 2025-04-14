import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterModule } from '@angular/router';
import { Login } from '../models/login/login';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { LoginService } from '../services/login/login.service';
import { FormsModule } from '@angular/forms';
LoginService


@Component({
  selector: 'app-drawer',
  standalone: true,
  imports: [RouterLink, RouterModule, CommonModule, FormsModule],
  templateUrl: './drawer.component.html',
  styleUrl: './drawer.component.scss'
})
export class DrawerComponent {

  showLogin!: Login ;
  Logins!: Login[];
  id!:number

  // constructor(@Inject(PLATFORM_ID) private platformId: Object,
  //   )
  //   { 
  //     if(isPlatformBrowser(this.platformId)){
  //       const localData = localStorage.getItem('loginData');
  //       if(localData!=null){
  //         this.Logins = JSON.parse(localData);
  //       }
  //     }
  //   }

    ngOnInit(): void {
        this.id = 1
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
        this.router.navigate(['/user:id']);
      }
  
}
