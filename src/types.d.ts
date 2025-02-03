export interface ISupermarket extends ILocation {
  id: number;
  name: string;
}

export interface ILocation {
  latitude: number;
  longitude: number;
}

export interface PaginationProps {
  search: string;
  page: number;
  limit: number;
}

export interface PaginationResponse<T> {
  results: T[];
  totalCount: number;
}
