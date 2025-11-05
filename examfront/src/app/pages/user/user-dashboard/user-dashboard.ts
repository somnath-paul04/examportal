import { Component } from '@angular/core';
import { RouterModule } from "@angular/router";
import { Sidebar } from "../sidebar/sidebar";

@Component({
  selector: 'app-user-dashboard',
  imports: [RouterModule, Sidebar],
  templateUrl: './user-dashboard.html',
  styleUrl: './user-dashboard.css'
})
export class UserDashboard {

}
