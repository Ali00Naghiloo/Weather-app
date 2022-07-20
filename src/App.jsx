import YourCity from "./components/YourCity";
import Highlights from "./components/Highlights";
import BigCity from "./components/BigCity";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      {/* <Route path='/' element={<Login/>}/> */}
      <BigCity />
      <YourCity />
    </>
  );
}

const apiKey = "ce916057fd825bd31ff8b2656372f0ba";

export default App;
