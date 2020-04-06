import React from 'react';
import styled from 'styled-components';

const FieldsetTag = styled.fieldset`
  margin-bottom: 15px;
  padding: 15px 10px;
  border: 0;
  box-shadow: 0px 1px 4px 1px var(--shadow-color);
`;

const Fieldset = ({ className, children }) => <FieldsetTag className={className}>{children}</FieldsetTag>;

export default Fieldset;
