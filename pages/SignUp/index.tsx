import React, { useCallback, useState } from 'react'

import axios from 'axios'
import { useForm } from 'react-hook-form'
import { useQuery } from 'react-query'
import { Link, Navigate } from 'react-router-dom'

import Fetcher from '@utils/fetcher'

import { Header, Form, Label, Input, LinkContainer, Button, Error, Success } from './styles'

// signup form
type FormValues = {
    email: string
    nickname: string
    password: string
    passwordCheck: string
}

// signup component
const SignUp = () => {
    /* react-hook-form start */
    const {
        watch,
        register,
        formState: { errors },
        handleSubmit,
    } = useForm<FormValues>({
        defaultValues: {
            email: '',
            nickname: '',
            password: '',
            passwordCheck: '',
        },
    })
    const watchPassword = watch('password') // watch password
    /* react-hook-form end */

    const [signUpError, setSignUpError] = useState('') // signup error
    const [signUpSuccess, setSignUpSuccess] = useState(false) // signup success

    const { data, isLoading } = useQuery('user', () => Fetcher('get', '/api/users', null)) // react-query useQuery

    // form submit
    const handleOnSubmit = useCallback(async (data: FormValues) => {
        console.log(data)
        setSignUpError('')
        setSignUpSuccess(false)

        try {
            const response = await Fetcher(
                'post',
                '/api/users',
                {
                    email: data.email,
                    nickname: data.nickname,
                    password: data.password,
                },
                { withCredentials: false },
            ) // axios post
            console.log(response)
            setSignUpSuccess(true) // success
        } catch (e) {
            if (axios.isAxiosError(e)) {
                console.error(e)
                setSignUpError(e?.response?.data)
            } else {
                console.error(e)
            }
        }
    }, [])

    if (data === undefined) return <div>?????????...</div> // loading
    if (data) return <Navigate replace to='/workspace/channel/??????' /> // already login

    return (
        <div id='container'>
            <Header>Sleact</Header>
            <Form onSubmit={handleSubmit(handleOnSubmit)}>
                <Label id='email-label'>
                    <span>????????? ??????</span>
                    <div>
                        <Input type='email' id='email' {...register('email', { required: '???????????? ??????????????????.' })} />
                    </div>
                </Label>
                <Label id='nickname-label'>
                    <span>?????????</span>
                    <div>
                        <Input
                            type='text'
                            id='nickname'
                            {...register('nickname', { required: '???????????? ??????????????????.' })}
                        />
                    </div>
                </Label>
                <Label id='password-label'>
                    <span>????????????</span>
                    <div>
                        <Input
                            type='password'
                            id='password'
                            {...register('password', {
                                required: '??????????????? ??????????????????',
                            })}
                        />
                    </div>
                </Label>
                <Label id='password-check-label'>
                    <span>???????????? ??????</span>
                    <div>
                        <Input
                            type='password'
                            id='passwordCheck'
                            {...register('passwordCheck', {
                                validate: {
                                    passwordMatch: (value) =>
                                        value === watchPassword || '??????????????? ???????????? ????????????.',
                                },
                            })}
                        />
                    </div>
                    {errors.email && <Error>{errors.email.message}</Error>}
                    {errors.nickname && <Error>{errors.nickname.message}</Error>}
                    {errors.password && <Error>{errors.password.message}</Error>}
                    {errors.passwordCheck && <Error>{errors.passwordCheck.message}</Error>}
                    {signUpError && <Error>{signUpError}</Error>}
                    {signUpSuccess && <Success>???????????????????????????! ?????????????????????.</Success>}
                </Label>
                <Button type='submit'>????????????</Button>
            </Form>
            <LinkContainer>
                ?????? ???????????????????&nbsp;
                <Link to='/login'>????????? ????????????</Link>
            </LinkContainer>
        </div>
    )
}

export default SignUp
