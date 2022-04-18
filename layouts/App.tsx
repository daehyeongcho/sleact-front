import React, { lazy } from 'react'

import { Routes, Route, Navigate } from 'react-router-dom'

const LogIn = lazy(() => import('@pages/LogIn'))
const SignUp = lazy(() => import('@pages/SignUp'))
const Channel = lazy(() => import('@pages/Channel'))

const App = () => {
    return (
        <Routes>
            <Route path='/' element={<Navigate replace to='/login' />} />
            <Route path='/login/*' element={<LogIn />} />
            <Route path='/signup/*' element={<SignUp />} />
            <Route path='/workspace/channel/*' element={<Channel />} />
        </Routes>
    )
}

export default App
