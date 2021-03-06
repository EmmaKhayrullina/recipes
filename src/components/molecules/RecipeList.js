import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import RecipeItem from './RecipeItem';
import RecipeForm from '../organisms/RecipeForm';
import InfoText from '../atoms/InfoText';

const RecipesList = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 30px 30px;

  @media (max-width: 920px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    justify-content: center;
  }

  li {
    background: var(--second-color);
    box-shadow: 0px 1px 4px 1px var(--shadow-color);
  }
`;

const RecipeList = ({ recipes }) => {
  const filter = useSelector(state => state.app.filter).toLowerCase();
  const filteredRecipes = recipes.filter(recipe => (filter === 'all' ? recipe : recipe.category === filter));

  if (filteredRecipes.length) {
    return (
      <RecipesList data-testid="test-recipe-list">
        {filteredRecipes.map(recipe =>
          recipe.isEdit ? (
            <li key={recipe.id}>
              <RecipeForm recipe={recipe} />
            </li>
          ) : (
            <RecipeItem key={recipe.id} recipe={recipe} />
          ),
        )}
      </RecipesList>
    );
  }
  return <InfoText>There are no recipes in this category</InfoText>;
};

export default RecipeList;
