import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { TAnnouncementCreateRequest } from '@models/announcement.model';
import { TBaseResponse } from '@models/index';
import { Announcement } from 'app/prisma-types';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AnnouncementService {
  private readonly _categoryUrl = 'announcement';

  private readonly _http = inject(HttpClient);

  getAnnouncementList(): Observable<TBaseResponse<Announcement[]>> {
    const url = environment.BASE_URL + this._categoryUrl;
    return this._http.get<TBaseResponse<Announcement[]>>(url);
  }

  createAnnouncement(
    request: TAnnouncementCreateRequest,
  ): Observable<TBaseResponse<Announcement>> {
    const url = environment.BASE_URL + this._categoryUrl;
    return this._http.post<TBaseResponse<Announcement>>(url, request);
  }
}
