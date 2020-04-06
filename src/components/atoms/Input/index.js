import React from 'react';
import FieldWrapper from '../FieldWrapper';
import Label from '../Label';

const Input = props => {
  const { type, label, className, value, name, disabled, onChange, errorMessage } = props;
  const inputType = type || 'text';
  const inputId = `input-${Math.random()}`;

  return (
    <FieldWrapper className={className}>
      <Label htmlFor={inputId}>{label}</Label>
      <input id={inputId} type={inputType} value={value} onChange={onChange} disabled={disabled} name={name} />

      <span>{errorMessage}</span>
    </FieldWrapper>
  );
};

export default Input;
