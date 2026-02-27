import EmailArea from './components/EmailArea'
import { Card } from 'react-bootstrap'
import { Metadata } from 'next'

export const metadata: Metadata = { title: 'Inbox', other: { subTitle: 'Apps' } }

const EmailPage = () => {
  return (
    <div>
      <Card>
        <div className="d-flex">
          <EmailArea />
        </div>
      </Card>
    </div>
  )
}

export default EmailPage
