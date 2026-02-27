import error500Img from '@/assets/images/error/error-500.png'
import logoDark from '@/assets/images/logo-dark.png'
import logo from '@/assets/images/logo.png'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Card, Col, Row } from 'react-bootstrap'
import { currentYear, developedBy } from '@/context/constants'

export const metadata: Metadata = { title: 'Error 500' }

const Error500Page = () => {
  return (
    <div className="auth-bg d-flex min-vh-100 justify-content-center align-items-center">
      <Row className="g-0 justify-content-center w-100 m-xxl-5 px-xxl-4 m-3">
        <Col xl={4} lg={5} md={6}>
          <Card className="overflow-hidden text-center h-100 p-xxl-4 p-3 mb-0">
            <Link href="/" className="auth-brand mb-4">
              <Image src={logoDark} alt="dark logo" height={26} className="logo-dark" />
              <Image src={logo} alt="logo light" height={26} className="logo-light" />
            </Link>
            <div className="mx-auto text-center">
              <Image src={error500Img} alt="error 500 img" height={230} className="my-3" />
              <h3 className="fw-bold mt-3 text-primary lh-base">Server Error</h3>
              <h4 className="fw-medium mt-2 text-dark lh-base">Ohh Noo ! Seem like our servers are lost</h4>
              <p className="text-muted mb-3">
                Our internal server has gone on a uninformed vacation. And, we are trying our best to bring it back online.
              </p>
              <Link href="/" className="btn btn-primary">
                Back to Home <IconifyIcon icon="ri:home-2-line" className="ms-1" />
              </Link>
            </div>
            <p className="mt-3 mb-0">
              {currentYear} © Highdmin - By <span className="fw-bold text-decoration-underline text-uppercase text-reset fs-12">Coderthemes</span>
            </p>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default Error500Page
