import { Box, Container, Typography } from '@mui/material'
import React from 'react'
import Carousel from './Carousel'

const bannerStyles = {
  backgroundImage: "url(./img2.jpg)",
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
}
const bannerContent = {
  height: 400,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-around',
  paddingTop: 8,
  // alignItems: 'center'
}
const tagLine = {
  display: 'flex',
  height: '40%',
  flexDirection: 'column',
  justifyContent: 'center',
  textAlign: 'center',
}

const Banner = () => {
  return (
    <Box sx={{ ...bannerStyles }}>
      <Container sx={{ ...bannerContent }}>
        <Box sx={{ ...tagLine }}>
          <Typography
            variant='h2'
            sx={{
              fontWeight: 'bold',
              marginBottom: 2,
              fontFamily: 'Montserrat',
            }}
          >
            Crypto Crawler
          </Typography>
          <Typography
            variant='subtitle2'
            sx={{
              color: 'darkgrey',
              textTransform: 'capitalize',
              fontFamily: 'Montserrat',
            }}
          >
            Get all the Info Regarding your Favourite Cryptocurrencies
          </Typography>
        </Box>
        <Carousel />
      </Container>
    </Box>
  )
}

export default Banner;