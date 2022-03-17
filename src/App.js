import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import StateProvider from "./context/context";
import { routes } from './core/routes';

function App() {
  return (
    <Router>
      <StateProvider>
        <Routes>
          {
            routes.map(route => {
              return (
                <Route
                  key={route.path}
                  path={route.path}
                  // element={<ProtectedRoutes path={route.path} component={route.component} />}
                  element={<route.component />}
                />
              )
            })
          }
        </Routes>
      </StateProvider>
    </Router>
  );
}

export default App;
