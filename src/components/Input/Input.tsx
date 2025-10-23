import React, { useState, useCallback, type ChangeEvent } from 'react';
import './Input.css';

type ControlledInputProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
} & React.InputHTMLAttributes<HTMLInputElement>;

type UncontrolledInputProps = {
  value?: undefined;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
} & React.InputHTMLAttributes<HTMLInputElement>;

interface BaseInputProps {
  clearable?: boolean;
}

type InputProps = BaseInputProps & (ControlledInputProps | UncontrolledInputProps);

const usePasswordVisibility = (initialVisible = false) => {
  const [isVisible, setIsVisible] = useState(initialVisible);
  const toggle = useCallback(() => setIsVisible((prev) => !prev), []);
  return { isVisible, toggle };
};

const EyeIcon: React.FC<{ visible: boolean }> = ({ visible }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
    {visible ? (
      <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
    ) : (
      <path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z" />
    )}
  </svg>
);

const ClearIcon: React.FC = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
  </svg>
);

export const Input: React.FC<InputProps> = ({
  type,
  clearable,
  value: controlledValue,
  onChange,
  className = '',
  ...props
}) => {
  const [internalValue, setInternalValue] = useState('');
  const { isVisible: isPasswordVisible, toggle: togglePasswordVisibility } =
    usePasswordVisibility();

  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : internalValue;

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(e);
      if (!isControlled) {
        setInternalValue(e.target.value);
      }
    },
    [onChange, isControlled]
  );

  const handleClear = useCallback(() => {
    if (isControlled && onChange) {
      const syntheticEvent = {
        target: { value: '' },
        currentTarget: { value: '' },
      } as ChangeEvent<HTMLInputElement>;
      onChange(syntheticEvent);
    } else {
      setInternalValue('');
    }
  }, [isControlled, onChange]);

  const inputType = type === 'password' && isPasswordVisible ? 'text' : type;
  const hasValue = Boolean(value);

  return (
    <div className={`input ${className}`}>
      <input
        type={inputType}
        value={value}
        onChange={handleChange}
        className="input__field"
        {...props}
      />

      {type === 'password' && (
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="input__button input__button--toggle"
          aria-label={isPasswordVisible ? 'Hide password' : 'Show password'}
        >
          <EyeIcon visible={isPasswordVisible} />
        </button>
      )}

      {clearable && hasValue && (
        <button
          type="button"
          onClick={handleClear}
          className="input__button input__button--clear"
          aria-label="Clear input"
        >
          <ClearIcon />
        </button>
      )}
    </div>
  );
};
