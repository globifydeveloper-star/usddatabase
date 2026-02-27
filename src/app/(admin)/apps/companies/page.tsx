
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import React from 'react'
import { companiesData, CompaniesType } from './data'
import Image from 'next/image'
import { Metadata } from 'next'
import { Card, CardBody, Col, Pagination, Row } from 'react-bootstrap'
import CustomPagination from './component/CustomPagination'

export const metadata: Metadata = { title: 'Companies', other: { subTitle: 'Apps' } }

const CompaniesCard = ({ employees, location, logo, name, revenue }: CompaniesType) => {
  return (
    <Card>
      <CardBody className="text-center">
        <div className="mb-3">
          <Image src={logo} alt="Logo" className="avatar-xl rounded-circle shadow-lg mb-3" />
          <h4 className="mb-1 fs-22 font-weight-bold text-dark">{name}</h4>
          <p className="text-muted fs-16">{location}</p>
        </div>
        <div className="d-flex justify-content-center mb-4">
          <a href="" className="btn btn-outline-primary btn-sm">
            View More Info
          </a>
        </div>
        <Row className="justify-content-center">
          <Col xs={6}>
            <h6 className="text-muted mb-1">Revenue (USD)</h6>
            <h5 className="fw-semibold text-dark">{revenue}</h5>
          </Col>
          <Col xs={6}>
            <h6 className="text-muted mb-1">Employees</h6>
            <h5 className="fw-semibold text-dark">{employees}</h5>
          </Col>
        </Row>
      </CardBody>
    </Card>
  )
}

const CompaniesPage = () => {
  return (
    <>
      <Row>
        <Col lg={12}>
          <Card>
            <CardBody>
              <form>
                <Row>
                  <Col lg={6}>
                    <Row>
                      <Col lg={4}>
                        <div className="app-search">
                          <input type="text" className="form-control" placeholder="Search something here..." />
                          <IconifyIcon icon="ri:search-line" className="app-search-icon  text-muted" />
                        </div>
                      </Col>
                      <Col lg={4}>
                        <div className="flex-grow-1 d-flex align-items-center">
                          <label htmlFor="status-select" className="me-2">
                            Sort By
                          </label>
                          <div className="flex-grow-1 me-sm-3">
                            <select className="form-select my-1 my-md-0">
                              <option>Select</option>
                              <option value="Date">Date</option>
                              <option value="Name">Name</option>
                              <option value="Revenue">Revenue</option>
                              <option value="Employees">Employees</option>
                              <option value="Products">Products</option>
                            </select>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </Col>
                  <Col lg={6}>
                    <div className="text-md-end mt-3 mt-md-0">
                      <button type="button" className="btn btn-success">
                        <IconifyIcon icon="ri:settings-3-line" className="me-1" />
                        More Setting
                      </button>
                      &nbsp;
                      <button type="button" className="btn btn-dark">
                        <IconifyIcon icon="ri:filter-line" className="me-1" /> Filters
                      </button>
                      &nbsp;
                      <button type="button" className="btn btn-danger btn-icon">
                        <IconifyIcon icon="ri:add-line" />
                      </button>
                      &nbsp;
                    </div>
                  </Col>
                </Row>
              </form>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Row>
        {companiesData.map((item, idx) => (
          <Col lg={3} md={6} key={idx}>
            <CompaniesCard {...item} />
          </Col>
        ))}
      </Row>
      <Row>
        <Col xs={12}>
          <div className="text-end">
            <CustomPagination />
          </div>
        </Col>
      </Row>
    </>
  )
}

export default CompaniesPage
