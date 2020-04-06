import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { useSelector, shallowEqual } from 'react-redux';
import CustomSelect from '../atoms/Select';

const FilterWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Icon = styled(FontAwesomeIcon)`
  margin-right: 5px;
`;

const FilterLabel = styled.span`
  margin-right: 10px;
`;

const Filter = () => {
  const categories = useSelector(state => state.recipes.categories, shallowEqual);

  return (
    <FilterWrapper>
      <Icon icon={faFilter} />
      <FilterLabel>Filter by:</FilterLabel>

      <CustomSelect value="salad" options={categories} />
    </FilterWrapper>
  );
};

export default Filter;
