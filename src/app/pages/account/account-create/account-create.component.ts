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
import { AccountService } from '@services/account/account.service';
import { Admin, AdminRole } from 'app/prisma-types';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminRoleService } from '@services/admin-role/admin-role.service';

@Component({
  selector: 'app-account-create',
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
  templateUrl: './account-create.component.html',
  styleUrl: './account-create.component.scss',
})
export class AccountCreateComponent {
  private readonly _snackBar = inject(MatSnackBar);
  private readonly _router = inject(Router);
  private readonly _formBuilder = inject(FormBuilder);
  private readonly _accountSrv = inject(AccountService);
  private readonly _roleSrv = inject(AdminRoleService);

  form!: FormGroup;
  data: Admin | null = null;
  roles: AdminRole[] = [];
  isSubmitting: boolean = false;

  onSubmit(): void {
    this.isSubmitting = true;
    this._accountSrv.createAdmin(this.form.value).subscribe({
      next: (res) => {
        if (res.isSuccess) {
          this._snackBar.open(res.message, 'Close');
          this._router.navigate(['/account']);
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
      adminRoleId: new FormControl('', [Validators.required]),
    });

    this._roleSrv.getAdminRoleList().subscribe({
      next: (res) => {
        this.roles = res.data;
      },
    });
  }
}
