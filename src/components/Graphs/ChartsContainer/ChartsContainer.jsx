import BarPlot from '@/components/Graphs/BarPlot/BarPlot'
import PieChart from '@/components/Graphs/PieChart/PieChart'
import ScatterPlot from '../ScatterPlot/ScatterPlot'

import PropTypes from 'prop-types'
import { useContext } from 'react'
import { GraphContext } from '@/context/graphContext'

function ChartsContainer({ commonProps }) {
  const { graphs } = useContext(GraphContext)

  console.log(graphs)

  const displayChart = (obj) => {
    switch (obj.data.chartType) {
    case ('bar'):
      return <BarPlot key={obj.id} { ...obj.data.ownProps} {...commonProps} />
    case ('pie'):
      return <PieChart key={obj.id} {...obj.data.ownProps} {...commonProps} fields={obj.data.fields} />
    case ('scatter'):
      return <ScatterPlot key={obj.id} {...obj.data.ownProps} {...commonProps} />
    default:
      return (
        <>
          {/*           <BarPlot {...commonProps} /> */}
        </>
      )
    }
  }
  return (
    <>
      {graphs.map((obj, index) => displayChart(obj, index))}
    </>
  )
}

ChartsContainer.propTypes = {
  chartType: PropTypes.string.isRequired,
  commonProps: PropTypes.object,
  fields: PropTypes.array
}

export default ChartsContainer