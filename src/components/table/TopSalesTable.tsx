import { Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { getTopSales } from '../../api/collection/analyticsCalls';
import { TopSale } from '../../types/collectionTypes/analyticsTypes';
import { TimeRange } from '../../types/collectionTypes/collectionTypes';
import { printTimeRange } from '../../utils/chart';
import { getCurrentDate, getDiffInDates, milliSecondsToDate } from '../../utils/datetime';
import { imgHeightSmall, imgWidthSmall, spacingMedium } from '../../utils/format';
import { BarButtonType, SelectionBar } from '../bar/SelectionBar';
import { ComponentContainer, ComponentHeader } from '../container/ComponentContainer';
import { ETHPrice } from '../util/Symbols';
import BasicTable from './BasicTable';

const barButtons: BarButtonType<TimeRange>[] = [
  {value: '24h', text: '24H'},
  {value: '7d', text: '7D'},
  {value: '30d', text: '30D'},
  {value: 'all', text: 'All'},
]

const tableHeaders: string[] = [
  '#',
  'NFT',
  'Owner',
  'Last Price',
  'Highest Price(24H)',
  'Sales(24H)',
  'Last Deal'
];

interface NFTCellProps {
  topSale: TopSale;
}
function NFTCell(props: NFTCellProps) {
  const {
    topSale,
  } = props;

  return (
    <Stack direction='row' spacing={spacingMedium}>
      <img 
        src={topSale.image} 
        width={imgWidthSmall}
        height={imgHeightSmall}
      />
      <Typography>{topSale.name}</Typography>
    </Stack>
  )
}

interface TopSalesTableProps {
  cid: string;
  initialRange?: TimeRange;
}
export default function TopSalesTable(props: TopSalesTableProps) {
  const { 
    cid, 
    initialRange = '24h',
  } = props;

  const [rows, setRows] = useState<any[]>([]);
  const [tableRange, setTableRange] = useState<TimeRange>(initialRange);

  useEffect(() => {
    async function fetchData() {
      await getTopSales(cid, tableRange).then((responseJSON) => {
        setRows(responseJSON.data.map((topSale: TopSale, index: number) => {
          return {
            id: index,
            data: [
              index < 9 ? `0${index + 1}` : index + 1,
              NFTCell({ topSale: topSale }),
              topSale.owners[0]?.tag.ensName === undefined 
                ? topSale.owners[0]?.tag.addr.substring(0, 8)
                : topSale.owners[0]?.tag.ensName,
              ETHPrice({ ethPrice: topSale.lastSale.ethPrice.toFixed(2) }),
              ETHPrice({ ethPrice: topSale.lastSale.ethPrice.toFixed(2) }),
              topSale.saleNum24h,
              getDiffInDates(getCurrentDate(), milliSecondsToDate(topSale.lastSale.timestamp)),
            ]
          }
        }));
      })
    }
    fetchData();
  }, [tableRange]);

  return (
    <ComponentContainer>
        
        <ComponentHeader>
          <Typography variant='h4'>Top Sales({printTimeRange(tableRange)})</Typography>
          <SelectionBar
            currSelection={tableRange}
            selections={barButtons}
            handleChange={(newRange: TimeRange) => {setTableRange(newRange)}}
          />
        </ComponentHeader>

        <BasicTable
          headers={tableHeaders}
          rows={rows}
        />
        
    </ComponentContainer>
  );
};
