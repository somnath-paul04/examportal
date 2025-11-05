import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedMaterialImports } from '../../../shared/shared-material';
import { JsonPipe} from '@angular/common';
import Swal from 'sweetalert2';
import { QuestionService } from '../../../services/question';
// Import NgForm to type the form parameter
import { NgForm } from '@angular/forms'; 

@Component({
  selector: 'app-add-question',
  standalone: true,
  imports: [SharedMaterialImports, JsonPipe],
  templateUrl: './add-question.html',
  styleUrl: './add-question.css'
})
export class AddQuestion implements OnInit {

  qId: any;
  qTitle:any;
  
  question: {
    quiz: any;
    content: string;
    option1: string;
    option2: string;
    option3: string;
    option4: string;
    answer: string;
  } = {
    quiz: {

    },
    content: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    answer: '',
  };

  // Inject services
  constructor(private _route: ActivatedRoute, private _quiz: QuestionService) {

  }

  ngOnInit(): void {
    this.qId = this._route.snapshot.params['qId'];
    this.qTitle=this._route.snapshot.params['title'];
    
    // Set the quiz ID required for the new question
    this.question.quiz = { qId: this.qId };
  }

  onOptionChange(): void {
    // Empty function for template change detection.
  }



  formSubmit(form: NgForm){
    // Validation checks for required fields (using the model values)
    if(this.question.content.trim() === '' || this.question.content === null){
      Swal.fire('Validation Error', 'Question content is required.', 'warning');
      return;
    }
    if(this.question.option1.trim() === '' || this.question.option1 === null){
      Swal.fire('Validation Error', 'Option 1 is required.', 'warning');
      return;
    }
    if(this.question.option2.trim() === '' || this.question.option2 === null){
      Swal.fire('Validation Error', 'Option 2 is required.', 'warning');
      return;
    }
    if(this.question.answer.trim() === '' || this.question.answer === null){
      Swal.fire('Validation Error', 'Correct Answer selection is required.', 'warning');
      return;
    }

    // Call service to add question
    this._quiz.addQuestion(this.question).subscribe(
      (data:any)=>{
        // Success Handler
        Swal.fire('Success','Question added successfully, add another one!','success');

        form.reset({
            quiz: { qId: this.qId } 
        });
      },
      (error)=>{
        // Error Handler
        Swal.fire('Error','Error in adding question','error');
        console.error('Error adding question:', error);
      }
    )
  }
}