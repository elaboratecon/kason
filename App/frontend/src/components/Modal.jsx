// Project by: Jason Conover (https://github.com/elaboratecon) and Kevin Mathew (https://github.com/kmatchu)
// Hosted at: https://github.com/elaboratecon/kason

import {
    Button,
    Modal as ModalWrapper,
    ModalHeader,
    ModalBody,
    ModalFooter
} from 'reactstrap'

export const Modal = (props) => {
    const {
        modalSettings,
        headerLabel,
        buttonLabel,
        onClick,
        children,
        style,
    } = props

    const { toggle } = modalSettings

    return (
        <ModalWrapper
            centered={true}
            backdrop={true}
            size="lg"
            {...modalSettings}
            style={{ maxWidth: '500px', ...style }}
        >
                <ModalHeader toggle={toggle}>{headerLabel}</ModalHeader>
                <ModalBody>
                    {children}
                </ModalBody>
                <ModalFooter>
                    <Button outline color="secondary" onClick={toggle}>
                        Cancel
                    </Button>
                    <Button color="primary" onClick={onClick}>
                        {buttonLabel}
                    </Button>
                </ModalFooter>
        </ModalWrapper>
    )
}
