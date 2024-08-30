import { SafeHtml } from '@angular/platform-browser';
import { Observable, Subject } from 'rxjs';

export type TTableColumnDef<T> = {
  columnDef: string;
  header: string;
  cell: (item: T) => string | SafeHtml;
};

export type TBaseResponse<T> = {
  isSuccess: boolean;
  message: string;
  data: T;
  error: string | null;
};

export type TConfirmDialog = {
  title: string;
  message: string;
  confirmText: string;
  onSubmit: Observable<TBaseResponse<void>>;
  onSubmitSuccess: Subject<void>;
};

export type TMultiSelectOption = {
  id: string;
  itemName: string;
};
