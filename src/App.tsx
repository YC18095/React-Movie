import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Store from './pages/Store'
import About from './pages/About'

function App() {

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/store' element={<Store />} />
        <Route path='/about' element={<About />} />
      </Routes>
    </div>
  )
}

export default App
