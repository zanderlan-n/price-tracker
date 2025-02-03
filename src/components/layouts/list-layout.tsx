'use client';
import Image from 'next/image';
import Link from 'next/link';
import ServerTable, { TableItem } from '../ui/table/server-table';

interface ListLayoutProps<TData extends TableItem> {
  headers: string[];
  title: string;
  data?: TData[];
  newEntityButtonPath?: string;
  newEntityButtonLabel?: string;
  query: string;
  currentPage: number;
  status: string;
  totalCount: number;
}

export function ListLayout<TData extends TableItem>({
  headers,
  data,
  newEntityButtonPath,
  newEntityButtonLabel,
  title,
  query,
  currentPage,
  status,
  totalCount,
}: ListLayoutProps<TData>) {
  return (
    <div className="space-y-4 flex flex-col">
      <div className="mb-4">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold my-2">{title}</h1>
        </div>
        <hr />
      </div>
      {newEntityButtonPath && newEntityButtonLabel && (
        <div className="ml-auto">
          <Link href={newEntityButtonPath} className="inline-block">
            <button
              className="bg-primary-900 hover:bg-primary-800 text-white font-bold py-2 px-4 rounded flex items-center gap-2"
              data-testid="new-entity-button"
            >
              <Image
                src="/icons/plus.svg"
                height={24}
                alt="ícone de adicionar"
                width={24}
                style={{
                  display: 'inline',
                }}
              />
              {newEntityButtonLabel}
            </button>
          </Link>
        </div>
      )}
      <ServerTable
        headers={headers}
        data={data ?? []}
        filters={query + status}
        currentPage={currentPage}
        totalCount={totalCount}
      />
    </div>
  );
}

export default ListLayout;
