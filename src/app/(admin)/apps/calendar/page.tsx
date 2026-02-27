import type { Metadata } from 'next'
import { Row } from 'react-bootstrap'
import CalendarPage from './components/CalendarPage'

export const metadata: Metadata = { title: 'Calender', other: { subTitle: 'Apps' } }

const Schedule = () => {
  return (
    <>
      <Row>
        <CalendarPage />
      </Row>
    </>
  )
}

export default Schedule
