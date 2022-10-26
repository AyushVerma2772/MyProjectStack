import React, { useEffect, useState } from 'react';
import './App.css';
import Login from './components/Login';
import Signup from './components/Signup';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar';
import Home from './components/Home';
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase-config';

const App = () => {

  const [currentUser, setCurrentUser] = useState();
  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (user) setCurrentUser(user);
      else setCurrentUser(null);
    })


  }, [])


  return (
    <>
      <BrowserRouter>
        <Navbar user={currentUser} />

        <Routes>
          <Route path='/' element={currentUser ? <Home user={currentUser} /> : <Login />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='*' element={<Home />} />
        </Routes>

      </BrowserRouter>
    </>
  )
}

export default App