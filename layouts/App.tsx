import React from 'react'
import { Navigate } from 'react-router'
import { Routes, Route } from 'react-router-dom'

const LogIn = React.lazy(() => import('@pages/LogIn'))
const SignUp = React.lazy(() => import('@pages/SignUp'))

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
