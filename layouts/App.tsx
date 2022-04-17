import React from 'react'
import { Navigate } from 'react-router'
import { Routes, Route } from 'react-router-dom'
import LogIn from '@pages/Login'
import SignUp from '@pages/SignUp'

const App = () => {
    return (
        <Routes>
            <Route path='/' element={<Navigate replace to='/login' />} />
            <Route path='/login/*' element={<LogIn />} />
            <Route path='/signup/*' element={<SignUp />} />
        </Routes>
    )
}

export default App
