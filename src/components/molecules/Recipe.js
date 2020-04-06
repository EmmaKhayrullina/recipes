import React from 'react';
import { faEdit, faTrashAlt, faUtensils } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import useRecipe from '../../hooks/useRecipe';
import Button from '../atoms/Button';
import useImageFile from '../../hooks/useImageFile';

const Wrapper = styled.article`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Photo = styled.figure`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 180px;
  margin: 0;

  svg {
    max-width: 100%;
    min-width: 100%;
    height: 100%;
    padding: 40px;
    color: var(--white-color);
    background: var(--image-color);
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Description = styled.div`
  position: relative;
  padding: 15px;
`;

const Text = styled.p`
  margin: 0 0 15px;
  white-space: pre-line;
`;

const Actions = styled.div`
  position: absolute;
  top: 0;
  right: 10px;
  transform: translateY(-50%);
`;

const Recipe = ({ recipe }) => {
  const { id, title, ingredients, description, image, isEdit } = recipe;
  const { deleteRecipe, editRecipe } = useRecipe();
  const { deleteImage } = useImageFile(image);

  const showEditForm = () => {
    editRecipe({
      id,
      isEdit: !isEdit,
    });
  };

  const deleteCurrentRecipe = () => {
    deleteRecipe(id);
    if (image) deleteImage(image.fileName);
  };

  return (
    <li>
      <Wrapper>
        <Photo>{image ? <img src={image.url} alt="recipe" /> : <FontAwesomeIcon icon={faUtensils} />}</Photo>

        <Description>
          <h2>{title}</h2>

          <Text>
            <strong>Ingredients:</strong>
            <br />
            {ingredients}
          </Text>

          <Text>
            <strong>Description:</strong>
            <br />
            {description}
          </Text>

          <Actions>
            <Button className="rounded" icon={faEdit} onClick={showEditForm} />
            <Button className="rounded" onClick={deleteCurrentRecipe} icon={faTrashAlt} />
          </Actions>
        </Description>
      </Wrapper>
    </li>
  );
};

export default Recipe;
