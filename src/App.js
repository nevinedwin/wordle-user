import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import StateProvider from "./context/context";
import PrivateRoute from './core/privateRoute';
import ProtectedRoute from './core/protectedRoute';
import Game from './pages/game';
import SignUp from './pages/signup';

function App() {
  return (
    <Router>
      <StateProvider>
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path='/signup' element={<SignUp />} />
            <Route path='/*' element={<Navigate replace to="/game" />} />
          </Route>
          <Route element={<PrivateRoute />}>
            <Route path='/game' element={<Game />} />
            <Route path='/*' element={<Navigate replace to="/signup" />} />
          </Route >
        </Routes>
      </StateProvider>
    </Router>
  );
}

export default App;
