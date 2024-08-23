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
import { VariantService } from '@services/variant/variant.service';

@Component({
  selector: 'app-variant-create',
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
  templateUrl: './variant-create.component.html',
  styleUrl: './variant-create.component.scss',
})
export class VariantCreateComponent {
  private readonly _snackBar = inject(MatSnackBar);
  private readonly _router = inject(Router);
  private readonly _formBuilder = inject(FormBuilder);
  private readonly _variantSrv = inject(VariantService);

  form!: FormGroup;
  isSubmitting: boolean = false;

  onSubmit(): void {
    this.isSubmitting = true;
    this._variantSrv.createVariant(this.form.value).subscribe({
      next: (res) => {
        if (res.isSuccess) {
          this._snackBar.open(res.message, 'Close');
          this._router.navigate(['/variant']);
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
      color: new FormControl('', [Validators.required]),
    });
  }
}
