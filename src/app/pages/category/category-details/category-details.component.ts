import { Component, inject, OnInit } from '@angular/core';
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
import { ActivatedRoute } from '@angular/router';
import { Category } from 'app/prisma-types';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from '@services/category/category.service';
import { LoaderComponent } from '@ui/loader/loader.component';

@Component({
  selector: 'app-category-details',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIcon,
    LoaderComponent,
  ],
  templateUrl: './category-details.component.html',
  styleUrl: './category-details.component.scss',
})
export class CategoryDetailsComponent implements OnInit {
  private readonly _snackBar = inject(MatSnackBar);
  private readonly _route = inject(ActivatedRoute);
  private readonly _formBuilder = inject(FormBuilder);
  private readonly _categorySrv = inject(CategoryService);

  paramId: string = '';

  isLoading: boolean = false;
  form!: FormGroup;
  data: Category | null = null;
  isSubmitting: boolean = false;

  onSubmit(): void {
    this.isSubmitting = true;
    this._categorySrv
      .editCategoryDetails(this.paramId, this.form.value)
      .subscribe({
        next: (res) => {
          if (res.isSuccess) {
            this._snackBar.open(res.message, 'Close');
          }
          this.isSubmitting = false;
        },
        error: () => {
          this.isSubmitting = false;
        },
      });
  }

  ngOnInit(): void {
    this.paramId = this._route.snapshot.paramMap.get('id') || '';
    if (this.paramId) {
      this._fetchDetails();
    }

    this.form = this._formBuilder.group({
      name: new FormControl('', [Validators.required]),
    });
  }

  private _fetchDetails(): void {
    this.isLoading = true;

    this._categorySrv.getCategoryDetails(this.paramId).subscribe({
      next: (res) => {
        this.data = res.data;
        this.isLoading = false;

        this.form.patchValue({
          name: this.data?.name,
        });
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }
}
