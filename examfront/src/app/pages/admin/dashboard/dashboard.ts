import { Component } from '@angular/core';
import { SharedMaterialImports } from '../../../shared/shared-material';
import { Sidebar } from "../sidebar/sidebar";

@Component({
  selector: 'app-dashboard',
  imports: [SharedMaterialImports, Sidebar],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {

}
