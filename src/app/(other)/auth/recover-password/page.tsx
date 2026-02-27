import logoDark from '@/assets/images/logo-dark.png'
import logo from '@/assets/images/logo.png'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import Image from 'next/image'
import RecoverPassForm from './components/RecoverPassForm'
import { Button, Card, Col, Row } from 'react-bootstrap'
import Link from 'next/link'
import { Metadata } from 'next'
import { currentYear, developedBy } from '@/context/constants'

export const metadata: Metadata = { title: 'Reset Password' }

const RecoverPasswordPage = () => {
  return (
    <>
      <div className="auth-bg d-flex min-vh-100 justify-content-center align-items-center">
        <Row className="g-0 justify-content-center w-100 m-xxl-5 px-xxl-4 m-3">
          <Col xl={4} lg={5} md={6}>
            <Card className="overflow-hidden text-center h-100 p-xxl-4 p-3 mb-0">
              <a href="/" className="auth-brand mb-4">
                <Image src={logoDark} alt="dark logo" height={26} className="logo-dark" />
                <Image src={logo} alt="logo light" height={26} className="logo-light" />
              </a>
              <h4 className="fw-semibold mb-2 fs-18">Reset Your Password</h4>
              <p className="text-muted mb-4">Please enter your email address to request a password reset.</p>
              <RecoverPassForm />
              <p className="text-muted fs-14 mb-4">
                Back To{' '}
                <Link href="/auth/login" className="fw-semibold text-danger ms-1">
                  Login !
                </Link>
              </p>
              <p className="mt-auto mb-0">
                {currentYear} © Highdmin - By <span className="fw-bold text-decoration-underline text-uppercase text-reset fs-12">Coderthemes</span>
              </p>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  )
}

export default RecoverPasswordPage
