'use client'
import Dashboard from '@/app/(admin)/dashboard/page'
import VerticalLayout from '@/components/layouts/VerticalLayout'
import { useLayoutContext } from '@/context/useLayoutContext'
import React, { useEffect } from 'react'

const Detached = () => {
  const { changeLayoutMode } = useLayoutContext()
  useEffect(() => {
    changeLayoutMode('detached')
  }, [])
  return (
    <VerticalLayout>
      <Dashboard />
    </VerticalLayout>
  )
}

export default Detached
