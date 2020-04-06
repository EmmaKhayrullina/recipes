import React from 'react';
import Loader from '../atoms/Loader';
import RecipeList from '../molecules/RecipeList';
import RecipesActions from '../organisms/RecipesActions';
import Title from '../atoms/Title';
import MainTemplate from '../templates/MainTemplate';
import Modal from '../molecules/Modal';
import RecipeForm from '../organisms/RecipeForm';
import useModal from '../../hooks/useModal';
import useRecipeList from '../../hooks/useRecipeList';
import useLoader from '../../hooks/useLoader';

const Recipes = () => {
  const { isModalOpen, closeModal } = useModal();
  const { recipeList } = useRecipeList();
  const { loading } = useLoader();

  return (
    <MainTemplate>
      <div>
        <Title>Your recipes</Title>
        <RecipesActions />

        {recipeList.length ? <RecipeList recipes={recipeList} /> : loading ? <Loader /> : <p>You have no recipes</p>}

        {isModalOpen && (
          <Modal closeModal={closeModal}>
            <RecipeForm closeModal={closeModal} />
          </Modal>
        )}
      </div>
    </MainTemplate>
  );
};

export default Recipes;
