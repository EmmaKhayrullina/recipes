import React from 'react';
import styled from 'styled-components';
import Button from '../atoms/Button';

const Wrapper = styled.div`
  position: fixed;
  top: 80px;
  right: 20px;
  display: flex;
  padding: 15px;
  max-width: 300px;
  color: var(--white-color);
  background-color: var(--alert-success);
  word-break: break-word;
  z-index: 1000;

  &.error {
    background-color: var(--alert-error);

    button {
      color: var(--alert-error);
    }
  }
`;

const StyledButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 0 0 15px;
  color: var(--alert-success);

  &.rounded {
    width: 20px;
    height: 20px;
    padding: 4px 5px;
    line-height: 0;
  }
`;

const Alert = ({ alert, hideAlertMessage }) => {
  return (
    <Wrapper className={alert.type && alert.type === 'error' ? 'error' : ''}>
      <span>{alert.text}</span>
      <StyledButton className="rounded transparent" onClick={hideAlertMessage}>
        &times;
      </StyledButton>
    </Wrapper>
  );
};

export default Alert;
