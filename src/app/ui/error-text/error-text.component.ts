import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-error-text',
  standalone: true,
  imports: [],
  templateUrl: './error-text.component.html',
  styleUrl: './error-text.component.scss',
})
export class ErrorTextComponent {
  @Input({ required: true }) error: string = '';
}
