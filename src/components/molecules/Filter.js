import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import CategorySelect from './CategorySelect';
import useFilter from '../../hooks/useFilter';

const FilterWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Icon = styled(FontAwesomeIcon)`
  margin-right: 5px;
`;

const FilterLabel = styled.span`
  margin-right: 10px;

  @media (max-width: 480px) {
    display: none;
  }
`;

const Dropdown = styled(CategorySelect)`
  margin-bottom: 0;
`;

const Filter = () => {
  const { filter, filterByCategory } = useFilter();

  return (
    <FilterWrapper>
      <Icon icon={faFilter} />
      <FilterLabel>Filter by:</FilterLabel>

      <Dropdown name="filter" filter={filter} onChange={filterByCategory} />
    </FilterWrapper>
  );
};

export default Filter;
