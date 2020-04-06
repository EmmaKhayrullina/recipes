import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const StyledButton = styled.button`
  padding: 8px 12px;
  color: var(--white-color);
  border: 1px solid transparent;
  border-radius: 5px;
  background-color: var(--primary-color);
  text-transform: uppercase;
  transition: background-color 0.4s;
  font-size: var(--font-size--small);
  font-weight: bold;

  &:not(:disabled):hover {
    background-color: var(--border-button-focus);
  }

  &:focus {
    border-color: var(--border-button-focus);
    outline: none;
  }

  &:disabled {
    background-color: rgba(0, 0, 0, 0.2);
  }

  &.rounded {
    width: 35px;
    height: 35px;
    border-radius: 50%;
    padding: 7px 10px;
    box-shadow: 0 0 5px var(--white-color);
  }

  &.transparent {
    background-color: rgba(255, 255, 255, 0.6);
    box-shadow: none;

    &:hover {
      background-color: rgba(255, 255, 255, 1);
    }

    &:focus {
      border-color: var(--white-color);
    }
  }

  &:not(.rounded) svg {
    margin-right: 5px;
  }

  & + button {
    margin-left: 10px;
  }
`;

const Button = props => {
  const { children, disabled, className, onClick, type = 'button', icon, title } = props;

  return (
    <StyledButton type={type} className={className} title={title} onClick={onClick} disabled={disabled}>
      {icon ? <FontAwesomeIcon icon={icon} /> : null}
      {children}
    </StyledButton>
  );
};

export default Button;
