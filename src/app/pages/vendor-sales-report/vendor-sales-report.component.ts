import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TTableColumnDef } from '@models/index';
import { TVendorSalesReportResponse } from '@models/report.model';
import { VendorService } from '@services/vendor/vendor.service';
import { TableComponent } from '@ui/table/table.component';
import { format, subDays } from 'date-fns';

@Component({
  selector: 'app-vendor-sales-report',
  standalone: true,
  imports: [
    TableComponent,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './vendor-sales-report.component.html',
  styleUrl: './vendor-sales-report.component.scss',
})
export class VendorSalesReportComponent implements OnInit {
  private readonly _vendorService = inject(VendorService);
  private readonly _formBuilder = inject(FormBuilder);

  maxDate = format(new Date(), 'yyyy-MM-dd');
  data: TVendorSalesReportResponse[] = [];
  dateForm!: FormGroup;
  isLoading: boolean = false;

  ngOnInit(): void {
    const startDate = format(subDays(new Date(), 7), 'yyyy-MM-dd');
    const endDate = format(new Date(), 'yyyy-MM-dd');

    this.dateForm = this._formBuilder.group({
      startDate: new FormControl(startDate, [Validators.required]),
      endDate: new FormControl(endDate, [Validators.required]),
    });

    this._getVendorSalesReport();
  }

  onSubmit(): void {
    if (this.dateForm.valid) {
      this._getVendorSalesReport();
    }
  }

  private _getVendorSalesReport(): void {
    this.isLoading = true;
    this._vendorService
      .getVendorSalesReport({
        startDate: this.dateForm.value.startDate,
        endDate: this.dateForm.value.endDate,
      })
      .subscribe((response) => {
        this.data = response.data;
        this.isLoading = false;
      });
  }

  columns: TTableColumnDef<TVendorSalesReportResponse>[] = [
    {
      columnDef: 'no',
      header: 'No.',
      cell: (row: TVendorSalesReportResponse) =>
        `${this.data.indexOf(row) + 1}.`,
    },
    {
      columnDef: 'vendor',
      header: 'Vendor',
      cell: (row: TVendorSalesReportResponse) => row.vendorName,
    },
    {
      columnDef: 'totalSales',
      header: 'Total Sales ($)',
      cell: (row: TVendorSalesReportResponse) => row.totalSales,
    },
    {
      columnDef: 'totalProducts',
      header: 'Products Sold',
      cell: (row: TVendorSalesReportResponse) => row.totalProductsSold,
    },
    {
      columnDef: 'totalOrders',
      header: 'Total Orders',
      cell: (row: TVendorSalesReportResponse) => row.totalOrders,
    },
    {
      columnDef: 'cancelledOrders',
      header: 'Cancelled Orders',
      cell: (row: TVendorSalesReportResponse) => row.cancelledOrders,
    },
  ];
}
