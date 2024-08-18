import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconButton } from '@angular/material/button';
import { TTableColumnDef } from '@models/index';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    MatTableModule,
    MatProgressSpinnerModule,

    MatTooltipModule,
    MatIconButton,
    CommonModule,
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent<T> implements OnInit {
  @Input({ required: true }) columns: TTableColumnDef<T>[] = [];
  @Input({ required: true }) data: T[] = [];
  @Input({ required: true }) isLoading: boolean = false;
  @Input() actionTemplate: TemplateRef<any> | null = null;
  @Input({ required: true }) isActionsTemplateVisible: boolean = true;

  tableColumns: TTableColumnDef<T>[] = [];
  filtersHeader: string[] = [];

  ngOnInit() {
    this.tableColumns = this.columns;
    this.filtersHeader = this.columns.map((column, i) => {
      return `${column.header}`;
    });

    if (this.actionTemplate && this.isActionsTemplateVisible) {
      this.filtersHeader.push('actions');
    }
  }
}
