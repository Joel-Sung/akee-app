import { Stack } from "@mui/material";
import type {
  GridEventListener,
  GridValueFormatterParams,
} from "@mui/x-data-grid";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  getCollectionRanking,
  getFloorPrice7d,
  getVolume7d,
} from "../../api/home/homeCalls";
import type { TimeRange } from "../../types/collectionTypes/collectionTypes";
import type { CollectionData } from "../../types/collectionTypes/homeTypes";
import { isDownwardTrend, printTimeRange } from "../../utils/chart";
import { myColors } from "../../utils/color";
import { msArrayToDateTimeStringArray } from "../../utils/datetime";
import { spacingMedium } from "../../utils/format";
import { shortenNumber } from "../../utils/numbers";
import type { BarButtonType } from "../bar/SelectionBar";
import TableCellChart from "../chart/TableCellChart";
import MyDataGrid from "./DataGrid";
import DataGridBar from "./DataGridBar";

const rangeSelections: BarButtonType<TimeRange>[] = [
  { value: "1h", text: "1H" },
  { value: "6h", text: "6H" },
  { value: "12h", text: "12H" },
  { value: "24h", text: "24H" },
  { value: "7d", text: "7D" },
  { value: "30d", text: "30D" },
];

const numberCellFormatter = (cell: GridValueFormatterParams) =>
  cell.value === undefined ? "-" : shortenNumber(cell.value);

interface CollectionRankingTableProps {
  initialRange?: TimeRange;
}
export default function CollectionRankingTable(
  props: CollectionRankingTableProps
) {
  const { initialRange = "24h" } = props;

  const [tableRange, setTableRange] = useState<TimeRange>(initialRange);
  const tableRangeDisplay = printTimeRange(tableRange);
  const [rows, setRows] = useState<any[]>([]);

  const columns = [
    {
      field: "#",
      flex: 0.1,
      headerAlign: "center" as const,
      align: "center" as const,
    },
    { field: "Collection", flex: 1 },
    {
      field: `Volume(${tableRangeDisplay})`,
      flex: 1,
      valueFormatter: numberCellFormatter,
    },
    { field: "Floor Price", flex: 1 },
    {
      field: `Sales(${tableRangeDisplay})`,
      flex: 1,
      valueFormatter: numberCellFormatter,
    },
    { field: "Market Cap", flex: 1, valueFormatter: numberCellFormatter },
    {
      field: "Volume (7D)",
      flex: 1,
      renderCell: (params: any) => {
        return (
          <TableCellChart
            chartType="bar"
            labels={msArrayToDateTimeStringArray(params.row.volume7dLabels)}
            data={params.row.volume7dData}
          />
        );
      },
    },
    {
      field: "Floor Price (7D)",
      flex: 1,
      renderCell: (params: any) => {
        const isDownward = isDownwardTrend(params.row.floorPrice7dData);
        return (
          <TableCellChart
            chartType="line"
            labels={msArrayToDateTimeStringArray(params.row.floorPrice7dLabels)}
            data={params.row.floorPrice7dData}
            showLine={true}
            borderColor={isDownward ? myColors.red : myColors.green}
            backgroundColor={
              isDownward ? myColors.lightRed : myColors.lightGreen
            }
          />
        );
      },
    },
  ];

  const [rowCount, setRowCount] = useState<number>(50);
  const rowCounts = [
    { value: 25, text: "25" },
    { value: 50, text: "50" },
    { value: 100, text: "100" },
  ];

  const [page, setPage] = useState<number>(1);

  const router = useRouter();
  const goToCollection: GridEventListener<"rowClick"> = (params) => {
    router.push({
      pathname: `/[collection]`,
      query: {
        collection: params.row.Collection.toLowerCase().replaceAll(" ", "-"),
      },
    });
  };

  useEffect(() => {
    async function fetchData() {
      const offset = (page - 1) * rowCount;
      const limit = rowCount;
      await getCollectionRanking(tableRange, offset, limit).then(
        (responseJSON) => {
          const cidList = responseJSON.data.list.map(
            (item: CollectionData) => item.id
          );
          getVolume7d(cidList).then((resVol) => {
            getFloorPrice7d(cidList).then((resFloor) => {
              setRows(
                responseJSON.data.list.map((item: any, index: number) => ({
                  id: index,
                  cid: item.id,
                  "#": offset + index + 1,
                  Collection: item.name,
                  [`Volume(${tableRangeDisplay})`]:
                    item[`volumeEth${tableRange == "all" ? "" : tableRange}`],
                  "Floor Price":
                    item.floorPrice === null ? "-" : item.floorPrice.tokenPrice,
                  [`Sales(${tableRangeDisplay})`]:
                    item[`saleNum${tableRange == "all" ? "" : tableRange}`],
                  "Market Cap": item.marketCapEth,
                  volume7dLabels:
                    resVol === undefined ? [] : resVol.data.data[index]?.x,
                  volume7dData:
                    resVol === undefined ? [] : resVol.data.data[index]?.y,
                  floorPrice7dLabels:
                    resFloor === undefined ? [] : resFloor.data.data[index]?.x,
                  floorPrice7dData:
                    resFloor === undefined ? [] : resFloor.data.data[index]?.y,
                }))
              );
            });
          });
        }
      );
    }
    fetchData();
  }, [tableRange, rowCount, page]);

  return (
    <Stack spacing={spacingMedium}>
      <DataGridBar
        rowCount={rowCount}
        rowCounts={rowCounts}
        setRowCount={setRowCount}
        page={page}
        handleIncPage={() => setPage(page + 1)}
        handleDecPage={() => (page > 1 ? setPage(page - 1) : {})}
        tableRange={tableRange}
        rangeSelections={rangeSelections}
        handleSetTableRange={setTableRange}
      />

      <MyDataGrid
        rows={rows}
        cols={columns}
        rowCount={rowCount}
        initialSort={[{ field: `Volume(${tableRangeDisplay})`, sort: "desc" }]}
        disablePagination={true}
        handleRowClick={goToCollection}
      />
    </Stack>
  );
}
