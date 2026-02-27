'use client'
import Dashboard from '@/app/(admin)/dashboard/page'
import VerticalLayout from '@/components/layouts/VerticalLayout'
import { useLayoutContext } from '@/context/useLayoutContext'
import React, { useEffect } from 'react'

const DarkMode = () => {
  const { changeTheme } = useLayoutContext()
  useEffect(() => {
    changeTheme('dark')
  }, [])
  return (
    <VerticalLayout>
      <Dashboard />
    </VerticalLayout>
  )
}

export default DarkMode
