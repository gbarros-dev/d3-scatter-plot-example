import ReactDOM from 'react-dom'
import { scaleLinear, format, extent } from 'd3'

import './index.css'

import { AxisBottom } from './AxisBottom'
import { AxisLeft } from './AxisLeft'
import { Marks } from './Marks'
import { useData } from './useData'

const width = 960
const height = 500
const margin = { top: 20, right: 30, bottom: 65, left: 90 }
const xAxisLabelOffset = 50
const yAxisLabelOffset = 45

const App = () => {
  const data = useData()

  if (!data) {
    return <pre>Loading...</pre>
  }

  const innerHeight = height - margin.top - margin.bottom
  const innerWidth = width - margin.left - margin.right

  const xValue = (d) => d.sepal_length
  const xAxisLabel = 'Sepal Length'

  const yValue = (d) => d.sepal_width
  const yAxisLabel = 'Sepal Width'

  const siFormat = format('.2s')
  const xAxisTickFormat = (tickValue) => siFormat(tickValue).replace('G', 'B')

  const xScale = scaleLinear().domain(extent(data, xValue)).range([0, innerWidth]).nice()

  const yScale = scaleLinear().domain(extent(data, yValue)).range([0, innerHeight])

  return (
    <svg width={width} height={height}>
      <g transform={`translate(${margin.left},${margin.top})`}>
        <AxisBottom xScale={xScale} innerHeight={innerHeight} tickFormat={xAxisTickFormat} tickOffset={5} />
        <text className='axis-label' textAnchor='middle' transform={`translate(${-yAxisLabelOffset},${innerHeight / 2}) rotate(-90)`}>
          {yAxisLabel}
        </text>
        <AxisLeft yScale={yScale} innerWidth={innerWidth} tickOffset={5} />
        <text className='axis-label' x={innerWidth / 2} y={innerHeight + xAxisLabelOffset} textAnchor='middle'>
          {xAxisLabel}
        </text>
        <Marks data={data} yScale={yScale} xScale={xScale} yValue={yValue} xValue={xValue} tooltipFormat={xAxisTickFormat} circleRadius={7} />
      </g>
    </svg>
  )
}
const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)
