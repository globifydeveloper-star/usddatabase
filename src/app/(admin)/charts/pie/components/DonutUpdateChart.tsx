"use client"
import ApexChartClient from "@/components/ApexChartClient"
import ComponentContainerCard from "@/components/ComponentContainerCard"
import { useState } from "react"
import { Button } from "react-bootstrap"
import { donutUpdateOpts } from "../data"

const DonutUpdateChart = () => {
  const [data, setData] = useState([44, 55, 13, 33])

  function appendData() {
    const arr = data.map(function () {
      return Math.floor(Math.random() * (100 - 1 + 1)) + 1
    })
    arr.push(Math.floor(Math.random() * (100 - 1 + 1)) + 1)
    return setData(arr)
  }

  function removeData() {
    const arr = data.map(function () {
      return Math.floor(Math.random() * (100 - 1 + 1)) + 1
    })
    arr.pop()
    return setData(arr)
  }

  function randomize() {
    return setData(
      data.map(function () {
        return Math.floor(Math.random() * (100 - 1 + 1)) + 1
      }),
    )
  }

  function reset() {
    return setData([44, 55, 13, 33])
  }
  return (
    <ComponentContainerCard title="Donut Update">
      <ApexChartClient height={320} options={donutUpdateOpts} series={data} type="donut" />
      <div className="text-center mt-2 flex-centered gap-1">
        <Button variant="primary" size="sm" onClick={randomize}>
          RANDOMIZE
        </Button>
        &nbsp;
        <Button variant="primary" size="sm" onClick={appendData}>
          ADD
        </Button>
        &nbsp;
        <Button variant="primary" size="sm" onClick={removeData}>
          REMOVE
        </Button>
        &nbsp;
        <Button variant="primary" size="sm" onClick={reset}>
          RESET
        </Button>
      </div>
    </ComponentContainerCard>
  )
}

export default DonutUpdateChart