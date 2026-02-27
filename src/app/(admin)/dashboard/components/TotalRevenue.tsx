'use client'
import dynamic from "next/dynamic";
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import Image from 'next/image'
import React from 'react'
import americanExImg from '@/assets/images/cards/american-express.svg'
import discoverCard from '@/assets/images/cards/discover-card.svg'
import mastercard from '@/assets/images/cards/mastercard.svg'
import { Card, CardBody, Col, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Row } from 'react-bootstrap'
import { ApexOptions } from 'apexcharts'


const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

const TotalRevenue = () => {
  const revenueOpts: ApexOptions = {
    series: [
      {
        name: 'Total Income',
        data: [82.0, 85.0, 70.0, 90.0, 75.0, 78.0, 65.0, 50.0, 72.0, 60.0, 80.0, 70.0],
      },
      {
        name: 'Total Expenses',
        data: [30.0, 32.0, 40.0, 35.0, 30.0, 36.0, 37.0, 28.0, 34.0, 42.0, 38.0, 30.0],
      },
    ],
    stroke: {
      width: 2,
      curve: 'straight',
    },
    chart: {
      height: 299,
      type: 'area',
      zoom: {
        enabled: false,
      },
      toolbar: { show: false },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: { categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'] },
    colors: ['#0acf97', '#45bbe0'],
    tooltip: {
      shared: true,
      y: [
        {
          formatter: function (y) {
            if (typeof y !== 'undefined') {
              return '$' + y.toFixed(2) + 'k'
            }
            return y
          },
        },
        {
          formatter: function (y) {
            if (typeof y !== 'undefined') {
              return '$' + y.toFixed(2) + 'k'
            }
            return y
          },
        },
      ],
    },
  }
  return (
    <Card>
      <div className="d-flex card-header justify-content-between align-items-center">
        <div>
          <h4 className="header-title">Total Revenue</h4>
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
        <div className="border-top border-bottom border-light border-dashed">
          <Row className="text-center align-items-center">
            <Col md={3} xs={6}>
              <p className="text-muted mt-3 mb-1">Revenue</p>
              <h4 className="mb-3 icons-center ">
                <IconifyIcon icon="ri:arrow-left-down-box-line" className="text-success me-1" />
                &nbsp;
                <span>$29.5k</span>
              </h4>
            </Col>
            <Col md={3} xs={6} className="bg-light bg-opacity-50 border-start border-light border-dashed">
              <p className="text-muted mt-3 mb-1">Expenses</p>
              <h4 className="mb-3 icons-center">
                <IconifyIcon icon="ri:arrow-left-up-box-line" className="text-danger me-1" />
                &nbsp;
                <span>$15.07k</span>
              </h4>
            </Col>
            <Col md={3} xs={6} className="border-start border-end border-light border-dashed">
              <p className="text-muted mt-3 mb-1">Investment</p>
              <h4 className="mb-3 icons-center">
                <IconifyIcon icon="ri:bar-chart-line" className="me-1" />
                &nbsp;
                <span>$3.6k</span>
              </h4>
            </Col>
            <Col md={3} xs={6}>
              <Image src={americanExImg} alt="user-card" height={36} />
              &nbsp;
              <Image src={discoverCard} alt="user-card" height={36} />
              &nbsp;
              <Image src={mastercard} alt="user-card" height={36} />
            </Col>
          </Row>
        </div>
        <div dir="ltr" className="px-2">
          <ReactApexChart height={300} options={revenueOpts} series={revenueOpts.series} type="area" className="apex-charts" />
        </div>
      </CardBody>
    </Card>
  )
}

export default TotalRevenue
