import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DeliveryService } from '@services/delivery/delivery.service';
import { Delivery } from 'app/prisma-types';
import { LoaderComponent } from '@ui/loader/loader.component';
import { DatePipe } from '@angular/common';
import {
  DELIVERY_ORDER_STATUS,
  DELIVERY_STATUS,
  DIALOG_SIZE,
} from '@utils/constants';
import { MatButtonModule } from '@angular/material/button';
import { map, startWith, Subject, switchMap } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '@ui/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-delivery-details',
  standalone: true,
  imports: [LoaderComponent, DatePipe, MatButtonModule],
  templateUrl: './delivery-details.component.html',
  styleUrl: './delivery-details.component.scss',
})
export class DeliveryDetailsComponent {
  private readonly _dialog = inject(MatDialog);
  private readonly _route = inject(ActivatedRoute);
  private readonly _deliverySrv = inject(DeliveryService);

  DELIVERY_STATUS = DELIVERY_STATUS;
  paramId: string = '';
  isLoading: boolean = false;
  data: Delivery | null = null;
  fetchSubject = new Subject<void>();

  ngOnInit(): void {
    this.paramId = this._route.snapshot.paramMap.get('id') || '';
    if (this.paramId) {
      this.fetchSubject
        .pipe(startWith({}))
        .pipe(
          switchMap(() => {
            this.isLoading = true;
            return this._deliverySrv.getDeliveryDetails(this.paramId);
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
  }

  onDeliveryStart(): void {
    this._dialog.open(ConfirmDialogComponent, {
      width: DIALOG_SIZE.SMALL,
      data: {
        title: 'Starting Delivery',
        message: 'Are you sure to start this delivery?',
        confirmText: 'Confirm',
        onSubmit: this._deliverySrv.startDelivery(this.paramId),
        onSubmitSuccess: this.fetchSubject,
      },
    });
  }

  onDeliveryEnd(): void {
    this._dialog.open(ConfirmDialogComponent, {
      width: DIALOG_SIZE.SMALL,
      data: {
        title: 'Ending Delivery',
        message: 'Are you sure to end this delivery?',
        confirmText: 'Confirm',
        onSubmit: this._deliverySrv.startDelivery(this.paramId),
        onSubmitSuccess: this.fetchSubject,
      },
    });
  }

  get checkIfAllDelivered() {
    return this.data?.deliveryOrder.every(
      (order) => order.deliveryOrderStatus === DELIVERY_ORDER_STATUS.DELIVERED,
    );
  }

  get getTotalAmount() {
    return (
      '$' +
      this.data?.deliveryOrder.reduce(
        (acc, order) =>
          acc + order.customerOrderVendor.customerOrder.totalPrice,
        0,
      )
    );
  }

  get getDeliveredOrders() {
    const orders = this.data?.deliveryOrder.filter(
      (order) => order.deliveryOrderStatus !== DELIVERY_ORDER_STATUS.NEW,
    );
    return orders?.length || 0;
  }
}
