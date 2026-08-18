import React, { Suspense } from 'react'
import LeftSideBar from './LeftsideBar'
import FallbackLoading from '../FallbackLoading'
import TopBar from './Topbar'
import { ChildrenType } from '@/types/component-props'

const VerticalLayout = ({ children }: ChildrenType) => {
  return (
    <div className="wrapper" id="leftside-menu-container">
      <Suspense>
        <LeftSideBar />
      </Suspense>
      <div/>
      <Suspense fallback={<FallbackLoading />}>
        <TopBar />
      </Suspense>
      <div className="page-content">
        <div className="page-container">{children}</div>
      </div>
    </div>
  )
}

export default VerticalLayout
