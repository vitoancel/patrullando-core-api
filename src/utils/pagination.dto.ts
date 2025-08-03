export class BasePaginationDto<T> {
  total_records: number = 0;
  dataMapped?: T;
}
