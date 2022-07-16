import { Box, Button, TextField } from '@mui/material';
import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { CryptoState } from '../../CryptoContext';
import { auth } from '../../firebase';

const Login = ({ handleClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setAlert } = CryptoState();

  const handleSubmit = async () => {
    if (!email || !password) {
      setAlert({
        open: true,
        message: "Please fill all the fields",
        type: 'error',
      });
      return;
    }


    try {
      const result = await signInWithEmailAndPassword(auth, email, password);

      setAlert({
        open: true,
        message: `Login Successful. Welcome ${result.user.email}`,
        type: 'success',
      })

      handleClose();
    } catch (error) {
      setAlert({
        open: true,
        message: error.message,
        type: 'error',
      })
    }
  }

  return (
    <Box
      p={3}
      style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
    >
      <TextField
        variant='outlined'
        type='email'
        label='Enter Email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
      />
      <TextField
        variant='outlined'
        type='password'
        label='Enter Password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
      />

      <Button
        variant='container'
        size='large'
        style={{ backgroundColor: '#EEBC1D', textTransform: 'uppercase', textAlign: 'center', color: 'black', padding: 10, boxShadow: '0px 0px 2px 2px black' }}
        onClick={handleSubmit}
      >
        Login
      </Button>
    </Box>
  )
}

export default Login;