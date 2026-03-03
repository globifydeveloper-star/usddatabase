import React, { Suspense, useEffect } from 'react'
import TopBar from './Topbar'
import FallbackLoading from '../FallbackLoading'
import HorizontalNavBar from './HorizontalNav/page'
import Footer from './Footer'
import { ChildrenType } from '@/types/component-props'
import { getHorizontalMenuItems } from '@/helpers/Menu'
import { useLayoutContext } from '@/context/useLayoutContext'
import { toggleDocumentAttribute } from '@/utils/layout'

const HorizontalLayout = ({ children }: ChildrenType) => {
  const menuItems = getHorizontalMenuItems()
  const {layoutOrientation} = useLayoutContext()

  useEffect(() => {
    toggleDocumentAttribute('data-layout', layoutOrientation === 'vertical' ? '' : 'topnav')

    return () => {
      toggleDocumentAttribute('data-layout', layoutOrientation === 'vertical' ? '' : 'topnav' , true)
    }
  })

  return (
    <div className="wrapper">
      <div/>
      <Suspense>
        <TopBar />
      </Suspense>
      <Suspense fallback={<FallbackLoading />}>
        <HorizontalNavBar menuItems={menuItems} />
      </Suspense>
      <div className="page-content">
        <div className="page-container">{children}</div>
        {/* <Footer /> */}
      </div>
    </div>
  )
}

export default HorizontalLayout
