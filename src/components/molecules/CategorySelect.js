import React from 'react';
import styled from 'styled-components';
import Select from 'react-select';
import FieldWrapper from '../atoms/FieldWrapper';
import Label from '../atoms/Label';
import useCategorySelect from '../../hooks/useCategorySelect';

const StyledSelect = styled(Select)`
  > div {
    min-width: 150px;
    border-color: var(--border-color);
  }

  & > div:hover,
  & > div:focus {
    border-color: var(--border-color);
    box-shadow: 0 3px 5px 2px var(--border-color);
    outline: none;
  }
`;

const CategorySelect = ({ label, name, className, filter, onChange }) => {
  const selectId = name;
  const { categories, handleChangeCategory, currentValue } = useCategorySelect(filter);

  const handleChange = option => {
    handleChangeCategory(option);
    onChange(option);
  };

  return (
    <FieldWrapper className={className}>
      <Label htmlFor={selectId}>{label}</Label>

      <StyledSelect
        label={label}
        name={name}
        value={currentValue}
        options={categories}
        onChange={handleChange}
        theme={theme => ({
          ...theme,
          borderRadius: 0,
          colors: {
            ...theme.colors,
            primary25: '#e3e3e3',
            primary50: '#f8f8f8',
            primary: '#42b983',
          },
        })}
      />
    </FieldWrapper>
  );
};

export default CategorySelect;
