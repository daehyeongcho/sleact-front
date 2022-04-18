import React, { FC, ReactNode } from 'react'

import { AxiosError } from 'axios'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { Navigate } from 'react-router-dom'

import Fetcher from '@utils/fetcher'

type Props = {
    children?: ReactNode
}

const Workspace: FC<Props> = ({ children }) => {
    /* react-query start */
    const { data } = useQuery('user', () => Fetcher('get', '/api/users', null)) // react-query useQuery

    const queryClient = useQueryClient() // react-query client
    const logoutMutation = useMutation<any, AxiosError>('logout', () => Fetcher('post', '/api/users/logout', null), {
        onError: (e) => console.error(e),
        onSuccess: () => {
            queryClient.setQueryData('user', () => null) // user 초기화
        },
    }) // react-query useMutation (logout)
    /* react-query end */

    const onLogout = () => logoutMutation.mutate() // logout

    if (!data) return <Navigate replace to='/login' /> // 유저 정보 없음

    return (
        <div>
            <button onClick={onLogout}>로그아웃</button>
            {children}
        </div>
    )
}

export default Workspace
