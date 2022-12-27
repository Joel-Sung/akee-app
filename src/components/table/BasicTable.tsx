import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

export type TableRow = {
  id: string| number;
  data: any[]
}
interface BasicTableProps {
  headers: string[];
  rows: TableRow[];
}
export default function BasicTable(props: BasicTableProps) {
  const {
    headers,
    rows,
  } = props;

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            {headers.map((header) => (
              <TableCell>{header}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.id}
            >
              {row.data.map((val) => (
                <TableCell>{val}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}