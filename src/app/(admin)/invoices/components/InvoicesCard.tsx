'use client'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import { getAllInvoices } from '@/helpers/data'
import { useFetchData } from '@/hooks/useFetchData'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Card, CardFooter, CardHeader, Pagination, Table } from 'react-bootstrap'

const InvoicesCard = () => {
  const invoiceData = useFetchData(getAllInvoices)
  return (
    <Card>
      <CardHeader className="border-bottom justify-content-between d-flex flex-wrap align-items-center gap-2">
        <div className="flex-grow-1">
          <h4 className="header-title">Invoices</h4>
        </div>
        <div className="flex-shrink-0 d-flex align-items-center gap-2">
          <div className="position-relative">
            <input type="text" className="form-control ps-4" placeholder="Search Here..." />
            <IconifyIcon icon="ri:search-line" className="position-absolute top-50 translate-middle-y start-0 ms-2" />
          </div>
        </div>

        <a href="/invoices/create-invoice" className="btn btn-primary">
          <IconifyIcon icon="tabler:plus" className="me-1" />
          Add Invoice
        </a>
      </CardHeader>
      <div className="table-responsive">
        <Table className="table-hover text-nowrap mb-0">
          <thead className="bg-light-subtle">
            <tr>
              <th className="ps-3 py-1" style={{ width: 50 }}>
                <input type="checkbox" className="form-check-input" id="customCheck1" />
              </th>
              <th className="fs-12 text-uppercase text-muted py-1">Invoice ID</th>
              <th className="fs-12 text-uppercase text-muted py-1">Category </th>
              <th className="fs-12 text-uppercase text-muted py-1">Created On</th>
              <th className="fs-12 text-uppercase text-muted py-1">Invoice To</th>
              <th className="fs-12 text-uppercase text-muted py-1">Amount</th>
              <th className="fs-12 text-uppercase text-muted py-1">Due Date</th>
              <th className="fs-12 text-uppercase text-muted py-1">Status</th>
              <th className="text-center  py-1 fs-12 text-uppercase text-muted" style={{ width: 120 }}>
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {invoiceData?.map((item, idx) => (
              <tr key={idx}>
                <td className="ps-3">
                  <input type="checkbox" className="form-check-input" id="customCheck2" />
                </td>
                <td>
                  <span className="fw-semibold">
                    <Link href="/invoices/view-invoice" className="text-reset">
                      #WA-202{idx + 1}
                    </Link>
                  </span>
                </td>
                <td>{item.products?.category}</td>
                <td>
                  <span className="text-muted">
                    {item.products?.date.toLocaleString('en-us', { day: '2-digit', month: 'short', year: 'numeric' })}
                  </span>
                </td>
                <td>
                  <div className="d-flex align-items-center gap-2">
                    <div className="avatar-sm">
                      {item.users?.image && <Image src={item.users?.image} alt="avatar" className="img-fluid rounded-circle" />}
                    </div>
                    <h6 className="fs-14 mb-0">{item.users?.name}</h6>
                  </div>
                </td>
                <td>${item.amount}</td>
                <td>
                  <span className="text-muted">{item.date.toLocaleString('en-us', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
                </td>
                <td>
                  <span
                    className={`badge bg-${item.invoicesStatus == 'Pending' ? 'warning' : item.invoicesStatus == 'Cancelled' ? 'danger' : 'success'}-subtle text-${item.invoicesStatus == 'Pending' ? 'warning' : item.invoicesStatus == 'Cancelled' ? 'danger' : 'success'} fs-12 p-1`}>
                    {item.invoicesStatus}
                  </span>
                </td>
                <td className="pe-3">
                  <div className="hstack gap-1 justify-content-end">
                    <a href="" className="btn btn-soft-primary btn-icon btn-sm rounded-circle">
                      {' '}
                      <IconifyIcon icon="tabler:eye" />
                    </a>
                    <a href="" className="btn btn-soft-success btn-icon btn-sm rounded-circle">
                      {' '}
                      <IconifyIcon icon="tabler:edit" className=" fs-16" />
                    </a>
                    <a href="" className="btn btn-soft-danger btn-icon btn-sm rounded-circle">
                      {' '}
                      <IconifyIcon icon="tabler:trash" />
                    </a>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <CardFooter>
        <div className="d-flex justify-content-end">
          <Pagination className="mb-0 justify-content-center">
            <Pagination.Item className=" disabled">
              <IconifyIcon icon="tabler:chevrons-left" />
            </Pagination.Item>
            <Pagination.Item>
              1
            </Pagination.Item>
            <Pagination.Item className=" active">
              2
            </Pagination.Item>
            <Pagination.Item>
              3
            </Pagination.Item>
            <Pagination.Item>
              <IconifyIcon icon="tabler:chevrons-right" />
            </Pagination.Item>
          </Pagination>
        </div>
      </CardFooter>
    </Card>
  )
}

export default InvoicesCard
