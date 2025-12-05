import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface NavBarProps {
  accountName: string;
}

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

export function NavBar({ accountName }: NavBarProps) {
  return (
    <>
      <div className="navBar">
        <Link to="/">
          <Button variant="ghost">SilentReport</Button>
        </Link>
        <div>
          <Button variant="ghost">notification</Button>
          <Button
            variant="ghost"
          >
            My Account
          </Button>
        </div>
      </div>
    </>
  );
}
