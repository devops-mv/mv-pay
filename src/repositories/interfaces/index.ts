

export interface IUnpagedList<T> {
  data: T[];
  error?: any | undefined;
}
export interface IPagedList<T> extends IUnpagedList<T> {
  page: number;
  pageSize: number;
  totalPages: number;
  totalRecords: number;
}

export interface ISingleResult<T> {
  data: T;
  error?: any | undefined;
}