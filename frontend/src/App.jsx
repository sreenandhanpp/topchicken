import { useEffect, useState } from 'react'
import { Link, Routes, Route, useNavigate } from 'react-router-dom'

import { Provider } from 'react-redux'
import store from './redux/store'
import './index.css'
import Home from './pages/Home/Home'
import CreateOrder from './pages/CreateOrder/CreateOrder'
import UpdateOrder from './pages/UpdateOrder/UpdateOrder'
import OrderListing from './pages/OrderListing/OrderListing'
import OrderDetails from './pages/OrderDetails/OrderDetails'


function App() {

  return (
    <>
    
      <Provider store={store}>
        <Routes>
          <Route exact path="/" element={<Home/>} />
          <Route exact path="/create-order" element={<CreateOrder/>} />
          <Route exact path="/create-order" element={<UpdateOrder/>} />
          <Route exact path="/update-order/:id" element={<UpdateOrder/>} />
          <Route exact path="/order-listing" element={<OrderListing/>} />
          <Route exact path="/order-details/:id" element={<OrderDetails/>} />
         
        </Routes>
      </Provider>
    </>
  )
}

export default App
