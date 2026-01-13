'use client';

import { useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';

interface BaseProps {
  show: boolean;
  title: string;
  message: string;
  confirmVariant?: string;
  zIndex?: number;
  onConfirm: () => void;
}

interface AlertProps extends BaseProps {
  type: 'alert';
}

interface ConfirmProps extends BaseProps {
  type: 'confirm';
  onClose: () => void;
}

type Props = AlertProps | ConfirmProps;

export default function AlertModal(props: Props) {
  const {
    type,
    show,
    onConfirm,
    title,
    message,
    confirmVariant = 'danger',
    zIndex = 9998,
  } = props;

  const onClose = type === 'confirm' ? props.onClose : props.onConfirm;

  useEffect(() => {
    if (!show) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        onConfirm();
      }
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [show, onConfirm, onClose]);

  return (
    <Modal
      backdrop="static"
      show={show}
      onHide={onClose}
      style={{ zIndex }}
      centered
      autoFocus
    >
      <Modal.Header>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ whiteSpace: 'pre-line' }}>{message}</Modal.Body>
      <Modal.Footer>
        {type === 'confirm' && (
          <Button variant="secondary" onClick={props.onClose}>
            취소
          </Button>
        )}
        <Button variant={confirmVariant} onClick={onConfirm} autoFocus>
          확인
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
