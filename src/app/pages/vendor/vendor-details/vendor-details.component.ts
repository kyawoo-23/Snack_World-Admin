import { Component, inject, ViewChild } from '@angular/core';
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
import { Vendor, VendorUser } from 'app/prisma-types';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoaderComponent } from '@ui/loader/loader.component';
import { VendorService } from '@services/vendor/vendor.service';
import { TableComponent } from '../../../ui/table/table.component';
import { TTableColumnDef } from '@models/index';
import { PAGE_SIZE, PLACEHOLDER_IMAGE } from '@utils/constants';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-vendor-details',
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
    TableComponent,
    MatPaginatorModule,
  ],
  templateUrl: './vendor-details.component.html',
  styleUrl: './vendor-details.component.scss',
})
export class VendorDetailsComponent {
  private readonly _snackBar = inject(MatSnackBar);
  private readonly _route = inject(ActivatedRoute);
  private readonly _formBuilder = inject(FormBuilder);
  private readonly _vendorSrv = inject(VendorService);

  paramId: string = '';

  pageSize = PAGE_SIZE;
  isLoading: boolean = false;
  form!: FormGroup;
  data: Vendor | null = null;
  dataList: VendorUser[] = [];
  isSubmitting: boolean = false;

  onSubmit(): void {
    this.isSubmitting = true;
    this._vendorSrv.editVendorDetails(this.paramId, this.form.value).subscribe({
      next: (res) => {
        if (res.isSuccess) {
          this._snackBar.open(res.message, 'Close');
        }
        this.isSubmitting = false;
      },
      error: () => {
        this.isSubmitting = false;
      },
    });
  }

  ngOnInit(): void {
    this.paramId = this._route.snapshot.paramMap.get('id') || '';
    if (this.paramId) {
      this._fetchDetails();
    }

    this.form = this._formBuilder.group({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
    });
  }

  private _fetchDetails(): void {
    this.isLoading = true;

    this._vendorSrv.getVendorDetails(this.paramId).subscribe({
      next: (res) => {
        this.data = res.data;
        this.dataList = res.data.vendorUser.slice(0, this.pageSize);
        this.isLoading = false;

        this.form.patchValue({
          name: this.data?.name,
          email: this.data?.email,
        });
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  columns: TTableColumnDef<VendorUser>[] = [
    {
      columnDef: 'name',
      header: 'Vendor Name',
      cell: (row: VendorUser) => row.name,
    },
    {
      columnDef: 'email',
      header: 'Email',
      cell: (row: VendorUser) => row.email,
    },
    {
      columnDef: 'role',
      header: 'Role',
      cell: (row: VendorUser) => row.vendorUserRole.name,
    },
    {
      columnDef: 'isActive',
      header: 'Status',
      cell: (row: VendorUser) => (row.isActive ? 'Active' : 'Inactive'),
    },
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  ngAfterViewInit(): void {
    this.paginator.page.subscribe(() => {
      const offset = this.paginator.pageIndex * this.paginator.pageSize;
      const limit = this.paginator.pageSize;

      if (this.data) {
        this.dataList = this.data?.vendorUser.slice(offset, offset + limit);
      }
    });
  }

  onImageError(event: ErrorEvent): void {
    const target = event.target as HTMLImageElement;
    target.src = PLACEHOLDER_IMAGE;
  }
}
