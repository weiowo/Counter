import styled from 'styled-components';

export const Title = styled.div`
font-size:30px;
font-weight:600;
color:black;
`;

export const Board = styled.div`
width:60%;
height:auto;
border-radius: 10px;
margin-top: 20px;
display: flex;
flex-direction:column;
align-items: center;
gap:10px;
`

export const Counter = styled.div`
width:100%;
height:60px;
border:1px black solid;
border-radius: 10px;
display:flex;
justify-content: center;
align-items: center;
`

export const Column = styled.div`
width:30%;
height:auto;
/* border:1px solid blue; */
display:flex;
flex-direction: column;
`

export const SubTitleWrapper = styled.div`
width:100%;
height:50px;
/* border: 1px red solid; */
display:flex;
justify-content: center;
align-items: center;
`

export const SubTitle = styled.div`
width:30%;
height:50px;
font-size: 23px;
font-weight: 600;
display: flex;
align-items: center;
justify-content: center;
/* border:1px orange solid; */
`

export const BelowPart = styled.div`
width:90%;
height:60px;
display:flex;
align-items: center;
justify-content: space-between;
`

export const Waiting = styled.div`
width:auto;
height:30px;
display: flex;
align-items: center;
`

export const NextButton = styled.button`
width:100px;
height:40px;
border:none;
border-radius: 10px;
background-color: blueviolet;
color:white;
font-size:18px;
font-weight: 500;
cursor: pointer;
`