import { Divider, Stack, Typography } from "@mui/material";
import type { TimeRange } from "../../types/collectionTypes/collectionTypes";
import { spacingMedium } from "../../utils/format";
import type { BarButtonType} from "../bar/SelectionBar";
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
    <Stack direction='row' justifyContent='space-between'>

        <Stack direction='row' spacing={spacingMedium}>

          {showRowCount &&
            rowCount && rowCounts && setRowCount &&
            <Stack direction='row' alignItems='center' spacing={spacingMedium}>
              <Typography>Show Rows: </Typography>
              <DropDown
                currValue={rowCount}
                menuItems={rowCounts}
                handleChange={setRowCount}
              />
            </Stack>
          }

          <Divider />
          
          {showPage &&
            page && handleIncPage && handleDecPage &&
            <Stack direction='row' alignItems='center'>
              <Typography>Page: </Typography>
              <Incrementer
                currValue={page}
                handleInc={handleIncPage}
                handleDec={handleDecPage}
              />
            </Stack>
          }

          {showExpand &&
            expandRows &&
            <TextButton onClick={expandRows}>Expand Rows</TextButton>
          }

        </Stack>

        {showRange &&
          tableRange && rangeSelections && handleSetTableRange &&
          <SelectionBar
            currSelection={tableRange}
            selections={rangeSelections}
            handleChange={handleSetTableRange}
          />
        }

      </Stack>
  )
}