import { Component } from '@angular/core';
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-signup',
  standalone:true,
  imports: [MatInputModule,MatFormFieldModule,MatButtonModule,FormsModule,JsonPipe],
  templateUrl: './signup.html',
  styleUrl: './signup.css'
})
export class Signup {
  constructor(){}

  public user={
    username:'',
    password:'',
    firstName:'',
    lastName:'',
    email:'',
    phone:'',
  };

  ngOnInit(): void{}

  formSubmit(){
    console.log(this.user);
    if(this.user.username==''|| this.user.username==null)
    {
      alert('User is required !!')
      return;
    }

  }
}
