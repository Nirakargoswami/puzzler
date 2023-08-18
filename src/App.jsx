import React, { useState, useEffect } from "react";
import Home from "./Pages/Home";
import Quizpage from "./Pages/quizpage"
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Form,
} from "react-router-dom";
import NormalQuiz from "../src/Pages/NoramalQuiz"
import AdminPanel from "../src/Pages/Adminpannel"
import Anstpage from "../src/Pages/ansqestionpage"
import { useSelector, useDispatch } from "react-redux";
import ResponsiveDrawer from "../src/Component/Navbar/NAvbar";
function App() {
  const [rows, setRows] = useState("");
  const [headCells, setHeadCells] = useState("");
  const state = useSelector((state) => state);
  useEffect(() => {
    setRows(state.productdata.rows);
    setHeadCells(state.productdata.headCells);
  }, [state]);
  const dispatch = useDispatch();
  console.log(state);
  return (
    <>
      <div style={{marginTop:"80px",padding:"0px 20px 0px 20px",marginBottom:"100px"}}>
        

        <ResponsiveDrawer />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quizpage/:quizname" element={<Quizpage />} />
          <Route path="/quizpage/Anstpage/:quiId" element={<Anstpage />} />
          <Route path="/AdminNirakar" element={<AdminPanel />} />
          <Route path="/NormalQuiz/:quizname" element={<NormalQuiz />} />

        </Routes>
      </div>
    </>
  );
}

export default App;