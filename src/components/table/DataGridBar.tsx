import { Divider, Stack, Typography } from "@mui/material";
import { TimeRange } from "../../types/collectionTypes/collectionTypes";
import { spacingMedium } from "../../utils/format";
import { BarButtonType, SelectionBar } from "../bar/SelectionBar";
import { DropDown, menuItem } from "../util/DropDown";
import Incrementer from "../util/Incrementer";

interface DataGridBarProps {
  rowCount: number;
  rowCounts: menuItem[];
  setRowCount: (value: number) => void;
  page: number;
  handleIncPage: () => void;
  handleDecPage: () => void;
  tableRange: TimeRange;
  rangeSelections: BarButtonType<TimeRange>[];
  handleSetTableRange: (value: TimeRange) => void;
}
export default function DataGridBar(props: DataGridBarProps) {
  const {
    rowCount,
    rowCounts,
    setRowCount,
    page,
    handleIncPage,
    handleDecPage,
    tableRange,
    rangeSelections,
    handleSetTableRange,
  } = props;

  return (
    <Stack direction='row' justifyContent='space-between'>

        <Stack direction='row' spacing={spacingMedium}>

          <Stack direction='row' alignItems='center' spacing={spacingMedium}>
            <Typography>Show Rows: </Typography>
            <DropDown
              currValue={rowCount}
              menuItems={rowCounts}
              handleChange={setRowCount}
            />
          </Stack>

          <Divider />
          
          <Stack direction='row' alignItems='center'>
            <Typography>Page: </Typography>
            <Incrementer
              currValue={page}
              handleInc={handleIncPage}
              handleDec={handleDecPage}
            />
          </Stack>

        </Stack>

        <SelectionBar
          currSelection={tableRange}
          selections={rangeSelections}
          handleChange={handleSetTableRange}
        />

      </Stack>
  )
}