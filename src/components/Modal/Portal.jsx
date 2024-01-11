import { createPortal } from 'react-dom';

export const Portal = ({ children }) => {
    const rootElement = document.getElementById('#modal-root');

    return (
        <>
            {rootElement ? createPortal(children, rootElement) : children}
        </>
    )
}