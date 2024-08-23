import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { TTableColumnDef } from '@models/index';
import { DomSanitizer } from '@angular/platform-browser';
import { VariantService } from '@services/variant/variant.service';
import { MainLayoutComponent } from '@ui/main-layout/main-layout.component';
import { TableComponent } from '@ui/table/table.component';
import { Variant } from 'app/prisma-types';
import { map, startWith, Subject, switchMap } from 'rxjs';

@Component({
  selector: 'app-variant',
  standalone: true,
  imports: [
    MainLayoutComponent,
    MatButtonModule,
    TableComponent,
    MatIcon,
    RouterLink,
  ],
  templateUrl: './variant.component.html',
  styleUrl: './variant.component.scss',
})
export class VariantComponent {
  private readonly _sanitizer = inject(DomSanitizer);
  private readonly _variantSrv = inject(VariantService);

  data: Variant[] = [];
  isLoading: boolean = false;
  fetchSubject = new Subject<void>();
  columns: TTableColumnDef<Variant>[] = [
    {
      columnDef: 'name',
      header: 'Variant Name',
      cell: (row: Variant) => row.name,
    },
    {
      columnDef: 'color',
      header: 'Color',
      cell: (row: Variant) => {
        const colorDiv = `<div class="size-6 rounded shadow" style="background-color: ${row.color};" title="${row.color}"></div>`;
        return this._sanitizer.bypassSecurityTrustHtml(colorDiv);
      },
    },
  ];

  ngOnInit() {
    this.fetchSubject
      .pipe(startWith({}))
      .pipe(
        switchMap(() => {
          this.isLoading = true;
          return this._variantSrv.getVariantList();
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
