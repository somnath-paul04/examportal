import { Component } from '@angular/core';
import { SharedMaterialImports } from '../../../shared/shared-material';

@Component({
  selector: 'app-add-quiz',
  standalone:true,
  imports: [SharedMaterialImports],
  templateUrl: './add-quiz.html',
  styleUrl: './add-quiz.css'
})
export class AddQuiz {
  categories=[
    {
      cid:23,
      title:'Programming'
    },
    {
      cid:23,
      title:'Programming'
    },
  ]

}
