import { Box, CircularProgress, createTheme, styled, ThemeProvider } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { Chart as ChartJS } from 'chart.js/auto';
// eslint-disable-next-line no-unused-vars
import { Line, Chart } from 'react-chartjs-2';
import { HistoricalChart } from '../Config/api';
import { CryptoState } from '../CryptoContext';
import SelectButton from './SelectButton';
import { chartDays } from '../Config/chartDays';

const GraphContainer = styled('div')(({ theme }) => ({
  width: '75%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: 15,
  padding: 30,
  [theme.breakpoints.down('1250')]: {
    width: '100%',
    marginTop: 0,
    padding: 10,
    paddingTop: 0,
  },
}))

const BtnBox = styled('div')(({ theme }) => ({
    display: 'flex',
    marginTop: 10,
    justifyContent: 'space-around',
    width: '100%',
    [theme.breakpoints.down('440')]:{
      flexDirection:'column',
      alignItems:'center',
      justifyContent:'center'
    }
}))

const CoinInfo = ({ coin }) => {


  const [historicalData, setHistoricalData] = useState();
  const [days, setDays] = useState(1);

  const { currency } = CryptoState();

  const fetchHistoricalData = async () => {
    const { data } = await axios.get(HistoricalChart(coin.id, days, currency));

    setHistoricalData(data.prices);

  }

  useEffect(() => {
    fetchHistoricalData();
  }, [currency, days])

  console.log(historicalData);

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: 'dark',
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <GraphContainer>
        {
          !historicalData ? (
            <CircularProgress
              style={{ color: 'gold' }}
              size={200}
              thickness={1}
            />
          ) : (
            <>
              <Line
                data={{
                  labels: historicalData.map((coin) => {
                    let date = new Date(coin[0]);
                    let time = date.getHours() > 12
                      ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                      : `${date.getHours()}:${date.getMinutes()} AM`


                    return days === 1 ? time : date.toLocaleDateString();
                  }),

                  datasets: [
                    {
                      data: historicalData.map((coin) => coin[1]),
                      label: `Price ( Past ${days} Days) in ${currency}`,
                      borderColor: 'gold',

                    }
                  ]
                }}
                options={{
                  elements: {
                    point: {
                      radius: 1,
                    },
                  },
                }}
              />
              <BtnBox>
                {chartDays.map((day) => (
                  <SelectButton
                    key={day.value}
                    onClick={() => setDays(day.value)}
                    selected={day.value === days}
                  >
                    {day.label}
                  </SelectButton>
                ))}
              </BtnBox>
            </>
          )
        }
      </GraphContainer>
    </ThemeProvider>
  )
}

export default CoinInfo;