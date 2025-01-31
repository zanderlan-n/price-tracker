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

export interface TableItem {
  id: string | number;
  value: React.ReactNode[];
}

interface Props {
  headers: string[];
  data: TableItem[];
  filters: string;
  currentPage: number;
  totalPages: number;
}

const ServerTable = ({
  headers,
  data,
  filters = '',
  currentPage = 1,
  totalPages,
}: Props) => {
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
                    {item.value.map((value, tdIndex) => (
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
      <Pagination totalPages={totalPages} />
    </>
  );
};

export default ServerTable;
