import { useEffect, useState } from 'react';
import { useImmer } from 'use-immer';
import './App.css';
import { Title, Board, Counter, Column, SubTitle, SubTitleWrapper,
  NextButton, Waiting, BelowPart } from './components/Counter';

function App() {
  let initialState = {
    counters:[
    {name: "Amy", status : "idle", customerNum: 0, proceeded: []},
    {name: "Bob", status : "idle", customerNum: 0, proceeded: []},
    {name: "Cory", status : "idle", customerNum: 0, proceeded: []},
    {name: "Dora", status : "idle", customerNum: 0, proceeded: []},
    ],
    waitingLine:[]
  }
  const [currentNum, setCurrentNum] = useState(1)
  const [countInfo, setCountInfo] = useImmer(initialState)
  console.log(countInfo);
  function getNumCard(){
    setCurrentNum((prev)=>prev +1)
    setCountInfo((draft)=> {draft.waitingLine.push(currentNum)})
  }

  useEffect(()=>{
    function checkCounter(){
      console.log("拿到號碼牌了")
      for(let i = 0; i< countInfo?.counters?.length; i++){
        if(countInfo.counters[i].status === "idle" && countInfo.waitingLine.length !== 0){
          console.log("跑進for loop的if了")
          setCountInfo((draft)=> {draft.counters[i].customerNum = draft.waitingLine[0]})
          setCountInfo((draft)=> { draft.counters[i].status = "busy"})
          setCountInfo((draft)=>{draft.waitingLine.shift()})
          break;
        }
      }
    }
    checkCounter()
  },[countInfo.counters, countInfo.waitingLine.length, setCountInfo])


  function getRandomTime(min, max) {
    console.log(Math.random() * (max - min) + min);
    return((Math.random() * (max - min) + min)*1000)
  }

  useEffect(()=>{
  function processing(i){
    for(let i =0; i<countInfo?.counters?.length; i++){
      if(countInfo.counters[i].status === "busy" && countInfo.counters[i].customerNum !== 0){
        setTimeout(()=> {
          setCountInfo((draft)=>{
          draft.counters[i].status = "idle"})
          console.log("if", countInfo.counters[i].customerNum)
          setCountInfo((draft)=>{
            draft.counters[i].proceeded.push(draft?.counters[i]?.customerNum)})
          setCountInfo((draft)=>{
            draft.counters[i].customerNum = 0})
        }, getRandomTime(0.5, 1.5))
      }
    }
  }
  processing()
},[countInfo.counters, setCountInfo])

  return (
    <div className="App">
      <Title>Bank Counter</Title>
      <Board>
        <SubTitleWrapper>
          <SubTitle>counter</SubTitle>
          <SubTitle>processing</SubTitle>
          <SubTitle>proceeded</SubTitle>
        </SubTitleWrapper>
      {countInfo?.counters?.map((item, index)=>(
        <Counter key={item?.name}>
          <Column>{item.name}</Column>
          {/* <Column>此櫃檯狀態 {item.status} </Column> */}
          <Column>{item.status === "idle" ? item.status : item.customerNum}</Column>
          <Column>{item.proceeded?.join(", ")}</Column>
        </Counter>
      ))}
      <BelowPart>
        <Waiting>Waiting：{countInfo.waitingLine.length}</Waiting>
        <NextButton onClick={()=> getNumCard()}>Next {currentNum}</NextButton>
      </BelowPart>
      </Board>
    </div>
  );
}

  // useEffect(()=>{
  //   getRandomTime(0.5, 1.5)
  // },[])

  // function dispatch(){
  //   if(waitingLine.length > 0){
  //     for(let i = 0; i<countInfo.counters.length; i++){
  //       if(countInfo.counters[i].status === "idle"){
  //         setCountInfo((draft)=> draft.counters[i].countNum = waitingLine.shift())
  //         setCountInfo((draft)=>draft.counters[i].status = "busy")
  //       }
  //     }
  //   }
  // }

export default App;
