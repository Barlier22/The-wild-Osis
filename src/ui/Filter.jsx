/* eslint-disable no-unused-vars */
import { useSearchParams } from "react-router-dom";
import styled, { css } from "styled-components";

const StyledFilter = styled.div`
  border: 1px solid var(--color-grey-100);
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-sm);
  border-radius: var(--border-radius-sm);
  padding: 0.4rem;
  display: flex;
  gap: 0.4rem;
`;

const FilterButton = styled.button`
  background-color: var(--color-grey-0);
  border: none;

  ${(props) =>
    props.active &&
    css`
      background-color: var(--color-brand-600);
      color: var(--color-brand-50);
    `}

  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;
  /* To give the same height as select */
  padding: 0.44rem 0.8rem;
  transition: all 0.3s;

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;
function Filter({ filterField, options }) {
  /* this allow us to reading and writing search parameters via the URLSearchParams interface. */
  const [searchParams, SetSearchParams] = useSearchParams();
  /* const [searchParams, SetSearchParams] = useSearchParams();
     searchParams: variable on where we set or get the value of search params
      SetSearchParams: fn use to update params ulr
   */

  const currentFilter = searchParams.get(filterField) || options[0].value;

  function handleClick(value) {
    searchParams.set(filterField, value);
    if (searchParams.get("page")) searchParams.set("page", 1);
    SetSearchParams(searchParams); // update the url
  }

  return (
    <StyledFilter>
      {options.map((option) => (
        <FilterButton
          key={option.value}
          onClick={() => handleClick(option.value)}
          active={option.value === currentFilter ? "true" : undefined}
          disabled={option.value === currentFilter}
        >
          {option.label}
        </FilterButton>
      ))}
      {/* <FilterButton onClick={() => handleClick("no-discount")}>
        No discount
      </FilterButton>
      <FilterButton onClick={() => handleClick("with-discount")}>
        With discount
      </FilterButton> */}
    </StyledFilter>
  );
}

export default Filter;