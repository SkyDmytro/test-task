import React, { useState, useCallback, type ChangeEvent } from 'react';
import './Input.css';
import { EyeIcon } from './EyeIcon';
import { ClearIcon } from './ClearIcon';

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
