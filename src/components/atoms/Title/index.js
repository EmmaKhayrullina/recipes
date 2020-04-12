import React from 'react';
import styled from 'styled-components';

const StyledTitle = styled.h1`
  margin: 0 0 20px;
  font-size: 28px;
`;

const Title = ({ children, className }) => <StyledTitle className={className}>{children}</StyledTitle>;

export default Title;
