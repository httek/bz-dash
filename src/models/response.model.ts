export interface Response {
  code: number;
  msg: string;
  data: {} | null | [];
}

export interface Paginate {
  current: number;
  data: [];
  size: number;
  total: number;
  last_page: number;
  has_next: boolean;
}

export interface PaginateResponse {
  code: number;
  msg: string;
  data: Paginate;
}
