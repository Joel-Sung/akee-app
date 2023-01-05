import { LinearProgress, Stack } from '@mui/material';
import Typography from '@mui/material/Typography';
import { GridValueFormatterParams } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { getTokenRanking } from '../../api/home/homeCalls';
import { TimeRange } from '../../types/collectionTypes/collectionTypes';
import { spacingMedium, spacingSmall } from '../../utils/format';
import { toMoney } from '../../utils/numbers';
import { BarButtonType, SelectionBar } from '../bar/SelectionBar';
import { DropDown } from '../util/DropDown';
import Incrementer from '../util/Incrementer';
import PercentageChange from '../util/PercentageChange';
import MyDataGrid from './DataGrid';

const rangeSelections: BarButtonType<TimeRange>[] = [
  {value: '24h', text: '24H'},
  {value: '7d', text: '7D'},
  {value: '30d', text: '30D'},
];

interface NFTRankingTableProps {
  initialRange?: TimeRange
}

const moneyCellFormatter = (cell: GridValueFormatterParams) => cell.value === undefined ? '-' : toMoney(cell.value);

export default function NFTRankingTable(props: NFTRankingTableProps) {
  const {
    initialRange = '24h'
  } = props;

  const [tableRange, setTableRange] = useState<TimeRange>(initialRange);
  const [rows, setRows] = useState<any[]>([]);

  const columns = [ 
    { field: '#', flex: 0.5 },
    { field: 'Name', flex: 1.5, renderCell: (params:any) => {
      return (
        <Stack direction='row' spacing={spacingSmall}>
          <Typography>{params.row.Name}</Typography>
          <Typography color='grey'>{params.row.symbol}</Typography>
        </Stack>
      )
    }},
    { field: 'Price', flex: 0.7,
      valueFormatter: moneyCellFormatter
    },
    { field: '1h%', flex: 0.7, renderCell: (params:any) => {
      return (
        <PercentageChange
          change={params.row['1h%']}
        /> 
      )
    }},
    { field: '24h%', flex: 0.7, renderCell: (params:any) => {
      return (
        <PercentageChange
          change={params.row['24h%']}
        /> 
      )
    }},
    { field: '7d%', flex: 0.7, renderCell: (params:any) => {
      return (
        <PercentageChange
          change={params.row['7d%']}
        /> 
      )
    }},
    { field: 'Market Cap', flex: 1,
      valueFormatter: moneyCellFormatter
    },
    { field: `Volume${tableRange}`, flex: 1,
      valueFormatter: moneyCellFormatter
    },
    { field: 'Circulating Supply', flex: 1.5, renderCell: (params:any) => {
      return (
        <Stack>
          <Typography>{params.row['Circulating Supply']}</Typography>
          <Stack direction='row' alignItems='center' spacing={spacingSmall}>
            <LinearProgress
              variant="determinate"
              value={params.row['Circulating Supply'] / params.row.totalSupply * 100}
              sx={{ width: 140 }}
            />
            <Typography variant='caption'>
              {((params.row['Circulating Supply'] / params.row.totalSupply) * 100).toFixed(2)}%
            </Typography>
          </Stack>
        </Stack>
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
  
  useEffect(() => {
    async function fetchData() {
      const start = (page - 1) * rowCount + 1;
      const limit = rowCount;
      await getTokenRanking(start, limit).then((responseJSON) => {
        setRows(responseJSON.data.cryptoCurrencyList.map((item:any, index:number) => ({
          id: index,
          '#': item.cmcRank,
          'Name': item.name,
          'Price': item.quotes[2].price,
          '1h%': item.quotes[2].percentChange1h,
          '24h%': item.quotes[2].percentChange24h,
          '7d%': item.quotes[2].percentChange7d,
          'Market Cap': item.quotes[2].marketCap,
          [`Volume${tableRange}`]: item.quotes[2][`volume${tableRange}`],
          'Circulating Supply': item.circulatingSupply,
          symbol: item.symbol,
          totalSupply: item.totalSupply,
        })));
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
        initialSort={[{field: '#', sort: 'asc'}]}
        disablePagination={true}
      />
      
    </Stack>
  );
};
