import React from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Title from '../atoms/Title';
import MainTemplate from '../templates/MainTemplate';

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

const Recipe = props => {
  const recipeList = useSelector(state => state.recipes, shallowEqual);
  const recipe = recipeList.find(item => item.id === props.match.params.id);

  return (
    <MainTemplate>
      <Wrapper data-testid="test-recipe-page">
        <StyledLink to="/">Back to recipes</StyledLink>

        <article>
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
      </Wrapper>
    </MainTemplate>
  );
};

export default Recipe;
