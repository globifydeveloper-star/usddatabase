'use client'
import Dashboard from '@/app/(admin)/dashboard/page'
import VerticalLayout from '@/components/layouts/VerticalLayout'
import { useLayoutContext } from '@/context/useLayoutContext'
import { useEffect } from 'react'

const FullScreenView = () => {
  const { changeMenu } = useLayoutContext()
  useEffect(() => {
    changeMenu.size('fullscreen')
  }, [])
  return (
    <>
      <VerticalLayout>
        <Dashboard />
      </VerticalLayout>
    </>
  )
}

export default FullScreenView
