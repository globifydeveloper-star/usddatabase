import React from 'react'
import File from './File'
import OffcanvasCard from './OffcanvasCard'
import { Card } from 'react-bootstrap'

const FIleManager = () => {
  return (
    <>
      <Card>
        <div className="d-flex">
          <div className="offcanvas-xl offcanvas-start file-manager">
            <OffcanvasCard />
          </div>
          <File />
        </div>
      </Card>
    </>
  )
}

export default FIleManager
