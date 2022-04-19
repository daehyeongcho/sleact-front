import React, { CSSProperties, FC, ReactNode } from 'react'

import { CloseModalButton, CreateMenu } from '@components/Menu/styles'
import { stopPropagation } from '@utils/utils'

interface Props {
    show: boolean // 메뉴 보여줄지 여부
    onCloseModal: () => void // 메뉴 닫기
    style: CSSProperties // style
    closeButton?: boolean // 닫기 버튼 보여줄지 여부
    children?: ReactNode
}

const Menu: FC<Props> = ({ show, onCloseModal, style, closeButton, children }) => {
    return (
        <CreateMenu onClick={onCloseModal}>
            <div onClick={stopPropagation} style={style}>
                {closeButton && <CloseModalButton onClick={onCloseModal}>&times;</CloseModalButton>}
                {children}
            </div>
        </CreateMenu>
    )
}

Menu.defaultProps = {
    closeButton: true, // 닫기 버튼 보이게
}

export default Menu
