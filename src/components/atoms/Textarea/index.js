import React from 'react';
import FieldWrapper from '../FieldWrapper';
import Label from '../Label';

const Textarea = props => {
  const { label, className, value, name, disabled, required, maxLength, onChange, errorMessage } = props;
  const textareaId = `textarea-${name}`;

  return (
    <FieldWrapper className={className}>
      <Label htmlFor={textareaId}>{label}</Label>
      <textarea
        id={textareaId}
        value={value}
        onChange={onChange}
        disabled={disabled}
        name={name}
        required={required}
        maxLength={maxLength}
      />
      {maxLength && value && value.length === +maxLength ? (
        <span>Must be {maxLength} characters or less</span>
      ) : (
        <span>{errorMessage}</span>
      )}
    </FieldWrapper>
  );
};

export default Textarea;
