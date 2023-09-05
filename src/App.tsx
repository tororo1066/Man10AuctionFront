import React from 'react';
import './App.css';
import {BrowserRouter, Link, Route, Routes} from 'react-router-dom';
import Home from './components/Home';
import LoginPage from "./components/LoginPage";
import {AuthContextProvider} from "./system/AuthSystem";
import SignUpPage from "./components/SignUpPage";
import MinecraftModelViewerProps from "./components/MinecraftModelViewerProps";

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
                        <li><Link to="/model">Model</Link></li>
                  </ul>
              </header>
              <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path='/login' element={<LoginPage />} />
                  <Route path='/signup' element={<SignUpPage />} />
                    <Route path='/model' element={<MinecraftModelViewerProps />} />
              </Routes>
            </AuthContextProvider>
        </BrowserRouter>
      </div>
  );
}

export default App;
