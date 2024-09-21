import { Component, inject, OnInit } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { provideNativeDateAdapter } from '@angular/material/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { format, subDays } from 'date-fns';
import { TableComponent } from '@ui/table/table.component';
import { TTableColumnDef } from '@models/index';
import { convertToDateTime, getDeliveryOrderStatusColor } from '@utils/common';
import { DeliveryOrderService } from '@services/delivery-order/delivery-order.service';
import { DeliveryOrder } from '../../prisma-types';
import { DELIVERY_ORDER_STATUS } from '@utils/constants';
import { DomSanitizer } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-delivery-order-report',
  standalone: true,
  imports: [
    TableComponent,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    MatIcon,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './delivery-order-report.component.html',
  styleUrl: './delivery-order-report.component.scss',
})
export class DeliveryOrderReportComponent implements OnInit {
  private readonly _deliveryOrderService = inject(DeliveryOrderService);
  private readonly _formBuilder = inject(FormBuilder);
  private readonly _sanitizer = inject(DomSanitizer);

  maxDate = format(new Date(), 'yyyy-MM-dd');
  data: DeliveryOrder[] = [];
  dateForm!: FormGroup;
  isLoading: boolean = false;

  ngOnInit(): void {
    const startDate = format(subDays(new Date(), 7), 'yyyy-MM-dd');
    const endDate = format(new Date(), 'yyyy-MM-dd');

    this.dateForm = this._formBuilder.group({
      startDate: new FormControl(startDate, [Validators.required]),
      endDate: new FormControl(endDate, [Validators.required]),
    });

    this._getDeliveryOrderReport({
      startDate,
      endDate,
    });
  }

  onSubmit(): void {
    if (this.dateForm.valid) {
      const { startDate, endDate } = this.dateForm.value;
      this._getDeliveryOrderReport({
        startDate,
        endDate,
      });
    }
  }

  private _getDeliveryOrderReport({
    startDate,
    endDate,
  }: {
    startDate: string;
    endDate: string;
  }): void {
    this.isLoading = true;

    this._deliveryOrderService
      .getDeliveryOrderReport({
        startDate,
        endDate,
      })
      .subscribe({
        next: (res) => {
          if (res.isSuccess) {
            this.data = res.data;
          }
        },
        complete: () => {
          this.isLoading = false;
        },
      });
  }

  columns: TTableColumnDef<DeliveryOrder>[] = [
    {
      columnDef: 'no',
      header: 'No.',
      cell: (row: DeliveryOrder) => `${this.data.indexOf(row) + 1}.`,
    },
    {
      columnDef: 'date',
      header: 'Date',
      cell: (row: DeliveryOrder) => convertToDateTime(row.createdAt),
    },
    {
      columnDef: 'name',
      header: 'Delivery Name',
      cell: (row: DeliveryOrder) => row.deliveryName,
    },
    {
      columnDef: 'vendor',
      header: 'Vendor',
      cell: (row: DeliveryOrder) => row.customerOrderVendor.vendorName,
    },
    {
      columnDef: 'status',
      header: 'Status',
      cell: (row: DeliveryOrder) => {
        const div = `<div style="background: ${getDeliveryOrderStatusColor(row.deliveryOrderStatus as DELIVERY_ORDER_STATUS)}" class="w-fit rounded text-white px-2 py-1">${row.deliveryOrderStatus}</div>`;
        return this._sanitizer.bypassSecurityTrustHtml(div);
      },
    },
    {
      columnDef: 'admin',
      header: 'Admin',
      cell: (row: DeliveryOrder) => row.delivery?.admin.name || 'N/A',
    },
  ];
}
