import { Box, Link } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import AliceCarousel from 'react-alice-carousel';
import { TrendingCoins } from '../../Config/api';
import { CryptoState } from '../../CryptoContext';

const carouselStyles = {
  height: '50%',
  display: 'flex',
  alignItems: 'center',
}

const carouselItems = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  cursor: 'pointer',
  textTransform: 'uppercase',
  textDecoration: 'none',
  color: 'white',
}

export function AmountWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const Carousel = () => {
  const [trending, setTrending] = useState([]);
  const { currency, symbol } = CryptoState();

  const getTrendingCoins = async () => {
    const { data } = await axios.get(TrendingCoins(currency))

    setTrending(data);
  }

  useEffect(() => {
    getTrendingCoins();
  }, [currency]);

  const items = trending.map((coin) => {
    let profit = coin.price_change_percentage_24h >= 0;

    return (
      <Link sx={{ ...carouselItems }} to={`/coin/${coin.id}`}>
        <img src={coin?.image} alt={coin.name} height='80' style={{ marginBotttom: 10 }} />
        <span>{coin?.symbol} &nbsp; <span style={{
            color: profit > 0 ? 'rgb(14,203,129)' : 'red',
            fontWeight:500,
          }}>
            {profit && '+'}{coin?.price_change_percentage_24h?.toFixed(2)}%
          </span>
        </span>

        <span style={{ fontSize: 22, fontWeight: 500 }}>
          {symbol} {AmountWithCommas(coin?.current_price.toFixed(2))}
        </span>
      </Link>
    )
  })


  const responsive = {
    0: {
      items: 2,
    },
    512: {
      items: 4,
    },
  };

  return (
    <Box sx={{ ...carouselStyles }}>
      <AliceCarousel
        disableButtonsControls
        disableDotsControls
        infinite
        mouseTracking
        autoPlayInterval={1000}
        animationDuration={1500}
        autoPlay
        responsive={responsive}
        items={items}
      />
    </Box>
  )
}

export default Carousel;