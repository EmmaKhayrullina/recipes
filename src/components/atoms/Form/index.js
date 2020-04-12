import React from 'react';
import styled from 'styled-components';

const StyledForm = styled.form`
  padding: 15px;
`;

/* eslint-disable react/jsx-props-no-spreading */
const Form = ({ onSubmit, className, children, ...args }) => (
  <StyledForm onSubmit={onSubmit} className={className} {...args}>
    {children}
  </StyledForm>
);
/* eslint-enable react/jsx-props-no-spreading */

export default Form;
