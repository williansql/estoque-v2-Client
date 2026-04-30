export interface ApiResponse<T> {
  status: number;
  message: string;
  data: T;
}

export interface PageContent<T> {
  content: T[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}