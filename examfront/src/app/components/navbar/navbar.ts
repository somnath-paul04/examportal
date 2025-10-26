import { Component } from '@angular/core';
import { SharedMaterialImports } from '../../shared/shared-material';
import { RouterLink } from "@angular/router";
import { LoginService } from '../../services/login';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [SharedMaterialImports, RouterLink,CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {
  constructor(public login:LoginService){}

  public logout(){
    this.login.logout();
    window.location.reload();
  }

}
