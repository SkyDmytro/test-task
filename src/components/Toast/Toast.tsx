import React, { useState, useEffect, useCallback } from 'react';
import ReactDOM from 'react-dom';
import './Toast.css';

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
    success: (
      <svg className="toast-icon" viewBox="0 0 24 24" fill="none">
        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" fill="currentColor" />
      </svg>
    ),
    error: (
      <svg className="toast-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="8" fill="#ff4d4f" />
      </svg>
    ),
    warning: (
      <svg className="toast-icon" viewBox="0 0 24 24" fill="none">
        <path d="M1 21h22 L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" fill="currentColor" />
      </svg>
    ),
    info: (
      <svg className="toast-icon" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-6h2v6zm0-8h-2V7h2v4z"
          fill="currentColor"
        />
      </svg>
    ),
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
        <svg viewBox="0 0 24 24" fill="none">
          <path
            d="M18 6L6 18M6 6l12 12"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </button>
      <div className="toast-progress">
        <div className="toast-progress-bar" style={{ animationDuration: `${duration}ms` }}></div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(toast, document.body);
};
