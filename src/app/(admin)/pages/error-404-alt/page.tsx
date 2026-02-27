import { Metadata } from 'next'
import Image from 'next/image'
import React from 'react'
import Error404Img from '@/assets/images/error/error-404.png'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import { Col, Row } from 'react-bootstrap'

export const metadata: Metadata = { title: 'Error 404', other: { subTitle: 'Pages' } }

const Error404AltPage = () => {
  return (
    <Row className="justify-content-center">
      <Col lg={4}>
        <div className="text-center">
          <Image src={Error404Img} height={230} alt="File not found Image" className='img-fluid' />
          <h4 className="text-uppercase text-danger mt-3">Page Not Found</h4>
          <p className="text-muted mt-3">
            It's looking like you may have taken a wrong turn. Don't worry... it happens to the best of us. Here's a little tip that might help you
            get back on track.
          </p>
          <a className="btn btn-info mt-3" href="/">
            <IconifyIcon icon="ri:home-2-line" className="me-1" /> Return Home
          </a>
        </div>
      </Col>
    </Row>
  )
}

export default Error404AltPage
