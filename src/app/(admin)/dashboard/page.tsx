import IconifyIcon from '@/components/wrappers/IconifyIcon';
import React from 'react';
import State from './components/State';
import StatisticsChart from './components/StatisticsChart';
import TotalRevenue from './components/TotalRevenue';
import Transactions from './components/Transactions';
import NewUsers from './components/NewUsers';
import TransactionsUses from './components/TransactionsUses';
import { Alert, Col, Row } from 'react-bootstrap';
import { getDashboardStats } from './server-data';
import EarningsPieChart from './components/CostPieChart';
import CostPieChart from './components/CostPieChart';
import RepaymentOverallChart from './components/RepaymentOverallChart';
import ProgramOverallChart from './components/ProgramOverallChart';
import CollegeAndProgramChart from './components/CollegeAndprogramChart';
import RecentAuditLogs from './components/RecentAuditLogs';
import RecentLoginHistory from './components/RecentLoginHistory';

const Dashboard = async () => {
    const stateData = await getDashboardStats(); //fetch from server-only file

    return (
        <>

            <Row className="mb-3">
                <Col md={12} xl={12}>
                    <State data={stateData} />
                </Col>
            </Row>

            <Row className="mb-3">
                <Col md={12} xl={6} className="mb-3 mb-xl-0">
                    <RecentAuditLogs />
                </Col>
                <Col md={12} xl={6}>
                    <RecentLoginHistory />
                </Col>
            </Row>

            <Row>
                <Col xl={6}>
                    <ProgramOverallChart />
                </Col>
                <Col xl={6}>
                    <CollegeAndProgramChart />
                </Col>
                <Col xl={6}>
                    <StatisticsChart />
                </Col>

                {/* <Col xl={6}>
                    <CostPieChart />
                </Col> */}
                <Col xl={6}>
                    <RepaymentOverallChart />
                </Col>
            </Row>

            <Row>
                <Col xxl={4}>{}</Col>
                <Col xxl={4}>{/* <NewUsers /> */}</Col>
                <Col xxl={4}>{/* <TransactionsUses /> */}</Col>
            </Row>
        </>
    );
};

export default Dashboard;
