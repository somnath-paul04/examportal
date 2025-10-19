import { Component } from '@angular/core';
import { MatAnchor } from "@angular/material/button";
import { SharedMaterialImports } from '../../shared/shared-material';

@Component({
  selector: 'app-home',
  imports: [MatAnchor,SharedMaterialImports],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

}
