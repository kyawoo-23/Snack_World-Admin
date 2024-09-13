import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { TTableColumnDef } from '@models/index';
import { DeliveryService } from '@services/delivery/delivery.service';
import { MainLayoutComponent } from '@ui/main-layout/main-layout.component';
import { TableComponent } from '@ui/table/table.component';
import { Delivery } from 'app/prisma-types';

@Component({
  selector: 'app-delivery',
  standalone: true,
  imports: [
    MainLayoutComponent,
    MatButtonModule,
    RouterLink,
    TableComponent,
    MatIcon,
  ],
  templateUrl: './delivery.component.html',
  styleUrl: './delivery.component.scss',
})
export class DeliveryComponent implements OnInit {
  private readonly _deliverySrv = inject(DeliveryService);

  data: Delivery[] = [];
  isLoading: boolean = false;
  columns: TTableColumnDef<Delivery>[] = [
    {
      columnDef: 'name',
      header: 'Delivery Name',
      cell: (row: Delivery) => row.deliveryName,
    },
  ];

  ngOnInit(): void {
    this.isLoading = true;
    this._deliverySrv
      .getDeliveryList()
      .subscribe({
        next: (res) => {
          this.data = res.data;
        },
        error: (err) => {
          console.error(err);
        },
      })
      .add(() => {
        this.isLoading = false;
      });
  }
}
