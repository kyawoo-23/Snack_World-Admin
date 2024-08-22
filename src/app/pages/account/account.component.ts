import { DIALOG_DATA } from '@angular/cdk/dialog';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { TTableColumnDef } from '@models/index';
import { AccountService } from '@services/account/account.service';
import { ConfirmDialogComponent } from '@ui/confirm-dialog/confirm-dialog.component';
import { MainLayoutComponent } from '@ui/main-layout/main-layout.component';
import { TableComponent } from '@ui/table/table.component';
import { DIALOG_SIZE } from '@utils/constants';
import { Admin } from 'app/prisma-types';
import { map, startWith, Subject, switchMap } from 'rxjs';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [
    MainLayoutComponent,
    MatButtonModule,
    TableComponent,
    MatIcon,
    RouterLink,
  ],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss',
})
export class AccountComponent {
  private readonly _dialog = inject(MatDialog);
  private readonly _accountSrv = inject(AccountService);

  data: Admin[] = [];
  isLoading: boolean = false;
  fetchSubject = new Subject<void>();
  columns: TTableColumnDef<Admin>[] = [
    {
      columnDef: 'name',
      header: 'Full Name',
      cell: (row: Admin) => row.name,
    },
    {
      columnDef: 'email',
      header: 'Email',
      cell: (row: Admin) => row.email,
    },
    {
      columnDef: 'role',
      header: 'Role',
      cell: (row: Admin) => row.adminRole.name,
    },
    {
      columnDef: 'status',
      header: 'Status',
      cell: (row: Admin) => (row.isActive ? 'Active' : 'Inactive'),
    },
  ];

  ngOnInit() {
    this.fetchSubject
      .pipe(startWith({}))
      .pipe(
        switchMap(() => {
          this.isLoading = true;
          return this._accountSrv.getAdminList();
        }),
        map((data) => {
          console.log(data.data);
          return data.data;
        }),
      )
      .subscribe({
        next: (data) => {
          this.data = data;
          this.isLoading = false;
        },
        error: () => {
          this.isLoading = false;
        },
      });
  }

  onResetPasswordClick(id: string) {
    this._dialog.open(ConfirmDialogComponent, {
      width: DIALOG_SIZE.SMALL,
      data: {
        title: 'Confirm',
        message: 'Are you sure you want to reset the password?',
        confirmText: 'Reset',
        onSubmit: this._accountSrv.resetAdminPassword(id),
        onSubmitSuccess: this.fetchSubject,
      },
    });
  }

  onToggleStatusClick(id: string) {
    this._dialog.open(ConfirmDialogComponent, {
      width: DIALOG_SIZE.SMALL,
      data: {
        title: 'Confirm',
        message: 'Are you sure you want to change the status?',
        confirmText: 'Change',
        onSubmit: this._accountSrv.toggleAdminStatus(id),
        onSubmitSuccess: this.fetchSubject,
      },
    });
  }
}
