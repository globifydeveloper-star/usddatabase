'use client'
import dynamic from 'next/dynamic'
import { ToastContainer } from 'react-toastify'
import { ChildrenType } from '../../types/component-props'
import SessionGuard from '@/components/SessionGuard'

const LayoutProvider = dynamic(() => import('@/context/useLayoutContext').then((mod) => mod.LayoutProvider), {
  ssr: false,
})

const AppProvidersWrapper = ({ children }: ChildrenType) => {

  return (

    <LayoutProvider>
      <SessionGuard />
      {children}
      <ToastContainer theme="colored" />
    </LayoutProvider>
  )
}
export default AppProvidersWrapper
