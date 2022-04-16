import styled, { keyframes } from 'styled-components';
import { Link as LinkR } from 'react-router-dom'
import background from "../../images/MINT_BG.png"
import clouds from "../../images/clouds.png"


export const MintPageContainer = styled.div`
z-index: 2;
min-height: 100vh;
background-image: url(${background});
background-size: cover;
display: flex;
flex-direction: column;
align-items: center;
`;

export const MintPageNavbar = styled.div`
padding: 12px;
padding-bottom: 0;
display: flex;
z-index: 2;
`;

export const NavbarLinkA = styled.a`
padding: 5px;
cursor: pointer;
z-index: 2;
`;

export const NavbarImage = styled.img`
height: 50px;
`;

export const MintPanelImage = styled.img`
max-width: 100%;
`;

export const MintPageMain = styled.div`
display: inline-block;
float: bottom;
justify-content: center;
text-align: center;
margin-top: auto;
`;

export const MintLabel = styled.label`
z-index: 2;
margin-bottom: 10px;
font-size: 28px;
color: #60c657;
text-shadow: 0 0 15px #60c657;
`;

export const InputWrapper = styled.div`
display: flex;
flex-direction: row;
`;

export const MintInput = styled.input`
color: #60c657;
border-radius: 25px;
justify-content: center;
justify-self: center;
background: none;
border: 1px solid #60c657;
text-align: center;
font-size: 28px;
margin-bottom: 10px;
z-index: 2;
::-webkit-inner-spin-button{
  -webkit-appearance: none; 
  margin: 0; 
}
::-webkit-outer-spin-button{
  -webkit-appearance: none; 
  margin: 0; 
}   
`;

export const InputArrows = styled.label`
text-align: center;
font-size: 28px;
padding: 0 10px;
color: #60c657;
cursor: pointer;
z-index: 2;
`

export const MintButton = styled.button`
z-index: 2;
border-radius: 50px;
background: #FFF;
white-space: nowrap;
text-decoration: none;
cursor: pointer;
color: #000;
border: none;
padding: 10px 22px;
font-size: auto;
font-weight: 700;
margin-top: 10px;
margin-bottom: 10px;
text-align: center;
box-shadow: 0 2px 2px rgba(0, 0, 0, 0.9);
width: 100px;
`;

export const DescriptionPanel = styled.div`
display: inline-block;
float: top;
align-items: center;
text-align: center;
justify-content: center;
`;

export const AmountMinted = styled.h1`
color: #fff;
text-shadow: 2px 2px rgba(0, 0, 0, 0.9);
margin-bottom: 5px;
margin-top: 5px;
padding: 2px;
font-size: 24px;
}
`;

export const MintPanel = styled.div`
display: flex;
flex-direction: column-reverse;
text-align: center;
margin: 40px 0;
margin-bottom: 0;
min-height: 30vh;
z-index: 2;
`;

export const GridCol = styled.div`
display: flex;
align-items: center;
justify-self: center;
justify-content: center;
flex-direction: column;
margin-left: 10px;
margin-right: 10px;
`;

export const TextWrapper = styled.div`
color: #fff;
text-shadow: 2px 2px rgba(0, 0, 0, 0.9);
padding: 10px;
max-width: 800px;
justify-content: center;

`;

export const Title = styled.h1`
margin: 10px 0;
color: #6495ED;
text-shadow: 0 0 15px #6495ED;
font-size: 50px;
`;

export const Connect = styled.h1`
z-index: 2;
margin-bottom: 10px;
color: #60c657;
text-shadow: 0 0 15px #60c657;
font-size: 50px;
cursor: pointer;
&:hover {
  text-shadow: 0 0 20px #60c657;
}

`;

export const Subtitle = styled.h3`
margin-bottom: 10px;
color: #fff;
text-shadow: 2px 2px rgba(0, 0, 0, 0.9);
`;

export const Logo = styled.img`
align-self: center;
width: 100%;
max-width: 750px;
margin: 20px 0;
padding: 0 10px;
z-index: 2;
`;

export const FooterLinksWrapper = styled.div`
padding: 10px;
margin: 10px;
display: flex;
justify-content: center;
z-index: 2;
@media screen and (max-width: 539px) {
    display: flex;
    flex-direction: column;
    margin-top: 10px;
}
`;

export const FooterLinks = styled.a`
border-radius: 50px;
background: #FFF;
white-space: nowrap;
text-decoration: none;
cursor: pointer;
color: #000;
padding: 10px 22px;
font-size: auto;
font-weight: 700;
margin: 10px;
z-index: 2;

text-align: center;
box-shadow: 0 2px 2px rgba(0, 0, 0, 0.9);
`;

function scrollEffect() {
  return keyframes`
  100% {
    right: 0px;
  }
  50% {
    right: 20%;
  }
  0% {
    right: 0px;
  }
  `;
}

export const Clouds = styled.img`
position: absolute;
z-index: 1;
height: 100%;
object-fit: contain;
animation: ${scrollEffect} 90s linear infinite;
`;
