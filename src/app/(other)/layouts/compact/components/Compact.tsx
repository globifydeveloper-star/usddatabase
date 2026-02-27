'use client'
import Dashboard from '@/app/(admin)/dashboard/page'
import VerticalLayout from '@/components/layouts/VerticalLayout'
import { useLayoutContext } from '@/context/useLayoutContext'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

const Compact = () => {
  const router = useRouter()
  const { changeMenu } = useLayoutContext()
  useEffect(() => {
    changeMenu.size('compact')
  }, [])
  return (
    <>
      <VerticalLayout>
        <Dashboard />
      </VerticalLayout>
    </>
  )
}

export default Compact
