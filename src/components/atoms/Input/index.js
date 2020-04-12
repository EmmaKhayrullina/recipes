import React from 'react';
import FieldWrapper from '../FieldWrapper';
import Label from '../Label';

const Input = props => {
  const { type, label, className, value, name, disabled, required, accept, onChange, maxLength, errorMessage } = props;
  const inputType = type || 'text';
  const inputId = `input-${name}`;

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
        required={required}
        maxLength={maxLength}
        onChange={onChange}
      />

      {maxLength && value && value.length === +maxLength ? (
        <span>Must be {maxLength} characters or less</span>
      ) : (
        <span>{errorMessage}</span>
      )}
    </FieldWrapper>
  );
};

export default Input;
