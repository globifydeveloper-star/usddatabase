import ApexChartClient from '@/components/ApexChartClient'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import { ApexOptions } from 'apexcharts'
import React from 'react'
import { Card, CardBody, CardHeader, Col, Row } from 'react-bootstrap'


const TransactionsUses = () => {
  const transactionsUsesOpts: ApexOptions = {
    chart: {
      height: 335,
      type: 'donut',
    },
    series: [25, 40, 30, 15, 20],
    legend: {
      show: true,
      position: 'bottom',
      horizontalAlign: 'center',
      floating: false,
      fontSize: '14px',
      offsetX: 0,
      offsetY: 7,
    },
    labels: ['10-16 (Child)', '18-26 (Young)', '27-35 (Adult)', '36-50 (Middle Age)', '51+ (Senior)'],
    colors: ['#a3e0e7', '#8fdae2', '#79d4dd', '#61cdd8', '#42c7d3'],
    responsive: [
      {
        breakpoint: 600,
        options: {
          chart: {
            height: 240,
          },
          legend: {
            show: false,
          },
        },
      },
    ],
  }
  return (
    <Card>
      <CardHeader className="d-flex flex-wrap align-items-center gap-2 border-bottom border-dashed">
        <h4 className="header-title me-auto">Transactions Uses</h4>
        <div className="d-flex gap-2 justify-content-end text-end">
          <a href="" className="btn btn-sm btn-primary">
            Refresh <IconifyIcon icon="ri:export-line" className="ms-1" />
          </a>
        </div>
      </CardHeader>
      <CardBody>
        <div dir="ltr">
          <ApexChartClient height={335} options={transactionsUsesOpts} series={transactionsUsesOpts.series} type="donut" className="apex-charts" />
          <Row className="mt-2">
            <Col>
              <div className="d-flex justify-content-between align-items-center p-1">
                <div>
                  <IconifyIcon icon="ri:circle-fill" className="fs-12 align-middle me-1 text-primary" />
                  <span className="align-middle fw-semibold">Direct</span>
                </div>
                <span className="fw-semibold text-muted float-end">
                  <IconifyIcon icon="ri:arrow-down-double-line" className="text-danger" /> 965
                </span>
              </div>
              <div className="d-flex justify-content-between align-items-center p-1">
                <div>
                  <IconifyIcon icon="ri:circle-fill" className="fs-12 text-success align-middle me-1" />
                  <span className="align-middle fw-semibold">Social</span>
                </div>
                <span className="fw-semibold text-muted float-end">
                  <IconifyIcon icon="ri:arrow-up-double-line" className=" text-success" /> 75
                </span>
              </div>
            </Col>
            <Col>
              <div className="d-flex justify-content-between align-items-center p-1">
                <div>
                  <IconifyIcon icon="ri:circle-fill" className="fs-12 text-secondary align-middle me-1" />
                  <span className="align-middle fw-semibold"> Marketing</span>
                </div>
                <span className="fw-semibold text-muted float-end">
                  <IconifyIcon icon="ri:arrow-up-double-line" className=" text-success" /> 102
                </span>
              </div>
              <div className="d-flex justify-content-between align-items-center p-1">
                <div>
                  <IconifyIcon icon="ri:circle-fill" className="fs-12 text-danger align-middle me-1" />
                  <span className="align-middle fw-semibold">Affiliates</span>
                </div>
                <span className="fw-semibold text-muted float-end">
                  <IconifyIcon icon="ri:arrow-down-double-line" className="text-danger" /> 96
                </span>
              </div>
            </Col>
          </Row>
        </div>
      </CardBody>
    </Card>
  )
}

export default TransactionsUses
