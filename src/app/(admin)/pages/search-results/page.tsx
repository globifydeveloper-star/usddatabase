import IconifyIcon from '@/components/wrappers/IconifyIcon'
import React from 'react'
import { CardBody, Col, Nav, NavItem, Row, TabContainer, TabContent, TabPane } from 'react-bootstrap'
import SearchResults from './component/SearchResults'
import { Metadata } from 'next'

export const metadata: Metadata = { title: 'Search Results', other: { subTitle: 'Pages' } }

const SearchResultsPage = () => {
  return (
    <Row>
      <Col lg={12}>
        <div className="search-result-box card">
          <CardBody>
            <Row>
              <Col md={8} className="offset-md-2">
                <div className="pt-3 pb-4">
                  <div className="input-group">
                    <input type="text" className="form-control" defaultValue="Admin Dashboard" />
                    <button type="button" className="input-group-text btn waves-effect waves-light btn-primary">
                      <IconifyIcon icon="ri:search-line" className="me-1" /> Search
                    </button>
                  </div>
                  <div className="mt-3 text-center">
                    <h4>Search Results For "Admin Dashboard"</h4>
                  </div>
                </div>
              </Col>
            </Row>
            <SearchResults />
          </CardBody>
        </div>
      </Col>
    </Row>
  )
}

export default SearchResultsPage
