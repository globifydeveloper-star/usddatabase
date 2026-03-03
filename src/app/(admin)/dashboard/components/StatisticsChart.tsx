'use client'

import ApexChartClient from '@/components/ApexChartClient'
import { ApexOptions } from 'apexcharts'
import React, { useEffect, useState } from 'react'
import { Card, CardBody } from 'react-bootstrap'

const ProgramsBySchoolTypeChart = () => {
  const [series, setSeries] = useState<any[]>([])
  const [categories, setCategories] = useState<string[]>([])
  const [totalPrograms, setTotalPrograms] = useState<number>(0)

  useEffect(() => {
    fetch('/api/program-stats')
      .then(res => res.json())
      .then(data => {
        const types = data.map((item: any) => item.school_type || 'Unknown')
        const totals = data.map((item: any) => Number(item.total_programs))

        setCategories(types)
        setSeries([
          {
            name: 'Programs',
            data: totals
          }
        ])

        const total = totals.reduce((acc: number, val: number) => acc + val, 0)
        setTotalPrograms(total)
      })
  }, [])

  const options: ApexOptions = {
    chart: {
      type: 'bar',
      height: 300,
      toolbar: { show: false }
    },
    plotOptions: {
      bar: {
        borderRadius: 6,
        columnWidth: '50%'
      }
    },
    dataLabels: {
      enabled: false
    },
    xaxis: {
      categories,
      title: {
        text: 'School Type'
      }
    },
    yaxis: {
      title: {
        text: 'Number of Programs'
      }
    },
    colors: ['#777edd']
  }

  return (
    <Card>
      {/* Header Section */}
      <div className="card-header">
        <h4 className="header-title mb-1">
          Programs Distribution by School Type
        </h4>
        <p className="text-muted mb-0" style={{ fontSize: '13px' }}>
          This chart shows how academic programs are distributed across
          different school categories such as Public and Private institutions.
        </p>
      </div>

      <CardBody>
        {/* Total Summary */}
        <div className="text-center mb-3">
          <h5 className="fw-semibold">
            Total Programs: {totalPrograms}
          </h5>
        </div>

        <ApexChartClient
          height={300}
          options={options}
          series={series}
          type="bar"
        />
      </CardBody>
    </Card>
  )
}

export default ProgramsBySchoolTypeChart