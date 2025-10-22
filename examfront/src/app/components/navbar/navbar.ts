import { Component } from '@angular/core';
import { SharedMaterialImports } from '../../shared/shared-material';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-navbar',
  imports: [SharedMaterialImports, RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {

}
