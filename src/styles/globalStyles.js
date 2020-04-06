import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  :root {
    --primary-color: #4fc08d;
    --second-color: #f8f8f8;
    --black-color: #000;
    --white-color: #fff;
    --shadow-color: rgba(0, 0, 0, 0.2);
    --border-color: #e3e3e3;
    --border-color-focus: #42b983;
    --border-button-focus: #095432;
    --image-color: #35495e;
    --font-color: #304455;
    --font-size: 16px;
    --font-size--small: 14px;
    --alert-success: #b2c032;
    --alert-error: #ff9b9b;
    --screen-mobile-xs: 320px;
    --screen-mobile-sm: 480px;
    --screen-mobile-sm: 768px;
    --screen-md: 920px;
    --screen-lg: 1200px;
  }

  html,
  body {
    height: 100%;
  }

  body {
    margin: 0;
    padding: 0;
    color: var(--font-color);
    font-family: 'Roboto', sans-serif;
    font-size: var(--font-size);
  }

  * {
    box-sizing: border-box;
  }

  body > div {
    display: flex;
    flex-direction: column;
  }

  a {
    color: var(--font-color);
  }

  a:hover {
    text-decoration: none;
  }

  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  h1,
  h2 {
    margin: 0 0 15px;
  }

  h2 {
    font-size: 22px;
  }

  select,
  textarea,
  input {
    width: 100%;
    padding: 8px 10px;
    border: 1px solid var(--border-color);
  }

  select:focus,
  textarea:focus,
  input:focus {
    border-color: var(--border-color-focus);
    box-shadow: 0 3px 5px 2px var(--border-color);
    outline: none;
  }

  textarea {
    min-height: 80px;
  }
`;

export default GlobalStyle;
