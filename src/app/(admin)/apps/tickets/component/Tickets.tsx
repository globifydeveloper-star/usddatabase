'use client'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import Image from 'next/image'
import { Card, CardBody, Col, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Pagination, Row, Table } from 'react-bootstrap'
import { stateData, ticketData } from '../data'

const Tickets = () => {
  return (
    <Row>
      <Col xs={12}>
        <Card>
          <div className="d-flex card-header justify-content-between align-items-center">
            <div>
              <h4 className="header-title">Manage Tickets</h4>
            </div>
            <div className="d-flex flex-wrap gap-1">
              <button type="button" className="btn btn-light btn-sm">
                All
              </button>
              <button type="button" className="btn btn-light active btn-sm">
                1M
              </button>
              <button type="button" className="btn btn-light btn-sm">
                6M
              </button>
              <button type="button" className="btn btn-light btn-sm">
                1Y
              </button>
            </div>
          </div>
          <CardBody className="pt-0">
            <div>
              <Row>
                {stateData.map((item, idx) => (
                  <Col sm={6} xl={3} key={idx}>
                    <Card className={`text-bg-${item.color}`}>
                      <CardBody className="d-flex align-items-center gap-2">
                        <IconifyIcon icon="solar:ticket-sale-bold-duotone" className="display-5" />
                        <div>
                          <h3 className="text-white fw-bold">{item.count}</h3>
                          <p className="text-uppercase fs-13 fw-semibold mb-0">{item.label}</p>
                        </div>
                      </CardBody>
                    </Card>
                  </Col>
                ))}
              </Row>
            </div>
            <Table className="table-hover m-0 table-centered dt-responsive nowrap w-100" id="tickets-table">
              <thead className="bg-light bg-opacity-25">
                <tr>
                  <th>
                    ID
                  </th>
                  <th>Requested By</th>
                  <th>Subject</th>
                  <th>Assignee</th>
                  <th>Priority</th>
                  <th>Status</th>
                  <th>Created Date</th>
                  <th>Due Date</th>
                  <th className="hidden-sm">Action</th>
                </tr>
              </thead>
              <tbody>
                {
                  ticketData.map((item, idx) => (
                    <tr key={idx}>
                      <td><b>#125{idx + 1}</b></td>
                      <td>
                        <a href="" className="text-reset">
                          <Image src={item.avatar} alt="contact-img" title="contact-img" className="rounded-circle avatar-sm" />
                          <span className="ms-1">{item.name}</span>
                        </a>
                      </td>
                      <td> {item.Subject} </td>
                      <td>
                        <a href="" className="text-reset">
                          <Image src={item.Assignee.avatar} alt="contact-img" title="contact-img" className="rounded-circle avatar-sm" />
                          <span className="ms-1">{item.Assignee.name}</span>
                        </a>
                      </td>
                      <td> <span className={`badge bg-${item.priority == 'Medium' ? 'warning' : item.priority == 'High' ? 'primary' : 'secondary'}-subtle  text-${item.priority == 'Medium' ? 'warning' : item.priority == 'High' ? 'primary' : 'secondary'}`}>{item.priority}</span> </td>
                      <td> <span className={`badge bg-${item.status == 'In Progress' ? 'warning' : item.status == 'Open' ? 'success' : item.status == 'Pending' ? 'danger' : 'success'}`}>{item.status}</span> </td>
                      <td> {item.createdDate} </td>
                      <td> {item.dueDate} </td>
                      <td style={{ width: 30 }}>
                        <Dropdown>
                          <DropdownToggle as={'a'} className="text-muted drop-arrow-none card-drop p-0" data-bs-toggle="dropdown" aria-expanded="false">
                            <IconifyIcon icon="ri:more-2-fill" />
                          </DropdownToggle>
                          <DropdownMenu className="dropdown-menu-end">
                            <DropdownItem>Edit
                              Ticket</DropdownItem>
                            <DropdownItem>Close</DropdownItem>
                            <DropdownItem>Remove</DropdownItem>
                            <DropdownItem>Mark as
                              Unread</DropdownItem>
                          </DropdownMenu>
                        </Dropdown>
                      </td>
                    </tr>

                  ))
                }
              </tbody>
            </Table>
            <Row className='mt-2 d-flex align-items-center'> 
              <Col>
                <span>Showing 1 to 10 of 12 entries</span>
              </Col>
              <Col>
                <Pagination className="pagination-rounded justify-content-end">
                  <Pagination.Item>
                    <span aria-hidden="true">«</span>
                    <span className="visually-hidden">Previous</span>
                  </Pagination.Item>
                  <Pagination.Item className=" active">
                    1
                  </Pagination.Item>
                  <Pagination.Item>
                    2
                  </Pagination.Item>
                  <Pagination.Item>
                    <span aria-hidden="true">»</span>
                    <span className="visually-hidden">Next</span>
                  </Pagination.Item>
                </Pagination>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </Col>
    </Row>
  )
}

export default Tickets
