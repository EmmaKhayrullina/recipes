import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../atoms/Button';
import Input from '../atoms/Input';
import Form from '../atoms/Form';
import useAuth from '../../hooks/useAuth';

const FieldActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
`;

const AuthForm = props => {
  const {
    user: { email },
    pageName,
    history,
  } = props;
  const [user, setUser] = useState({ email, password: '' });
  const { signUpUser, signInUser } = useAuth();

  const onChangeField = event => {
    const { name, value } = event.target;
    setUser(userData => ({ ...userData, [name]: value }));
  };

  const redirectToHome = () => history.replace('/');

  const onSubmitHandler = e => {
    if (e) e.preventDefault();

    if (pageName === 'Login') {
      return signInUser(user.email, user.password, redirectToHome);
    }
    return signUpUser(user.email, user.password, redirectToHome);
  };

  return (
    <Form onSubmit={onSubmitHandler} data-testid={`test-${pageName.toLowerCase()}-form`}>
      <Input type="email" label="Email" name="email" value={user.email} onChange={onChangeField} />
      <Input type="password" label="Password" name="password" value={user.password} onChange={onChangeField} />

      <FieldActions>
        {pageName === 'Login' ? <Link to="/registration">Registration</Link> : <Link to="/login">Login</Link>}

        <Button type="submit">{pageName}</Button>
      </FieldActions>
    </Form>
  );
};

export default withRouter(AuthForm);
