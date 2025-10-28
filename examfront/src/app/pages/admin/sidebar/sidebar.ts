import { Component } from '@angular/core';
import { SharedMaterialImports } from '../../../shared/shared-material';

@Component({
  selector: 'app-sidebar',
  standalone:true,
  imports: [SharedMaterialImports],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css'
})
export class Sidebar {

}
