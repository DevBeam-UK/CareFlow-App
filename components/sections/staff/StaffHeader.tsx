
import { Button } from '@/components/ui'
import { Download, Plus } from 'lucide-react'
import React from 'react'
import { AddStaffModal } from './AddStaffModal'

function StaffHeader() {
  return (
    <div className='w-full flex items-center justify-between'>
        <div className='flex flex-col gap-y-1'>
            <h1 className='text-4xl font-bold text-cf-ink'>
                Agency Staff
            </h1>
            <p className='text-xs text-cf-ink-60'>Manage and track agency staff in real-time</p>
        </div>
        <div className='flex items-center gap-x-2'>
            <Button 
            variant='outline'
            >
                <Download className='size-4'/> Export Data
            </Button>
            <AddStaffModal />
        </div>
    </div>
  )
}

export default StaffHeader