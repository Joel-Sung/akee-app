import { Stack, Typography } from "@mui/material";
import type { TimeRange } from "../../types/collectionTypes/collectionTypes";
import { spacingMedium } from "../../utils/format";
import type { BarButtonType } from "../bar/SelectionBar";
import { SelectionBar } from "../bar/SelectionBar";
import { TextButton } from "../util/Button";
import type { menuItem } from "../util/DropDown";
import { DropDown } from "../util/DropDown";
import Incrementer from "../util/Incrementer";

interface DataGridBarProps {
  rowCount?: number;
  rowCounts?: menuItem[];
  setRowCount?: (value: number) => void;
  showRowCount?: boolean;
  page?: number;
  handleIncPage?: () => void;
  handleDecPage?: () => void;
  showPage?: boolean;
  expandRows?: () => void;
  showExpand?: boolean;
  tableRange?: TimeRange;
  rangeSelections?: BarButtonType<TimeRange>[];
  handleSetTableRange?: (value: TimeRange) => void;
  showRange?: boolean;
}
export default function DataGridBar(props: DataGridBarProps) {
  const {
    rowCount,
    rowCounts,
    setRowCount,
    showRowCount = true,
    page,
    handleIncPage,
    handleDecPage,
    showPage = true,
    expandRows,
    showExpand = false,
    tableRange,
    rangeSelections,
    handleSetTableRange,
    showRange = true,
  } = props;

  return (
    <div className="flex flex-col lg:flex-row lg:justify-between">
      <Stack direction="row" spacing={spacingMedium} className="mb-[2vh]">
        {showRowCount && rowCount && rowCounts && setRowCount && (
          <Stack direction="row" alignItems="center" spacing="1vw">
            <Typography>Show Rows: </Typography>
            <DropDown
              currValue={rowCount}
              menuItems={rowCounts}
              handleChange={setRowCount}
            />
          </Stack>
        )}
        {showPage && page && handleIncPage && handleDecPage && (
          <Stack direction="row" alignItems="center">
            <Typography className="mr-[1vw]">Page: </Typography>
            <Incrementer
              currValue={page}
              handleInc={handleIncPage}
              handleDec={handleDecPage}
            />
          </Stack>
        )}
        {showExpand && expandRows && (
          <TextButton onClick={expandRows}>Expand Rows</TextButton>
        )}
      </Stack>
      {showRange && tableRange && rangeSelections && handleSetTableRange && (
        <SelectionBar
          currSelection={tableRange}
          selections={rangeSelections}
          handleChange={handleSetTableRange}
        />
      )}
    </div>
  );
}
