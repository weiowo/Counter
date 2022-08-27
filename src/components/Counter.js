import styled from "styled-components/macro";

export const Title = styled.div`
  font-size: 30px;
  font-weight: 600;
  margin-top: 20px;
  color: #8a00c2;
`;

export const Board = styled.div`
  width: 70%;
  height: auto;
  border-radius: 10px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  @media screen and (max-width: 860px) {
    width: 90%;
    margin-top: 5px;
  }
`;

export const Counter = styled.div`
  width: 100%;
  height: 100px;
  background-color: #ffefff;
  box-shadow: 0 4px 5px 0 rgba(0, 0, 0, 0.2), 0 6px 15px 0 rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 860px) {
    height: 110px;
  }
`;

export const Column = styled.div`
  width: 30%;
  height: auto;
  display: flex;
  flex-direction: column;
`;

export const SubTitleWrapper = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

export const SubTitle = styled.div`
  width: 30%;
  height: 50px;
  color: #b100cd;
  font-size: 23px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  @media screen and (max-width: 860px) {
    font-size: 18px;
  }
`;

export const BelowPart = styled.div`
  width: 90%;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Waiting = styled.div`
  width: auto;
  height: 30px;
  display: flex;
  align-items: center;
  font-weight: 600;
  font-size: 18px;
`;

export const NextButton = styled.button`
  width: 100px;
  height: 40px;
  border: none;
  border-radius: 10px;
  /* background-color: #ff7c6c; */
  background-color: #cc92f8;
  color: white;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
`;
