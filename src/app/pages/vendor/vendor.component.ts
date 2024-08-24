import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { TTableColumnDef } from '@models/index';
import { VendorService } from '@services/vendor/vendor.service';
import { MainLayoutComponent } from '@ui/main-layout/main-layout.component';
import { TableComponent } from '@ui/table/table.component';
import { Vendor } from 'app/prisma-types';
import { map, startWith, Subject, switchMap } from 'rxjs';

@Component({
  selector: 'app-vendor',
  standalone: true,
  imports: [
    MainLayoutComponent,
    MatButtonModule,
    TableComponent,
    MatIcon,
    RouterLink,
  ],
  templateUrl: './vendor.component.html',
  styleUrl: './vendor.component.scss',
})
export class VendorComponent {
  private readonly _snackBar = inject(MatSnackBar);
  private readonly _sanitizer = inject(DomSanitizer);
  private readonly _vendorSrv = inject(VendorService);

  data: Vendor[] = [];
  isLoading: boolean = false;
  fetchSubject = new Subject<void>();
  columns: TTableColumnDef<Vendor>[] = [
    {
      columnDef: 'image',
      header: 'Image',
      cell: (row: Vendor) => {
        const div = `<img src="${row.image || 'images/placeholder-image.jpg'}" class="size-8 rounded shadow object-cover" />`;
        return this._sanitizer.bypassSecurityTrustHtml(div);
      },
    },
    {
      columnDef: 'name',
      header: 'Vendor Name',
      cell: (row: Vendor) => row.name,
    },
    {
      columnDef: 'isActive',
      header: 'Status',
      cell: (row: Vendor) => (row.isActive ? 'Active' : 'Inactive'),
    },
  ];

  ngOnInit() {
    this.fetchSubject
      .pipe(startWith({}))
      .pipe(
        switchMap(() => {
          this.isLoading = true;
          return this._vendorSrv.getVendorList();
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

  onToggleStatusClick(id: string) {
    this._vendorSrv.toggleVendorStatus(id).subscribe({
      next: (data) => {
        if (data.isSuccess) {
          this.fetchSubject.next();
        }
        this._snackBar.open(data.message, 'Close');
      },
      error: () => {
        this._snackBar.open('Failed to update vendor status', 'Close', {
          duration: 3000,
        });
      },
    });
  }
}
