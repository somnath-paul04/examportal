import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { SharedMaterialImports } from '../../../shared/shared-material';
import { CategoryService } from '../../../services/category';
import { MatSnackBar } from '@angular/material/snack-bar';
import { JsonPipe } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar-user',
  standalone:true,
  imports: [SharedMaterialImports, RouterLink, RouterLinkActive], 
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css'
})
export class Sidebar implements OnInit {
  categories: any[] = []; 

  constructor(
    private _cat:CategoryService,
    private _snack:MatSnackBar,
    private cdr: ChangeDetectorRef
  ){}

  ngOnInit():void{
    this._cat.categories().subscribe(
      (data:any)=>{
        this.categories=data;
        // CRITICAL FIX: Manually trigger change detection. This immediately updates 
        // the view after data is received, solving the "save to see" issue.
        this.cdr.detectChanges(); 
      },
      (error)=>{
        console.error(error);
        this._snack.open('Error in loading categories from server','Dismiss', {
          duration:3000,
        });
      }
    );
  }
}
