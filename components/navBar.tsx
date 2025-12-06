import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

import { DropDownNotification, DropDownAccount } from "./DropDowns";

export function NavBarInitial() {
  return (
    <>
      <div className="navBar">
        <Link to="/">
          <Button variant="ghost">SilentReport</Button>
        </Link>
        <div>
          <Link to="/Login">
            <Button variant="ghost">Login</Button>
          </Link>
          <Link to="/SignUp">
            <Button variant="ghost">Signup</Button>
          </Link>
        </div>
      </div>
    </>
  );
}

export function NavBar() {
  return (
    <>
      <div className="navBar">
        <Link to="/">
          <Button variant="ghost">SilentReport</Button>
        </Link>
        <div className="iconChild">
          <div>
            <DropDownNotification></DropDownNotification>
          </div>
          <div>
            <DropDownAccount></DropDownAccount>
          </div>
        </div>
      </div>
    </>
  );
}
