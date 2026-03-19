'use client';

import IconifyIcon from '@/components/wrappers/IconifyIcon';
import useToggle from '@/hooks/useToggle';
import React, { useState } from 'react';
import { Card, Modal, ModalDialog } from 'react-bootstrap';
import { useRouter } from 'next/navigation';
import { TABLE_SEARCH } from '@/config/tableSearchConfig';

const SearchBox = () => {
    const { isTrue, toggle } = useToggle();
    const [query, setQuery] = useState('');
    const router = useRouter();

    const results =
        query.length === 0
            ? []
            : TABLE_SEARCH.filter(
                  (item) =>
                      item.name.toLowerCase().includes(query.toLowerCase()) ||
                      item.keywords.some((k) => k.toLowerCase().includes(query.toLowerCase()))
              );

    const goTo = (route: string) => {
        router.push(route);
        toggle();
        setQuery('');
    };

    return (
        <>
            <div className="topbar-item d-flex d-xl-none">
                <button className="topbar-link" onClick={toggle}>
                    <IconifyIcon icon="ri:search-line" className="fs-22" />
                </button>
            </div>

            <div
                onClick={toggle}
                className="topbar-search d-none d-xl-flex gap-2 me-2 align-items-center"
            >
                <IconifyIcon icon="ri:search-line" className="fs-18" />
                <span className="me-2">Search for tables..</span>
            </div>

            <Modal show={isTrue} onHide={toggle} className="modal-lg">
                <ModalDialog className="m-0">
                    <Card className="mb-0">
                        <div className="px-3 py-2" style={{ position: 'relative' }}>
                            <div className="d-flex align-items-center">
                                <IconifyIcon icon="ri:search-line" className="fs-22 me-2" />

                                <input
                                    type="search"
                                    className="form-control border-0"
                                    placeholder="Search tables like schools, programs, students..."
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    autoFocus
                                />

                                <button onClick={toggle} className="btn p-0 ms-2">
                                    [esc]
                                </button>
                            </div>

                            {/*LIVE DROPDOWN */}
                            {results.length > 0 && (
                                <div
                                    className="search-dropdown shadow rounded mt-2"
                                    style={{
                                        position: 'absolute',
                                        width: '100%',
                                        zIndex: 9999,
                                    }}
                                >
                                    {results.map((item) => (
                                        <div
                                            key={item.route}
                                            className="px-3 py-2 search-result-item"
                                            style={{ cursor: 'pointer' }}
                                            onClick={() => goTo(item.route)}
                                        >
                                            {item.name}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </Card>
                </ModalDialog>
            </Modal>
        </>
    );
};

export default SearchBox;
