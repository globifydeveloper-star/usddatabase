import IconifyIcon from '@/components/wrappers/IconifyIcon'
import React from 'react'
import State from './components/State'
import StatisticsChart from './components/StatisticsChart'
import TotalRevenue from './components/TotalRevenue'
import Transactions from './components/Transactions'
import NewUsers from './components/NewUsers'
import TransactionsUses from './components/TransactionsUses'
import { Alert, Col, Row } from 'react-bootstrap'


const Dashboard = () => {
  return (
    <>
      <Alert className="alert-info d-flex align-items-center d-none d-md-flex" role="alert">
        <IconifyIcon icon="solar:help-bold-duotone" className="fs-24 me-1" />
        <div>
          <strong> Dear Maxine - </strong> We kindly encourage you to review your recent transactions and financial commitments to ensure that your
          account is in good standing.
        </div>
        <a href="#!" className="text-reset text-decoration-underline ms-auto link-offset-2">
          <b>Action Now</b>
        </a>
      </Alert>
      <State />

      <Row>
        <Col xl={6}>
          <StatisticsChart />
        </Col>
        <Col xl={6}>
          <TotalRevenue />
        </Col>
      </Row>

      <Row>
        <Col xxl={4}>
          <Transactions />
        </Col>
        <Col xxl={4}>
          <NewUsers />
        </Col>
        <Col xxl={4}>
          <TransactionsUses />
        </Col>
      </Row>
    </>
  )
}

export default Dashboard
