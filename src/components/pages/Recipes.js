import React from 'react';
import { Redirect } from 'react-router-dom';
import Loader from '../atoms/Loader';
import RecipeList from '../molecules/RecipeList';
import RecipesActions from '../organisms/RecipesActions';
import Title from '../atoms/Title';
import MainTemplate from '../templates/MainTemplate';
import Modal from '../molecules/Modal';
import RecipeForm from '../organisms/RecipeForm';
import useModal from '../../hooks/useModal';
import useRecipeList from '../../hooks/useRecipeList';
import useAuth from '../../hooks/useAuth';

const Recipes = () => {
  const { isModalOpen, closeModal } = useModal();
  const { recipeList, loading } = useRecipeList();
  const { user } = useAuth();

  if (user.uid) {
    return (
      <MainTemplate>
        <div data-testid="test-recipes-page">
          <Title>Your recipes</Title>
          <RecipesActions />

          {recipeList.length ? <RecipeList recipes={recipeList} /> : loading ? <Loader /> : <p>You have no recipes</p>}

          {isModalOpen && (
            <Modal closeModal={closeModal}>
              <RecipeForm />
            </Modal>
          )}
        </div>
      </MainTemplate>
    );
  }

  return <Redirect to="/login" />;
};

export default Recipes;
