import { AuthService } from '@services/auth/auth.service';
import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { setLocalStorage } from '@utils/common';
import { LOCAL_STORAGES } from '@utils/constants';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  private readonly _snackBar = inject(MatSnackBar);
  private readonly _router = inject(Router);
  private readonly _formBuilder = inject(FormBuilder);
  private readonly _authService = inject(AuthService);

  form!: FormGroup;
  isSubmitting: boolean = false;

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  onSubmit() {
    if (this.form) {
      this.isSubmitting = true;
      this._authService.login(this.form.value).subscribe({
        next: (res) => {
          if (res.isSuccess) {
            this._snackBar.open(res.message, 'Close');
            setLocalStorage(LOCAL_STORAGES.USER_DATA, JSON.stringify(res.data));
            this._router.navigate(['/']);
          } else {
            this._snackBar.open(res.message, 'Close');
          }
          this.isSubmitting = false;
        },
        error: (err) => {
          this._snackBar.open(err.message, 'Close');
          console.error('Login failed:', err);
          this.isSubmitting = false;
        },
      });
    }
  }
}
