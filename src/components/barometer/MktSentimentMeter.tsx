import { Typography } from '@mui/material';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { getMktSentiment } from '../../api/collection/overviewCalls';
import { ComponentContainer, ComponentHeader, ComponentMeter } from '../container/ComponentContainer';

export default function MktSentimentMeter({}) {
  const [mktSentiment, setMktSentiment] = useState<number>(0);

  const GaugeChart = dynamic(() => import('react-gauge-chart'), { ssr: false })

  useEffect(() => {
    async function fetchData() {
      await getMktSentiment().then((responseJSON) => {
        setMktSentiment(responseJSON.percentage);
      });
    }
    fetchData();
  }, []);

  return (
    <ComponentContainer>

      <ComponentHeader>
        <Typography variant="h4">Market Sentiment</Typography>
      </ComponentHeader>

      <ComponentMeter>
        <GaugeChart 
          id="mkt-sentiment-gauge"
          nrOfLevels={20}
          colors={['blue', 'green', 'yellow']}
          percent={mktSentiment}
          arcPadding={0.02}
        />
      </ComponentMeter>

    </ComponentContainer>
  )
}
