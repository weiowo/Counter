import { useState } from 'react';
import styled from "styled-components";
import { useImmer } from 'use-immer';
import './App.css';

const Title = styled.div`
width:200px;
height:200px;
color:black;
`;

function App() {
  let initialState = {
    counters:[
    {name: "Amy", status : "idle", customerNum: 0, proceeded: []},
    {name: "Bob", status : "idle", customerNum: 0, proceeded: []},
    {name: "Cory", status : "idle", customerNum: 0, proceeded: []},
    {name: "Dora", status : "idle", customerNum: 0, proceeded: []},
    ]
  }
  const [currentNum, setCurrentNum] = useState(1)
  const [countInfo, setCountInfo] = useImmer(initialState)
    const [waitingLine, setWaitingLine] = useImmer([])
    console.log("waiting的人：", waitingLine, "waiting長度", waitingLine.length)

  function getNumCard(){
    setCurrentNum((prev)=>prev +1)
    setWaitingLine((draft)=> {draft.push(currentNum)})
  }

  function checkCounter(){
    getNumCard()
    setTimeout(()=> {
    console.log("拿到號碼牌了")
    for(let i = 0; i< countInfo?.counters?.length; i++){
      console.log("拿完號碼牌，跑進for loop了")
      console.log("waitingLine.length", waitingLine.length)
      if(countInfo.counters[i].status === "idle" && waitingLine.length !== 0){
        console.log("跑進for loop的if了", countInfo)
        console.log("shifted", waitingLine?.shift())
        setCountInfo((draft)=> {draft.counters[i].customerNum = waitingLine.shift()})
        setCountInfo((draft)=> { draft.counters[i].status = "busy"})
        break;
    }
  }}, 1000)
  }

  function getRandomTime(min, max) {
    console.log(Math.random() * (max - min) + min);
    return((Math.random() * (max - min) + min)*1000)
  }
  
  function processing(){
    for(let i =0; i<countInfo?.counters?.length; i++){
      if(countInfo.counters[i].status === "busy"){
        setTimeout(()=> {
          setCountInfo((draft)=>{
          draft.counters[i].status = "idle"})
          setCountInfo((draft)=>{
            draft.counters[i].proceeded.push(draft?.counters[i]?.customerNum)})
          setCountInfo((draft)=>{
            draft.counters[i].customerNum = 0})
        }, getRandomTime(0.5, 1.5))
      }
    }
  }

  return (
    <div className="App">
      <Title>Bank Counter</Title>
      {countInfo?.counters?.map((item, index)=>(
        <div style={{display: 'flex', flexDirection: "column"}}>
          <div>工作人員名稱{item.name}</div>
          <div>幾號在辦理 {item.customerNum}</div>
        </div>
      ))}
      <button style={{ height:"30px" }} onClick={()=> { checkCounter(); processing()}}>Next {currentNum}</button>
      {/* <button onClick={()=> checkCounter()}>test</button> */}
      <div style={{display: "flex", flexDirection: "column"}}>
        <div>多少人在等 {waitingLine.length}</div>
        <div>等待的號碼 {waitingLine?.map((item)=> (<div>{item}</div>))}</div>
      </div>
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
