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

function TableComponent ({ data }) {
  const fields = data && data.length > 0 ? data[0].fields : []

  const [sortField, setSortField] = useState(fields[0]?.fieldName)
  const [orderFirst, setOrderFirst] = useState(true)

  const checkValueType = (a,b) => {
    if (typeof a === 'string') {
      return orderStringsByFirstOrLast(a,b)
    } else {
      return orderByFirstOrLast(a,b)
    }
  }

  const orderByFirstOrLast = (a,b) => {
    if (orderFirst) {
      return a- b
    } else {
      return b - a
    }
  }

  const orderStringsByFirstOrLast = (a,b) => {
    if (orderFirst) {
      return a.localeCompare(b) - b.localeCompare(a)
    } else {
      return b.localeCompare(a) - a.localeCompare(b)
    }
  }

  data.sort((a,b) => {
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

  const displayTableColumns = () => {
    return fields.map(f =>
      <TableHead
        key={f._id + f.fieldName}
        className='text-white font-bold text-center'
        id={f.fieldName}
        onClick={selectField}
      >
        {f.fieldName}
      </TableHead>
    )
  }

  const displayData = (value) => {
    return typeof value !== 'boolean' ?
      value :
      value ? 'true' : 'false'
  }

  const displayTableRows = () => {
    return data.map(d => {
      return (
        <TableRow 
          key={d._id}
          className=''
        >
          {
            d.fields.map((f, i) => {
              const isNumeric = typeof f.fieldValue === 'number'
              const isBool = typeof f.fieldValue === 'boolean'
              let className = isNumeric ? 'text-right' : 'min-w-20'
              className = isBool ? 'text-center' : className
              return (
                <TableCell key={i}>
                  <div className={className}>
                    { displayData(f.fieldValue) }
                  </div>
                </TableCell>
              )
            })
          }
        </TableRow>
      )
    })
  }

  return (
    <Table>
      <TableHeader className="bg-primary sticky top-0 z-10">
        <TableRow >
          {
            displayTableColumns()
          }
        </TableRow>
      </TableHeader>
      <TableBody>
        {
          displayTableRows()
        }
      </TableBody>
    </Table>
  )
}

TableComponent.propTypes = {
  data: PropTypes.array
}

export default TableComponent