'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import { Button } from '../button';

type PaginationItemProps = {
  number: number;
  isCurrent?: boolean;
  onPageChange: (page: number) => void;
};
const PaginationItem = ({
  isCurrent = false,
  number,
  onPageChange,
}: PaginationItemProps) => {
  if (isCurrent) {
    return <Button disabled>{number}</Button>;
  }
  return <Button onClick={() => onPageChange(number)}>{number}</Button>;
};

type PaginationGroupItemsProps = {
  currentPage: number;
  siblingsCount: number;
  lastPage: number;
  previousPages: number[];
  nextPages: number[];
  onPageChange: (page: number) => void;
};

const PaginationGroupItems = ({
  currentPage,
  siblingsCount,
  previousPages,
  nextPages,
  lastPage,
  onPageChange,
}: PaginationGroupItemsProps) => {
  return (
    <div className="flex">
      {currentPage > 1 + siblingsCount && (
        <>
          <PaginationItem onPageChange={onPageChange} number={1} />
          {currentPage > 2 + siblingsCount && <Ellipsis />}
        </>
      )}

      {previousPages.map((page) => (
        <PaginationItem onPageChange={onPageChange} key={page} number={page} />
      ))}

      <PaginationItem
        onPageChange={onPageChange}
        isCurrent
        number={currentPage}
      />

      {nextPages.map((page) => (
        <PaginationItem onPageChange={onPageChange} key={page} number={page} />
      ))}

      {currentPage + siblingsCount < lastPage && (
        <>
          {currentPage + 1 + siblingsCount < lastPage && <Ellipsis />}
          <PaginationItem onPageChange={onPageChange} number={lastPage} />
        </>
      )}
    </div>
  );
};

const Ellipsis = () => <div className="text-center w-8">...</div>;

const generatePagesArray = (from: number, to: number): number[] =>
  Array.from({ length: to - from }, (_, index) => from + index + 1).filter(
    (page) => page > 0
  );

export const Pagination = ({ totalPages }: { totalPages: number }) => {
  const { replace } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentPage = useMemo(
    () => Number(searchParams.get('page')) || 1,
    [searchParams]
  );
  const siblingsCount = 1;

  const onPageChange = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    return replace(`${pathname}?${params.toString()}`);
  };

  const previousPages = useMemo(
    () => generatePagesArray(currentPage - siblingsCount - 1, currentPage - 1),
    [currentPage, siblingsCount]
  );

  const nextPages = useMemo(
    () =>
      generatePagesArray(
        currentPage,
        Math.min(currentPage + siblingsCount, totalPages)
      ),
    [currentPage, siblingsCount, totalPages]
  );

  return (
    <div className="flex justify-between items-center m-4">
      <PaginationButton
        isDisabled={currentPage === 1}
        label="Anterior"
        onClick={() => onPageChange(currentPage - 1)}
      />
      <PaginationGroupItems
        currentPage={currentPage}
        siblingsCount={siblingsCount}
        lastPage={totalPages}
        previousPages={previousPages}
        nextPages={nextPages}
        onPageChange={onPageChange}
      />
      <PaginationButton
        isDisabled={currentPage === totalPages}
        label="Próximo"
        onClick={() => onPageChange(currentPage + 1)}
      />
    </div>
  );
};

type PaginationButtonProps = {
  isDisabled: boolean;
  label: string;
  onClick: () => void;
};
const PaginationButton = ({
  isDisabled,
  label,
  onClick,
}: PaginationButtonProps) => (
  <Button disabled={isDisabled} onClick={onClick}>
    {label}
  </Button>
);
