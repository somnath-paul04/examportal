import { Component, OnInit } from '@angular/core';
import { SharedMaterialImports } from '../../shared/shared-material';
import { LoginService } from '../../services/login';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-profile',
  imports: [SharedMaterialImports,JsonPipe],
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class Profile implements OnInit{
  user:any | null=null;
  constructor(private login:LoginService){}
  

  ngOnInit(): void {
    this.user=this.login.getUser();
  }
  

}


