import React, { useState } from "react"

import './App.scss';

// Components
import AppSidebar from "./components/AppSidebar.jsx";

// Misc
import { VIEWS } from "./constants/views";


function App() {
  const [currentView, setCurrentView] = useState(VIEWS.HOME)

  return (
    <div className="app">
      <AppSidebar currentView={currentView} onSetCurrentView={setCurrentView} />
    </div>
  );
}

export default App;
