import React, { useState } from 'react'

import { AxiosError } from 'axios'
import { useForm } from 'react-hook-form'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { Link, Navigate } from 'react-router-dom'

import { Form, Error, Label, Input, LinkContainer, Button, Header } from '@pages/SignUp/styles'
import Fetcher from '@utils/fetcher'

// login form
type FormValues = {
    email: string
    password: string
}

// login component
const LogIn = () => {
    /* react-hook-form start */
    const { register, handleSubmit } = useForm<FormValues>({
        defaultValues: {
            email: '',
            password: '',
        },
    })
    /* react-hook-form end */

    const [logInError, setLogInError] = useState(false) // login error

    /* react-query start */
    const { data } = useQuery('user', () => Fetcher('get', '/api/users', null)) // react-query useQuery
    const queryClient = useQueryClient() // react-query client
    const loginMutation = useMutation<any, AxiosError, FormValues>( // login mutation
        'login',
        (data) => Fetcher('post', '/api/users/login', data),
        {
            onMutate: async (user) => setLogInError(false),
            onError: (e) => {
                console.error(e)
                setLogInError(e?.response?.status === 401)
            },
            onSuccess: () => {
                queryClient.invalidateQueries('user')
            },
        },
    )
    /* react-query end */

    // form submit
    const onSubmit = async (data: FormValues) => {
        setLogInError(false)
        loginMutation.mutate(data)
    }

    if (data === undefined) return <div>로딩중...</div> // loading
    if (data) return <Navigate replace to='/workspace/channel/일반' /> // already login

    // console.log(error, userData);
    // if (!error && userData) {
    //   console.log('로그인됨', userData);
    //   return <Redirect to="/workspace/sleact/channel/일반" />;
    // }

    return (
        <div id='container'>
            <Header>Sleact</Header>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Label id='email-label'>
                    <span>이메일 주소</span>
                    <div>
                        <Input type='email' id='email' {...register('email', { required: true })} />
                    </div>
                </Label>
                <Label id='password-label'>
                    <span>비밀번호</span>
                    <div>
                        <Input type='password' id='password' {...register('password', { required: true })} />
                    </div>
                    {logInError && <Error>이메일과 비밀번호 조합이 일치하지 않습니다.</Error>}
                </Label>
                <Button type='submit'>로그인</Button>
            </Form>
            <LinkContainer>
                아직 회원이 아니신가요?&nbsp;
                <Link to='/signup'>회원가입 하러가기</Link>
            </LinkContainer>
        </div>
    )
}

export default LogIn
