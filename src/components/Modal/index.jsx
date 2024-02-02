import { Portal } from './Portal'
import { CSSTransition } from 'react-transition-group';
import { Container, Dim, Overlay } from './index.styles';

export const Modal = ({
    children,
    onClose,
    isOpen,
    selector = '#modal-root', 
}) => {
    return (
        <CSSTransition in={isOpen} timeout={300} classNames='modal' unmountOnExit>
            <Portal selector={selector}>
                <Overlay>
                    <Dim onClick={onClose} />
                    <Container>{children}</Container>
                </Overlay>
            </Portal>
        </CSSTransition>
    )
}