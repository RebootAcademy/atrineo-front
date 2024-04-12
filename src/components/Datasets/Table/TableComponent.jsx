import PropTypes from 'prop-types'
import { useState, useMemo } from 'react'
import { FixedSizeList as List } from 'react-window'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from "../../ui/Table/table"

import { UpArrow, DownArrow } from '../../ui/Icons/Icons'

function TableComponent({ data, hiddenColumns, searchItem='' }) {
  const fields = data && data.length > 0 ? data[0].fields : []
  const [sortField, setSortField] = useState(fields[0]?.fieldName)
  const [orderFirst, setOrderFirst] = useState(true)

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

    return data.sort((a, b) => {
      const [fieldA] = a.fields.filter(f => f.fieldName === sortField)
      const [fieldB] = b.fields.filter(f => f.fieldName === sortField)
      const valueA = fieldA?.fieldValue
      const valueB = fieldB?.fieldValue
      return checkValueType(valueA, valueB)
    })
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

  const Row = ({ index }) => {
    const d = sortedData[index]
    const isMatch = d.fields.some(f => {
      return Object.values(f).some(value => {
        return value?.toString().toLowerCase().includes(searchItem.toLowerCase())
      })
    })

    if (!isMatch) return null

    return (
      <>
        {
          index === 0 &&
          fields.map(f => {
            const isNumeric = typeof f.fieldValue === 'number'
            const isBool = typeof f.fieldValue === 'boolean'
            let className = isNumeric ? 'justify-end' : 'min-w-20'
            className = isBool ? 'text-center' : className
            return (
              !hiddenColumns.includes(f.fieldName) &&
              <TableHead
                key={f._id + f.fieldName}
                className='text-white font-bold text-center bg-primary sticky top-0'
                id={f.fieldName}
                onClick={selectField}
              >
                <>
                  <div className={`flex w-32 ${className}`}>
                    {sortField === f.fieldName && orderFirst ? <UpArrow /> : <DownArrow />}
                    {f.fieldName}
                  </div>
                </>
              </TableHead>
            )
          })
        }
        <TableRow>
          {d.fields.map((f, i) => {
            if (!hiddenColumns.includes(f.fieldName)) {
              const isNumeric = typeof f.fieldValue === 'number'
              const isBool = typeof f.fieldValue === 'boolean'
              let className = isNumeric ? 'text-right' : 'min-w-20'
              className = isBool ? 'text-center' : className
              return (
                <TableCell key={i} className="w-32">
                  <div className={className}>
                    {displayData(f.fieldValue)}
                  </div>
                </TableCell>
              )
            }
          })}
        </TableRow>
      </>
    )
  }

  Row.propTypes = {
    index: PropTypes.number,
    style: PropTypes.object
  }

  return (
    <>
      <div className='overflow-x-auto  mx-4 w-screen'>
        <Table>
          <TableBody>
            <List
              className='w-full'
              height={800}
              itemCount={sortedData.length}
              itemSize={35}
            >
              {Row}
            </List>
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
