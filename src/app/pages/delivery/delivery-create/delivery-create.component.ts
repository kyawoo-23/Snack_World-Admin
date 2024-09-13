import { Component, inject, OnInit } from '@angular/core';
import { DeliveryOrderService } from '@services/delivery-order/delivery-order.service';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Admin, DeliveryOrder } from 'app/prisma-types';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { DeliveryService } from '@services/delivery/delivery.service';
import { Router, RouterLink } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { AccountService } from '@services/account/account.service';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-delivery-create',
  standalone: true,
  imports: [
    MatCheckboxModule,
    MatTableModule,
    MatProgressSpinner,
    MatButtonModule,
    RouterLink,
    MatSelectModule,
  ],
  templateUrl: './delivery-create.component.html',
  styleUrl: './delivery-create.component.scss',
})
export class DeliveryCreateComponent implements OnInit {
  private readonly _snackBar = inject(MatSnackBar);
  private readonly _router = inject(Router);
  private readonly _deliverySrv = inject(DeliveryService);
  private readonly _deliveryOrderSrv = inject(DeliveryOrderService);
  private readonly _adminSrv = inject(AccountService);

  isSubmitting: boolean = false;
  isLoading: boolean = false;
  adminList: Admin[] = [];
  selectedAdmin = '';
  displayedColumns: string[] = [
    'select',
    'name',
    'vendor',
    'address',
    'contact',
  ];
  dataSource = new MatTableDataSource<DeliveryOrder>();
  selection = new SelectionModel<DeliveryOrder>(true, []);

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  createDelivery() {
    if (!this.selection.selected.length) {
      this._snackBar.open(
        'Please select at least one delivery order.',
        'Close',
      );
      return;
    }

    if (!this.selectedAdmin) {
      this._snackBar.open('Please select an admin.', 'Close');
      return;
    }

    this.isSubmitting = true;
    const deliveryOrderIds = this.selection.selected.map(
      (x) => x.deliveryOrderId,
    );

    const selectedAdminName =
      this.adminList.find((x) => x.adminId === this.selectedAdmin)?.name ||
      'ADMIN';

    const deliveryCode = `DEL-${new Date().toISOString().slice(0, 10)}-${Math.floor(Math.random() * 10000)}`;
    const deliveryName = `${new Date().toLocaleDateString()}-${selectedAdminName}`;

    this._deliverySrv
      .createDelivery({
        deliveryOrderIds,
        deliveryCode,
        deliveryName,
        adminId: this.selectedAdmin,
      })
      .subscribe({
        next: (res) => {
          if (res.isSuccess) {
            console.log(res);
            this._snackBar.open(res.message, 'Close');
            this._router.navigate(['/delivery']);
          } else {
            console.error(res);
            this._snackBar.open(res.message, 'Close');
          }
        },
      })
      .add(() => {
        this.isSubmitting = false;
      });
  }

  ngOnInit(): void {
    this.isLoading = true;
    this._adminSrv.getAdminList().subscribe({
      next: (res) => {
        if (res.data) {
          this.adminList = res.data;
        }
      },
    });
    this._deliveryOrderSrv.getDeliveryOrderList().subscribe({
      next: (res) => {
        if (res.data) {
          let filtered: DeliveryOrder[] = [];
          res.data.map((x) => {
            if (x.deliveryId === null) {
              filtered.push(x);
            }
          });

          this.dataSource.data = filtered;
        }
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: DeliveryOrder): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.deliveryOrderId}`;
  }
}
