import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { NavBarInitial, NavBar } from './components/ui/navBar';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <NavBarInitial></NavBarInitial>
      <div>
        hii
      </div>
    </>
  );
}


export default App;
