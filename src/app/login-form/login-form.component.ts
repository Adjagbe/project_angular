import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID  } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Login } from '../models/login/login';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { LoginService } from '../services/login/login.service';
import { NavbarComponent } from '../navbar/navbar.component';


@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [
    FormsModule, CommonModule, NavbarComponent, RouterLink,
  ],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss'
})
export class LoginFormComponent implements OnInit {

  showLogin!: Login ;
  Logins!: Login[];
  id!:number

  errorMessage: string | null = null;
  maxSizeInMB = 1; // 1 Mo

  selectedFile: string | null = null;
  imagePreview: string | ArrayBuffer | null = null;

  fileUrl: string | null = null;
  isImage: boolean = false;

  newPhoto: Login = new Login()
  fileUrl2: File | null = null;


  ngOnInit(): void {

    this.id = Number(this.activatedRoute.snapshot.paramMap.get('id'))
    if(this.id){
      this.showLogin = this.LoginService.getLoginsById(this.id);
    }

    if(isPlatformBrowser(this.platformId)){

      const savedLogin = this.Logins.find(login => login.id === this.showLogin.id);
      if (savedLogin && savedLogin.imgprofil) {
        this.fileUrl = `data:image/jpeg;base64,${savedLogin.imgprofil}`;
        this.isImage = true;
      } else {
        this.isImage = false;
      }
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

  onFileSelected(event: any): void {

    this.errorMessage = null; 

    const file = event.target.files[0] as File;
    if (file) {

      const reader = new FileReader();

      // Écouter l'événement de lecture
      reader.onload = (event: any) => {

        const sizeInMB = file.size / (1024 * 1024); // Convertir en Mo
        if (sizeInMB > this.maxSizeInMB) {
          this.errorMessage = `L'image dépasse la taille maximale autorisée de ${this.maxSizeInMB} Mo.`;
          this.selectedFile = null;
          this.imagePreview = null;
          return;
        }

        this.imagePreview = reader.result;

        const base64String = event.target.result.split(',')[1]; // Extraction de la chaîne Base64
        this.selectedFile = base64String; // Enregistrer la chaîne Base64
      };

      // Lancer la lecture du fichier
      reader.readAsDataURL(file);
    }else{
      this.selectedFile = null
    }

  }

  updatePhoto() : void{

    if (!this.selectedFile) {
      this.errorMessage = "Aucune image sélectionnée.";
      return;
    }

    const data = {
      ...this.showLogin, //garde les autres donnée du formulaire 
      imgprofil: this.selectedFile,
    }

    this.Logins = this.Logins.filter((login) => login.id !== this.showLogin.id);
    this.Logins.push(data);

    localStorage.setItem('loginData', JSON.stringify(this.Logins));


  }

  updateLogin() : void {
    this.Logins = this.Logins.filter((login) => login.id !== this.showLogin.id);
    this.Logins.push(this.showLogin);
    localStorage.setItem('loginData', JSON.stringify(this.Logins));

  }

  convertHexToBase64(hexString: string): string {
    const raw = hexString.match(/.{1,2}/g)?.map(byte => String.fromCharCode(parseInt(byte, 16))).join('') || '';
    return btoa(raw);
  } //fonction pour convertir une chaine hexadécimale en base64
}
