

interface IUnpagedList<T> {
  data: T[];
  error?: any | undefined;
}
interface IPagedList<T> extends IUnpagedList<T> {
  page: number;
  pageSize: number;
  totalPages: number;
  totalRecords: number;
}

interface ISingleResult<T> {
  data: T;
  error?: any | undefined;
}