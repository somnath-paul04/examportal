import { Component, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { SharedMaterialImports } from '../../../shared/shared-material';
import { QuizService } from '../../../services/quiz';
import { MatSnackBar } from '@angular/material/snack-bar'; 
import Swal from 'sweetalert2'; 
import { JsonPipe, CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms'; 
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../../../services/category';
import baseUrl from '../../../services/helper';

@Component({
  selector: 'app-update-quiz',
  standalone: true, 
  imports: [SharedMaterialImports, FormsModule, CommonModule], 
  templateUrl: './update-quiz.html',
  styleUrl: './update-quiz.css'
})
export class UpdateQuiz implements OnInit, AfterViewInit { 

  qId: number = 0;
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

    const qIdParam = this._route.snapshot.params['qId'];
    this.qId = qIdParam ? parseInt(qIdParam, 10) : 0;

    this.loadQuiz(this.qId);
    this.loadCategories();
  }


  ngAfterViewInit(): void {

    setTimeout(() => {
      this.cdr.detectChanges();
    }, 100);
  }

  loadQuiz(quizId: number): void {
    this._quiz.getQuiz(quizId).subscribe(
      (data: any) => {
       
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
