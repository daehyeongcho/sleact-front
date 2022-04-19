import React, { CSSProperties, FC, ReactNode, useCallback, MouseEventHandler } from 'react'

import { CloseModalButton, CreateMenu } from '@components/Menu/styles'

interface Props {
    show: boolean // 메뉴 보여줄지 여부
    onCloseModal: () => void // 메뉴 닫기
    style: CSSProperties // style
    closeButton?: boolean // 닫기 버튼 보여줄지 여부
    children?: ReactNode
}

const Menu: FC<Props> = ({ show, onCloseModal, style, closeButton, children }) => {
    const stopPropagation: MouseEventHandler<HTMLDivElement> = useCallback((e) => {
        e.stopPropagation() // 부모 tag로 event 전달 방지
    }, [])

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
