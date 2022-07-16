import { Button, LinearProgress, styled, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CoinInfo from '../Components/CoinInfo';
import { SingleCoin } from '../Config/api';
import { CryptoState } from '../CryptoContext';
import { AmountWithCommas } from '../Components/Banner/Carousel';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { async } from '@firebase/util';


const CoinData = styled('div')(({ theme }) => ({
  display: 'flex',
  [theme.breakpoints.down('1370')]: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  maxWidth: '95vw',
}));


const SideBar = styled('div')(({ theme }) => ({
  width: '30%',
  [theme.breakpoints.down('1370')]: {
    width: '100%',
    borderRight: 'none',
  },
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginTop: 15,
  marginBottom: 5,
  borderRight: '2px solid grey',
}));

const heading = {
  fontWeight: 'Bold',
  marginBottom: 2,
  fontFamily: 'Montserrat',
}

const Description = {
  width: '100%',
  fontFamily: 'Montserrat',
  padding: 4,
  paddingBottom: 2,
  paddingTop: 0,
  textAlign: 'justify',
}



const MarketData = styled('div')(({ theme }) => ({
  alignSelf: 'start',
  padding: 15,
  paddingTop: 2,
  width: '100%',
  marginLeft: 20,
  //Making it Responsive
  [theme.breakpoints.down('1370')]: {
    display: 'flex',
    justifyContent: "space-around",
    flexDirection: 'column',
    alignItems: 'center',
  },
  [theme.breakpoints.down('900')]: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  [theme.breakpoints.down('600')]: {
    alignItems: 'start',
    marginLeft: 15,
  }
}));


const CoinPage = () => {

  const { id } = useParams();
  const [coin, setCoin] = useState();

  const { currency, symbol, user, watchList, setAlert } = CryptoState();

  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(id));

    setCoin(data);
  }

  useEffect(() => {
    fetchCoin();
  }, [currency])

  console.log(coin);

  const inWatchList = watchList.includes(coin?.id);

  const addToWatchlist = async () => {
    const coinRef = doc(db, 'watchList', user.uid);

    try {
      await setDoc(coinRef, {
        coins: watchList ? [...watchList, coin?.id] : [coin?.id],
      });

      setAlert({
        open: true,
        message: `${coin.name} Added to the WatchList!`,
        type: 'success',
      })
    } catch (error) {
      setAlert({
        open: true,
        message: error.message,
        type: 'error',
      })
    }
  };

  const removeFromWatchList = async () => {
    const coinRef = doc(db, 'watchList', user.uid);

    try {
      await setDoc(coinRef, {
        coins: watchList.filter((watch)=> watch!==coin?.id),
      },{
        merge:'true'
      });

      setAlert({
        open: true,
        message: `${coin.name} Removed from the WatchList!`,
        type: 'success',
      })
    } catch (error) {
      setAlert({
        open: true,
        message: error.message,
        type: 'error',
      })
    }
  }

  if (!coin) {
    return <LinearProgress style={{ backgroundColor: 'gold' }} />
  }

  return (
    <CoinData>
      <SideBar>
        <img src={coin?.image.large} alt={coin?.name} height="200" style={{ marginBottom: 20 }} />
        <Typography variant='h3' sx={{ ...heading }}>
          {coin?.name}
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{ ...Description }}
          dangerouslySetInnerHTML={{ __html: `${coin?.description.en.split(". ")[0]}.` }} >
        </Typography>
        <MarketData>
          <span style={{ display: 'flex' }}>
            <Typography variant='h5' sx={{ ...heading }}>
              Rank:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant='h5'
              style={{ fontFamily: 'Montserrat' }}
            >
              {coin?.market_cap_rank}
            </Typography>
          </span>
          <span style={{ display: 'flex' }}>
            <Typography variant='h5' sx={{ ...heading }}>
              Current Price:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant='h5'
              style={{ fontFamily: 'Montserrat' }}
            >
              {symbol}
              {AmountWithCommas(coin?.market_data.current_price[currency.toLowerCase()])}
            </Typography>
          </span>
          <span style={{ display: 'flex' }}>
            <Typography variant='h5' sx={{ ...heading }}>
              Market:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant='h5'
              style={{ fontFamily: 'Montserrat' }}
            >
              {AmountWithCommas(
                coin?.market_data.market_cap[currency.toLowerCase()]
                  .toString()
                  .slice(0, -6)
              )}M
            </Typography>
          </span>

          {user && (
            <Button
              variant='outlined'
              style={{
                width: '90%',
                height: 40,
                backgroundColor: inWatchList ? '#ff0000' : '#EEBC1D',
                color: 'black',
              }}
              onClick={inWatchList ? removeFromWatchList : addToWatchlist}
            >
              {inWatchList ? "Remove From WatchList" : "Add To WatchList"}
            </Button>
          )}
        </MarketData>

      </SideBar>

      {/* chart */}
      <CoinInfo coin={coin} />
    </CoinData>

  )
}

export default CoinPage;