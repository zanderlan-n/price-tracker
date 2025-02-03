import { Suspense } from 'react';
import { Progress } from '../progress';
import { ArrowRightCircleIcon } from '@heroicons/react/16/solid';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './table';
import { Pagination } from './pagination';
import { DEFAULT_PAGE_SIZE } from '@/lib/constants';

export type TableItem = {
  id: number;
};

interface Props<TData extends TableItem> {
  headers: string[];
  data: TData[];
  filters: string;
  currentPage: number;
  totalCount: number;
}

const ServerTable = <TData extends TableItem>({
  headers,
  data,
  filters = '',
  currentPage = 1,
  totalCount,
}: Props<TData>) => {
  return (
    <>
      <Suspense key={filters + currentPage} fallback={<Progress />}>
        <div className="mx-4 border-radius-md overflow-hidden border-1 border-gray-200">
          <div className="p-1 font-sm text-gray-700 block md:hidden">
            Role para o lado <ArrowRightCircleIcon />
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                {headers.map((header, index) => (
                  <TableHead key={`${header}-${index}`}>{header}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody data-testid="tabela-morador">
              {!!data.length &&
                data.map((item, trIndex) => (
                  <TableRow key={`${item.id}-${trIndex}`}>
                    {Object.values(item).map((value, tdIndex) => (
                      <TableCell
                        key={`${item.id}-${tdIndex}`}
                        className="font-sm md:font-md"
                        data-testid={`table-${trIndex}-item-${tdIndex}`}
                      >
                        {value}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              {!data.length && (
                <TableRow>
                  <TableCell className="text-center">
                    Nenhum resultado encontrado
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </Suspense>
      <Pagination totalPages={Math.ceil(totalCount / DEFAULT_PAGE_SIZE)} />
    </>
  );
};

export default ServerTable;
