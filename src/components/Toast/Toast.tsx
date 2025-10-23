import React, { useState, useEffect, useCallback } from 'react';
import ReactDOM from 'react-dom';
import './Toast.css';
import { SuccessIcon } from './SuccessIcon';
import { ErrorIcon } from './ErrorIcon';
import { WarningIcon } from './WarningIcon';
import { InfoIcon } from './InfoIcon';
import { CloseIcon } from './CloseIcon';

type IconType = 'success' | 'error' | 'info' | 'warning';

export interface ToastProps {
  message: string;
  type?: IconType;
  duration?: number;
  onClose?: () => void;
  show: boolean;
}

export const Toast: React.FC<ToastProps> = ({
  message,
  type = 'info',
  duration = 3000,
  onClose,
  show,
}) => {
  const [visible, setVisible] = useState(show);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);

  useEffect(() => {
    if (show) {
      setVisible(true);
      setIsAnimatingOut(false);
    } else {
      handleClose();
    }
  }, [show]);

  const handleClose = useCallback(() => {
    setIsAnimatingOut(true);
    setTimeout(() => {
      setVisible(false);
      onClose?.();
    }, 300);
  }, [onClose]);

  useEffect(() => {
    if (visible && !isAnimatingOut) {
      const timer = setTimeout(() => {
        handleClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [visible, isAnimatingOut, duration, handleClose]);

  if (!visible) {
    return null;
  }

  const icons: Record<IconType, React.ReactNode> = {
    success: <SuccessIcon />,
    error: <ErrorIcon />,
    warning: <WarningIcon />,
    info: <InfoIcon />,
  };

  const toast = (
    <div
      className={`toast toast-${type} ${visible && !isAnimatingOut ? 'show' : ''} ${isAnimatingOut ? 'hide' : ''}`}
    >
      <div className="toast-content">
        <div className="toast-icon-wrapper">{icons[type]}</div>
        <div className="toast-message">{message}</div>
      </div>
      <button className="toast-close-btn" onClick={handleClose} aria-label="Close notification">
        <CloseIcon />
      </button>
      <div className="toast-progress">
        <div className="toast-progress-bar" style={{ animationDuration: `${duration}ms` }}></div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(toast, document.body);
};
