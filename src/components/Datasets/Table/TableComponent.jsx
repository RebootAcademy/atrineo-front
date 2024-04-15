import PropTypes from 'prop-types'
import { useState, useMemo } from 'react'
import CustomButton from '@/components/CustomButton/CustomButton'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "../../ui/Table/table"

import { UpArrow, DownArrow } from '../../ui/Icons/Icons'

function TableComponent({ data, hiddenColumns, searchItem='' }) {
  const fields = data && data.length > 0 ? data[0].fields : []
  const [sortField, setSortField] = useState(fields[0]?.fieldName)
  const [orderFirst, setOrderFirst] = useState(true)
  const [currentPage, setCurrentPage] = useState(0)
  const itemsPerPage = 10

  const sortedData = useMemo(() => {
    const orderByFirstOrLast = (a, b) => {
      if (orderFirst) {
        return a - b
      } else {
        return b - a
      }
    }

    const orderStringsByFirstOrLast = (a, b) => {
      if (orderFirst) {
        return a.localeCompare(b)
      } else {
        return b.localeCompare(a)
      }
    }
    const checkValueType = (a, b) => {
      if (typeof a === 'string') {
        return orderStringsByFirstOrLast(a, b)
      } else {
        return orderByFirstOrLast(a, b)
      }
    }

    const sorted = [...data].sort((a, b) => {
      const [fieldA] = a.fields.filter(f => f.fieldName === sortField)
      const [fieldB] = b.fields.filter(f => f.fieldName === sortField)
      const valueA = fieldA?.fieldValue
      const valueB = fieldB?.fieldValue
      return checkValueType(valueA, valueB)
    })

    return sorted
  }, [data, sortField, orderFirst])

  const selectField = (e) => {
    if (e.target.innerText === sortField) {
      setOrderFirst(!orderFirst)
    } else {
      setSortField(e.target.innerText)
    }
  }

  const displayData = (value) => {
    return typeof value !== 'boolean' ?
      value :
      value ? 'true' : 'false'
  }

  let totalPages = Math.ceil(sortedData.length / itemsPerPage)

  const goToFirstPage = () => {
    setCurrentPage(0)
  }

  const goToPreviousPage = () => {
    setCurrentPage(prevPage => Math.max(prevPage - 1, 0))
  }

  const goToNextPage = () => {
    setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages - 1))
  }

  const goToLastPage = () => {
    setCurrentPage(totalPages - 1)
  }

  const displayTableColumns = () => {
    return fields.map(f => {
      if (!hiddenColumns.includes(f.fieldName)) {
        return (
          <TableHead
            key={f._id + f.fieldName}
            className='text-white font-bold text-center'
            id={f.fieldName}
            onClick={selectField}
          >
            <>
              <div className='flex'>
                {sortField === f.fieldName && orderFirst ? <UpArrow /> : <DownArrow />}
                {f.fieldName}
              </div>
            </>
          </TableHead>
        )
      }
    })
  }

  const displayTableRows = () => {
    const filteredData = sortedData.filter(d =>
      d.fields.some(f =>
        Object.values(f).some(value =>
          value?.toString().toLowerCase().includes(searchItem.toLowerCase())
        )
      )
    )

    const startIndex = currentPage * itemsPerPage
    const paginatedFilteredData = filteredData.slice(startIndex, startIndex + itemsPerPage)
    totalPages = Math.ceil(filteredData.length / itemsPerPage)

    return paginatedFilteredData.map(d => {
      return (
        <TableRow key={d._id} className=''>
          {d.fields.map((f, i) => {
            if (!hiddenColumns.includes(f.fieldName)) {
              const isNumeric = typeof f.fieldValue === 'number'
              const isBool = typeof f.fieldValue === 'boolean'
              let className = isNumeric ? 'text-right' : 'min-w-20'
              className = isBool ? 'text-center' : className
              return (
                <TableCell key={i}>
                  <div className={className}>
                    {displayData(f.fieldValue)}
                  </div>
                </TableCell>
              )
            }
          })}
        </TableRow>
      )
    })
  }

  return (
    <>
      <div className={`overflow-auto mx-4`}>
        <Table className="h-2">
          <TableHeader className="bg-primary sticky top-0">
            <TableRow >
              {displayTableColumns()}
            </TableRow>
          </TableHeader>
          <TableBody>
            {displayTableRows()}
          </TableBody>
        </Table>
      </div>
      <div className="flex flex-col items-center md:flex-row md:justify-end my-4 h-12 sticky bottom-0 bg-white w-full">
        <CustomButton
          variant="narrow" 
          fn={goToFirstPage} 
          text="First" 
          disabled={currentPage === 0} 
        />
        <CustomButton
          variant="narrow"
          fn={goToPreviousPage} 
          text="Previous" 
          disabled={currentPage === 0} 
        />
        <span className="mx-4 flex a">
          Page {currentPage + 1} of {totalPages}
        </span>
        <CustomButton 
          variant="narrow"
          fn={goToNextPage} 
          text="Next" 
          disabled={currentPage === totalPages - 1} 
        />
        <CustomButton 
          variant="narrow"
          fn={goToLastPage} 
          text="Last" 
          disabled={currentPage === totalPages - 1} 
        />
      </div>
    </>
  )
}

TableComponent.propTypes = {
  data: PropTypes.array,
  columnNames: PropTypes.array,
  hiddenColumns: PropTypes.array,
  searchItem: PropTypes.string
}

export default TableComponent
