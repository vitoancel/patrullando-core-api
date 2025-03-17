export class BaseListRequest<T> {
    page: number = 1;
    limit: number = 10;
    sort?: Partial<Record<keyof T, 'asc' | 'desc'>>;
    filters?: Partial<Record<keyof T, string | number | boolean>>;
  }