import PropTypes from 'prop-types'
import { useState } from 'react'

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

  const checkValueType = (a, b) => {
    if (typeof a === 'string') {
      return orderStringsByFirstOrLast(a, b)
    } else {
      return orderByFirstOrLast(a, b)
    }
  }

  const orderByFirstOrLast = (a, b) => {
    if (orderFirst) {
      return a - b
    } else {
      return b - a
    }
  }

  const orderStringsByFirstOrLast = (a, b) => {
    if (orderFirst) {
      return a.localeCompare(b) - b.localeCompare(a)
    } else {
      return b.localeCompare(a) - a.localeCompare(b)
    }
  }

  data.sort((a, b) => {
    const [fieldA] = a.fields.filter(f => f.fieldName === sortField)
    const [fieldB] = b.fields.filter(f => f.fieldName === sortField)
    const valueA = fieldA?.fieldValue
    const valueB = fieldB?.fieldValue

    return checkValueType(valueA, valueB)
  })

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
    return data.map(d => {
      const isMatch = d.fields.some(f => {
        return Object.values(f).some(value => {
          return value.toString().toLowerCase().includes(searchItem.toLowerCase())
        })
      })

      if (isMatch) {
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
      }
    })
  }

  return (
    <>
      <div className='overflow-y-auto'>
        <Table>
          <TableHeader className="bg-primary sticky">
            <TableRow >
              {displayTableColumns()}
            </TableRow>
          </TableHeader>
          <TableBody>
            {displayTableRows()}
          </TableBody>
        </Table>
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
