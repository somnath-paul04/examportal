import { Component } from '@angular/core';
import { SharedMaterialImports } from '../../../shared/shared-material';
import { CategoryService } from '../../../services/category';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-category',
  standalone: true, 
  imports: [SharedMaterialImports],
  templateUrl: './add-category.html',
  styleUrl: './add-category.css'
})
export class AddCategory {

  category = { 
    title: '',
    description: '',
  };
  
  constructor(private _category: CategoryService, private _snack: MatSnackBar) { }


  formSubmit(form: NgForm) {
    if (this.category.title.trim() == '' || this.category.title == null) {
      this._snack.open('Title required !!', '', {
        duration: 3000,
      });
      return;
    }  

    this._category.addcategory(this.category).subscribe(
      (data:any)=>{
        form.reset(); 
        this.category = { title: '', description: '' }; 
        Swal.fire("Success !!",'category is added successfully','success');
      },
      (error)=>{
        console.log(error);
        Swal.fire('Error !!','Server error !!','error');
      }
    );
  }
}
