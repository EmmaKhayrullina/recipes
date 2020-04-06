import React from 'react';
import styled from 'styled-components';
import Navigation from '../molecules/Navigation';
import Logo from '../atoms/Logo';

const HeaderTag = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
  background-color: var(--primary-color);
  color: var(--white-color);

  a {
    color: var(--white-color);
  }
`;

const Header = () => (
  <HeaderTag>
    <Logo />

    <Navigation />
  </HeaderTag>
);

export default Header;
