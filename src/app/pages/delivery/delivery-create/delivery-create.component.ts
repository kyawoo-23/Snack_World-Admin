import { Component, inject, OnInit } from '@angular/core';
import { DeliveryOrderService } from '@services/delivery-order/delivery-order.service';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { DeliveryOrder } from 'app/prisma-types';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-delivery-create',
  standalone: true,
  imports: [MatCheckboxModule, MatTableModule, MatProgressSpinner],
  templateUrl: './delivery-create.component.html',
  styleUrl: './delivery-create.component.scss',
})
export class DeliveryCreateComponent implements OnInit {
  private readonly _deliveryOrderSrv = inject(DeliveryOrderService);

  isLoading: boolean = false;
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

  hi() {
    console.log(
      'hi',
      this.selection.selected.map((x) => x.deliveryOrderId),
    );
  }

  ngOnInit(): void {
    this.isLoading = true;
    this._deliveryOrderSrv.getDeliveryOrderList().subscribe({
      next: (res) => {
        if (res.data) {
          this.dataSource.data = res.data;
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
