import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { TTableColumnDef } from '@models/index';
import { CategoryService } from '@services/category/category.service';
import { MainLayoutComponent } from '@ui/main-layout/main-layout.component';
import { TableComponent } from '@ui/table/table.component';
import { Category } from 'app/prisma-types';
import { map, startWith, Subject, switchMap } from 'rxjs';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [
    MainLayoutComponent,
    MatButtonModule,
    TableComponent,
    MatIcon,
    RouterLink,
  ],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss',
})
export class CategoryComponent {
  private readonly _categorySrv = inject(CategoryService);

  data: Category[] = [];
  isLoading: boolean = false;
  fetchSubject = new Subject<void>();
  columns: TTableColumnDef<Category>[] = [
    {
      columnDef: 'name',
      header: 'Category Name',
      cell: (row: Category) => row.name,
    },
  ];

  ngOnInit() {
    this.fetchSubject
      .pipe(startWith({}))
      .pipe(
        switchMap(() => {
          this.isLoading = true;
          return this._categorySrv.getCategoryList();
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
