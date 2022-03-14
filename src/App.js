import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import SignUp from "./pages/signup";
import Game from "./pages/game";
import StateProvider from "./context/context";

function App() {
  return (
    <Router>
      <StateProvider>
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/" element={<SignUp />} />
          <Route path="/game" element={<Game />} />
        </Routes>
      </StateProvider>
    </Router>
  );
}

export default App;
