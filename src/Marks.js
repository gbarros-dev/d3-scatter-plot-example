export const Marks = ({ data, yScale, xScale, yValue, xValue, tooltipFormat, circleRadius }) =>
  data.map((d, i) => (
    <circle key={i} className='mark' cx={xScale(xValue(d))} cy={yScale(yValue(d))} r={circleRadius}>
      <title>{tooltipFormat(xValue(d))}</title>
    </circle>
  ))
