import City from './components/City';
import Login from './components/Login';
import {BrowserRouter as Router, Routes , Route} from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path='/' element={<Login/>}/> */}
        <Route path='/' element={<City/>}/>
      </Routes>
    
    </Router>
  );
}

const apiKey = "ce916057fd825bd31ff8b2656372f0ba"

export default App;