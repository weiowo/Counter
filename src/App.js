import { useEffect, useState } from "react";
import { useImmer } from "use-immer";
import "./App.css";
import {
  Title,
  Board,
  Counter,
  Column,
  SubTitle,
  SubTitleWrapper,
  NextButton,
  Waiting,
  BelowPart,
} from "./components/Counter";

let initialState = {
  counters: [
    { name: "Amy", status: "idle", customerNum: 0, proceeded: [] },
    { name: "Bob", status: "idle", customerNum: 0, proceeded: [] },
    { name: "Cory", status: "idle", customerNum: 0, proceeded: [] },
    { name: "Dora", status: "idle", customerNum: 0, proceeded: [] },
  ],
  waitingLine: [],
};

function getRandomTime(min, max) {
  console.log(Math.random() * (max - min) + min);
  return (Math.random() * (max - min) + min) * 1000;
}

function App() {
  const [currentNum, setCurrentNum] = useState(1);
  const [countInfo, setCountInfo] = useImmer(initialState);
  function getNumCard() {
    setCurrentNum((prev) => prev + 1);
    setCountInfo((draft) => {
      draft.waitingLine.push(currentNum);
    });
  }

  useEffect(() => {
    function check(element) {
      return element.status === "idle";
    }
    if (countInfo.waitingLine.length === 0) {
      return;
    }
    const counterIndex = countInfo.counters.findIndex(check);
    if (counterIndex !== -1) {
      const newCustomerNum = countInfo.waitingLine[0];
      setCountInfo((draft) => {
        draft.counters[counterIndex].customerNum = draft.waitingLine[0];
        draft.counters[counterIndex].status = "busy";
        draft.waitingLine.shift();
      });
      setTimeout(() => {
        setCountInfo((draft) => {
          draft.counters[counterIndex].status = "idle";
          draft.counters[counterIndex].proceeded.push(newCustomerNum);
          draft.counters[counterIndex].customerNum = 0;
        });
      }, getRandomTime(0.5, 1.5));
    }
  }, [countInfo, setCountInfo]);

  return (
    <div className="App">
      <Title>Bank Counter</Title>
      <Board>
        <SubTitleWrapper>
          <SubTitle>counter</SubTitle>
          <SubTitle>processing</SubTitle>
          <SubTitle>processed</SubTitle>
        </SubTitleWrapper>
        {countInfo?.counters?.map((item) => (
          <Counter key={item?.name}>
            <Column>{item.name}</Column>
            <Column>
              {item.status === "idle" ? item.status : item.customerNum}
            </Column>
            <Column>{item.proceeded?.join(", ")}</Column>
          </Counter>
        ))}
        <BelowPart>
          <Waiting>Waiting：{countInfo.waitingLine.length}</Waiting>
          <NextButton onClick={() => getNumCard()}>
            Next {currentNum}
          </NextButton>
        </BelowPart>
      </Board>
    </div>
  );
}

export default App;
