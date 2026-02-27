'use client'
import Image from 'next/image'
import avatar1 from '@/assets/images/users/avatar-1.jpg'
import React from 'react'
import small1 from '@/assets/images/small/small-1.jpg'
import small2 from '@/assets/images/small/small-2.jpg'
import small3 from '@/assets/images/small/small-3.jpg'
import small4 from '@/assets/images/small/small-4.jpg'
import { Col, Nav, NavItem, NavLink, Pagination, Row, TabContainer, TabContent, TabPane } from 'react-bootstrap'
import { searchUserData } from '../data'

const SearchResults = () => {
  return (
    <TabContainer defaultActiveKey={'home'}>
      <Nav className="nav-tabs nav-bordered" role="tablist">
        <NavItem role="presentation">
          <NavLink eventKey="home" data-bs-toggle="tab" aria-expanded="true" className="nav-link" aria-selected="true" role="tab">
            All results <span className="badge bg-success ms-1">325</span>
          </NavLink>
        </NavItem>
        <NavItem role="presentation">
          <NavLink eventKey="users" data-bs-toggle="tab" aria-expanded="false" className="nav-link" aria-selected="false" tabIndex={-1} role="tab">
            Users <span className="badge bg-danger ms-1">89</span>
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent>
        <TabPane eventKey="home" className="" role="tabpanel">
          <Row>
            <Col md={12}>
              <div className="search-item">
                <h4 className="mb-1">
                  <a href="#">Highdmin - Responsive Admin Template</a>
                </h4>
                <div className="font-13 text-success mb-2 text-truncate">http://coderthemes.com/highdmin//</div>
                <p className="mb-0 text-muted">
                  Dolor posuere proin blandit accumsan senectus netus nullam curae, ornare laoreet adipiscing luctus mauris adipiscing pretium eget
                  fermentum, tristique lobortis est ut metus lobortis tortor tincidunt himenaeos habitant quis dictumst proin odio sagittis purus mi,
                  nec taciti vestibulum quis in sit varius lorem sit metus mi.
                </p>
              </div>
              <div className="search-item">
                <h4 className="mb-1">
                  <a href="#">Uplon - Responsive Bootstrap 5 Web App Kit</a>
                </h4>
                <div className="font-13 text-success mb-2 text-truncate">http://themeforest.net/user/coderthemes/portfolio?ref=coderthemes</div>
                <p className="mb-0 text-muted">
                  Dolor posuere proin blandit accumsan senectus netus nullam curae, ornare laoreet adipiscing luctus mauris adipiscing pretium eget
                  fermentum, tristique lobortis est ut metus lobortis tortor tincidunt himenaeos habitant quis dictumst proin odio sagittis purus mi,
                  nec taciti vestibulum quis in sit varius lorem sit metus mi.
                </p>
              </div>
              <div className="search-item">
                <div className="d-flex align-items-start">
                  <Image className="d-flex me-3 rounded-circle" src={avatar1} alt="Generic placeholder image" height={54} />
                  <div className="w-100">
                    <h5 className="mt-0">
                      <a href="#" className="text-dark">
                        Chadengle
                      </a>
                    </h5>
                    <p className="font-13">
                      <b>Email:</b>&nbsp;
                      <span>
                        <a href="#" className="text-muted">
                          mediaheader@mail.com
                        </a>
                      </span>
                    </p>
                    <p className="mb-0 font-13">
                      <b>Bio:</b>
                      <br />
                      <span className="text-muted">
                        Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio,
                        vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue
                        felis in faucibus.
                      </span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="search-item">
                <h4 className="mb-1">
                  <a href="#">Zircos - Responsive Admin Template</a>
                </h4>
                <div className="font-13 text-success mb-2 text-truncate">http://ubold.coderthemes.com/</div>
                <p className="mb-0 text-muted">
                  Dolor posuere proin blandit accumsan senectus netus nullam curae, ornare laoreet adipiscing luctus mauris adipiscing pretium eget
                  fermentum, tristique lobortis est ut metus lobortis tortor tincidunt himenaeos habitant quis dictumst proin odio sagittis purus mi,
                  nec taciti vestibulum quis in sit varius lorem sit metus mi.
                </p>
              </div>
              <div className="search-item">
                <h4 className="mb-1">
                  <a href="#">Uplon - Responsive Bootstrap 5 Web App Kit</a>
                </h4>
                <div className="font-13 text-success mb-2 text-truncate">http://themeforest.net/user/coderthemes/portfolio?ref=coderthemes</div>
                <div>
                  <Image src={small1} height={48} alt="image" />
                  &nbsp;
                  <Image src={small2} height={48} alt="image" />
                  &nbsp;
                  <Image src={small3} height={48} alt="image" />
                  &nbsp;
                  <Image src={small4} height={48} alt="image" />
                </div>
              </div>
              <div className="search-item">
                <h4 className="mb-1">
                  <a href="#">Zircos - Responsive Admin Template</a>
                </h4>
                <div className="font-13 text-success mb-2 text-truncate">http://ubold.coderthemes.com/</div>
                <p className="mb-0 text-muted">
                  Dolor posuere proin blandit accumsan senectus netus nullam curae, ornare laoreet adipiscing luctus mauris adipiscing pretium eget
                  fermentum, tristique lobortis est ut metus lobortis tortor tincidunt himenaeos habitant quis dictumst proin odio sagittis purus mi,
                  nec taciti vestibulum quis in sit varius lorem sit metus mi.
                </p>
              </div>
              <div className="search-item">
                <h4 className="mb-1">
                  <a href="#">Uplon - Responsive Bootstrap 5 Web App Kit</a>
                </h4>
                <div className="font-13 text-success mb-2 text-truncate">http://themeforest.net/user/coderthemes/portfolio?ref=coderthemes</div>
                <p className="mb-0 text-muted">
                  Dolor posuere proin blandit accumsan senectus netus nullam curae, ornare laoreet adipiscing luctus mauris adipiscing pretium eget
                  fermentum, tristique lobortis est ut metus lobortis tortor tincidunt himenaeos habitant quis dictumst proin odio sagittis purus mi,
                  nec taciti vestibulum quis in sit varius lorem sit metus mi.
                </p>
                <Row className="mt-2">
                  <Col sm={4} xl={2}>
                    <div className="ratio ratio-16x9">
                      <iframe src="https://www.youtube.com/embed/PrUxWZiQfy4?autohide=0&showinfo=0&controls=0" />
                    </div>
                  </Col>
                </Row>
              </div>
              <Pagination className="justify-content-end pagination-rounded mt-0">
                <Pagination.Item>
                  <span aria-hidden="true">«</span>
                  <span className="visually-hidden">Previous</span>
                </Pagination.Item>
                <Pagination.Item>
                  1
                </Pagination.Item>
                <Pagination.Item >
                  2
                </Pagination.Item>
                <Pagination.Item>
                  3
                </Pagination.Item>
                <Pagination.Item>
                  4
                </Pagination.Item>
                <Pagination.Item>
                  5
                </Pagination.Item>
                <Pagination.Item>
                  <span aria-hidden="true">»</span>
                  <span className="visually-hidden">Next</span>
                </Pagination.Item>
              </Pagination>
              <div className="clearfix" />
            </Col>
          </Row>
        </TabPane>
        <TabPane eventKey="users" role="tabpanel">
          {searchUserData.map((item, idx) => (
            <div className="search-item" key={idx}>
              <div className="d-flex align-items-start">
                <Image className="d-flex me-3 rounded-circle" src={item.avatar} alt="Generic placeholder image" height={54} />
                <div className="w-100">
                  <h5 className="mt-0">
                    <a href="#" className="text-dark">
                      {item.name}
                    </a>
                  </h5>
                  <p className="font-13">
                    <b>Email:</b>&nbsp;
                    <span>
                      <a href="#" className="text-muted">
                        {item.email}
                      </a>
                    </span>
                  </p>
                  <p className="mb-0 font-13">
                    <b>Bio:</b>
                    <br />
                    <span className="text-muted">{item.bio}</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
          <Pagination className="justify-content-end pagination-rounded mt-0">
            <Pagination.Item>
              <span aria-hidden="true">«</span>
              <span className="visually-hidden">Previous</span>

            </Pagination.Item>
            <Pagination.Item>
              1
            </Pagination.Item>
            <Pagination.Item >
              2
            </Pagination.Item>
            <Pagination.Item>
              3
            </Pagination.Item>
            <Pagination.Item>
              4
            </Pagination.Item>
            <Pagination.Item>
              5
            </Pagination.Item>
            <Pagination.Item>
              <span aria-hidden="true">»</span>
              <span className="visually-hidden">Next</span>
            </Pagination.Item>
          </Pagination>
          <div className="clearfix" />
        </TabPane>
      </TabContent>
    </TabContainer>
  )
}

export default SearchResults
