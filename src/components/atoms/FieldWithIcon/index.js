import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '../Button';
import Input from '../Input';

const Wrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  > div {
    margin-right: 10px;
    flex-grow: 1;
  }
`;

const FieldWithIcon = ({ name, onChange, value, icon }) => (
  <Wrap>
    <Input name={name} onChange={onChange} value={value} />
    <Button className="rounded">
      <FontAwesomeIcon icon={icon} />
    </Button>
  </Wrap>
);

export default FieldWithIcon;
