import { Component, OnInit, ViewChild } from '@angular/core';
import { SharedMaterialImports } from '../../../shared/shared-material';
import { CategoryService } from '../../../services/category';
import { QuizService } from '../../../services/quiz';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';
import { JsonPipe, CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms'; 

@Component({
  selector: 'app-add-quiz',
  standalone: true,
  imports: [SharedMaterialImports, JsonPipe, FormsModule, CommonModule],
  templateUrl: './add-quiz.html',
  styleUrl: './add-quiz.css',
})
export class AddQuiz implements OnInit {
  // Reference the form defined by #quizForm in the HTML template
  @ViewChild('quizForm') quizForm!: NgForm;

  categories: any[] = [];

  quizData = {
    title: '',
    description: '',
    maxMarks: '',
    numberOfQuestions: '',
    active: true,
    category: null as any,
  };

  constructor(
    private _cat: CategoryService,
    private _quiz: QuizService,
    private _snack: MatSnackBar
  ) {}

  ngOnInit(): void {
    this._cat.categories().subscribe(
      (data: any) => {
        this.categories = data;
        console.log('Categories loaded:', this.categories);
      },
      (error) => {
        console.error(error);
        Swal.fire('Error!!', 'Error in loading data from server', 'error');
      }
    );
  }


  addQuiz(): void {
    if (this.quizData.title.trim() == '' || this.quizData.title == null) {
      this._snack.open('Title required !!', 'Close', { duration: 3000 });
      return;
    }
    
    // Call service
    this._quiz.addQuiz(this.quizData).subscribe(
      (data: any) => {
        Swal.fire('Success', 'Quiz is added successfully!', 'success');

        // Reset the form using the @ViewChild reference
        // This clears controls and validation state, solving the reset problem
        if (this.quizForm) {
            this.quizForm.resetForm();
        }
        
        // Manually reset properties for reliable initial values (like active/category)
        this.quizData.active = true;
        this.quizData.category = null;
      },
      (error) => {
        console.error(error);
        Swal.fire('Error', 'Something went wrong on the server while adding the quiz.', 'error');
      }
    );
  }
}
