import { Paper } from "@mui/material";
import type {
  GridColDef,
  GridEventListener,
  GridSortItem,
} from "@mui/x-data-grid";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { paperElevation } from "../../utils/format";

interface MyDataGridProps {
  rows: any[];
  cols: GridColDef[];
  rowCount?: number;
  onPageSizeChange?: (newPageSize: number) => void;
  onPageChange?: (newPage: number) => void;
  initialSort?: GridSortItem[];
  disablePagination?: boolean;
  handleRowClick?: GridEventListener<"rowClick">;
  expandRows?: boolean;
  rowHeight?: number;
}
export default function MyDataGrid(props: MyDataGridProps) {
  const {
    rows,
    cols,
    rowCount = 50,
    initialSort = [],
    disablePagination = false,
    handleRowClick = () => undefined,
    expandRows = false,
    rowHeight = undefined,
  } = props;

  for (let i = 0; i < cols.length; i++) {
    cols[i]!.minWidth = 125;
  }

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
        pageSize={rowCount}
        initialState={{
          sorting: {
            sortModel: initialSort,
          },
        }}
        getRowHeight={() => (expandRows ? "auto" : rowHeight)}
      />
    </Paper>
  );
}
