import { Component } from '@angular/core';
import { SharedMaterialImports } from '../../../shared/shared-material';
import { CommonModule } from '@angular/common';
import { QuizService } from '../../../services/quiz';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quizzes',
  standalone:true,
  imports: [SharedMaterialImports, CommonModule],
  templateUrl: './view-quizzes.html',
  styleUrl: './view-quizzes.css'
})
export class ViewQuizzes {

  quizzes:any[]=[];
  
  constructor(private _quiz:QuizService){}

  ngOnInit():void{
    this._quiz.quizzes().subscribe(
      (data:any)=>{
        this.quizzes=data;
        console.log(this.quizzes);
      },
      (error)=>{
        console.log(error);
        Swal.fire('Error !','Error in loading data','error');
      }

    )
  }
    
  

}
