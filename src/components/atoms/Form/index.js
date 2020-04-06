import React from 'react';
import styled from 'styled-components';

const StyledForm = styled.form`
  padding: 15px;

  div {
    margin-bottom: 15px;
  }
`;

const Form = ({ onSubmit, className, children }) => (
  <StyledForm onSubmit={onSubmit} className={className}>
    {children}
  </StyledForm>
);

export default Form;
