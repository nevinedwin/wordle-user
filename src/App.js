import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import SignUp from "./pages/signup";
import Game from "./pages/game";
import StateProvider from "./context/context";
import Board from './components/board';

function App() {
  return (
    <Router>
      <StateProvider>
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/" element={<SignUp />} />
          <Route path="/game" element={<Game />} />
          <Route path='/board' element={<Board />} />
        </Routes>
      </StateProvider>
    </Router>
  );
}

export default App;
