import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from '../../../services/question';
import { CommonModule } from '@angular/common';
import { SharedMaterialImports } from '../../../shared/shared-material';

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
        
        // Helper function to normalize the string for reliable comparison (trims whitespace and handles case)
        const normalize = (value: string | null): string => {
          if (!value) return '';
          return String(value).trim().toLowerCase();
        };

        // CRITICAL FIX: Apply normalization (TRIM and LOWERCASE) to all comparison fields
        this.questions = data.map((q: any) => {
          
          // These new properties are used for reliable comparison in the HTML template
          q.normalizedAnswer = normalize(q.answer);
          q.normalizedOption1 = normalize(q.option1);
          q.normalizedOption2 = normalize(q.option2);
          q.normalizedOption3 = normalize(q.option3);
          q.normalizedOption4 = normalize(q.option4);
          
          return q;
        });

        // CRITICAL FIX: Manually force UI update after data is processed
        this.cdr.detectChanges(); 
      },
      error: (e) => {
        console.error('Error loading questions:', e);
      }
    });
  }
}
