import { Component, inject, OnInit } from '@angular/core';
import { VendorRemarkService } from '@services/vendor-remark/vendor-remark.service';
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
import { VendorRemark } from 'app/prisma-types';
import { format, subDays } from 'date-fns';
import { TableComponent } from '@ui/table/table.component';
import { TTableColumnDef } from '@models/index';
import { convertToDateTime } from '@utils/common';

@Component({
  selector: 'app-remark-report',
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
  templateUrl: './remark-report.component.html',
  styleUrl: './remark-report.component.scss',
})
export class RemarkReportComponent implements OnInit {
  private readonly _vendorRemarkService = inject(VendorRemarkService);
  private readonly _formBuilder = inject(FormBuilder);

  maxDate = format(new Date(), 'yyyy-MM-dd');
  data: VendorRemark[] = [];
  dateForm!: FormGroup;
  isLoading: boolean = false;

  ngOnInit(): void {
    const startDate = format(subDays(new Date(), 7), 'yyyy-MM-dd');
    const endDate = format(new Date(), 'yyyy-MM-dd');

    this.dateForm = this._formBuilder.group({
      startDate: new FormControl(startDate, [Validators.required]),
      endDate: new FormControl(endDate, [Validators.required]),
    });

    this._getVendorRemarkReport({
      startDate,
      endDate,
    });
  }

  onSubmit(): void {
    if (this.dateForm.valid) {
      const { startDate, endDate } = this.dateForm.value;
      this._getVendorRemarkReport({ startDate, endDate });
    }
  }

  private _getVendorRemarkReport({
    startDate,
    endDate,
  }: {
    startDate: string;
    endDate: string;
  }): void {
    this.isLoading = true;
    this._vendorRemarkService
      .getVendorRemarkReport({
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

  columns: TTableColumnDef<VendorRemark>[] = [
    {
      columnDef: 'date',
      header: 'Date',
      cell: (row: VendorRemark) => convertToDateTime(row.createdAt),
    },
    {
      columnDef: 'vendor',
      header: 'Vendor',
      cell: (row: VendorRemark) => row.vendor.name,
    },
    {
      columnDef: 'content',
      header: 'Content',
      cell: (row: VendorRemark) => row.content,
    },
  ];
}
