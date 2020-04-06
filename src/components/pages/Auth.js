import React from 'react';
import AuthForm from '../organisms/AuthForm';
import Title from '../atoms/Title';
import AuthTemplate from '../templates/AuthTemplate';
import useAuth from '../../hooks/useAuth';

const Auth = ({ match }) => {
  const { user } = useAuth();
  const pageName = match.path === '/login' ? 'Login' : 'Registration';

  return (
    <AuthTemplate>
      <Title>{pageName}</Title>
      <AuthForm user={user} pageName={pageName} />
    </AuthTemplate>
  );
};

export default Auth;
