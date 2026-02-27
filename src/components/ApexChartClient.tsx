"use client"
import type { ApexOptions } from 'apexcharts'
import React from 'react'
import ReactApexChart from 'react-apexcharts'

type ApexChartClientProps = {
  options: ApexOptions
  height?: number
  series: ApexOptions['series'],
  className?: string,
  type?: any,
}

const ApexChartClient = ({  options, series, height, className, type }: ApexChartClientProps) => {
  return (
    <ReactApexChart height={height} options={options} series={series} type={type ?? options.chart?.type} className={className} />
  )
}

export default ApexChartClient