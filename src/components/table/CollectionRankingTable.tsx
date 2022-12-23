import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getCollectionRanking } from '../../api/collection/homeCalls';
import SortableTable, { HeadCell } from './SortableTable';

const headCells: HeadCell[] = [
  {
    id: 'name',
    label: 'Collection',
  },
  {
    id: 'volume24h',
    label: 'Volume(24H)',
  },
  {
    id: 'saleNum24h',
    label: 'Sales(24H)',
  },
  {
    id: 'marketCap',
    label: 'Market Cap',
  },
  {
    id: 'whaleNum',
    label: 'Whales',
  },
];

const bodyCells: string[] = [
  'name',
  'volume24h',
  'saleNum24h',
  'marketCap',
  'whaleNum',
]

export default function CollectionRankingTable({ }) {
  const [rows, setRows] = useState([]);
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      const responseJSON = await getCollectionRanking();
      setRows(responseJSON.data.list);
    }
    fetchData();
  }, []);

  return (
    <SortableTable
      rows={rows}
      headCells={headCells}
      bodyCells={bodyCells}
      rowKey='id'
      defaultOrderBy='volume24h'
      defaultRowsPerPage={10}
      rowsPerPageOptions={[10,25,50]}
      onRowClick={(cid) => {
        router.push({
          pathname: '/[collection]',
          query: { collection: cid },
        })
      }}
    />
  );
};
