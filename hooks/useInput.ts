import React, { ChangeEvent, Dispatch, SetStateAction, useCallback, useState } from 'react'

type ReturnType<T> = [T, (e: ChangeEvent<HTMLInputElement>) => void, Dispatch<SetStateAction<T>>]

const useInput = <T>(initialData: T): ReturnType<T> => {
    const [value, setValue] = useState(initialData)
    const handler = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value as unknown as T) // double assertion
    }, [])

    return [value, handler, setValue]
}

export default useInput
