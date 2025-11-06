import { Component, OnInit } from '@angular/core';
import { MatAnchor } from "@angular/material/button";
// Assuming SharedMaterialImports includes MatButtonModule, MatIconModule, and RouterLink
import { SharedMaterialImports } from '../../shared/shared-material'; 

@Component({
  selector: 'app-home',
  // Note: If you are using standalone: true, you need to add it here.
  // I'll keep the module approach for now as per your original code's style.
  imports: [MatAnchor, SharedMaterialImports],
  templateUrl: './home.html', // Using the correct file name
  styleUrl: './home.css'      // Using the correct file name
})
export class Home implements OnInit {
  
  // Property to hold the main title text for the template
  titleText = 'Examportal';
  
  ngOnInit(): void {
    // You can add initialization logic here if needed (e.g., fetching user data)
  }
}