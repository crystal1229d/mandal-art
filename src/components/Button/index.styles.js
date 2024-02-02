import styled from 'styled-components';

export const StyledButton = styled.button`
  width: 8rem;
  height: 2rem;

  display: flex;
  justify-content: center;
  align-items: center;

  letter-spacing: 0.1rem;
  font-size: 0.8rem;
  font-weight: 400;
  color: white;
  background-color: #33305B;
  outline: none;
  border: none;
  border-radius: 12px;
  cursor: pointer;

  transition: transform .25s;
  -o-transition: transform .25s;
  -moz-transition: transform .25s;
  -webkit-transition: transform .25s;

  &:hover, &:active {
    opacity: 0.7;
`;