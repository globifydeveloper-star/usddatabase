'use client'
import dynamic from 'next/dynamic'
import { ToastContainer } from 'react-toastify'
import { ChildrenType } from '../../types/component-props'

const LayoutProvider = dynamic(() => import('@/context/useLayoutContext').then((mod) => mod.LayoutProvider), {
  ssr: false,
})

const AppProvidersWrapper = ({ children }: ChildrenType) => {

  return (

    <LayoutProvider>
      {children}    
      <ToastContainer theme="colored" />
    </LayoutProvider>
  )
}
export default AppProvidersWrapper
