import { gql } from '@apollo/client';
import { serverClient } from '..';
import { ISupermarket, PaginationProps, PaginationResponse } from '@/types';

export const getSupermarkets = async (pagination: PaginationProps) => {
  const { data } = await serverClient<{
    supermarkets: PaginationResponse<ISupermarket>;
  }>({
    path: GET_SUPERMARKETS,
    body: {
      search: pagination.search,
      page: pagination.page,
      limit: pagination.limit,
    },
  });

  return data?.supermarkets;
};

const GET_SUPERMARKETS = gql`
  query GetSupermarkets($search: String, $page: Int, $limit: Int) {
    supermarkets(search: $search, page: $page, limit: $limit) {
      results {
        id
        name
      }
      totalCount
    }
  }
`;
