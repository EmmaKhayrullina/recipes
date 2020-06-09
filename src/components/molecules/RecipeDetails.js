import React from 'react';
import styled from 'styled-components';
import Title from '../atoms/Title';

const Container = styled.div`
  padding: 15px;
  overflow: hidden;
  background-color: var(--second-color);
`;

const Details = styled.div`
  min-width: calc(100% - 240px);
  float: left;
`;

const SubTitle = styled.h2`
  margin: 0 0 10px;
`;

const Text = styled.p`
  margin: 0 0 20px;
  white-space: pre-line;
`;

const Photo = styled.figure`
  display: flex;
  width: 200px;
  margin: 20px 0 20px 20px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const RecipeDetails = ({ recipe }) => {
  return (
    <article data-testid="test-recipe-details">
      <Title>{recipe.title}</Title>

      <Container>
        <Details>
          <SubTitle>Ingredients:</SubTitle>
          <Text>{recipe.ingredients}</Text>

          <SubTitle>Description:</SubTitle>
          <Text>{recipe.description}</Text>
        </Details>

        {recipe.image && (
          <Photo>
            <img src={recipe.image.url} alt="recipe" />
          </Photo>
        )}
      </Container>
    </article>
  );
};

export default RecipeDetails;
