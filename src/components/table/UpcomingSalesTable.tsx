import { Stack } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { getUpcomingSales } from '../../api/home/homeCalls';
import { dateStringToDate, getCurrentDate, getDateTimeString, getDiffInDates, getDiffInMilliSeconds } from '../../utils/datetime';
import { spacingMedium, spacingSmall } from '../../utils/format';
import { DiscordLink, TwitterLink, WebLink } from '../util/Link';
import MyDataGrid from './DataGrid';
import DataGridBar from './DataGridBar';

export default function UpcomingSalesTable({}) {
  const [rows, setRows] = useState<any[]>([]);

  const columns = [ 
    { field: 'Project', flex: 1.2, renderCell: (params:any) => {
      return (
        <Stack flexWrap='wrap' spacing={spacingSmall}>

          <Stack direction='row' spacing={spacingSmall} alignItems='Center'>
            <Typography>{params.row.name}</Typography>
            <Typography variant='caption'
              className={`
                text-gray bg-gray-500 py-1 px-2 rounded
              `}
            >
              {params.row.platform}
            </Typography>
          </Stack>

          <Typography color='darkgrey' variant='caption'>
            {params.row.desription}
          </Typography>

        </Stack>
      )},
      sortable: false,
    },
    { field: 'Links', flex: 0.3, renderCell: (params:any) => {
      return (
        <Stack alignItems='center'>
          <DiscordLink href={params.row.discord} />
          <TwitterLink href={params.row.twitter} />
          <WebLink href={params.row.website} />
        </Stack>
      )},
      sortable: false,
    },
    { field: 'Starts in', flex: 0.7, renderCell: (params:any) => {
      return (
        <Stack>
          <Typography>
            {getDiffInDates(getCurrentDate(), dateStringToDate(params.row.dateTime))}
          </Typography>
          <Typography variant='caption' color='grey'>
            {getDateTimeString(dateStringToDate(params.row.dateTime))}
          </Typography>
        </Stack>
      )},
      sortable: false,
    },
    { field: 'Sale Info', flex: 0.7, renderCell: (params:any) => {
      return (
        <Stack>
          {params.row.presalePrice !== '' && 
            <Typography>
              Pre-sale: {params.row.presalePrice}
            </Typography>
          }
          {params.row.mintPrice !== '' && 
            <Typography>
              Sale: {params.row.mintPrice}
            </Typography>
          }
        </Stack> 
      )},
      sortable: false,
    },
    { field: 'Preview', flex: 1.5, renderCell: (params:any) => {
      return (
        <Stack direction='row'>
          {params.row.preview.split(',').map((item:any, index:number) => {
              return (
                <img src={item} alt={item} key={index} 
                  height={100} width={100}
                />
              )
            })
          }
        </Stack> 
      )},
      sortable: false,
    },
  ];

  const [rowCount, setRowCount] = useState<number>(50);
  const rowCounts = [
    {value: 25, text: '25'},
    {value: 50, text: '50'},
    {value: 100, text: '100'},
  ];

  const [page, setPage] = useState<number>(1);
  const [expandRows, setExpandRows] = useState<boolean>(false);
  const [rowHeight, setRowHeight] = useState<number | undefined>(100);
  function handleExpandRows() {
    if (expandRows) {
      setExpandRows(false);
      setRowHeight(100);
    } else {
      setExpandRows(true);
      setRowHeight(undefined);
    }

  }
  
  useEffect(() => {
    async function fetchData() {
      const start = (page - 1) * rowCount + 1;
      const limit = rowCount;
      await getUpcomingSales(start, limit).then((responseJSON) => {
        setRows(responseJSON.data.upcomings.map((item:any, index:number) => ({
          id: index,
          'Starts In': getDiffInMilliSeconds(getCurrentDate(), dateStringToDate(item.dateTime)),
          name: item.name,
          platform: item.platform,
          desription: item.description,
          discord: item.discord,
          twitter: item.twitter,
          website: item.website,
          dateTime: item.dateTime,
          presalePrice: item.presalePrice,
          mintPrice: item.mintPrice,
          preview: item.preview,
        })));
      });
    }
    fetchData();
  }, [rowCount, page]);

  return (
    <Stack spacing={spacingMedium}>
      
      <Stack>
        <DataGridBar
          rowCount={rowCount}
          rowCounts={rowCounts}
          setRowCount={setRowCount}
          page={page}
          handleIncPage={() => setPage(page + 1)}
          handleDecPage={() => page > 1 ? setPage(page - 1) : {}}
          showRange={false}
          expandRows={handleExpandRows}
          showExpand={true}
        />
      </Stack>

      <MyDataGrid
        rows={rows}
        cols={columns}
        rowCount={rowCount}
        initialSort={[{field: 'Starts In', sort: 'asc'}]}
        disablePagination={true}
        expandRows={expandRows}
        rowHeight={rowHeight}
      />
      
    </Stack>
  );
}
