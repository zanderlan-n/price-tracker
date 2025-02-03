import ListLayout from '@/components/layouts/list-layout';
import { DEFAULT_PAGE_SIZE } from '@/lib/constants';
import { getSupermarkets } from '@/lib/graphql/server/queries/get-supermarkets';

export default async function Home(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
    status?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const status = searchParams?.status || '';
  const currentPage = Number(searchParams?.page) || 1;

  const data = await getSupermarkets({
    search: query,
    page: currentPage,
    limit: DEFAULT_PAGE_SIZE,
  });

  return (
    <div className="mx-auto max-w-7xl">
      <h1 className="text-center text-2xl font-bold my-4">Price Tracker</h1>
      <ListLayout
        headers={['Id', 'Name']}
        title="Supermercados"
        query={query}
        currentPage={currentPage}
        status={status}
        data={data?.results}
        totalCount={data.totalCount}
      />
    </div>
  );
}
