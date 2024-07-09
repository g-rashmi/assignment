import {  BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ChallengeCard from './components/card';
import Signup from './components/signup';
import TokenPageWrapper from "./components/tokens";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/user/:id" element={<ChallengeCard/>} />
        <Route path="/" element={<Signup/>} />
        <Route path="/tokens/:total" element={<TokenPageWrapper/>}/>
      </Routes>
    </Router>
  );
}


export default App;
