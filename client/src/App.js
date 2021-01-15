import React, { useState } from "react"

import './App.scss';

// Components
import AppSidebar from "./components/AppSidebar.jsx";
import Home from "./components/Home.jsx"


// Misc
import { VIEWS } from "./utils/constants";


function App() {
  const [currentView, setCurrentView] = useState(VIEWS.HOME)

  function renderView(view) {
    switch (view) {
      case VIEWS.HOME:
        return <Home/>
  default:
        return "Error"
    }
  }

  return (
    <div className="app">
      <AppSidebar currentView={currentView} onSetCurrentView={setCurrentView} />
      {renderView(currentView)}
    </div>
  );
}

export default App;
