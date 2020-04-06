import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUtensils } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';

const HeaderIcon = styled(FontAwesomeIcon)`
  margin-right: 10px;
`;

const Logo = () => (
  <div>
    <HeaderIcon icon={faUtensils} />
    <span>Recipes</span>
  </div>
);

export default Logo;
