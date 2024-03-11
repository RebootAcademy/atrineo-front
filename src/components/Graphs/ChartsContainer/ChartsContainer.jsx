import BarPlot from '@/components/Graphs/BarPlot/BarPlot'
import PieChart from '@/components/Graphs/PieChart/PieChart'

import PropTypes from 'prop-types'
import StackPlot from '../StackPlot/StackPlot'

function ChartsContainer({ chartType, commonProps, fields }) {
  const displayChart = () => {
    switch (chartType) {
    case ('bar'):
      return <BarPlot {...commonProps} />
    case ('pie'):
      return <PieChart {...commonProps} fields={fields} />
    default:
      return (
        <>
          <StackPlot {...commonProps} />
        </>
      )
    }
  }
  return (
    <>
      {displayChart()}
    </>
  )
}

ChartsContainer.propTypes = {
  chartType: PropTypes.string.isRequired,
  commonProps: PropTypes.object,
  fields: PropTypes.array
}

export default ChartsContainer