import React, { FC, ReactNode, lazy } from 'react'

import { AxiosError } from 'axios'
import gravatar, { url } from 'gravatar'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { Navigate, Routes, Route } from 'react-router-dom'

import {
    Channels,
    Chats,
    Header,
    MenuScroll,
    ProfileImg,
    RightMenu,
    WorkspaceName,
    Workspaces,
    WorkspaceWrapper,
} from '@layouts/Workspace/styles'
import { IUser } from '@typings/db'
import Fetcher from '@utils/fetcher'

const Channel = lazy(() => import('@pages/Channel'))
const DirectMessage = lazy(() => import('@pages/DirectMessage'))

type Props = {
    children?: ReactNode
}

// workspace component
const Workspace: FC<Props> = ({ children }) => {
    /* react-query start */
    const { data } = useQuery<IUser | false>('user', () => Fetcher('get', '/api/users', null)) // react-query useQuery

    const queryClient = useQueryClient() // react-query client
    const logoutMutation = useMutation<any, AxiosError>('logout', () => Fetcher('post', '/api/users/logout', null), {
        onError: (e) => console.error(e),
        onSuccess: () => {
            queryClient.setQueryData('user', () => null) // user 초기화
        },
    }) // react-query useMutation (logout)
    /* react-query end */

    const onLogout = () => logoutMutation.mutate() // logout

    if (!data) {
        // 유저 정보 없음
        console.log('redirect')
        return <Navigate replace to='/login' />
    }

    return (
        <div>
            <Header>
                <RightMenu>
                    <span>
                        <ProfileImg src={url(data.email, { s: '28px', d: 'retro' })} alt={data.nickname} />
                    </span>
                </RightMenu>
            </Header>
            <button onClick={onLogout}>로그아웃</button>
            <WorkspaceWrapper>
                <Workspaces>test</Workspaces>
                <Channels>
                    <WorkspaceName>Sleact</WorkspaceName>
                    <MenuScroll>MenuScroll</MenuScroll>
                </Channels>
                <Chats>
                    <Routes>
                        <Route path='/channel/*' element={<Channel />} />
                        <Route path='/dm/*' element={<DirectMessage />} />
                    </Routes>
                </Chats>
                {children}
            </WorkspaceWrapper>
        </div>
    )
}

export default Workspace
