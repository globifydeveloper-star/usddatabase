'use client'

import ApexChartClient from '@/components/ApexChartClient'
import { ApexOptions } from 'apexcharts'
import React, { useEffect, useState } from 'react'
import { Card, CardBody } from 'react-bootstrap'

const CostPieChart = () => {
  const [series, setSeries] = useState<number[]>([])
  const [labels, setLabels] = useState<string[]>([])

  useEffect(() => {
    fetch('/api/cost-pie')   // 🔥 changed API
      .then(res => res.json())
      .then(data => {
        const credentialLabels = data.map(
          (item: any) => item.credential_title || 'Unknown'
        )

        const costData = data.map((item: any) =>
          Math.round(Number(item.avg_cost))
        )

        setLabels(credentialLabels)
        setSeries(costData)
      })
  }, [])

  const options: ApexOptions = {
    chart: {
      type: 'pie'
    },
    labels,
    tooltip: {
      y: {
        formatter: (val: number) => `$${val.toLocaleString()}`
      }
    },
    legend: {
      position: 'bottom'
    },
    dataLabels: {
      formatter: (val: number) => `${val.toFixed(1)}%`
    }
  }

  return (
    <Card>
      <div className="card-header">
        <h4 className="header-title mb-1">
          Average Tuition Cost by Credential Level
        </h4>
        <p className="text-muted mb-0" style={{ fontSize: '13px' }}>
          Displays the average yearly tuition cost across different degree types.
        </p>
      </div>

      <CardBody>
        <ApexChartClient
          options={options}
          series={series}
          type="pie"
          height={350}
        />
      </CardBody>
    </Card>
  )
}

export default CostPieChart