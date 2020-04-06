import React from 'react';
import styled from 'styled-components';
import Button from '../atoms/Button';

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.7);
  z-index: 100;
`;

const Dialog = styled.div`
  position: relative;
  max-width: 450px;
  width: 90%;
  padding: 15px;
  background: var(--white-color);
  z-index: 1000;
`;

const StyledButton = styled(Button)`
  position: absolute;
  top: 0;
  right: 0;
  transform: translate(20%, -20%);
`;

const Modal = ({ closeModal, children }) => {
  return (
    <Wrapper>
      <Overlay onClick={closeModal} />
      <Dialog>
        <StyledButton className="rounded" onClick={closeModal}>
          &times;
        </StyledButton>
        {children}
      </Dialog>
    </Wrapper>
  );
};

export default Modal;
