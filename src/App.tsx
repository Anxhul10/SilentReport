import "./App.css";
import { NavBarInitial } from "./components/custom/navBar";
import { SignupForm } from './components/signup-form';

function App() {
  return (
    <>
      <NavBarInitial></NavBarInitial>
    </>
  );
}

function SignUp() {
  return <>
    <div className="signupParent">
        <SignupForm className="signupChild"/>
    </div>
  </>
}
export default App;
