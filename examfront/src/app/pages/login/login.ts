import { Component } from '@angular/core';
import { SharedMaterialImports } from '../../shared/shared-material';
import { MatSnackBar } from '@angular/material/snack-bar';
// import { JsonPipe } from '@angular/common';
import { LoginService } from '../../services/login';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone:true,
  imports: [SharedMaterialImports],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {
  user: any;
  loginData = {
    userName: '',
    password: ''
  };
  login: any;

  constructor(
    private snack: MatSnackBar,
    private loginService: LoginService,
    private router: Router
  ) {}

  formSubmit() {
    console.log("Login btn clicked");

    if (this.loginData.userName.trim() == '' || this.loginData.userName == null) {
      this.snack.open('Username is required...!!', '', { duration: 3000 });
      return;
    }

    if (this.loginData.password.trim() == '' || this.loginData.password == null) {
      this.snack.open('Password is required...!!', '', { duration: 3000 });
      return;
    }

    this.loginService.generateToken(this.loginData).subscribe(
      (data: any) => {
        console.log('Success');
        console.log(data);

        this.loginService.loginUser(data.token);

        this.loginService.getCurrentUser().subscribe(
          (user: any) => {
            this.loginService.setUser(user);
            console.log(user);

            if (this.loginService.getUserRole() == "ADMIN") {
              this.router.navigate(['/admin']);
            } else if (this.loginService.getUserRole() == 'NORMAL') {
              this.router.navigate(['/user-dashboard']);
            } else {
              this.loginService.logout();
            }
          }
        );
      },
      (error) => {
        console.log('Error !');
        console.log(error);
        this.snack.open("Invalid Details !! Try again",'',{
          duration:3000,
        });
      }
    );
  }
}
