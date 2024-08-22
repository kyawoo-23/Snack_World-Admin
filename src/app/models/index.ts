import { Observable, Subject } from 'rxjs';

export type TTableColumnDef<T> = {
  columnDef: string;
  header: string;
  cell: (item: T) => string;
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
  onSubmit: Observable<void>;
  onSubmitSuccess: Subject<void>;
};
