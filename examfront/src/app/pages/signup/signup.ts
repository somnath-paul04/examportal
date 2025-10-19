import { Component } from '@angular/core';
import { User } from '../../services/user';
import {MatSnackBar} from '@angular/material/snack-bar';
import Swal from 'sweetalert2';
import { SharedMaterialImports } from '../../shared/shared-material';

@Component({
  selector: 'app-signup',
  standalone:true,
  imports: [SharedMaterialImports],
  templateUrl: './signup.html',
  styleUrl: './signup.css'
})
export class Signup {
  constructor(private userService:User,private snack:MatSnackBar){}

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
      // alert('User is required !!')
      this.snack.open('Username is required !!','',{duration:3000});
      return;
    }

    //validate 

    //addUser: userservice
    this.userService.addUser(this.user).subscribe(
      (data:any)=>{
        //success
        console.log(data);
        // alert('success')
        Swal.fire('Successfully done !!','User id is '+ data.id,'success')
      },
      (error)=>{
        //error
        console.log(error);
        // alert('something went wrong');
        this.snack.open('Something went wrong !!','',{duration:3000})
      }
    );

  }
}
