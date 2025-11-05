import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { SharedMaterialImports } from '../../../shared/shared-material';
import { CategoryService } from '../../../services/category';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view-categories',
  standalone: true,
  imports: [SharedMaterialImports, CommonModule],
  templateUrl: './view-categories.html',
  styleUrl: './view-categories.css'
})
export class ViewCategories implements OnInit {

  categories: any[] = []; 
  
  isLoading: boolean = true; 

  // Inject ChangeDetectorRef
  constructor(private _category: CategoryService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.fetchCategories(); 
  }

  fetchCategories(): void {
    this.isLoading = true;
    this._category.categories().subscribe(
      (data: any) => {
        this.categories = data;
        this.isLoading = false;
        
        // CRITICAL FIX: Manually trigger change detection
        this.cdr.detectChanges(); 
        
        console.log('Categories fetched successfully:', this.categories);
      },
      (error) => {
        this.isLoading = false;
        console.error('Error fetching categories:', error);
        Swal.fire("Error !!", "Error in loading data: Could not connect to server or unauthorized.", 'error');
      }
    );
  }
}