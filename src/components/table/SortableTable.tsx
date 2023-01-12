import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TableSortLabel } from "@mui/material";
import { visuallyHidden } from "@mui/utils";
import type { ChangeEvent, Key, MouseEvent } from "react";
import { useState } from "react";
import type { Order } from "../../utils/array";
import { getComparator, stableSort } from "../../utils/array";
import { paddingSmall, paperElevation } from "../../utils/format";

export interface HeadCell {
  id: string;
  label: string;
}

interface EnhancedTableProps {
  headCells: HeadCell[];
  onRequestSort: (event: MouseEvent<unknown>, property: string) => void;
  order: Order;
  orderBy: Key | undefined;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { headCells, order, orderBy, onRequestSort } =
    props;
  const createSortHandler =
    (property: string) => (event: MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

interface SortableTableProps {
  rows: any[];
  headCells: HeadCell[];
  bodyCells: Key[];
  rowKey: Key;
  defaultOrderBy?: Key;
  defaultRowsPerPage?: number;
  rowsPerPageOptions?: number[];
  onRowClick?: (rowId:any) => void;
}
export default function SortableTable(props: SortableTableProps) {
  const {
    rows,
    headCells,
    bodyCells,
    rowKey,
    defaultOrderBy = bodyCells.length > 0 ? bodyCells[0] : 0,
    defaultRowsPerPage = 5,
    rowsPerPageOptions = [5,10,25],
    onRowClick = () => undefined,
  } = props;

  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState(defaultOrderBy);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(defaultRowsPerPage);

  const handleRequestSort = (
    event: MouseEvent<unknown>,
    property: string,
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <Box padding={paddingSmall} sx={{ width: '100%' }} >
      <Paper elevation={paperElevation} sx={{ width: '100%' }}>
        <TableContainer>
          <Table>
            <EnhancedTableHead
              headCells={headCells}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  return (
                    <TableRow
                      hover
                      key={row[rowKey]}
                      onClick={() => onRowClick(row[rowKey])}
                    >
                      {bodyCells.map((objKey, index) => 
                        (<TableCell key={index}>{row[objKey]}</TableCell>)
                      )}
                    </TableRow>
                  );
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 53 * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={rowsPerPageOptions}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}