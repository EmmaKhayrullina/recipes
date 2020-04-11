import React from 'react';
import FieldWrapper from '../FieldWrapper';
import Label from '../Label';

const Input = props => {
  const { type, label, className, value, name, disabled, accept, onChange, errorMessage } = props;
  const inputType = type || 'text';
  const inputId = `input-${Math.random()}`;

  return (
    <FieldWrapper className={className}>
      <Label htmlFor={inputId}>{label}</Label>
      <input
        id={inputId}
        type={inputType}
        value={value}
        name={name}
        accept={accept}
        disabled={disabled}
        onChange={onChange}
      />

      <span>{errorMessage}</span>
    </FieldWrapper>
  );
};

export default Input;
