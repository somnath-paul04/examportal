import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from '../../../services/question';
import { CommonModule } from '@angular/common';
import { SharedMaterialImports } from '../../../shared/shared-material';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quiz-questions',
  standalone: true,
  imports: [CommonModule, SharedMaterialImports], 
  templateUrl: './view-quiz-questions.html',
  styleUrl: './view-quiz-questions.css'
})
export class ViewQuizQuestions implements OnInit {

  qId: number = 0; 
  qTitle: string = ''; 
  questions: any[] = []; 

  constructor(
    private _route: ActivatedRoute, 
    private _question: QuestionService,
    private cdr: ChangeDetectorRef 
  ) {}

  ngOnInit(): void {
    const qIdParam = this._route.snapshot.params['qId'];
    if (qIdParam) {
      this.qId = +qIdParam; 
    }
    this.qTitle = this._route.snapshot.params['title'] || 'Loading Quiz Title...';
    
    this.fetchQuestions();
  }
  
  fetchQuestions(): void {
    this._question.getQuestionsOfQuiz(this.qId).subscribe({
      next: (data: any) => {
        
        const normalize = (value: string | null): string => {
          if (!value) return '';
          return String(value).trim().toLowerCase();
        };

        this.questions = data.map((q: any) => {
          
          q.normalizedAnswer = normalize(q.answer);
          q.normalizedOption1 = normalize(q.option1);
          q.normalizedOption2 = normalize(q.option2);
          q.normalizedOption3 = normalize(q.option3);
          q.normalizedOption4 = normalize(q.option4);
          
          return q;
        });

        this.cdr.detectChanges(); 
      },
      error: (e) => {
        console.error('Error loading questions:', e);
        Swal.fire('Connection Error', 'Could not load questions from server.', 'error');
      }
    });
  }

  deleteQuestion(qId: number | string){
    Swal.fire({
        icon: 'info',
        title: 'Are you sure?',
        confirmButtonText: 'Delete',
        showCancelButton: true,
      }).then((result) => {
  
        if (result.isConfirmed) {
          
          const previousQuestions = [...this.questions]; 
          
          const initialLength = this.questions.length;
          this.questions = this.questions.filter((question) => question.quesId != qId); 
          
          if (this.questions.length < initialLength) {
             this.cdr.detectChanges(); 
          }
  
          this._question.deleteQuestion(qId).subscribe(
            {
              next: (data) => {
                Swal.fire('Success', 'Question deleted successfully!', 'success');
              },
              error: (error) => {
                this.questions = previousQuestions; 
                this.cdr.detectChanges(); 
    
                Swal.fire('Error', 'Could not delete question due to server error. Question restored.', 'error');
                
                console.error('Deletion failed:', error);
              }
            }
          );
        }
      });
  }
}