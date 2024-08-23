import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from '@services/category/category.service';

@Component({
  selector: 'app-category-create',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIcon,
  ],
  templateUrl: './category-create.component.html',
  styleUrl: './category-create.component.scss',
})
export class CategoryCreateComponent {
  private readonly _snackBar = inject(MatSnackBar);
  private readonly _router = inject(Router);
  private readonly _formBuilder = inject(FormBuilder);
  private readonly _categorySrv = inject(CategoryService);

  form!: FormGroup;
  isSubmitting: boolean = false;

  onSubmit(): void {
    this.isSubmitting = true;
    this._categorySrv.createCategory(this.form.value).subscribe({
      next: (res) => {
        if (res.isSuccess) {
          this._snackBar.open(res.message, 'Close');
          this._router.navigate(['/category']);
        }
        this.isSubmitting = false;
      },
      error: () => {
        this.isSubmitting = false;
      },
    });
  }

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      name: new FormControl('', [Validators.required]),
    });
  }
}
