import { createGlobalStyle } from 'styled-components';
export const GlobalStyle = createGlobalStyle`
   *{
    margin:0;
    padding:0;
    box-sizing:border-box;
    list-style:none;
    }

    :root {
    font-family: Inter, system-ui, Helvetica, Arial, sans-serif;
    line-height: 1.5;
    font-weight: 400;
    --primary-color: #222260;
        --primary-color2: 'color: rgba(34, 34, 96, .6)';
        --primary-color3: 'color: rgba(34, 34, 96, .4)';
        --color-green: #42AD00;
        --color-grey: #aaa;
        --color-accent: #F56692;
        --color-delete: #FF0000;
  
    color-scheme: light dark;
    color: rgba(160, 15, 15, 0.87);
    background-color:rgb(237, 225, 225);
  
    font-synthesis: none;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    }
    h1, h2, h3, h4, h5, h6{
        color: var(--primary-color);
    }

    body {
  margin: 0;
  display: flex;
  font-family: 'Nunito', sans-serif;
  font-size: clamp(1rem, 1.5vw, 1.2rem);
  overflow: hidden;
  color: rgba(34, 34, 96, .6);
  place-items: center;
  min-width: 320px;
  min-height: 100vh;
 
}
 `;