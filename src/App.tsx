import "./App.css";
import { NavBarInitial, NavBar } from "./components/custom/navBar";
import { SignupForm } from "./components/SignupForm";
import { LoginForm } from "./components/LoginForm";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <nav>
          <NavBarInitial></NavBarInitial>
        </nav>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/Login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

function Home() {
  return <>homepage</>;
}
function SignUp() {
  return (
    <>
      <div className="signupParent">
        <SignupForm className="signupChild" />
      </div>
    </>
  );
}

function Login() {
  return (
    <>
      <div className="loginParent">
        <LoginForm className="loginChild" />
      </div>
    </>
  );
}
export default App;
