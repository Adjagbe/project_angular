import { Component, OnInit  } from '@angular/core';


@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [

  ],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss'
})
export class LoginFormComponent implements OnInit {

  imageback! : string;
  imgprofil! : string;
  title!: string;
  email! : string;
  description! : string;
  compagnie! : string;
  nom! : string;
  prenom! : string;
  lieu! : string;
  ville ! : string;
  pays! : string;
  code_poste ! :string;



  ngOnInit(): void {
    this.title = 'Archibald';
    this.compagnie = 'LVS Studio';
    this.nom = 'Arigano';
    this.prenom = 'Marina lauraine';
    this.lieu = `cocody abatta, Abidjan, Côte d'ivoire`;
    this.ville = 'Abidjan';
    this.pays = `Côte d'ivoire`;
    this.code_poste = `225`;
    this.email = 'contact@archibald.com';
    this.imageback ='https://oursonweb.fr/wp-content/uploads/2021/07/6-contenus-qui-marchent-reseaux-sociaux.jpg';
    this.imgprofil = 'https://www.naturalsaramaya.com/wp-content/uploads/2020/01/museuniform-instagram-femme-noire.jpg';
    this.description = ` But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete .Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque  `
  }
}
