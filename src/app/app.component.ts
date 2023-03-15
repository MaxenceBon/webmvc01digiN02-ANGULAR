import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ApirestService } from './apirest.service';
import { Client } from './client';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'springbootsecur';
  nom!: string;
  prenom!: string;

  constructor(private api :ApirestService) {
    api.getAllUsers();
  }

  formulaireClient(formClient: NgForm){
    if(formClient.valid){
    const newClient: Client = {
      nom:this.nom,
      prenom:this.prenom,
    };
    this.api.createClient(newClient);
  }
}

}

