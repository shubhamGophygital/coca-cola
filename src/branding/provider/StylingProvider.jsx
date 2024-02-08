import React from 'react';
import {createGlobalStyle} from 'styled-components';

const GlobalStyle = createGlobalStyle`
  :root {
    ${props => props.stylingVariables}
  }
`;

const StylingProvider = props => {
  const {children, stylingVariables} = props;
  return (
    <div>
      <GlobalStyle stylingVariables={stylingVariables}/>
      {children}
    </div>
  );
};

export default StylingProvider;
