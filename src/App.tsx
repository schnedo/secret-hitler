import React from "react";
import * as gameAssets from "./components/gameAssets";
import Footer from "./Footer";

function App() {
  return (
    <>
      {Object.values(gameAssets).map((Asset) => (
        <Asset key={Asset.name} />
      ))}
      <Footer />
    </>
  );
}

export default App;
