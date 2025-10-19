import { Component } from '@angular/core';
import { SharedMaterialImports } from '../../shared/shared-material';

@Component({
  selector: 'app-login',
  imports: [SharedMaterialImports],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
user: any;

}
