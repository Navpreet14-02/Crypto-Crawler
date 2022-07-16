import { Container, createTheme, LinearProgress, Pagination, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, ThemeProvider, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
// import { CoinList } from '../Config/api';
import { CryptoState } from '../CryptoContext';
import { useNavigate } from 'react-router-dom';
import { AmountWithCommas } from './Banner/Carousel';

const tableRowStyles = {
    backgroundColor: "#16171a",
    cursor: 'pointer',
    fontFamily: "Montserrat",
    "&:hover": {
        backgroundColor: '#131111'
    },
}

const paginationItemStyles = {
    "& .MuiPaginationItem-root":{
        color:'gold',
    },
}


const CoinsTable = () => {
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);

    const { currency, symbol,coins,loading,fetchCoins } = CryptoState();

    const navigate = useNavigate();


    useEffect(() => {
        fetchCoins();
    }, [currency]);

    const darkTheme = createTheme({
        palette: {
            primary: {
                main: '#fff',
            },
            mode: 'dark',
        },
    });

    const handleSearch = () => {
        return coins.filter((coin) =>
            coin.name.toLowerCase().includes(search.toLowerCase()) || coin.symbol.toLowerCase().includes(search.toLowerCase())
        );
    }
    return (
        <ThemeProvider theme={darkTheme}>
            <Container style={{ textAlign: 'center' }}>
                <Typography
                    variant='h4'
                    style={{ margin: 18, fontFamily: 'Montserrat' }}
                >
                    Cryptocurrency Prices by Market Cap
                </Typography>

                <TextField
                    label='Search For a Crypto Currency..'
                    variant='outlined'
                    style={{ marginBottom: 20, width: '100%' }}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <TableContainer>
                    {loading ? (
                        <LinearProgress style={{ backgroundColor: 'gold' }} />
                    ) : (
                        <Table>
                            <TableHead style={{ backgroundColor: '#EEBC1D' }}>
                                <TableRow>
                                    {['Coin', 'Price', '24h Change', 'Market Cap'].map((head) => (
                                        <TableCell
                                            style={{
                                                color: 'black',
                                                fontWeight: '700',
                                                fontFamily: 'Montserrat',
                                            }}
                                            key={head}
                                            align={head === 'Coin' ? "left" : "right"}
                                        >
                                            {head}
                                        </TableCell>
                                    ))}
                                </TableRow>

                            </TableHead>

                            <TableBody>
                                {handleSearch()
                                    .slice((page - 1) * 10, (page - 1) * 10 + 10)
                                    .map((row) => {
                                        const profit = row.price_change_percentage_24h > 0;

                                        return (
                                            <TableRow
                                                onClick={() => navigate(`/coins/${row.id}`)}
                                                key={row.name}

                                                sx={{ ...tableRowStyles }}
                                            >
                                                <TableCell
                                                    component='th'
                                                    scope='row'
                                                    style={{ display: 'flex', gap: 15 }}
                                                >
                                                    <img
                                                        src={row?.image}
                                                        alt={row.name}
                                                        height='50'
                                                        style={{ marginBottom: '10' }}
                                                    />

                                                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                        <span
                                                            style={{ textTransform: 'Uppercase', fontSize: 20 }}
                                                        >
                                                            {row.symbol}
                                                        </span>
                                                        <span
                                                            style={{ color: 'darkgrey' }}
                                                        >
                                                            {row.name}
                                                        </span>
                                                    </div>
                                                </TableCell>
                                                <TableCell align='right'>
                                                    {symbol}{' '}{AmountWithCommas(row.current_price.toFixed(2))}
                                                </TableCell>
                                                <TableCell
                                                    style={{
                                                        color: profit > 0 ? 'rgb(14,203,129)' : 'red',
                                                        fontWeight: 500,
                                                    }}

                                                    align='right'
                                                >
                                                    {profit && '+'}{row.price_change_percentage_24h.toFixed(2)}%

                                                </TableCell>
                                                <TableCell
                                                    align='right'
                                                >
                                                    {symbol}{" "}{AmountWithCommas(row.market_cap.toString().slice(0, -6))}M

                                                </TableCell>
                                            </TableRow>
                                        )
                                    })}
                            </TableBody>
                        </Table>
                    )}
                </TableContainer>

                <Pagination
                    style={{
                        padding: 20,
                        width: "100%",
                        display: 'flex',
                        justifyContent: 'center',
                    }}

                    count={(handleSearch()?.length / 10).toFixed(0)}
                    onChange={(_,value) => {
                        setPage(value);
                        window.scroll(0,460);
                    }}
                    sx={{...paginationItemStyles}}
                />
            </Container>

        </ThemeProvider>
    )
}

export default CoinsTable;