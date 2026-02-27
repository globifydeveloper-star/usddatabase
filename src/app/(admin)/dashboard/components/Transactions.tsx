'use client'
import React from 'react'
import { transactionsData } from '../data'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import { Card, CardBody, CardFooter, CardHeader, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Pagination, Row, Table } from 'react-bootstrap'

const Transactions = () => {
  return (
    <Card>
      <CardHeader className="d-flex justify-content-between align-items-center">
        <h4 className="header-title">Transactions</h4>
        <a href="" className="btn btn-sm btn-light">
          Add New <IconifyIcon icon="ri:add-line" className="ms-1" />
        </a>
      </CardHeader>
      <CardBody className="p-0">
        <div className="bg-light bg-opacity-50 py-1 text-center">
          <p className="m-0">
            <b>69</b> Active brands out of <span className="fw-medium">102</span>
          </p>
        </div>
        <div className="table-responsive">
          <Table className="table-custom table-centered table-sm table-nowrap table-hover mb-0">
            <tbody>
              {transactionsData.map((item, idx) => (
                <tr key={idx}>
                  <td>
                    <span className="text-muted fs-12">Transaction ID</span> <br />
                    <h5 className="fs-14 mt-1">{item.transactionId}</h5>
                  </td>
                  <td>
                    <span className="text-muted fs-12">Date</span> <br />
                    <h5 className="fs-14 mt-1 fw-normal">{item.date}</h5>
                  </td>
                  <td>
                    <span className="text-muted fs-12">Amount</span> <br />
                    <h5 className="fs-14 mt-1 fw-normal">${item.amount}</h5>
                  </td>
                  <td>
                    <span className="text-muted fs-12">Status</span> <br />
                    <h5 className="fs-14 mt-1 fw-normal">
                      <IconifyIcon
                        icon="ri:circle-fill"
                        className={`fs-12  text-${item.status == 'Failed' ? 'danger' : item.status == 'Pending' ? 'warning' : 'success'} `}
                      />{' '}
                      {item.status}
                    </h5>
                  </td>
                  <td style={{ width: 30 }}>
                    <Dropdown>
                      <DropdownToggle
                        as={'a'}
                        className="dropdown-toggle text-muted drop-arrow-none card-drop p-0"
                        data-bs-toggle="dropdown"
                        aria-expanded="false">
                        <IconifyIcon icon="ri:more-2-fill" />
                      </DropdownToggle>
                      <DropdownMenu className="dropdown-menu-end">
                        <DropdownItem>View Details</DropdownItem>
                        <DropdownItem>Refund</DropdownItem>
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
          <div className="col-sm">
            <div className="text-muted">
              Showing <span className="fw-semibold">5</span> of <span className="fw-semibold">95.6k</span> Transactions
            </div>
          </div>
          <div className="col-sm-auto mt-3 mt-sm-0">
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
                3
              </Pagination.Item>
              <Pagination.Item className="">
                <IconifyIcon icon="ri:arrow-right-s-line" />
              </Pagination.Item>
            </Pagination>
          </div>
        </Row>
      </CardFooter>
    </Card>
  )
}

export default Transactions
