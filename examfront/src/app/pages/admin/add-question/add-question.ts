import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedMaterialImports } from '../../../shared/shared-material';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-add-question',
  standalone: true,
  imports: [SharedMaterialImports,JsonPipe],
  templateUrl: './add-question.html',
  styleUrl: './add-question.css'
})
export class AddQuestion implements OnInit {

  qId: any;
  qTitle:any;
  question = {
    quiz: {

    },
    content: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    answer: '',
  };

  constructor(private _route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.qId = this._route.snapshot.params['qId'];
    this.qTitle=this._route.snapshot.params['title'];
    // console.log(this.qId);

    // FIX: Set the quiz object structure correctly using the retrieved this.qId.
    this.question.quiz = { qId: this.qId };
  }
}