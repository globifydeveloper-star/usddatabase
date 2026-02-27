import IconifyIcon from '@/components/wrappers/IconifyIcon'
import { useLayoutContext } from '@/context/useLayoutContext'

const ThemeModeToggle = () => {
  const { theme, changeTheme } = useLayoutContext()
  const isDark = theme === 'dark'
  return (
    <div className="topbar-item d-none d-sm-flex">
      <button onClick={() => changeTheme(isDark ? 'light' : 'dark')} className="topbar-link" id="light-dark-mode" type="button">
        {isDark ? <IconifyIcon icon="ri:sun-line" className="fs-22" /> : <IconifyIcon icon="ri:moon-line" className="fs-22" />}
      </button>
    </div>
  )
}

export default ThemeModeToggle
