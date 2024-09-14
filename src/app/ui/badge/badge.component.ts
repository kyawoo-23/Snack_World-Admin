import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-badge',
  standalone: true,
  imports: [],
  templateUrl: './badge.component.html',
  styleUrl: './badge.component.scss',
})
export class BadgeComponent {
  @Input() text: string | undefined = '';
  @Input() bgColor: string = '#fff';
  @Input() color: string = '#fff';
}
