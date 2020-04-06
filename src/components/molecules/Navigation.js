import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import Button from '../atoms/Button';
import useAuth from '../../hooks/useAuth';

const NavList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
`;

const NavItem = styled.li`
  margin-left: 30px;

  a {
    text-decoration: none;
  }

  a.active,
  a:hover {
    text-decoration: underline;
  }

  button {
    border: 1px solid var(--white-color);
  }
`;

const Navigation = props => {
  const { signOutUser, user } = useAuth();
  const exit = () => {
    signOutUser();
    props.history.push('/login');
  };

  return (
    <nav>
      {user.uid ? (
        <NavList>
          <NavItem>
            <NavLink to="/" exact activeClassName="active">
              Resipe list
            </NavLink>
          </NavItem>

          <NavItem>
            <NavLink to="/info">Info</NavLink>
          </NavItem>

          <NavItem>
            <Button icon={faSignOutAlt} onClick={exit}>
              Exit
            </Button>
          </NavItem>
        </NavList>
      ) : null}
    </nav>
  );
};

export default withRouter(Navigation);
