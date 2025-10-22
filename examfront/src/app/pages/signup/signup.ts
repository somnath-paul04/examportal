import { Component } from '@angular/core';
import { User } from '../../services/user';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';
import { SharedMaterialImports } from '../../shared/shared-material';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [SharedMaterialImports],
  templateUrl: './signup.html',
  styleUrl: './signup.css'
})
export class Signup {
  constructor(private userService: User, private snack: MatSnackBar) { }

  public user = {
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  };

  ngOnInit(): void { }

  formSubmit() {
    console.log(this.user);

    // 1. USERNAME VALIDATION
    if (this.user.username.trim() == '' || this.user.username == null) {
      this.snack.open('Username is required !!', '', { duration: 3000 });
      return;
    }

    // 2. PASSWORD VALIDATION
    if (this.user.password.trim() == '' || this.user.password == null) {
      this.snack.open('Password is required !!', '', { duration: 3000 });
      return;
    }

    // 3. FIRST NAME VALIDATION
    if (this.user.firstName.trim() == '' || this.user.firstName == null) {
      this.snack.open('First Name is required !!', '', { duration: 3000 });
      return;
    }

    // 4. LAST NAME VALIDATION
    if (this.user.lastName.trim() == '' || this.user.lastName == null) {
      this.snack.open('Last Name is required !!', '', { duration: 3000 });
      return;
    }

    // 5. EMAIL VALIDATION (Required Check)
    if (this.user.email.trim() == '' || this.user.email == null) {
      this.snack.open('Email Address is required !!', '', { duration: 3000 });
      return;
    }

    // 6. EMAIL FORMAT VALIDATION
    // Basic regex check for email format
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(this.user.email)) {
      this.snack.open('Enter a valid Email Address (e.g., user@example.com) !!', '', { duration: 3000 });
      return;
    }

    // --- START: Specific Update for Phone Number (Ensuring String Consistency) ---
    // Ensure value is treated as a string for backend compatibility
    const phoneStr = String(this.user.phone).trim();

    // 7. PHONE NUMBER VALIDATION (Required Check)
    // Check against the trimmed string representation
    if (phoneStr === '' || phoneStr === 'null') // Checking for null string representation just in case
    {
      this.snack.open('Phone Number is required !!', '', { duration: 3000 });
      return;
    }

    // 8. PHONE NUMBER FORMAT VALIDATION
    // Check if phone number is exactly 10 digits and contains only digits
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phoneStr)) {
      this.snack.open('Phone Number must be exactly 10 digits !!', '', { duration: 3000 });
      return;
    }
    // --- END: Specific Update for Phone Number ---

    // If all frontend validation passes, proceed to backend service
    this.userService.addUser(this.user).subscribe(
      (data: any) => {
        //success
        console.log(data);
        Swal.fire('Successfully done !!', 'User id is ' + data.id, 'success')
      },
      (error) => {
        //error
        console.log(error);
        this.snack.open('Something went wrong !!', '', { duration: 3000 })
      }
    );

  }
}
