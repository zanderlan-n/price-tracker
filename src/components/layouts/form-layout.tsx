import React from 'react'

import { ArrowLeftCircleIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

interface NewEntityLayoutProps extends React.PropsWithChildren {
  title: string
  goBackTo?: string
}

export const EntityFormLayout: React.FC<NewEntityLayoutProps> = ({
  children,
  title,
  goBackTo,
}) => {
  return (
    <div className="space-y-4">
      <div className="mb-4">
        <div className="flex items-center mb-2">
          {goBackTo && (
            <Link href={goBackTo} className=" hover:text-blue-700">
              <ArrowLeftCircleIcon className="h-8 w-8" />
            </Link>
          )}
          <h1 className="text-3xl font-semibold ml-3">{title}</h1>
        </div>
        <hr />
      </div>

      {children}
    </div>
  )
}
