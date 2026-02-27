import Image from 'next/image'
import { Card, CardBody, Col, Row } from 'react-bootstrap'

import IconifyIcon from '@/components/wrappers/IconifyIcon'
import type { KanbanTaskType } from '@/types/data'

const TaskItem = ({ task: { priority, title, members, description } }: { task: KanbanTaskType }) => {
  return (
    <Card>
      <CardBody className="">
        <span
          className={`badge bg-soft-${priority == 'High' ? 'danger' : priority == 'Medium' ? 'warning' : 'success'} text-${priority == 'High' ? 'danger' : priority == 'Medium' ? 'warning' : 'success'} float-end`}>
          {priority}
        </span>

        <h5 className="mt-0">
          <a className="text-dark fw-semibold">{title}</a>
        </h5>

        <div className="form-check float-end ps-0">
          <input className="form-check-input" type="checkbox" />
        </div>

        <p>{description}</p>
        <div className="clearfix" />

        <Row>
          <Col>
            <p className="fs-13 mt-2 mb-0">
              <IconifyIcon icon="ri:calendar-event-line" className="me-1" /> {new Date().toLocaleDateString()}
            </p>
          </Col>
          <Col xs={'auto'}>
            <div className="text-end">
              {members.map((img, idx) => (
                <a href="" className="text-muted" key={idx}>
                  <Image src={img} alt="task-user" width={30} height={30} className="avatar-sm img-thumbnail rounded-circle" />
                </a>
              ))}
            </div>
          </Col>
        </Row>
      </CardBody>
    </Card>
  )
}

export default TaskItem
