import { Metadata } from 'next'
import { Col, Row } from 'react-bootstrap'
import InvoicesCard from './components/InvoicesCard'
// import InvoicesCard from './components/InvoicesCard'

export const metadata: Metadata = { title: 'Invoices', other: { subTitle: 'Invoices' } }

const InvoicesPage = () => {
  return (
    <>
      <Row>
        <Col xs={12}>
          <InvoicesCard />
        </Col>
      </Row>
    </>
  )
}

export default InvoicesPage
