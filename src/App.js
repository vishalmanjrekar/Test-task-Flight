import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  cursor: pointer;
  background: transparent;
  font-size: 16px;
  border-radius: 3px;
  color: palevioletred;
  border: 2px solid palevioletred;
  margin: 0 1em;
  padding: 0.25em 1em;
  transition: 0.5s all ease-out;
 
  &:hover {
    background-color: palevioletred;
    color: white;
  }
`;

function App() {
  return (
    <div>
      <h1>Hello VO Client frontend</h1>
      <Button>Button(example of styled-component)</Button>
    </div>
  );
}

export default App;
