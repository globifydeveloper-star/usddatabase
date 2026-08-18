'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { Button, Modal, Card, CardBody } from 'react-bootstrap';
import { useSearchParams } from 'next/navigation';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import SchemaERD from './SchemaERD';

function DataFlowModalContent() {
    const [showModal, setShowModal] = useState(false);
    const [isHighlighted, setIsHighlighted] = useState(false);
    const searchParams = useSearchParams();

    useEffect(() => {
        if (searchParams.get('highlightDataFlow') === 'true') {
            setIsHighlighted(true);
        }
    }, [searchParams]);

    useEffect(() => {
        if (!isHighlighted) return;

        const handleGlobalClick = () => {
            setIsHighlighted(false);
        };

        const timer = setTimeout(() => {
            window.addEventListener('click', handleGlobalClick);
        }, 100);

        return () => {
            clearTimeout(timer);
            window.removeEventListener('click', handleGlobalClick);
        };
    }, [isHighlighted]);

    const handleOpen = () => {
        setIsHighlighted(false);
        setShowModal(true);
    };

    const handleClose = () => setShowModal(false);

    return (
        <>
            <Card className={`mt-3 mb-3 border ${isHighlighted ? 'border-primary shadow-lg' : ''}`}>
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
                                className={`fw-semibold px-3 py-2 d-flex align-items-center gap-2 shadow-sm ${
                                    isHighlighted ? 'btn-data-flow-pulse' : ''
                                }`}
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

            <style jsx global>{`
                @keyframes dataFlowGlow {
                    0% {
                        box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.8), 0 0 12px rgba(59, 130, 246, 0.5);
                        transform: scale(1);
                    }
                    50% {
                        box-shadow: 0 0 0 16px rgba(59, 130, 246, 0), 0 0 24px rgba(59, 130, 246, 0.8);
                        transform: scale(1.08);
                    }
                    100% {
                        box-shadow: 0 0 0 0 rgba(59, 130, 246, 0), 0 0 12px rgba(59, 130, 246, 0.5);
                        transform: scale(1);
                    }
                }
                .btn-data-flow-pulse {
                    animation: dataFlowGlow 1.4s infinite ease-in-out !important;
                    position: relative;
                    z-index: 10;
                }
            `}</style>

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
}

export default function DataFlowModal() {
    return (
        <Suspense fallback={null}>
            <DataFlowModalContent />
        </Suspense>
    );
}
