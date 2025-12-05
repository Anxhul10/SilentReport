import "./App.css";
import { NavBarInitial } from "./components/custom/navBar";
import { SignupForm } from "./components/SignupForm";
import { LoginForm } from "./components/LoginForm";

function App() {
  return (
    <>
      <NavBarInitial></NavBarInitial>
    </>
  );
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
