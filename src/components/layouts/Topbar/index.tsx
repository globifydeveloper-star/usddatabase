import React, { useEffect, useState } from 'react'
import SearchBox from './components/SearchBox'
import ThemeCustomizeToggle from './components/ThemeCustomizeToggle'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import ThemeModeToggle from './components/ThemeModeToggle'
import ProfileDropdown from './components/ProfileDropdown'
import LeftSideBarToggle from './components/LeftSideBarToggle'
import ActiveUsersPanel from './components/ActiveUsersPanel'
import { usePathname } from 'next/navigation'

const TopBar = () => {
  const pathname = usePathname()

  const [title, setTitle] = useState<string>('Welcome')
  const [subTitle, setSubTitle] = useState<string | null>(null)

  useEffect(() => {
    setTitle(document.title.split('|')[0])
    let metaTag = document.querySelector("meta[name='subTitle']")
    let content = metaTag ? metaTag.getAttribute('content') : null
    setSubTitle(content)
  }, [pathname])
  return (
    <header className="app-topbar">
      <div className="page-container topbar-menu">
        <div className="d-flex align-items-center gap-2">
          <LeftSideBarToggle />
          <div className="topbar-item d-none d-md-flex">
            <div>
              <h4 className="page-title fs-18 fw-bold mb-0">{title}</h4>
              {subTitle && (
                <ol className="breadcrumb m-0 mt-1 py-0">
                  <li className="breadcrumb-item">
                    <a href="">US Degrees</a>
                  </li>
                  &nbsp;
                  <IconifyIcon icon="ri:arrow-right-s-line" width={14} height={14} />
                  &nbsp;
                  <li className="breadcrumb-item active">{subTitle}</li>
                </ol>
              )}
            </div>
          </div>
        </div>
        <div className="d-flex align-items-center gap-2">
          <SearchBox />
          <ThemeCustomizeToggle />
          <ThemeModeToggle />
          <ActiveUsersPanel />
          <ProfileDropdown />
        </div>
      </div>
    </header>
  )
}

export default TopBar
