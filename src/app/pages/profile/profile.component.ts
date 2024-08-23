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
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '@services/account/account.service';
import { AdminRoleService } from '@services/admin-role/admin-role.service';
import { Admin, AdminRole } from 'app/prisma-types';
import { LoaderComponent } from '@ui/loader/loader.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { getLocalStorage } from '@utils/common';
import { LOCAL_STORAGES } from '@utils/constants';

@Component({
  selector: 'app-profile',
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
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {
  private readonly _snackBar = inject(MatSnackBar);
  private readonly _route = inject(ActivatedRoute);
  private readonly _formBuilder = inject(FormBuilder);
  private readonly _accountSrv = inject(AccountService);
  private readonly _roleSrv = inject(AdminRoleService);

  token: string = '';

  isLoading: boolean = false;
  form!: FormGroup;
  data: Admin | null = null;
  roles: AdminRole[] = [];
  isSubmitting: boolean = false;

  onSubmit(): void {
    this.isSubmitting = true;
    this._accountSrv.editAdminDetails(this.token, this.form.value).subscribe({
      next: (res) => {
        if (res.isSuccess) {
          this._fetchDetails();
        }
        this._snackBar.open(res.message, 'Close');
        this.isSubmitting = false;
      },
    });
  }

  ngOnInit(): void {
    const userData = getLocalStorage(LOCAL_STORAGES.USER_DATA);
    if (userData !== null) {
      this.token = JSON.parse(userData).sub;
    }

    this._fetchDetails();
    this._roleSrv.getAdminRoleList().subscribe({
      next: (res) => {
        this.roles = res.data;
      },
    });

    this.form = this._formBuilder.group({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl(''),
      adminRoleId: new FormControl('', [Validators.required]),
    });
  }

  private _fetchDetails(): void {
    this.isLoading = true;

    this._accountSrv.getAdminDetails(this.token).subscribe({
      next: (res) => {
        this.data = res.data;
        this.isLoading = false;

        this.form.patchValue({
          name: this.data?.name,
          email: this.data?.email,
          adminRoleId: this.data?.adminRoleId,
        });
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }
}
