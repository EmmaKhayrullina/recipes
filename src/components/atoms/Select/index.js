import React from 'react';
import styled from 'styled-components';
import Select from 'react-select';
import FieldWrapper from '../FieldWrapper';
import Label from '../Label';

const StyledSelect = styled(Select)`
  > div {
    min-width: 150px;
  }

  & > div:hover,
  & > div:focus {
    border-color: var(--border-color-focus);
    box-shadow: 0 3px 5px 2px var(--border-color);
    outline: none;
  }
`;

const CustomSelect = props => {
  const { label, value, onChange, className, options, name } = props;
  const selectId = `${label}-${Math.random()}`;

  return (
    <FieldWrapper className={className}>
      <Label htmlFor={selectId}>{label}</Label>

      <StyledSelect
        id={selectId}
        name={name}
        value={value}
        onChange={onChange}
        options={options}
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

export default CustomSelect;
