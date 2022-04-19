import React, { FC, ReactNode, lazy, useCallback, useState } from 'react'

import { AxiosError } from 'axios'
import gravatar from 'gravatar'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { Navigate, Routes, Route } from 'react-router-dom'

import Menu from '@components/Menu'
import {
    Channels,
    Chats,
    Header,
    LogOutButton,
    MenuScroll,
    ProfileImg,
    ProfileModal,
    RightMenu,
    WorkspaceName,
    Workspaces,
    WorkspaceWrapper,
} from '@layouts/Workspace/styles'
import { IUser } from '@typings/db'
import Fetcher from '@utils/fetcher'

const Channel = lazy(() => import('@pages/Channel'))
const DirectMessage = lazy(() => import('@pages/DirectMessage'))

interface Props {
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

    const [showUserMenu, setShowUserMenu] = useState(false) // user menu 보여줄지 여부

    const handleLogout = () => logoutMutation.mutate() // logout
    const handleClickUserProfile = useCallback(() => {
        setShowUserMenu((prev) => !prev)
    }, [])

    if (!data) {
        // 유저 정보 없음
        console.log('redirect')
        return <Navigate replace to='/login' />
    }

    return (
        <div>
            <Header>
                <RightMenu>
                    <span onClick={handleClickUserProfile}>
                        <ProfileImg src={gravatar.url(data.email, { s: '28px', d: 'retro' })} alt={data.nickname} />
                        {showUserMenu && (
                            <Menu
                                style={{ right: 0, top: 38 }}
                                show={showUserMenu}
                                onCloseModal={handleClickUserProfile}
                            >
                                <ProfileModal>
                                    <img
                                        src={gravatar.url(data.nickname, { s: '36px', d: 'retro' })}
                                        alt={data.nickname}
                                    />
                                    <div>
                                        <span id='profile-name'>{data.nickname}</span>
                                        <span id='profile-active'>Active</span>
                                    </div>
                                </ProfileModal>
                                <LogOutButton onClick={handleLogout}>로그아웃</LogOutButton>
                            </Menu>
                        )}
                    </span>
                </RightMenu>
            </Header>
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
