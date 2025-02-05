import React, { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Layout from './layout/Layout'
import Main from './components/main/Main'
import ByCategory from './components/main/ByCategory'
import ProductById from './components/main/ProductById'
import BySubCategory from './components/main/BySubCategory'
import WishList from './components/main/WishList'
import ShoppingBagPage from './components/main/ShoppingBagPage'
import CheckOut from './components/main/CheckOut'
import NotFound from './NotFound'
import { Helmet } from 'react-helmet'
import FinishOrder from './components/main/FinishOrder'
import Payment from './components/main/Payment'
import RegisterPage from './components/userinfo/login/RegisterPage'
import ForgotPassword from './components/userinfo/login/ForgotPassword'
import Login from './components/userinfo/login/Login'
import Cabinet from './components/userinfo/cabinet/Cabinet'
import AccountInfo from './components/userinfo/cabinet/AccountInfo'

function App() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({
      behavior: 'smooth',
      top: 0
    })
  }, [pathname])
  return (
    <>
    <Helmet>
    <title>Lunaria | Home</title>
    </Helmet>
     <Routes>
        <Route path='/' element={<Layout/>}>
          <Route index element={<Main/>}/>
          <Route path='/category/:catname' element={<ByCategory/>}/>
          <Route path='/details/:proinfo' element={<ProductById/>}/>
          <Route path='/products/:catname/:subname' element={<BySubCategory/>}/>
          <Route path='/register' element={<RegisterPage/>}/>
          <Route path='/wishlist' element={<WishList/>}/>
          <Route path='/remind' element={<ForgotPassword/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/finishorder' element={<FinishOrder/>}/>
          <Route path='/checkout' element={<CheckOut/>}/>
          <Route path='/cabinet' element={<Cabinet/>}/>
          <Route path='/accountinfo' element={<AccountInfo/>}/>

          
          <Route path='/shoppingbagpage' element={<ShoppingBagPage/>}/>
          <Route path='*' element={<NotFound/>}/>
        </Route>  

        <Route path='/payment' element={<Payment/>}/> 

     </Routes>
    </>
  )
}

export default App
