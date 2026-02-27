import ApexChartClient from '@/components/ApexChartClient'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import { ApexOptions } from 'apexcharts'
import React from 'react'
import { Card, CardBody, Col, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Row } from 'react-bootstrap'



const StatisticsChart = () => {
  const statisticsOpts: ApexOptions = {
    series: [
      { name: 'Open Campaign', type: 'bar', data: [89.25, 98.58, 68.74, 108.87, 77.54, 84.03, 51.24, 28.57, 92.57, 42.36, 88.51, 36.57] },
      { name: 'Marketing Cost', type: 'bar', data: [30.28, 33.45, 50.0, 31.12, 26.59, 34.06, 39.79, 14.38, 33.44, 48.12, 27.91, 23.91] },
    ],
    chart: { height: 301, type: 'line', toolbar: { show: false } },
    stroke: {
      width: 0,
      curve: 'straight',
    },
    plotOptions: {
      bar: {
        columnWidth: '45%',
        barHeight: '70%',
        borderRadius: 5,
      },
    },
    xaxis: { categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'] },
    colors: ['#02c0ce', '#777edd'],
  }
  return (
    <Card>
      <div className="d-flex card-header justify-content-between align-items-center">
        <div>
          <h4 className="header-title">Statistics</h4>
        </div>
        <Dropdown align={'end'}>
          <DropdownToggle as={'a'} className="drop-arrow-none card-drop" data-bs-toggle="dropdown" aria-expanded="false">
            <IconifyIcon icon="ri:more-2-fill" className="fs-18" />
          </DropdownToggle>
          <DropdownMenu className="dropdown-menu-end">
            <DropdownItem>Sales Report</DropdownItem>
            <DropdownItem>Export Report</DropdownItem>
            <DropdownItem>Profit</DropdownItem>
            <DropdownItem>Action</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
      <CardBody className="px-0 pt-0">
        <div className="bg-light bg-opacity-50">
          <Row className="text-center">
            <Col md={3} xs={6}>
              <p className="text-muted mt-3 mb-1">Total Income</p>
              <h4 className="mb-3 icons-center">
                <IconifyIcon icon="ri:arrow-left-down-box-line" className="text-success me-1" />
                &nbsp;
                <span>$35.2k</span>
              </h4>
            </Col>
            <Col md={3} xs={6}>
              <p className="text-muted mt-3 mb-1">Total Expenditure</p>
              <h4 className="mb-3 icons-center">
                <IconifyIcon icon="ri:arrow-left-up-box-line" className="text-danger me-1" />
                &nbsp;
                <span>$18.9k</span>
              </h4>
            </Col>
            <Col md={3} xs={6}>
              <p className="text-muted mt-3 mb-1 ">Capital Invested</p>
              <h4 className="mb-3 icons-center">
                <IconifyIcon icon="ri:bar-chart-line" className="me-1" />
                &nbsp;
                <span>$5.2k</span>
              </h4>
            </Col>
            <Col md={3} xs={6}>
              <p className="text-muted mt-3 mb-1 ">Net Savings</p>
              <h4 className="mb-3 icons-center">
                <IconifyIcon icon="ri:bank-line" className="me-1" />
                &nbsp;
                <span>$8.1k</span>
              </h4>
            </Col>
          </Row>
        </div>
        <div dir="ltr" className="px-1">
          <ApexChartClient height={300} options={statisticsOpts} series={statisticsOpts.series} type="line" className="apex-charts" />
        </div>
      </CardBody>
    </Card>
  )
}

export default StatisticsChart
