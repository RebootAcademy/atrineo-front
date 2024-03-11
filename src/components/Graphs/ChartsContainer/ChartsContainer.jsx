import BarPlot from '@/components/Graphs/BarPlot/BarPlot'
import PieChart from '@/components/Graphs/PieChart/PieChart'
import { Label } from '@/components/ui/Label/Label'

import PropTypes from 'prop-types'

function ChartsContainer({ chartType, commonProps, fields }) {
  const displayChart = () => {
    switch(chartType) {
    case ('bar'):
      return <BarPlot {...commonProps} />
    case ('pie'):
      return <PieChart {...commonProps} fields={fields} />
    default:
      return (
        <div className="w-full h-full mr-4 border-solid border-gray border-[1px] rounded-sm pt-4 pl-4">
          <Label className="text-lg">
            Preview Chart
          </Label>
          <BarPlot {...commonProps} />
        </div>
      )
    }
  }
  return (
    <div className='w-full'>
      {displayChart()}
    </div>
  )
}

ChartsContainer.propTypes = {
  chartType: PropTypes.string.isRequired,
  commonProps: PropTypes.object,
  fields: PropTypes.array
}

export default ChartsContainer