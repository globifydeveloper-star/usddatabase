import IconifyIcon from '@/components/wrappers/IconifyIcon'
import React from 'react'
import logoDark from '@/assets/images/logo-dark.png'
import logo from '@/assets/images/logo.png'
import Image from 'next/image'
import ConfirmMailForm from './Components/ConfirmMailForm'
import { Button, Card, Col, Row } from 'react-bootstrap'
import Link from 'next/link'
import { Metadata } from 'next'
import { currentYear, developedBy } from '@/context/constants'

export const metadata: Metadata = { title: 'Confirm Mail' }

const ConfirmMailPage = () => {
  return (
    <div className="auth-bg d-flex min-vh-100 justify-content-center align-items-center">
      <Row className="g-0 justify-content-center w-100 m-xxl-5 px-xxl-4 m-3">
        <Col xl={4} lg={5} md={6}>
          <Card className="overflow-hidden text-center h-100 p-xxl-4 p-3 mb-0">
            <a href="/" className="auth-brand mb-4">
              <Image src={logoDark} alt="dark logo" height={26} className="logo-dark" />
              <Image src={logo} alt="logo light" height={26} className="logo-light" />
            </a>
            <h4 className="fw-semibold mb-2 fs-20">Verify Your Account</h4>
            <p className="text-muted mb-4">Please enter the 6-digit code sent to abc@xyz.com to proceed </p>
            <ConfirmMailForm />
            <p className="text-muted fs-14 mb-4">
              Back To{' '}
              <a href="/" className="fw-semibold text-danger ms-1">
                Home!
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

export default ConfirmMailPage
