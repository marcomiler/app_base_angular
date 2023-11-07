import { MatPaginatorIntl } from '@angular/material/paginator';

export function CustomPaginator(): any {
  const customPaginatorIntl = new MatPaginatorIntl();

  customPaginatorIntl.itemsPerPageLabel = 'Registros por página:';
  customPaginatorIntl.firstPageLabel = 'Primera Página';
  customPaginatorIntl.lastPageLabel = 'Última Página';
  customPaginatorIntl.nextPageLabel = 'Siguiente Página';
  customPaginatorIntl.previousPageLabel = 'Página Anterior';
  customPaginatorIntl.getRangeLabel = (
    page: number,
    pageSize: number,
    length: number
  ) => {
    if (length === 0 || pageSize === 0) {
      return `0 de ${length}`;
    }
    length = Math.max(length, 0);
    const startIndex = page * pageSize;
    // If the start index exceeds the list length, do not try and fix the end index to the end.
    const endIndex =
      startIndex < length
        ? Math.min(startIndex + pageSize, length)
        : startIndex + pageSize;
    return `Registro(s) ${startIndex + 1} a ${endIndex} de ${length}`;
  };
  return customPaginatorIntl;
}
