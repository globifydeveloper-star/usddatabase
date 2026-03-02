import IconifyIcon from '@/components/wrappers/IconifyIcon'
import React from 'react'
import State from './components/State'
import StatisticsChart from './components/StatisticsChart'
import TotalRevenue from './components/TotalRevenue'
import Transactions from './components/Transactions'
import NewUsers from './components/NewUsers'
import TransactionsUses from './components/TransactionsUses'
import { Alert, Col, Row } from 'react-bootstrap'
import { getDashboardStats } from "./server-data"   

const Dashboard = async () => {

  const stateData = await getDashboardStats()   // ✅ fetch from server-only file

  return (
    <>
     <Alert 
  className="alert-info d-flex align-items-center d-none d-md-flex" 
  role="alert"
>
  <IconifyIcon icon="solar:help-bold-duotone" className="fs-24 me-1" />
  <div>
    <strong>US Degree Analytics - </strong> 
    Statistics Data from the{" "}
    <a
      href="https://collegescorecard.ed.gov"
      target="_blank"
      rel="noopener noreferrer"
      className="text-decoration-underline fw-semibold"
    >
      US Education Database
    </a>.
  </div>
</Alert>

      <State data={stateData} />

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