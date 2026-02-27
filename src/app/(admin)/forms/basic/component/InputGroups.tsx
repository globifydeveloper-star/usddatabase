'use client'
import ComponentContainerCard from "@/components/ComponentContainerCard"
import { Col, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Form, InputGroup, Row } from "react-bootstrap"

const InputGroups = () => {
  return (
    <ComponentContainerCard
      title="Input Group"
      description={
        <>
          {' '}
          Easily extend form controls by adding text, buttons, or button groups on either side of textual inputs, custom selects, and custom file
          inputs
        </>
      }>
      <form>
        <div className="mb-3">
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
            <Form.Control
              placeholder="Username"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </InputGroup>
        </div>
        <div className="mb-3">
          <label className="form-label">Dropdowns</label>
          <Dropdown className="input-group">
            <DropdownToggle
              as={'button'}
              className="btn btn-primary"
              type="button"
              data-bs-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false">
              Dropdown
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem>Action</DropdownItem>
              <DropdownItem>Another action</DropdownItem>
              <DropdownItem>Something else here</DropdownItem>
            </DropdownMenu>
            <Form.Control type="text" placeholder="" aria-describedby="basic-addon1" />
          </Dropdown>
        </div>
        <div className="mb-3">
          <label className="form-label">Buttons</label>
          <div className="input-group">
            <Form.Control type="text"  placeholder="Recipient's username" aria-label="Recipient's username" />
            <button className="btn btn-dark" type="button">
              Button
            </button>
          </div>
        </div>
        <Row className="g-2">
          <Col sm={6}>
            <label className="form-label">File input</label>
            <Form.Control  type="file" id="inputGroupFile04" />
          </Col>
          <Col sm={6}>
            <label htmlFor="formFileMultiple01" className="form-label">
              Multiple files input
            </label>
            <Form.Control  type="file" id="formFileMultiple01" multiple />
          </Col>
        </Row>
      </form>
    </ComponentContainerCard>
  )
}

export default InputGroups