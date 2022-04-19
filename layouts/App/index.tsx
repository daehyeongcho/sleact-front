import React, { lazy } from 'react'

import { Routes, Route, Navigate } from 'react-router-dom'

const LogIn = lazy(() => import('@pages/LogIn'))
const SignUp = lazy(() => import('@pages/SignUp'))
const Workspace = lazy(() => import('@layouts/Workspace'))

const App = () => {
    return (
        <Routes>
            <Route path='/' element={<Navigate replace to='/login' />} />
            <Route path='/login/*' element={<LogIn />} />
            <Route path='/signup/*' element={<SignUp />} />
            <Route path='/workspace/*' element={<Workspace />} />
        </Routes>
    )
}

export default App
