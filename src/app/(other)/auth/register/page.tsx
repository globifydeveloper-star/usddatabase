import logoDark from '@/assets/images/logo-dark.png'
import logo from '@/assets/images/logo.png'
import { Metadata } from 'next'
import Image from 'next/image'
import RegisterForm from './components/RegisterForm'
import { currentYear } from '@/context/constants'
import { Card, Col, Row } from 'react-bootstrap'
import Link from 'next/link'

export const metadata: Metadata = { title: 'Sign Up' }

const RegisterPage = () => {
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
              <h4 className="fw-semibold mb-2 fs-18">Welcome to Highdmin Admin</h4>
              <p className="text-muted mb-4">Enter your name , email address and password to access account.</p>
              <RegisterForm />
              <p className="text-nuted fs-14 mb-4">
                Already have an account?{' '}
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

export default RegisterPage
