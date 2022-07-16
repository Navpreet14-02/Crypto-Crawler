import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import { CryptoState } from '../../CryptoContext';
import { Avatar, Box } from '@mui/material';
import { signOut } from 'firebase/auth';
import { auth, db } from '../../firebase';
import { AmountWithCommas } from '../Banner/Carousel';
import { AiFillDelete } from 'react-icons/ai';
import { doc, setDoc } from 'firebase/firestore';

const container = {
    width: 325,
    padding: 5,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    fontFamily: 'monospace',
}

const profile = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '20px',
    height: '96%',
}
const picture = {
    width: 200,
    height: 200,
    cursor: 'pointer',
    backgroundColor: '#EEBC1D',
    objectFit: 'contain',
}

const watchlist = {
    flex: 1,
    width: '100%',
    backgroundColor: '#686868',
    minHeight: '70%',
    borderRadius: 2,
    padding: 1,
    paddingTop: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 2,
    overflowY: 'scroll',
}


const logout = {
    height: '8%',
    width: '100%',
    backgroundColor: '#EEBC1D',
    marginTop: 20,
}

const watchlistcoins = {
    width: '100%',
    display: 'flex',
    backgroundColor: '#EEBC1D',
    color: 'black',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 1,
    boxShadow: '0 0 6px black',
}


export default function UserSidebar() {
    const [state, setState] = React.useState({
        right: false,
    });

    const { user, setAlert, watchList, coins, symbol } = CryptoState();

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    const logOut = () => {
        signOut(auth);

        setAlert({
            open: true,
            type: 'success',
            message: 'Logout Successfull!',
        })

        toggleDrawer();
    }

    const removeFromWatchList = async (coin) => {
        const coinRef = doc(db, 'watchList', user.uid);

        try {
            await setDoc(coinRef, {
                coins: watchList.filter((watch) => watch !== coin?.id),
            }, {
                merge: 'true'
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

    return (
        <div>
            {['right'].map((anchor) => (
                <React.Fragment key={anchor}>
                    <Avatar
                        onClick={toggleDrawer(anchor, true)}
                        style={{
                            height: 38,
                            width: 38,
                            cursor: 'pointer',
                            backgroundColor: "#EEBC1D",
                        }}
                        src={user.photoURL}
                        alt={user.displayName || user.email}
                    />
                    <Drawer
                        anchor={anchor}
                        open={state[anchor]}
                        onClose={toggleDrawer(anchor, false)}
                    >
                        <Box sx={{ ...container }}>
                            <Box sx={{ ...profile }}>
                                <Avatar
                                    sx={{ ...picture }}
                                    src={user.photoURL}
                                    alt={user.displayName || user.email}
                                />
                                <span
                                    style={{
                                        width: '100%',
                                        fontSize: 20,
                                        textAlign: 'center',
                                        fontWeight: 'bolder',
                                        wordWrap: 'break-word',
                                    }}
                                >
                                    {user.displayName || user.email}
                                </span>
                                <Box
                                    sx={{ ...watchlist }}
                                >
                                    <span
                                        style={{
                                            fontSize: 15,
                                            textShadow: '0 0 5px black'
                                        }}
                                    >
                                        WatchList
                                    </span>

                                    {coins.map((coin) => {
                                        if (watchList.includes(coin.id)) {
                                            return (
                                                <Box sx={{ ...watchlistcoins }}>
                                                    <span>{coin.name}</span>
                                                    <span style={{ display: 'flex', gap: 4 }}>
                                                        {symbol}
                                                        {AmountWithCommas(coin.current_price.toFixed(2))}
                                                        <AiFillDelete
                                                            style={{ cursor: 'pointer' }}
                                                            fontSize='15'
                                                            onClick={()=>removeFromWatchList(coin)}
                                                        />
                                                    </span>
                                                </Box>
                                            );
                                        }
                                    })}

                                </Box>
                            </Box>
                            <Button
                                variant='contained'
                                sx={{ ...logout }}
                                onClick={logOut}
                            >
                                LOG OUT
                            </Button>
                        </Box>
                    </Drawer>
                </React.Fragment>
            ))}
        </div>
    );
}
