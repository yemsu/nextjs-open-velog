import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

export default createGlobalStyle`
  ${reset}
  * {
    box-sizing: border-box;
  }
  body {
    font-family: var(--font-family);
    font-size: var(--font-size-M-pc);
    font-weight: var(--font-weight-normal);
    color: var(--font-black);
    line-height: 1.5;
    letter-spacing: -0.025em;
  }
  button {
    appearance: none;
    border: none;
    background-color: transparent;
    color: inherit;
    letter-spacing: inherit;
    cursor: pointer;
  }
  a {
    text-decoration: none;
    color: inherit;
    letter-spacing: inherit;
  }
  button, a {
    &:hover {
      opacity: .7;
      transition: opacity .2s
    }
  }
  strong {
    font-weight: var(--text-weight-X-bold);
  }
  label {
    font-weight: var(--font-weight-normal);
  }
  input[type="radio"],
  input[type="checkbox"] {
    margin: 0;
  }
  // only pc, mobile
  .only-pc {
    @include mobile {
      display: none !important;
    }
  }
  .only-mobile {
    @include pc {
      display: none !important;
    }
  }
  // ir
  .ir-hidden {
    position: absolute;
    overflow: hidden;
    width: 1px;
    height: 1px;
    font-size: 1px;
  }
`;
