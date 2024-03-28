import { useEffect, useState } from 'react'
import { Link, Routes, Route, useNavigate } from 'react-router-dom'

import { Provider } from 'react-redux'
import store from './redux/store'
import './index.css'
import Home from './pages/Home/Home'


function App() {

  return (
    <>
    
      <Provider store={store}>
        <Routes>
          <Route exact path="/" element={<Home/>} />
         
        </Routes>
      </Provider>
    </>
  )
}

export default App
