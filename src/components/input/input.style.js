import styled from "styled-components"

export const TextInput = styled.input`
height: 40px;
background: #fff;
color: #000;
font-size: 16px;
border-radius: 5px;
box-shadow: none;
border: 1px solid rgba(0, 0, 0, 0.1);
display: block;
width: 100%;
padding: 0.375rem 0.75rem;
font-weight: 400;
line-height: 1.5;
margin: 5px 0px 2px 0px;
&:focus{
    outline: none !important;
    box-shadow: none;
    border: 1px solid #e3b04b;
    color: #495057;
    background-color: #fff;
}
&::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
    color: #c4c4c4;
    opacity: 1; /* Firefox */
    font-size:13px;
    letter-spacing:1px
  }
  
  :-ms-input-placeholder { /* Internet Explorer 10-11 */
    color: #c4c4c4;
    font-size:13px;
  }
  
  ::-ms-input-placeholder { /* Microsoft Edge */
    color: #c4c4c4;
    font-size:13px;
  }
`

export const Text = styled.span`
text-transform: uppercase;
font-size: 13px;
`