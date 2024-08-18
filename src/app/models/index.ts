export type TTableColumnDef<T> = {
  columnDef: string;
  header: string;
  cell: (item: T) => string;
};
