import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss',
})
export class MainLayoutComponent {
  @Input({ required: true }) title: string | undefined;
}
