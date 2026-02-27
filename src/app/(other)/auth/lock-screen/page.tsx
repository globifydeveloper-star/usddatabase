import IconifyIcon from '@/components/wrappers/IconifyIcon'
import LockScreenForm from './components/LockScreenForm'
import logoDark from '@/assets/images/logo-dark.png'
import logo from '@/assets/images/logo.png'
import Image from 'next/image'
import avatar1 from '@/assets/images/users/avatar-1.jpg'
import { Button, Card, Col, Row } from 'react-bootstrap'
import Link from 'next/link'
import { Metadata } from 'next'
import { currentYear, developedBy } from '@/context/constants'

export const metadata: Metadata = { title: 'Lock Screen' }

const LockScreenPage = () => {
  return (
    <div className="auth-bg d-flex min-vh-100 justify-content-center align-items-center">
      <Row className="g-0 justify-content-center w-100 m-xxl-5 px-xxl-4 m-3">
        <Col xl={4} lg={5} md={6}>
          <Card className="overflow-hidden text-center h-100 p-xxl-4 p-4 mb-0">
            <a href="/" className="auth-brand mb-4">
              <Image src={logoDark} alt="dark logo" height={26} className="logo-dark" />
              <Image src={logo} alt="logo light" height={26} className="logo-light" />
            </a>
            <div className="text-center">
              <Image src={avatar1} alt="avatar1" className="avatar-xl rounded-circle img-thumbnail" />
              <div className="mt-2 mb-3">
                <h4 className="fw-semibold text-dark">Hi ! Dhanoo K.</h4>
                <p className="mb-0 fst-italic">Please input your password to access the screen. </p>
              </div>
            </div>
            <LockScreenForm />
            <p className="text-muted fs-14 mb-4">
              Back To{' '}
              <a href="/auth/login" className="fw-semibold text-danger ms-1">
                Login !
              </a>
            </p>
            <p className="mt-auto mb-0">
              {currentYear} © Highdmin - By <span className="fw-bold text-decoration-underline text-uppercase text-reset fs-12">Coderthemes</span>
            </p>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default LockScreenPage
