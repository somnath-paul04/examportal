import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import {MatListModule} from '@angular/material/list';
// import { MatActionList } from "@angular/material/list"; <-- Removed: Covered by MatListModule
import {MatDividerModule} from '@angular/material/divider';
// import { MatCardActions } from "@angular/material/card"; <-- Removed: Covered by MatCardModule
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSelectModule} from '@angular/material/select';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

export const SharedMaterialImports=[
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    FormsModule,
    MatSnackBarModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    RouterModule,
    MatListModule,
    // MatActionList, // Removed to fix conflict
    MatDividerModule,
    // MatCardActions, // Removed to fix conflict
    MatSlideToggleModule,
    MatSelectModule,
    MatProgressSpinnerModule
];