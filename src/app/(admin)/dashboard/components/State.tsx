import React from 'react'
import { StateType } from '../data'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import { Card, CardBody, Col, Row } from 'react-bootstrap'

type Props = {
  data: StateType[]
}

const StateCard = ({
  bgColor,
  change,
  description,
  icon,
  textColor,
  title,
  type,
  value,
  isTrue,
}: StateType) => {
  return (
    <Card>
      <CardBody>
        <div className="d-flex align-items-center gap-2 justify-content-between">
          <div>
            <h5 className="text-muted fs-13 fw-bold text-uppercase">
              {title}
            </h5>

            <h3 className="my-2 py-1 fw-bold">{value}</h3>
          </div>

          <div className="avatar-xl flex-shrink-0">
            <span className={`avatar-title bg-${bgColor} text-${textColor} rounded-circle fs-42`}>
              <IconifyIcon icon={icon} />
            </span>
          </div>
        </div>
      </CardBody>
    </Card>
  )
}

const State = ({ data }: Props) => {
  return (
    <Row className="row-cols-1 row-cols-sm-2 row-cols-xl-4 g-3">
      {data.map((item, idx) => (
        <Col key={idx}>
          <StateCard {...item} />
        </Col>
      ))}
    </Row>
  )
}

export default State