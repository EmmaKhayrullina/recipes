import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import Button from '../atoms/Button';
import Filter from '../molecules/Filter';
import useModal from '../../hooks/useModal';

const ActionsWrapper = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  grid-gap: 15px;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;

  @media (max-width: 480px) {
    grid-template-columns: auto;
  }
`;

const RecipesActions = () => {
  const { openModal } = useModal();

  return (
    <ActionsWrapper>
      <Button title="Add" onClick={openModal}>
        <FontAwesomeIcon icon={faPlus} />
        Add new recipe
      </Button>

      <Filter />
    </ActionsWrapper>
  );
};

export default RecipesActions;
