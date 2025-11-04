import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { SharedMaterialImports } from '../../../shared/shared-material';
import { CommonModule } from '@angular/common';
import { QuizService } from '../../../services/quiz';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-view-quizzes',
  standalone: true,
  imports: [SharedMaterialImports, CommonModule],
  templateUrl: './view-quizzes.html',
  styleUrl: './view-quizzes.css',
  changeDetection: ChangeDetectionStrategy.Default
})
export class ViewQuizzes implements OnInit {

  quizzes: any[] = [];

  constructor(private _quiz: QuizService, private cdr: ChangeDetectorRef) { }

  // New private method to handle fetching and conditional error messaging
  private _fetchQuizzes(showSwalError: boolean): void {
    this._quiz.quizzes().subscribe(
      (data: any) => {
        this.quizzes = data;
        this.cdr.detectChanges(); 
      },
      (error) => {
        console.log(error);
        if (showSwalError) {
          Swal.fire('Error !', 'Error in loading data', 'error');
        }
      }
    );
  }

  ngOnInit(): void {
    // Call the fetch method, allowing it to show the initial loading error
    this._fetchQuizzes(true); 
  }

  deleteQuiz(qId: any) {
    Swal.fire({
      icon: 'info',
      title: 'Are you sure ?',
      confirmButtonText: 'Delete',
      showCancelButton: true,
    }).then((result) => {

      if (result.isConfirmed) {
        const previousQuizzes = [...this.quizzes]; 
        
        this.quizzes = this.quizzes.filter((quiz) => quiz.qId != qId);
        this.cdr.detectChanges(); 

        this._quiz.deleteQuiz(qId).subscribe(
          (data) => {
            Swal.fire('success', 'Quiz deleted', 'success');
          },
          (error) => {
            this.quizzes = previousQuizzes; 
            this.cdr.detectChanges(); 

            Swal.fire('Error', 'Error in deleting quiz. Please check your connection.', 'error');
            
            this._fetchQuizzes(false); 
            
            console.log(error);
          }
        );
      }

    });
  }
}
