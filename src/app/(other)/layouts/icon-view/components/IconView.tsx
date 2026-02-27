'use client'
import Dashboard from '@/app/(admin)/dashboard/page'
import VerticalLayout from '@/components/layouts/VerticalLayout'
import { useLayoutContext } from '@/context/useLayoutContext'
import { useEffect } from 'react'

const IconView = () => {
  const { changeMenu } = useLayoutContext()
  useEffect(() => {
    changeMenu.size('condensed')
  }, [])
  return (
    <>
      <VerticalLayout>
        <Dashboard />
      </VerticalLayout>
    </>
  )
}

export default IconView
