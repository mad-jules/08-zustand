import { createPortal } from 'react-dom';
import css from './Modal.module.css';
import { useEffect } from 'react';

interface ModalProps {
    children: React.ReactNode;
    onClose: () => void;
}

export default function Modal({ children, onClose }: ModalProps) {
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        document.body.style.overflow = 'hidden';

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = '';
        };
    }, [onClose]);

    function handleClose(e: React.MouseEvent<HTMLElement>) {
        if (e.target === e.currentTarget) {
            onClose();
        }
    }

    return createPortal(
        <div
            onClick={handleClose}
            className={css.backdrop}
            role="dialog"
            aria-modal="true"
        >
            <div className={css.modal}>{children}</div>
        </div>,
        document.body,
    );
}
