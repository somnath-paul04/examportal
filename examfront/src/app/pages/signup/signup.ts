import { Component } from '@angular/core';
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';


@Component({
  selector: 'app-signup',
  standalone:true,
  imports: [MatInputModule,MatFormFieldModule,MatButtonModule],
  templateUrl: './signup.html',
  styleUrl: './signup.css'
})
export class Signup {

}
