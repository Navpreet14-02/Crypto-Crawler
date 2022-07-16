
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './Components/Header';
import CoinPage from './Pages/CoinPage';
import Homepage from './Pages/Homepage';
// import sx from "mui-sx";
import { Box } from '@mui/material';
import Alert from './Components/Alert';


const Appstyle = {
    backgroundColor:"#14161a",
    color:"white",
    minHeight:"100vh"
}
function App() {

  // Normally we provide styles in css but when using material UI we can use useStyles

  return (
    <BrowserRouter>
      <Box sx={{...Appstyle}}>
        <Header />
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/coins/:id' element={<CoinPage />} />
        </Routes>
      </Box>
      <Alert/>
    </BrowserRouter>
  );
}

export default App;
