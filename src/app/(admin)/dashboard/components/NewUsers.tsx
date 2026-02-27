'use client'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import React from 'react'
import { Card, CardBody, CardFooter, CardHeader, Col, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Pagination, Row, Table } from 'react-bootstrap'
import { userData } from '../data'
import Image from 'next/image'

const NewUsers = () => {
  return (
    <Card className="card-h-100">
      <CardHeader className="d-flex flex-wrap align-items-center gap-2">
        <h4 className="header-title me-auto">Recent New Users</h4>
        <div className="d-flex gap-2 justify-content-end text-end">
          <a href="" className="btn btn-sm btn-light">
            Import <IconifyIcon icon="ri:download-line" className="ms-1" />
          </a>
          <a href="" className="btn btn-sm btn-primary">
            Export <IconifyIcon icon="ri:export-line" className="ms-1" />
          </a>
        </div>
      </CardHeader>
      <CardBody className="p-0">
        <div className="bg-light bg-opacity-50 py-1 text-center">
          <p className="m-0">
            <b>895k</b> Active users out of <span className="fw-medium">965k</span>
          </p>
        </div>
        <div className="table-responsive">
          <Table className="table-custom table-centered table-sm table-nowrap table-hover mb-0">
            <tbody>
              {userData.map((item, idx) => (
                <tr key={idx}>
                  <td>
                    <div className="d-flex align-items-center">
                      <div className="avatar-md flex-shrink-0 me-2">
                        <span className="avatar-title bg-primary-subtle rounded-circle">
                          <Image src={item.avatar} alt="avatar" height={26} className="rounded-circle" />
                        </span>
                      </div>
                      <div>
                        <span className="text-muted fs-12">Name</span> <br />
                        <h5 className="fs-14 mt-1">{item.name}</h5>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="text-muted fs-12">Role</span> <br />
                    <h5 className="fs-14 mt-1 fw-normal">{item.role}</h5>
                  </td>
                  <td>
                    <span className="text-muted fs-12">Status</span>
                    <h5 className="fs-14 mt-1 fw-normal">
                      <IconifyIcon icon="ri:circle-fill" className={`fs-12 ${item.status_color}`} /> Active
                    </h5>
                  </td>
                  <td style={{ width: 30 }}>
                    <Dropdown>
                      <DropdownToggle as={'a'} className="text-muted drop-arrow-none card-drop p-0" data-bs-toggle="dropdown" aria-expanded="false">
                        <IconifyIcon icon="ri:more-2-fill" />
                      </DropdownToggle>
                      <DropdownMenu className="dropdown-menu-end">
                        <DropdownItem>View Profile</DropdownItem>
                        <DropdownItem>Deactivate</DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </CardBody>
      <CardFooter>
        <Row className="align-items-center justify-content-between text-center text-sm-start">
          <Col sm>
            <div className="text-muted">
              Showing <span className="fw-semibold">5</span> of <span className="fw-semibold">2596</span> Users
            </div>
          </Col>
          <Col sm={'auto'} className=" mt-3 mt-sm-0">
            <Pagination className="pagination-boxed pagination-sm mb-0 justify-content-center">
              <Pagination.Item className=" disabled">
                  <IconifyIcon icon="ri:arrow-left-s-line" />
              </Pagination.Item>
              <Pagination.Item className=" active">
                  1
              </Pagination.Item>
              <Pagination.Item className="">
                  2
              </Pagination.Item>
              <Pagination.Item className="">
                  <IconifyIcon icon="ri:arrow-right-s-line" />
              </Pagination.Item>
            </Pagination>
          </Col>
        </Row>
      </CardFooter>
    </Card>
  )
}

export default NewUsers
