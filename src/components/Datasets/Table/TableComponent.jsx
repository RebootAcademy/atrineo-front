import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "../../ui/Table/table"

function TableComponent ({data}) {
  const fields = data[0].fields
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {
            fields.map(f => <TableHead key={f._id}>{f.fieldName}</TableHead>)
          }
        </TableRow>
      </TableHeader>
      <TableBody>
        {
          data.map(d => {
            return (
              <TableRow key={d._id}>
                {
                  d.fields.map((f,i) => {
                    return (
                      <TableCell key={i}>
                        {
                          typeof f.fieldValue !== 'boolean' ?
                            f.fieldValue :
                            f.fieldValue ? 'true' : 'false'
                        }
                      </TableCell>
                    )
                  })
                }
              </TableRow>
            )
          })
        }
      </TableBody>
    </Table>
  )
}

export default TableComponent