import React from 'react';
import styled from 'styled-components';
import Recipe from './Recipe';
import RecipeForm from '../organisms/RecipeForm';

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

const RecipeList = ({ recipes }) => (
  <RecipesList>
    {recipes.map(recipe =>
      recipe.isEdit ? (
        <li key={recipe.id}>
          <RecipeForm recipe={recipe} />
        </li>
      ) : (
        <Recipe key={recipe.id} recipe={recipe} />
      ),
    )}
  </RecipesList>
);

export default RecipeList;
