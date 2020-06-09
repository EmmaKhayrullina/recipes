import React from 'react';
import { Redirect } from 'react-router-dom';
import AuthForm from '../organisms/AuthForm';
import Title from '../atoms/Title';
import AuthTemplate from '../templates/AuthTemplate';
import useAuth from '../../hooks/useAuth';

const Auth = ({ match }) => {
  const { user } = useAuth();
  const pageName = match.path === '/login' ? 'Login' : 'Registration';

  if (user.uid) {
    return <Redirect to="/" />;
  }

  return (
    <AuthTemplate>
      <Title>{pageName}</Title>
      <AuthForm user={user} pageName={pageName} />
    </AuthTemplate>
  );
};

export default Auth;
