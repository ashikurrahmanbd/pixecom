import React from 'react'

import { Route, Routes } from 'react-router-dom'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import SearchBar from './components/SearchBar'
import About from './pages/About'
import Cart from './pages/Cart'
import Collection from './pages/Collection'
import Contact from './pages/Contact'
import Home from './pages/Home'
import Login from './pages/Login'
import Orders from './pages/Orders'
import Placeorder from './pages/Placeorder'
import Product from './pages/Product'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


const App = () => {

    return (
        <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
            <ToastContainer />
            <Navbar/>
            <SearchBar />
            <Routes>
                <Route path='/' element={<Home/>} />
                <Route path='/collection' element={<Collection />} />
                <Route path='/about' element={<About/>} />
                <Route path='/contact' element={<Contact/>} />
                <Route path='/product/:productId' element={ <Product/> } />
                <Route path='/cart' element={<Cart/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path='/place-order' element={<Placeorder/>}/>
                <Route path='/orders' element={<Orders/>}/>
            </Routes>
            <Footer />
        </div>
    )

}

export default App
