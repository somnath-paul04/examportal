import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from '../../../services/quiz';
import { CommonModule } from '@angular/common'; 
import { SharedMaterialImports } from '../../../shared/shared-material';

@Component({
  selector: 'app-load-quiz',
  standalone:true,
  imports: [CommonModule,SharedMaterialImports], 
  templateUrl: './load-quiz.html',
  styleUrl: './load-quiz.css'
})
export class LoadQuiz implements OnInit{
  catId:any;
  quizzes:any[] = []; 

  constructor(
    private _route:ActivatedRoute,
    private _quiz:QuizService,
    private cdr: ChangeDetectorRef 
  ){}

  ngOnInit(): void {
    this._route.params.subscribe(params => {
      this.catId = params['catId'];
      this.quizzes = []; 

      if(this.catId == 0){
        console.log("Load all the quiz");

        this._quiz.quizzes().subscribe(
          (data:any)=>{
            this.quizzes = data;
            console.log(this.quizzes);
            
           
            this.cdr.detectChanges(); 
          },
          (error)=>{
            console.log(error);
            alert("Error in loading all quizzes");
          }
        );

      } else {
        console.log("Load specific quiz for Cat ID: " + this.catId);
        // Implement specific quiz loading logic here (e.g., this._quiz.quizzesByCat(this.catId).subscribe...)
        // Remember to call this.cdr.detectChanges() inside this subscription too!
      }
    });
  }
}