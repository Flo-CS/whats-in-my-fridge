import React, { useState } from "react"

import './App.scss';

// Components
import AppSidebar from "./components/AppSidebar.jsx";
import BottomPanel from "./components/BottomPanel.jsx";
import ProductsCardsGrid from "./components/ProductsCardsGrid.jsx";

// Misc
import { VIEWS } from "./utils/constants";


function App() {
  const [currentView, setCurrentView] = useState(VIEWS.HOME)

  return (
    <div className="app">
      <AppSidebar currentView={currentView} onSetCurrentView={setCurrentView} />
      <ProductsCardsGrid/>
      <BottomPanel/>
    </div>
  );
}

export default App;
