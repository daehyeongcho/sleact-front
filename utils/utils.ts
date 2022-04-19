import { ReactEventHandler } from 'react'

export const stopPropagation: ReactEventHandler<HTMLElement> = (e) => {
    e.stopPropagation() // prevent event bubbling
}
