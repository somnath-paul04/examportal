import { Component, signal } from '@angular/core';
import { RouterOutlet,RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { Navbar } from "./components/navbar/navbar";
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';




@Component({
  selector: 'app-root',
  standalone:true,
  imports: [RouterOutlet, MatButtonModule,Navbar,MatInputModule,MatFormFieldModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('examfront');
}
