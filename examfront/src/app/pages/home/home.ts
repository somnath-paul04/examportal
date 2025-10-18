import { Component } from '@angular/core';
import { MatAnchor } from "@angular/material/button";
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-home',
  imports: [MatAnchor,MatButtonModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

}
