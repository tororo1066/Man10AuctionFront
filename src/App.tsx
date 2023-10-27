import React from 'react';
import './App.css';
import {BrowserRouter, Link, Route, Routes} from 'react-router-dom';
import Home from './components/Home';
import LoginPage from "./components/LoginPage";
import {AuthContextProvider} from "./system/AuthSystem";
import SignUpPage from "./components/SignUpPage";
import AuctionViewer from "./components/AuctionViewer";
import PrivateRoute from "./route/PrivateRoute";
import AuctionBid from "./components/AuctionBid";

function App() {
  return (
      <div>
          <BrowserRouter>
              <AuthContextProvider>
                  <header>
                      <ul className='header_link'>
                          <li><Link to="/">Home</Link></li>
                          <li><Link to="/login">Login</Link></li>
                          <li><Link to="/signup">SignUp</Link></li>
                          <li><Link to="/auction">Auction</Link></li>
                      </ul>
                  </header>
                  <Routes>
                      <Route path="/" element={<Home/>}/>
                      <Route path='/login' element={<LoginPage/>}/>
                      <Route path='/signup' element={<SignUpPage/>}/>
                      <Route path='/auction' element={<AuctionViewer/>}/>
                      <Route path='/auction/bid' element={
                          <PrivateRoute>
                              <AuctionBid/>
                          </PrivateRoute>
                      }/>
                  </Routes>
              </AuthContextProvider>
          </BrowserRouter>
      </div>
  );
}

export default App;
