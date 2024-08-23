import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { TBaseResponse } from '@models/index';
import { Category } from 'app/prisma-types';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private readonly _categoryUrl = 'category';

  private readonly _http = inject(HttpClient);

  getCategoryList(): Observable<TBaseResponse<Category[]>> {
    const url = environment.BASE_URL + this._categoryUrl;
    return this._http.get<TBaseResponse<Category[]>>(url);
  }

  getCategoryDetails(id: string): Observable<TBaseResponse<Category>> {
    const url = environment.BASE_URL + this._categoryUrl + '/' + id;
    return this._http.get<TBaseResponse<Category>>(url);
  }

  createCategory(request: Category): Observable<TBaseResponse<Category>> {
    const url = environment.BASE_URL + this._categoryUrl;
    return this._http.post<TBaseResponse<Category>>(url, request);
  }

  editCategoryDetails(
    id: string,
    request: Category,
  ): Observable<TBaseResponse<Category>> {
    const url = environment.BASE_URL + this._categoryUrl + '/' + id;
    return this._http.patch<TBaseResponse<Category>>(url, request);
  }
}
