import React, { FC, ReactNode, lazy, useCallback, useState, MouseEventHandler } from 'react'

import { AxiosError } from 'axios'
import gravatar from 'gravatar'
import { useForm } from 'react-hook-form'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { Navigate, Routes, Route, Link } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'

import Menu from '@components/Menu'
import Modal from '@components/Modal'
import {
    AddButton,
    Channels,
    Chats,
    Header,
    LogOutButton,
    MenuScroll,
    ProfileImg,
    ProfileModal,
    RightMenu,
    WorkspaceButton,
    WorkspaceName,
    Workspaces,
    WorkspaceWrapper,
} from '@layouts/Workspace/styles'
import { Button, Error, Input, Label } from '@pages/SignUp/styles'
import { IUser } from '@typings/db'
import Fetcher from '@utils/fetcher'
import { stopPropagation } from '@utils/utils'

const Channel = lazy(() => import('@pages/Channel'))
const DirectMessage = lazy(() => import('@pages/DirectMessage'))

interface Props {
    children?: ReactNode
}

interface FormValues {
    workspace: string
    url: string
}

// workspace component
const Workspace: FC<Props> = ({ children }) => {
    /* react-query start */
    const { data: userData } = useQuery<IUser | false>('user', () => Fetcher('get', '/api/users', null)) // react-query useQuery

    const queryClient = useQueryClient() // react-query client
    const logoutMutation = useMutation<any, AxiosError>('logout', () => Fetcher('post', '/api/users/logout', null), {
        onError: (e) => console.error(e),
        onSuccess: () => {
            queryClient.setQueryData('user', () => null) // user 초기화
        },
    }) // react-query useMutation (logout)
    const createMutation = useMutation<any, AxiosError, FormValues>(
        'createWorkspace',
        (data) => Fetcher('post', '/api/workspaces', data),
        {
            onError: (e) => {
                console.error(e)
                toast.error(e.response?.data)
            },
            onSuccess: () => {
                reset()
                queryClient.invalidateQueries('user')
                handleCloseModal()
                toast.success('workspace 생성 성공')
            },
        },
    ) // react-query useMutation (create workspace)
    /* react-query end */

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FormValues>({
        defaultValues: {
            workspace: '',
            url: '',
        },
    }) // react-hook-form

    const [showUserMenu, setShowUserMenu] = useState(false) // user menu 보여줄지 여부
    const [showCreateWorkspaceModal, setShowCreateWorkspaceModal] = useState(false) // workspace 생성 모달 보여줄지 여부

    const handleLogout = () => logoutMutation.mutate() // logout
    const handleClickUserProfile = useCallback(() => {
        console.log('click profile')
        setShowUserMenu((prev) => !prev)
    }, []) // click user profile
    const handleCloseUserProfile = useCallback(() => {
        console.log('close profile')
        setShowUserMenu(false)
    }, []) // click user profile
    const handleClickCreateWorkspace = useCallback(() => {
        setShowCreateWorkspaceModal(true)
    }, []) // click + button
    const handleCloseModal = useCallback(() => {
        setShowCreateWorkspaceModal(false)
    }, []) // close modal
    const handleCreateWorkspace = useCallback(
        (data: FormValues) => {
            createMutation.mutate(data)
        },
        [createMutation],
    )

    if (!userData) {
        // 유저 정보 없음
        console.log('redirect')
        return <Navigate replace to='/login' />
    }

    return (
        <div>
            {/* 헤더 */}
            <Header>
                <RightMenu>
                    <span onClick={handleClickUserProfile}>
                        <ProfileImg
                            src={gravatar.url(userData.email, { s: '28px', d: 'retro' })}
                            alt={userData.nickname}
                        />

                        {showUserMenu && (
                            <div onClick={stopPropagation}>
                                <Menu
                                    style={{ right: 0, top: 38 }}
                                    show={showUserMenu}
                                    onCloseModal={handleCloseUserProfile}
                                >
                                    <ProfileModal>
                                        <img
                                            src={gravatar.url(userData.nickname, { s: '36px', d: 'retro' })}
                                            alt={userData.nickname}
                                        />
                                        <div>
                                            <span id='profile-name'>{userData.nickname}</span>
                                            <span id='profile-active'>Active</span>
                                        </div>
                                    </ProfileModal>
                                    <LogOutButton onClick={handleLogout}>로그아웃</LogOutButton>
                                </Menu>
                            </div>
                        )}
                    </span>
                </RightMenu>
            </Header>
            <WorkspaceWrapper>
                {/* workspace list */}
                <Workspaces>
                    {userData.Workspaces.map((ws) => (
                        <Link key={ws.id} to={`/workspace/${ws.id}/channel/일반`}>
                            <WorkspaceButton>{ws.name.slice(0, 1).toUpperCase()}</WorkspaceButton>
                        </Link>
                    ))}
                    <AddButton onClick={handleClickCreateWorkspace}>+</AddButton>
                </Workspaces>
                {/* channel list */}
                <Channels>
                    <WorkspaceName>Sleact</WorkspaceName>
                    <MenuScroll>MenuScroll</MenuScroll>
                </Channels>
                {/* chats */}
                <Chats>
                    <Routes>
                        <Route path='/channel/*' element={<Channel />} />
                        <Route path='/dm/*' element={<DirectMessage />} />
                    </Routes>
                </Chats>
                {children}
            </WorkspaceWrapper>
            <Modal show={showCreateWorkspaceModal} onCloseModal={handleCloseModal}>
                <form onSubmit={handleSubmit(handleCreateWorkspace)}>
                    <Label id='workspace-label'>
                        <span>워크스페이스 이름</span>
                        <Input id='workspace' {...register('workspace', { required: true })} />
                    </Label>

                    <Label id='workspace-url-label'>
                        <span>워크스페이스 url</span>
                        <Input id='workspace-url' {...register('url', { required: true })} />
                    </Label>
                    {errors.workspace && <Error>워크스페이스 이름을 입력해주세요</Error>}
                    {errors.url && <Error>워크스페이스 url을 입력해주세요</Error>}
                    <Button type='submit'>생성하기</Button>
                </form>
            </Modal>
        </div>
    )
}

export default Workspace
