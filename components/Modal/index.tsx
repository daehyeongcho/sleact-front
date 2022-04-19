import React, { FC, ReactNode } from 'react'

import { CreateModal, CloseModalButton } from '@components/Modal/styles'
import { stopPropagation } from '@utils/utils'

interface Props {
    show: boolean
    onCloseModal: () => void
    children: ReactNode
}

const Modal: FC<Props> = ({ show, onCloseModal, children }) => {
    if (!show) return null

    return (
        <CreateModal onClick={onCloseModal}>
            <div onClick={stopPropagation}>
                <CloseModalButton onClick={onCloseModal}>&times;</CloseModalButton>
                {children}
            </div>
        </CreateModal>
    )
}

export default Modal
