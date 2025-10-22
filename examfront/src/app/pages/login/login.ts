import { Component } from '@angular/core';
import { SharedMaterialImports } from '../../shared/shared-material';
import { MatSnackBar } from '@angular/material/snack-bar';
import { JsonPipe } from '@angular/common';
import { LoginService } from '../../services/login';

@Component({
  selector: 'app-login',
  imports: [SharedMaterialImports,JsonPipe],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  user: any;
  loginData = {
    userName: '',
    password: ''
  }
  constructor(private snack:MatSnackBar,private loginService:LoginService) {

  }
  // ngOnit():void{}
  formSubmit() {
    console.log("Login btn clicked ");

    if(this.loginData.userName.trim()=='' || this.loginData.userName==null){
      this.snack.open('Username is required...!!','',{
        duration:3000,
      });

      return;

    }
    if(this.loginData.password.trim()=='' || this.loginData.password==null){
      this.snack.open('Password is required...!!','',{
        duration:3000,
      });

      return;

    }
    //request to server to generate token
    this.loginService.generateToken(this.loginData).subscribe(
      (data:any)=>{
        console.log('Success');
        console.log(data);
      },
      (error)=>{
        console.log('Error !');
        console.log(error);
      }

    );
    
  }


}
