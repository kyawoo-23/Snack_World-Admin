import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { TConfirmDialog } from '@models/index';

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [MatIcon, MatButtonModule, MatDialogModule],
  templateUrl: './confirm-dialog.component.html',
  styleUrl: './confirm-dialog.component.scss',
})
export class ConfirmDialogComponent {
  isLoading: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: TConfirmDialog,
  ) {}

  onCloseClick(): void {
    this.dialogRef.close();
  }

  onConfirmClick(): void {
    this.isLoading = true;
    this.data.onSubmit.subscribe({
      next: () => {
        this.isLoading = false;
        this.data.onSubmitSuccess.next();
        this.dialogRef.close();
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }
}
