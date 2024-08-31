import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { TTableColumnDef } from '@models/index';
import { AnnouncementService } from '@services/announcement/announcement.service';
import { MainLayoutComponent } from '@ui/main-layout/main-layout.component';
import { Announcement } from 'app/prisma-types';
import { map, startWith, Subject, switchMap } from 'rxjs';
import { TableComponent } from '@ui/table/table.component';
import { MatIcon } from '@angular/material/icon';
import { DatePipe } from '@angular/common';
import { convertToDateTime } from '@utils/common';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { PAGE_SIZE } from '@utils/constants';

@Component({
  selector: 'app-announcement',
  standalone: true,
  imports: [
    MainLayoutComponent,
    MatButtonModule,
    RouterLink,
    TableComponent,
    MatIcon,
    DatePipe,
    MatPaginatorModule,
  ],
  templateUrl: './announcement.component.html',
  styleUrl: './announcement.component.scss',
})
export class AnnouncementComponent implements OnInit {
  private readonly _announcementSrv = inject(AnnouncementService);

  pageSize = PAGE_SIZE;
  data: Announcement[] = [];
  dataList: Announcement[] = [];
  isLoading: boolean = false;
  fetchSubject = new Subject<void>();
  columns: TTableColumnDef<Announcement>[] = [
    {
      columnDef: 'sentAt',
      header: 'Sent At',
      cell: (row: Announcement) => convertToDateTime(row.createdAt),
    },
    {
      columnDef: 'title',
      header: 'Title',
      cell: (row: Announcement) => row.title,
    },
    {
      columnDef: 'content',
      header: 'Content',
      cell: (row: Announcement) => row.content,
    },
    {
      columnDef: 'type',
      header: 'Type',
      cell: (row: Announcement) => row.type,
    },
    {
      columnDef: 'sentTo',
      header: 'Sent To',
      cell: (row: Announcement) => {
        if (row.type === 'ALL') {
          return '<div class="font-medium bg-primary-400 text-white w-fit px-2 py-1 rounded">Everyone</div>';
        } else {
          if (row.announcementCustomer.length > 0) {
            let emails = "<div class='flex items-center flex-wrap gap-2'>";
            emails += row.announcementCustomer
              .map(
                (ac) =>
                  `<div class="px-2 bg-sky-200 text-sky-600 rounded py-1">${ac.customer.email}</div>`,
              )
              .join('');
            emails += '</div>';
            return emails;
          } else if (row.announcementVendor.length > 0) {
            let emails = "<div class='flex items-center flex-wrap gap-2'>";
            emails += row.announcementVendor
              .map(
                (av) =>
                  `<div class="px-2 bg-gray-200 text-gray-600 rounded py-1">${av.vendor.email}</div>`,
              )
              .join('');
            emails += '</div>';
            return emails;
          } else {
            return '';
          }
        }
      },
    },
  ];

  ngOnInit() {
    this.fetchSubject
      .pipe(startWith({}))
      .pipe(
        switchMap(() => {
          this.isLoading = true;
          return this._announcementSrv.getAnnouncementList();
        }),
        map((data) => {
          console.log(data.data);
          return data.data;
        }),
      )
      .subscribe({
        next: (data) => {
          this.data = data;
          this.dataList = data.slice(0, this.pageSize);
          this.isLoading = false;
        },
        error: () => {
          this.isLoading = false;
        },
      });
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  ngAfterViewInit(): void {
    this.paginator.page.subscribe(() => {
      const offset = this.paginator.pageIndex * this.paginator.pageSize;
      const limit = this.paginator.pageSize;

      this.dataList = this.data.slice(offset, offset + limit);
    });
  }
}
