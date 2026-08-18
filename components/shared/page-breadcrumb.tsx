import React from 'react'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '../ui'
import { PageBreadcrumbProps } from '@/types/components'



function PageBreadcrumb({currentPage,previousPage, icon: Icon}: PageBreadcrumbProps) {
  return (
    <Breadcrumb>
        <BreadcrumbList className='text-[12px]'>
            <BreadcrumbItem>
                <Icon className='size-3'/>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
                <BreadcrumbLink href='/'>
                    {previousPage}
                </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
                <BreadcrumbPage>
                    {currentPage}
                </BreadcrumbPage>
            </BreadcrumbItem>
        </BreadcrumbList>
    </Breadcrumb>
  )
}

export default PageBreadcrumb