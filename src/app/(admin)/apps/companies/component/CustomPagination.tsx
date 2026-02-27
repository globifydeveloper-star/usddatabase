'use client'
import React from 'react'
import { Pagination } from 'react-bootstrap'

const CustomPagination = () => {
  return (
    <Pagination className="pagination-rounded justify-content-end">
      <Pagination.Item>
        <span aria-hidden="true">«</span>
        <span className="visually-hidden">Previous</span>
      </Pagination.Item>
      <Pagination.Item className=" active">
        1
      </Pagination.Item>
      <Pagination.Item>
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
  )
}

export default CustomPagination