import { Component, Input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-info-box',
  standalone: true,
  imports: [MatIcon],
  templateUrl: './info-box.component.html',
  styleUrl: './info-box.component.scss',
})
export class InfoBoxComponent {}
