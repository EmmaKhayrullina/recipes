import React from 'react';
import styled from 'styled-components';
import GlobalStyles from '../../styles/globalStyles';
import Alert from '../molecules/Alert';
import useAlert from '../../hooks/useAlert';
import Logo from '../atoms/Logo';

const AuthWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 100vh;
  background-color: var(--second-color);
`;

const AuthContainer = styled.div`
  max-width: 100%;
  width: 350px;
  margin-top: 30px;
  padding: 20px;
  background-color: var(--white-color);
`;

const AuthTemplate = props => {
  const { children } = props;
  const { alert, hideAlertMessage } = useAlert();

  return (
    <>
      <GlobalStyles />
      <AuthWrap>
        {alert && <Alert alert={alert} hideAlertMessage={hideAlertMessage} />}

        <Logo />
        <AuthContainer>{children}</AuthContainer>
      </AuthWrap>
    </>
  );
};

export default AuthTemplate;
