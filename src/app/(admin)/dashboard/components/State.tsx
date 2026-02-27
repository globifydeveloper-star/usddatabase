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

            <p className="mb-0 text-muted flex-centered">
              <span className={`${isTrue ? 'text-danger' : 'text-success'} icons-center me-1`}>
                {isTrue ? (
                  <IconifyIcon icon="ri:arrow-left-down-box-line" />
                ) : (
                  <IconifyIcon icon="ri:arrow-left-up-box-line" />
                )}
                &nbsp; {change}%
              </span>
              &nbsp;
              <span className="text-nowrap">{description}</span>
            </p>
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
    <Row className="row-cols-xxl-4 row-cols-md-2 row-cols-1">
      {data.map((item, idx) => (
        <Col key={idx}>
          <StateCard {...item} />
        </Col>
      ))}
    </Row>
  )
}

export default State