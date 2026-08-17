import IconifyIcon from '@/components/wrappers/IconifyIcon'
import SimplebarReactClient from '@/components/wrappers/SimplebarReactClient'
import React, { Suspense } from 'react'
import AppMenu from './components/AppMenu'
import FallbackLoading from '@/components/FallbackLoading'
import { getMenuItems } from '@/helpers/Menu'
import HoverMenuToggle from './components/HoverMenuToggle'
import { useLayoutContext } from '@/context/useLayoutContext'

const LeftSideBar = () => {
  const { toggleBackdrop } = useLayoutContext()
  const menuItems = getMenuItems()
  return (
    <div className="sidenav-menu">
      <HoverMenuToggle />
      <button className="button-close-fullsidebar" onClick={toggleBackdrop}>
        <IconifyIcon icon="ri:close-line" className="align-middle" />
      </button>
      <SimplebarReactClient data-simplebar>
        <Suspense fallback={<FallbackLoading />}>
          <AppMenu menuItems={menuItems} />
        </Suspense>

        <div className="clearfix" />
      </SimplebarReactClient>
    </div>
  )
}

export default LeftSideBar
