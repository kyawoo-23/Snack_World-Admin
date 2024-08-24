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
import { VendorService } from '@services/vendor/vendor.service';
import { InfoBoxComponent } from '@ui/info-box/info-box.component';

@Component({
  selector: 'app-vendor-create',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIcon,
    InfoBoxComponent,
  ],
  templateUrl: './vendor-create.component.html',
  styleUrl: './vendor-create.component.scss',
})
export class VendorCreateComponent {
  private readonly _snackBar = inject(MatSnackBar);
  private readonly _router = inject(Router);
  private readonly _formBuilder = inject(FormBuilder);
  private readonly _vendorSrv = inject(VendorService);

  form!: FormGroup;
  isSubmitting: boolean = false;

  onSubmit(): void {
    this.isSubmitting = true;
    this._vendorSrv.createVendor(this.form.value).subscribe({
      next: (res) => {
        if (res.isSuccess) {
          this._snackBar.open(res.message, 'Close');
          this._router.navigate([`/vendor/${res.data.vendorId}`]);
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
      email: new FormControl('', [Validators.required, Validators.email]),
    });
  }
}
