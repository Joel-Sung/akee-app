import { Paper } from '@mui/material';
import { DataGrid, GridColDef, GridEventListener, GridSortItem, GridToolbar } from '@mui/x-data-grid';
import { useState } from 'react';
import { paperElevation } from '../../utils/format';

interface MyDataGridProps {
  rows: any[];
  cols: GridColDef[];
  rowCount?: number;
  onPageSizeChange?: (newPageSize: number) => void;
  onPageChange?: (newPage: number) => void;
  initialSort?: GridSortItem[];
  disablePagination?: boolean;
  handleRowClick?: GridEventListener<'rowClick'>;
}
export default function MyDataGrid(props: MyDataGridProps) {
  const {
    rows,
    cols,
    rowCount = 50,
    onPageSizeChange = () => {},
    onPageChange = () => {},
    initialSort = [],
    disablePagination = false,
    handleRowClick = () => {},
  } = props;
  
  const [pageSize, setPageSize] = useState<number>(rowCount);
  function onPageSizeChangeDefault(newPageSize: number) {
    onPageSizeChange(newPageSize);
    setPageSize(newPageSize);
  }
  
  // const handleEvent: GridEventListener<'rowClick'> = (
  //   params, // GridRowParams
  //   event, // MuiEvent<React.MouseEvent<HTMLElement>>
  //   details, // GridCallbackDetails
  // ) => {
  //   console.log(`Movie "${params.row.title}" clicked`);
  // };

  return (
    <Paper elevation={paperElevation}>
      <DataGrid
        rows={rows}
        columns={cols}
        autoHeight
        disableColumnFilter
        disableColumnSelector
        disableDensitySelector
        components={{ 
          Toolbar: GridToolbar,
          Pagination: disablePagination ? null : undefined,
        }}
        componentsProps={{
          toolbar: {
            csvOptions: { disableToolbarButton: true },
            printOptions: { disableToolbarButton: true },
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 },
          },
        }}
        onRowClick={handleRowClick}
        pageSize={pageSize}
        onPageSizeChange={onPageSizeChangeDefault}
        onPageChange={onPageChange}
        initialState={{
          sorting: {
            sortModel: initialSort,
          },
        }}
      />
    </Paper>
  );
}
