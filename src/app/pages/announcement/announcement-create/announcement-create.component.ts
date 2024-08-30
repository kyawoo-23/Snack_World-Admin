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
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { AnnouncementService } from '@services/announcement/announcement.service';
import { CustomerService } from '@services/customer/customer.service';
import { VendorService } from '@services/vendor/vendor.service';
import { InfoBoxComponent } from '@ui/info-box/info-box.component';

@Component({
  selector: 'app-announcement-create',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIcon,
    MatSelectModule,
    AngularMultiSelectModule,
    InfoBoxComponent,
  ],
  templateUrl: './announcement-create.component.html',
  styleUrl: './announcement-create.component.scss',
})
export class AnnouncementCreateComponent {
  private readonly _snackBar = inject(MatSnackBar);
  private readonly _router = inject(Router);
  private readonly _formBuilder = inject(FormBuilder);
  private readonly _announcementSrv = inject(AnnouncementService);
  private readonly _customerSrv = inject(CustomerService);
  private readonly _vendorSrv = inject(VendorService);

  types = ['ALL', 'CUSTOMER', 'VENDOR'];
  customerList: {
    id: string;
    itemName: string;
  }[] = [];
  vendorList: {
    id: string;
    itemName: string;
  }[] = [];
  dropdownSettings = {
    singleSelection: false,
    text: 'Select Accounts to Send',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    enableSearchFilter: true,
    classes: 'myclass custom-class-example',
  };

  form!: FormGroup;
  isLoading: boolean = false;
  isSubmitting: boolean = false;

  get selectedType(): string {
    return this.form.get('type')?.value;
  }

  onSubmit(): void {
    console.log(this.form.value);
    // this.isSubmitting = true;
    // this._announcementSrv.createAnnouncement(this.form.value).subscribe({
    //   next: (res) => {
    //     if (res.isSuccess) {
    //       this._snackBar.open(res.message, 'Close');
    //       this._router.navigate(['/announcement']);
    //     }
    //     this.isSubmitting = false;
    //   },
    //   error: () => {
    //     this.isSubmitting = false;
    //   },
    // });
  }

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      title: new FormControl('', [Validators.required]),
      content: new FormControl('', [Validators.required]),
      type: new FormControl(this.types[0], [Validators.required]),
      customerId: new FormControl([], [Validators.required]),
      vendorId: new FormControl([], [Validators.required]),
    });

    this.form.get('type')?.valueChanges.subscribe((type) => {
      this._typeChangeHandler(type);
    });
  }

  private _typeChangeHandler(type: string): void {
    this.isLoading = true;
    if (type === 'CUSTOMER') {
      if (this.customerList.length <= 0) {
        this._customerSrv.getCustomerList().subscribe({
          next: (res) => {
            if (res.isSuccess) {
              this.form.get('vendorId')?.patchValue([]);
              this.customerList = res.data.map((c) => ({
                id: c.customerId,
                itemName: c.email,
              }));
            }
          },
        });
      }
    } else if (type === 'VENDOR') {
      if (this.vendorList.length <= 0) {
        this._vendorSrv.getVendorList().subscribe({
          next: (res) => {
            if (res.isSuccess) {
              this.form.get('customerId')?.patchValue([]);
              this.vendorList = res.data.map((v) => ({
                id: v.vendorId,
                itemName: v.email,
              }));
            }
          },
        });
      }
    } else {
      this.form.get('customerId')?.patchValue([]);
      this.form.get('vendorId')?.patchValue([]);
    }
  }
}
