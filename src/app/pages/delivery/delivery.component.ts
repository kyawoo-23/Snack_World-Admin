import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

import { MainLayoutComponent } from '@ui/main-layout/main-layout.component';

@Component({
  selector: 'app-delivery',
  standalone: true,
  imports: [MainLayoutComponent, MatButtonModule, RouterLink],
  templateUrl: './delivery.component.html',
  styleUrl: './delivery.component.scss',
})
export class DeliveryComponent {}
