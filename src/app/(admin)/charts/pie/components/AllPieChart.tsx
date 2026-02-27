import ApexChartClient from '@/components/ApexChartClient'
import ComponentContainerCard from '@/components/ComponentContainerCard'
import { Col, Row } from 'react-bootstrap'
import {
    gradientDonutChartOpts,
    imagePieChartOpts,
    monochromePieChartOpts,
    patternedDonutChartOpts,
    simpleDonutChartOpts,
    simplePieChartOpts
} from '../data'
import DonutUpdateChart from './DonutUpdateChart'

const SimplePieChart = () => {
  return (
    <ComponentContainerCard title="Simple Pie Chart">
      <div dir="ltr">
        <ApexChartClient height={320} options={simplePieChartOpts} series={simplePieChartOpts.series} type="pie" className="apex-charts" />
      </div>
    </ComponentContainerCard>
  )
}

const SimpleDonutChart = () => {
  return (
    <ComponentContainerCard title="Simple Donut Chart">
      <div dir="ltr">
        <ApexChartClient height={320} options={simpleDonutChartOpts} series={simpleDonutChartOpts.series} type="donut" className="apex-charts" />
      </div>
    </ComponentContainerCard>
  )
}

const MonochromePieChart = () => {
  return (
    <ComponentContainerCard title="Monochrome Pie Chart">
      <div dir="ltr">
        <ApexChartClient height={320} options={monochromePieChartOpts} series={monochromePieChartOpts.series} type="pie" className="apex-charts" />
      </div>
    </ComponentContainerCard>
  )
}

const GradientDonutChart = () => {
  return (
    <ComponentContainerCard title="Gradient Donut Chart">
      <div dir="ltr">
        <ApexChartClient height={320} options={gradientDonutChartOpts} series={gradientDonutChartOpts.series} type="donut" className="apex-charts" />
      </div>
    </ComponentContainerCard>
  )
}

const PatternedDonutChart = () => {
  return (
    <ComponentContainerCard title="Patterned Donut Chart">
      <div dir="ltr">
        <ApexChartClient height={320} options={patternedDonutChartOpts} series={patternedDonutChartOpts.series} type="donut" className="apex-charts" />
      </div>
    </ComponentContainerCard>
  )
}

const ImagePieChart = () => {
  return (
    <ComponentContainerCard title="Pie Chart with Image fill">
      <div dir="ltr">
        <ApexChartClient height={320} options={imagePieChartOpts} series={imagePieChartOpts.series} type="pie" className="apex-charts" />
      </div>
    </ComponentContainerCard>
  )
}



const AllPieChart = () => {
  return (
    <>
      <Row>
        <Col xl={6}>
          <SimplePieChart />
        </Col>
        <Col xl={6}>
          <SimpleDonutChart />
        </Col>
      </Row>
      <Row>
        <Col xl={6}>
          <MonochromePieChart />
        </Col>
        <Col xl={6}>
          <GradientDonutChart />
        </Col>
      </Row>
      <Row>
        <Col xl={6}>
          <PatternedDonutChart />
        </Col>
        <Col xl={6}>
          <ImagePieChart />
        </Col>
      </Row>
      <Row>
        <Col xl={6}>
          <DonutUpdateChart />
        </Col>
      </Row>
    </>
  )
}

export default AllPieChart
