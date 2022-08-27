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
};

function getRandomTime(min, max) {
  return (Math.random() * (max - min) + min) * 1000;
}

function App() {
  const [currentNum, setCurrentNum] = useState(1);
  const [counterInfo, setCounterInfo] = useImmer(initialState);
  const [waitingLine, setWaitingLine] = useImmer([]);
  function getNumCard() {
    setCurrentNum((prev) => prev + 1);
    setWaitingLine((draft) => {
      draft.push(currentNum);
    });
  }

  useEffect(() => {
    function check(element) {
      return element.status === "idle";
    }
    if (waitingLine.length === 0) {
      return;
    }
    const counterIndex = counterInfo.counters.findIndex(check);
    if (counterIndex !== -1) {
      const newCustomerNum = waitingLine[0];
      setCounterInfo((draft) => {
        draft.counters[counterIndex].customerNum = waitingLine[0];
        draft.counters[counterIndex].status = "busy";
      });
      setWaitingLine((draft) => {
        draft.shift();
      });

      setTimeout(() => {
        setCounterInfo((draft) => {
          draft.counters[counterIndex].status = "idle";
          draft.counters[counterIndex].proceeded.push(newCustomerNum);
          draft.counters[counterIndex].customerNum = 0;
        });
      }, getRandomTime(0.5, 1.5));
    }
  }, [counterInfo.counters, setCounterInfo, waitingLine, setWaitingLine]);

  return (
    <div className="App">
      <Title>Bank Counter</Title>
      <Board>
        <SubTitleWrapper>
          <SubTitle>counter</SubTitle>
          <SubTitle>processing</SubTitle>
          <SubTitle>processed</SubTitle>
        </SubTitleWrapper>
        {counterInfo?.counters?.map((item) => (
          <Counter key={item?.name}>
            <Column>{item.name}</Column>
            <Column>
              {item.status === "idle" ? item.status : item.customerNum}
            </Column>
            <Column>{item.proceeded?.join(", ")}</Column>
          </Counter>
        ))}
        <BelowPart>
          <Waiting>Waiting：{waitingLine.length}</Waiting>
          <NextButton onClick={() => getNumCard()}>
            Next {currentNum}
          </NextButton>
        </BelowPart>
      </Board>
    </div>
  );
}

export default App;
