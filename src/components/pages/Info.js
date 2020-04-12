import React from 'react';
import styled from 'styled-components';
import MainTemplate from '../templates/MainTemplate';

const InfoWrapper = styled.div`
  display: flex;
`;

const Info = () => (
  <MainTemplate>
    <InfoWrapper data-testid="test-info-page">Info page</InfoWrapper>
  </MainTemplate>
);

export default Info;
