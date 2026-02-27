import { currentYear } from '@/context/constants'
import React from 'react'
import { Col, Row } from 'react-bootstrap'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="page-container">
        <Row>
          <Col md={6} className="text-center text-md-start">
           {currentYear} © Highdmin - By <span className="fw-bold text-decoration-underline text-uppercase text-reset fs-12">Coderthemes</span>
          </Col>
          <Col md={6}>
            <div className="text-md-end footer-links d-none d-md-block">
              <a href="">About</a>
              <a href="">Support</a>
              <a href="">Contact Us</a>
            </div>
          </Col>
        </Row>
      </div>
    </footer>
  )
}

export default Footer
