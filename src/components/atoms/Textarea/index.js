import React from 'react';
import FieldWrapper from '../FieldWrapper';
import Label from '../Label';

const Textarea = props => {
  const { label, className, value, name, disabled, onChange, errorMessage } = props;
  const textareaId = `textarea-${Math.random()}`;

  return (
    <FieldWrapper className={className}>
      <Label htmlFor={textareaId}>{label}</Label>
      <textarea id={textareaId} value={value} onChange={onChange} disabled={disabled} name={name} />

      <span>{errorMessage}</span>
    </FieldWrapper>
  );
};

export default Textarea;
