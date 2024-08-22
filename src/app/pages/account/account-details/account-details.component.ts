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
import { ActivatedRoute } from '@angular/router';
import { AccountService } from '@services/account/account.service';
import { AdminRoleService } from '@services/admin-role/admin-role.service';
import { Admin, AdminRole } from 'app/prisma-types';

@Component({
  selector: 'app-account-details',
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
  templateUrl: './account-details.component.html',
  styleUrl: './account-details.component.scss',
})
export class AccountDetailsComponent {
  private readonly _route = inject(ActivatedRoute);
  private readonly _formBuilder = inject(FormBuilder);
  private readonly _accountSrv = inject(AccountService);
  private readonly _roleSrv = inject(AdminRoleService);

  form!: FormGroup;
  isLoading: boolean = false;
  data: Admin | null = null;
  roles: AdminRole[] = [];

  onSubmit(): void {}

  ngOnInit(): void {
    const id = this._route.snapshot.paramMap.get('id');
    if (id) {
      this._fetchDetails(id);
      this._roleSrv.getAdminRoleList().subscribe({
        next: (res) => {
          this.roles = res.data;
        },
      });
    }

    this.form = this._formBuilder.group({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl(''),
      role: new FormControl('', [Validators.required]),
    });
  }

  private _fetchDetails(id: string): void {
    this.isLoading = true;

    this._accountSrv.getAdminDetails(id).subscribe({
      next: (res) => {
        this.data = res.data;
        this.isLoading = false;

        this.form.patchValue({
          name: this.data?.name,
          email: this.data?.email,
          role: this.data?.adminRoleId,
        });
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }
}
