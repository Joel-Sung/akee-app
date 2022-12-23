import TitleLayout from '../components/layout/TitleLayout';
import CollectionRankingTable from '../components/table/CollectionRankingTable';

export default function HomePage({ }) {
  return (
    <TitleLayout currLink={'top'}>
      <CollectionRankingTable />
    </TitleLayout>
  );
};
