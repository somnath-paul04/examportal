import { Component, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { SharedMaterialImports } from '../../../shared/shared-material';
import { QuizService } from '../../../services/quiz';
import { MatSnackBar } from '@angular/material/snack-bar'; // Keeping in case you add snackbar logic
import Swal from 'sweetalert2'; // Keeping in case you add update logic
import { JsonPipe, CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms'; 
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../../../services/category';
import baseUrl from '../../../services/helper';

@Component({
  selector: 'app-update-quiz',
  standalone: true, // Assuming this is needed based on your other components
  imports: [SharedMaterialImports, FormsModule, CommonModule, JsonPipe], // Added JsonPipe back for completeness
  templateUrl: './update-quiz.html',
  styleUrl: './update-quiz.css'
})
export class UpdateQuiz implements OnInit, AfterViewInit { // Added AfterViewInit

  qId: number = 0;
  // FIX 1: Initialize quiz with a structure so *ngIf="quiz" is true immediately
  quiz: any = {
    title: '',
    description: '',
    maxMarks: '',
    numberOfQuestions: '',
    active: false,
    category: {
      cId: null,
      title: ''
    }
  };
  categories: any[] = [];

  constructor(
    private _route: ActivatedRoute,
    private _router:Router, 
    private _quiz: QuizService,
    private _category: CategoryService, 
    private cdr: ChangeDetectorRef,
    private _snack: MatSnackBar
  ) { }

  ngOnInit(): void {
    // 1. Get Quiz ID from Route
    const qIdParam = this._route.snapshot.params['qId'];
    this.qId = qIdParam ? parseInt(qIdParam, 10) : 0;
    
    // 2. Load Quiz Data and Categories
    this.loadQuiz(this.qId);
    this.loadCategories();
  }

  // FIX 2: Implement ngAfterViewInit to force Mat-Form-Fields to render correctly
  ngAfterViewInit(): void {
    // This brief timeout allows the form content to be injected before forcing 
    // Material to calculate the layout, fixing the initial visual glitch.
    setTimeout(() => {
      this.cdr.detectChanges();
    }, 100);
  }

  loadQuiz(quizId: number): void {
    this._quiz.getQuiz(quizId).subscribe(
      (data: any) => {
        // When data arrives, it overwrites the initial empty 'quiz' object
        this.quiz = data;
        console.log(this.quiz);
      },
      (error) => {
        console.log(error);
        Swal.fire('Error', 'Could not load quiz data.', 'error');
      }
    );
  }

  loadCategories(): void {
    this._category.categories().subscribe(
      (data: any) => {
        this.categories = data;
      },
      (error) => {
        console.log(error);
        Swal.fire('Error', 'Could not load categories.', 'error');
      }
    );
  }
  
  //update form submit
  public updatedata(){
    // alert('test');

    //Title validation
    if (this.quiz.title.trim() == '' || this.quiz.title == null) {
      this._snack.open('Title required !!', 'Close', { duration: 3000 });
      return;
    }
     //Description validation
    if (this.quiz.description.trim() == '' || this.quiz.description == null) {
      this._snack.open('Description required !!', 'Close', { duration: 3000 });
      return;
    }
     //Max Marks validation
    if (this.quiz.maxMarks.trim() == '' || this.quiz.maxMarks == null) {
      this._snack.open('Maximum Marks required !!', 'Close', { duration: 3000 });
      return;
    }
     //No of questions validation
    if (this.quiz.numberOfQuestions.trim() == '' || this.quiz.numberOfQuestions == null) {
      this._snack.open('No. of questions required !!', 'Close', { duration: 3000 });
      return;
    }

    this._quiz.updateQuiz(this.quiz).subscribe(
      (data)=>{
        Swal.fire('Success !!','quiz updated','success').then((e)=>{
          this._router.navigate(['/admin/quizzes']);
        });
      },(error)=>{
        Swal.fire('Error !!','error in updating quiz','error');
        console.log(error);
      }
    );
  }

}
