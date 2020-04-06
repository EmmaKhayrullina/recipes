import React from 'react';
import styled from 'styled-components';

const LoaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const StyledLoader = styled.div`
  display: inline-block;
  width: 80px;
  height: 80px;

  &::after {
    content: ' ';
    display: block;
    width: 64px;
    height: 64px;
    margin: 8px;
    border-radius: 50%;
    border: 6px solid var(--primary-color);
    border-color: var(--primary-color) transparent var(--primary-color) transparent;
    animation: lds-dual-ring 1.2s linear infinite;
  }

  @keyframes lds-dual-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const Loader = () => (
  <LoaderWrapper>
    <StyledLoader />
  </LoaderWrapper>
);

export default Loader;
