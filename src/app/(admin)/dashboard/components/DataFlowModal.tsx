'use client';

import React, { useState } from 'react';
import { Button, Modal, Card, CardBody } from 'react-bootstrap';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import SchemaERD from './SchemaERD';

const DataFlowModal = () => {
    const [showModal, setShowModal] = useState(false);

    const handleOpen = () => setShowModal(true);
    const handleClose = () => setShowModal(false);

    return (
        <>
            <Card className="mb-3 border">
                <CardBody className="py-3 px-4">
                    <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                        <div className="d-flex align-items-center gap-3">
                            <div className="avatar-md flex-shrink-0 bg-primary-subtle text-primary rounded-circle d-flex align-items-center justify-content-center">
                                <IconifyIcon icon="ri:node-tree" className="fs-24" />
                            </div>
                            <div>
                                <h5 className="mb-1 fw-bold d-flex align-items-center gap-2">
                                    Database &amp; Schema Data Flow Map
                                </h5>
                                <p className="mb-0 text-muted fs-13">
                                    Visual ERD diagram, primary/foreign key connections, staging
                                    pipelines, and soft conventions.
                                </p>
                            </div>
                        </div>

                        <div className="d-flex align-items-center gap-2">
                            <Button
                                variant="primary"
                                className="fw-semibold px-3 py-2 d-flex align-items-center gap-2 shadow-sm"
                                onClick={handleOpen}
                                id="btn-open-data-flow"
                            >
                                <IconifyIcon icon="ri:flow-chart" className="fs-18" />
                                <span>Data Flow</span>
                            </Button>
                        </div>
                    </div>
                </CardBody>
            </Card>

            <Modal
                show={showModal}
                onHide={handleClose}
                fullscreen
                centered
                backdrop="static"
                dialogClassName="data-flow-modal"
            >
                <Modal.Header closeButton className="px-4 py-3 border-bottom">
                    <Modal.Title className="d-flex align-items-center gap-2 fs-18 fw-bold">
                        <IconifyIcon icon="ri:node-tree" className="text-primary fs-22" />
                        USDegrees Interactive Data Flow &amp; ERD Schema Map
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body className="p-0 overflow-hidden">
                    {showModal && <SchemaERD />}
                </Modal.Body>
            </Modal>
        </>
    );
};

export default DataFlowModal;
