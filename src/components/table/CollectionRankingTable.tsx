import { Stack } from '@mui/material';
import { GridEventListener, GridValueFormatterParams } from '@mui/x-data-grid';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getCollectionRanking, getFloorPrice7d, getVolume7d } from '../../api/home/homeCalls';
import { TimeRange } from '../../types/collectionTypes/collectionTypes';
import { CollectionData } from '../../types/collectionTypes/homeTypes';
import { printTimeRange } from '../../utils/chart';
import { msArrayToDateTimeStringArray } from '../../utils/datetime';
import { spacingMedium } from '../../utils/format';
import { shortenNumber } from '../../utils/numbers';
import { BarButtonType, SelectionBar } from '../bar/SelectionBar';
import TableCellChart from '../chart/TableCellChart';
import { DropDown } from '../util/DropDown';
import Incrementer from '../util/Incrementer';
import MyDataGrid from './DataGrid';

const rangeSelections: BarButtonType<TimeRange>[] = [
  {value: '1h', text: '1H'},
  {value: '6h', text: '6H'},
  {value: '12h', text: '12H'},
  {value: '24h', text: '24H'},
  {value: '7d', text: '7D'},
  {value: '30d', text: '30D'},
  {value: '', text: 'ALL'},
];

const numberCellFormatter = (cell: GridValueFormatterParams) => shortenNumber(cell.value);

interface CollectionRankingTableProps {
  initialRange?: TimeRange
}
export default function CollectionRankingTable(props: CollectionRankingTableProps) {
  const {
    initialRange = '24h'
  } = props;

  const [tableRange, setTableRange] = useState<TimeRange>(initialRange);
  const tableRangeDisplay = printTimeRange(tableRange);
  const [rows, setRows] = useState<any[]>([]);

  const columns = [ 
    { field: '#', flex: 0.1 },
    { field: 'Collection', flex: 1 },
    { field: `Volume(${tableRangeDisplay})`, flex: 1, 
      valueFormatter: numberCellFormatter
    },
    { field: 'Floor Price', flex: 1 },
    { field: `Sales(${tableRangeDisplay})`, flex: 1,
      valueFormatter: numberCellFormatter 
    },
    { field: 'Market Cap', flex: 1,
      valueFormatter: numberCellFormatter
    },
    { field: 'Volume (7D)', flex: 1, renderCell: (params:any) => {
      return (
        <TableCellChart
          chartType='bar'
          labels={msArrayToDateTimeStringArray(params.row.volume7dLabels)}
          data={params.row.volume7dData}
        /> 
      )
    } },
    { field: 'Floor Price (7D)', flex: 1 , renderCell: (params:any) => {
      return (
        <TableCellChart
          chartType='line'
          labels={msArrayToDateTimeStringArray(params.row.floorPrice7dLabels)}
          data={params.row.floorPrice7dData}
          showLine={true}
        /> 
      )
    }},
  ];

  const [rowCount, setRowCount] = useState<number>(50);
  const rowCounts = [
    {value: 25, text: '25'},
    {value: 50, text: '50'},
    {value: 100, text: '100'},
  ];

  const [page, setPage] = useState<number>(1);

  const router = useRouter();
  const goToCollection: GridEventListener<'rowClick'> = (params) => {
    router.push({
      pathname: `/[collection]`,
      query: {collection: params.row.cid}
    })
  }
  
  useEffect(() => {
    async function fetchData() {
      const offset = (page - 1) * rowCount;
      const limit = rowCount;
      await getCollectionRanking(tableRange, offset, limit).then((responseJSON) => {
        const cidList = responseJSON.data.list.map((item: CollectionData) => item.id);
        getVolume7d(cidList).then((resVol) => {
          getFloorPrice7d(cidList).then((resFloor) => {
            setRows(responseJSON.data.list.map((item:any, index:number) => ({
              id: index,
              cid: item.id,
              '#': offset + index + 1,
              Collection: item.name,
              [`Volume(${tableRangeDisplay})`]: item[`volumeEth${tableRange}`],
              'Floor Price': item.floorPrice === null ? '-' : item.floorPrice.tokenPrice,
              [`Sales(${tableRangeDisplay})`]: item[`saleNum${tableRange}`],
              'Market Cap': item.marketCapEth,
              volume7dLabels: resVol === undefined ? [] : resVol.data.data[index]?.x,
              volume7dData: resVol === undefined ? [] : resVol.data.data[index]?.y,
              floorPrice7dLabels: resFloor === undefined ? [] : resFloor.data.data[index]?.x,
              floorPrice7dData: resFloor === undefined ? [] : resFloor.data.data[index]?.y,
            })));
          });
        });
      });
    }
    fetchData();
  }, [tableRange, rowCount, page]);

  return (
    <Stack spacing={spacingMedium}>
      
      <Stack direction='row' justifyContent='space-between'>

        <Stack direction='row' spacing={spacingMedium}>
          <DropDown
            currValue={rowCount}
            menuItems={rowCounts}
            handleChange={setRowCount}
          />
          <Incrementer
            currValue={page}
            handleInc={() => setPage(page + 1)}
            handleDec={() => page > 1 ? setPage(page - 1) : {}}
          />
        </Stack>

        <SelectionBar
          currSelection={tableRange}
          selections={rangeSelections}
          handleChange={setTableRange}
        />
      </Stack>

      <MyDataGrid
        rows={rows}
        cols={columns}
        rowCount={rowCount}
        initialSort={[{field: `Volume(${tableRangeDisplay})`, sort: 'desc'}]}
        disablePagination={true}
        handleRowClick={goToCollection}
      />
      
    </Stack>
  );
};
