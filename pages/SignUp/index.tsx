import React, { useCallback, useState } from 'react'

import axios from 'axios'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

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

    // form submit
    const onSubmit = useCallback(async (data: FormValues) => {
        console.log(data)
        setSignUpError('')
        setSignUpSuccess(false)

        try {
            const response = await Fetcher('post', '/api/users', {
                email: data.email,
                nickname: data.nickname,
                password: data.password,
            }) // axios post
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

    return (
        <div id='container'>
            <Header>Sleact</Header>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Label id='email-label'>
                    <span>이메일 주소</span>
                    <div>
                        <Input type='email' id='email' {...register('email', { required: '이메일을 입력해주세요.' })} />
                    </div>
                </Label>
                <Label id='nickname-label'>
                    <span>닉네임</span>
                    <div>
                        <Input
                            type='text'
                            id='nickname'
                            {...register('nickname', { required: '닉네임을 입력해주세요.' })}
                        />
                    </div>
                </Label>
                <Label id='password-label'>
                    <span>비밀번호</span>
                    <div>
                        <Input
                            type='password'
                            id='password'
                            {...register('password', {
                                required: '비밀번호를 입력해주세요',
                            })}
                        />
                    </div>
                </Label>
                <Label id='password-check-label'>
                    <span>비밀번호 확인</span>
                    <div>
                        <Input
                            type='password'
                            id='passwordCheck'
                            {...register('passwordCheck', {
                                validate: {
                                    passwordMatch: (value) =>
                                        value === watchPassword || '비밀번호가 일치하지 않습니다.',
                                },
                            })}
                        />
                    </div>
                    {errors.email && <Error>{errors.email.message}</Error>}
                    {errors.nickname && <Error>{errors.nickname.message}</Error>}
                    {errors.password && <Error>{errors.password.message}</Error>}
                    {errors.passwordCheck && <Error>{errors.passwordCheck.message}</Error>}
                    {signUpError && <Error>{signUpError}</Error>}
                    {signUpSuccess && <Success>회원가입되었습니다! 로그인해주세요.</Success>}
                </Label>
                <Button type='submit'>회원가입</Button>
            </Form>
            <LinkContainer>
                이미 회원이신가요?&nbsp;
                <Link to='/login'>로그인 하러가기</Link>
            </LinkContainer>
        </div>
    )
}

export default SignUp
