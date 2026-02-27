import React from 'react'
import { remixData, RemixType } from './data'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import { Card, CardBody } from 'react-bootstrap'
import { Metadata } from 'next'

export const metadata: Metadata = { title: 'Remix Icons', other: { subTitle: 'Icons' }}

const RemixCard = ({ icon, title }: RemixType) => {
  return (
    <Card>
      <CardBody
        className="d-flex flex-column align-items-center justify-content-center"
        data-bs-toggle="tooltip"
        data-bs-placement="top"
        title={title}>
        <IconifyIcon icon={icon} className="fs-32 lh-1" />
      </CardBody>
    </Card>
  )
}

const RemixPage = () => {
  return (
    <>
      <div className="d-flex flex-wrap gap-3 justify-content-center icon-box">
        {remixData.map((item, idx) => (
          <RemixCard {...item} key={idx} />
        ))}
      </div>
      <div className="my-3 text-center">
        <a href="https://remixicon.com/" target="_blank" className="btn btn-danger">
          View All Icons
        </a>
      </div>
    </>
  )
}

export default RemixPage
