import LogoBox from '@/components/LogoBox'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import SimplebarReactClient from '@/components/wrappers/SimplebarReactClient'
import Image from 'next/image'
import React, { Suspense } from 'react'
import avatar1 from '@/assets/images/users/avatar-1.jpg'
import { Dropdown, DropdownHeader, DropdownItem, DropdownMenu, DropdownToggle } from 'react-bootstrap'
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
      <LogoBox />
      <HoverMenuToggle />
      <button className="button-close-fullsidebar" onClick={toggleBackdrop}>
        <IconifyIcon icon="ri:close-line" className="align-middle" />
      </button>
      <SimplebarReactClient data-simplebar>
        <div className="sidenav-user">
          <Dropdown className="dropdown-center">
            <DropdownToggle
              as={'a'}
              className="topbar-link text-reset drop-arrow-none px-2 d-flex align-items-center justify-content-center"
              data-bs-toggle="dropdown"
              data-bs-offset="0,19"
              type="button"
              aria-haspopup="false"
              aria-expanded="false">
              <Image src={avatar1} width={42} className="rounded-circle me-2 d-flex" alt="user-image" />
              <span className="d-flex flex-column gap-1 sidebar-user-name">
                <h4 className="my-0 fw-bold fs-15">Maxine Kennedy</h4>
                <h6 className="my-0">Admin Head</h6>
              </span>
              <span>
                <IconifyIcon icon="ri:arrow-down-s-line" className="d-block  align-middle ms-2" />
              </span>
            </DropdownToggle>
            <DropdownMenu className="dropdown-menu-end">
              <DropdownHeader className="noti-title">
                <h6 className="text-overflow m-0">Welcome !</h6>
              </DropdownHeader>
              <DropdownItem>
                <IconifyIcon icon="ri:account-circle-line" className="me-1 fs-16 align-middle" />
                <span className="align-middle">My Account</span>
              </DropdownItem>
              <DropdownItem>
                <IconifyIcon icon="ri:wallet-3-line" className="me-1 fs-16 align-middle" />
                <span className="align-middle">
                  Wallet : <span className="fw-semibold">$89.25k</span>
                </span>
              </DropdownItem>
              <DropdownItem>
                <IconifyIcon icon="ri:settings-2-line" className="me-1 fs-16 align-middle" />
                <span className="align-middle">Settings</span>
              </DropdownItem>
              <DropdownItem>
                <IconifyIcon icon="ri:question-line" className="me-1 fs-16 align-middle" />
                <span className="align-middle">Support</span>
              </DropdownItem>
              <div className="dropdown-divider" />
              <DropdownItem>
                <IconifyIcon icon="ri:lock-line" className="me-1 fs-16 align-middle" />
                <span className="align-middle">Lock Screen</span>
              </DropdownItem>
              <DropdownItem className="active fw-semibold text-danger">
                <IconifyIcon icon="ri:logout-box-line" className="me-1 fs-16 align-middle" />
                <span className="align-middle">Sign Out</span>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
        <Suspense fallback={<FallbackLoading />}>
          <AppMenu menuItems={menuItems} />
        </Suspense>
        <div className="help-box text-center">
          <h5 className="fw-semibold fs-16">Unlimited Access</h5>
          <p className="mb-3 opacity-75">Upgrade to plan to get access to unlimited reports</p>
          <a href="" className="btn btn-danger btn-sm">
            Upgrade
          </a>
        </div>
        <div className="clearfix" />
      </SimplebarReactClient>
    </div>
  )
}

export default LeftSideBar
