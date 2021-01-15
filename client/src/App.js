import React, { useEffect, useState } from "react"

import './App.scss';

// Components
import AppSidebar from "./components/AppSidebar.jsx";
import Home from "./components/Home.jsx"


// Misc
import { VIEWS } from "./utils/constants";

import Api from "./utils/api"
const api = new Api()

function App() {
  const [currentView, setCurrentView] = useState(VIEWS.HOME)

  // TEMPORARY : JUST FOR DEVELOPMENT PURPOSES
  useEffect(()=> {
    async function login() {
      const response = await api.login({email: "toto@gmail.com", password:"totototo"})
      console.log(response);
    }
    login()
  }, [])

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
      <AppSidebar currentView={currentView} setCurrentView={setCurrentView} />
      {renderView(currentView)}
    </div>
  );
}

export default App;
