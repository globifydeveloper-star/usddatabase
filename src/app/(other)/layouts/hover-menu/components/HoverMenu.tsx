'use client'
import Dashboard from '@/app/(admin)/dashboard/page'
import VerticalLayout from '@/components/layouts/VerticalLayout'
import { useLayoutContext } from '@/context/useLayoutContext'
import { useEffect } from 'react'

const HoverMenu = () => {
  const { changeMenu } = useLayoutContext()
  useEffect(() => {
    changeMenu.size('sm-hover')
  }, [])
  return (
    <>
      <VerticalLayout>
        <Dashboard />
      </VerticalLayout>
    </>
  )
}

export default HoverMenu
