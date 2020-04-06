import React from 'react';
import styled from 'styled-components';
import Header from '../organisms/Header';
import useAlert from '../../hooks/useAlert';
import Alert from '../molecules/Alert';
import GlobalStyles from '../../styles/globalStyles';

const Container = styled.main`
  display: flex;
  flex-grow: 1;
  width: 100%;

  & > div {
    max-width: 1200px;
    width: 100%;
    padding: 30px 15px;
    margin: 0 auto;
  }
`;

const MainTemplate = props => {
  const { children } = props;
  const { alert, hideAlertMessage } = useAlert();

  return (
    <>
      <GlobalStyles />

      <Header />
      {alert && <Alert alert={alert} hideAlertMessage={hideAlertMessage} />}
      <Container>{children}</Container>
    </>
  );
};

export default MainTemplate;
