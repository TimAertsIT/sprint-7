import styled from 'styled-components'; 

export const Panell = styled.div`
border: 5px solid black;
border-radius: 10px;
padding: 10px;
margin-top: 5px;
margin-bottom: 5px;
display: ${props => props.checked ? 'block' : 'none'};`

export const CustomButton = styled.button`
background-color: orange;
margin: 3px;
color: white;
border-radius: 3px;
border: none;
height: 25px;
width: 25px;`

export const SpecialBox = styled.div`
border: 2px solid black;
position: fixed;
top: 0;
right: 0;`