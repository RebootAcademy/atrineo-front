import { useContext } from 'react'
import { GraphContext } from '@/context/graphContext'

import BarPlot from '@/components/Graphs/BarPlot/BarPlot'
import PieChart from '@/components/Graphs/PieChart/PieChart'
import ScatterPlot from '../ScatterPlot/ScatterPlot'
import HeatmapPlot from '../HeatmapPlot/HeatmapPlot'

import PropTypes from 'prop-types'

function ChartsContainer({ commonProps }) {
  const { graphs, deleteGraphById } = useContext(GraphContext)

  const handleDeleteGraph = (obj) => {
    deleteGraphById(obj.id)
  }

  const displayChart = (obj) => {
    switch (obj.data.chartType) {
    case ('bar'):
      return (
        <div key={obj.id} className='relative inline-block'>
          <BarPlot {...obj.data.ownProps} {...commonProps} />
          <button 
            className="absolute top-0 right-0 z-10 p-2 pr-4 text-lg  text-black rounded"
            onClick={() => handleDeleteGraph(obj)}
          >
            x
          </button>
        </div>
      )
    case ('pie'):
      return (
        <div key={obj.id} className='relative inline-block'>
          <PieChart {...obj.data.ownProps} {...commonProps} fields={obj.data.fields} />
          <button
            className="absolute top-0 right-0 z-10 p-2 pr-4 text-lg  text-black rounded"
            onClick={() => handleDeleteGraph(obj)}
          >
            x
          </button>
        </div>
      )
    case ('scatter'):
      return (
        <div key={obj.id} className='relative inline-block'>
          <ScatterPlot {...obj.data.ownProps} {...commonProps} />
          <button
            className="absolute top-0 right-0 z-10 p-2 pr-4 text-lg  text-black rounded"
            onClick={() => handleDeleteGraph(obj)}
          >
            x
          </button>
        </div>
      )
    case ('heatmap'):
      return (
        <div key={obj.id} className='relative inline-block'>
          <HeatmapPlot {...obj.data.ownProps} {...commonProps} />
          <button
            className="absolute top-0 right-0 z-10 p-2 pr-4 text-lg  text-black rounded"
            onClick={() => handleDeleteGraph(obj)}
          >
            x
          </button>
        </div>
      )
    default:
      return null
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