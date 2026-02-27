import Image from 'next/image'
import React from 'react'
import logo from '@/assets/images/logo.png'
import logoSm from '@/assets/images/logo-sm.png'
import logoDark from '@/assets/images/logo-dark.png'

const LogoBox = () => {
  return (
    <a href="/" className="logo">
      <span className="logo-light">
        <span className="logo-lg">
          <Image src={logo} width={113} height={26} alt="logo" />
        </span>
        <span className="logo-sm">
          <Image src={logoSm} width={16} height={28} alt="small logo" />
        </span>
      </span>
      <span className="logo-dark">
        <span className="logo-lg">
          <Image src={logoDark} width={113} height={26} alt="dark logo" />
        </span>
        <span className="logo-sm">
          <Image src={logoSm} width={16} height={28} alt="small logo" />
        </span>
      </span>
    </a>
  )
}

export default LogoBox
