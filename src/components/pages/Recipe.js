import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import MainTemplate from '../templates/MainTemplate';
import useRecipeDetails from '../../hooks/useRecipeDetails';
import Loader from '../atoms/Loader';
import InfoText from '../atoms/InfoText';
import RecipeDetails from '../molecules/RecipeDetails';

const StyledLink = styled(Link)`
  display: inline-block;
  margin-bottom: 30px;
  color: var(--primary-color);
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Recipe = ({ match }) => {
  const { recipe, loading } = useRecipeDetails(match.params.id);

  return (
    <MainTemplate>
      <Wrapper data-testid="test-recipe-page">
        <StyledLink to="/">Back to recipes</StyledLink>

        {loading ? (
          <Loader />
        ) : recipe ? (
          <RecipeDetails recipe={recipe} />
        ) : (
          <InfoText>Something went wrong...</InfoText>
        )}
      </Wrapper>
    </MainTemplate>
  );
};

export default Recipe;
