import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { DropDownNotification, DropDownAccount } from "../components/DropDowns";

function Home() {
  const [flag, setFlag] = useState(false);
  if (flag) {
    return (
      <>
        <div className="navBar">
          <Link href="/">
            <Button variant="ghost">SilentReport</Button>
          </Link>
          <div className="iconBlock">
            <div>
              <Link href="Login">
                <DropDownNotification></DropDownNotification>
              </Link>
            </div>

            <div>
              <Link href="SignUp">
                <DropDownAccount></DropDownAccount>
              </Link>
            </div>
          </div>
        </div>
        <Button
          onClick={() => {
            setFlag(false);
          }}
        >
          change navbar
        </Button>
      </>
    );
  }
  return (
    <>
      <div className="navBar">
        <Link href="/">
          <Button variant="ghost">SilentReport</Button>
        </Link>
        <div>
          <Link href="Login">
            <Button variant="ghost">Login</Button>
          </Link>
          <Link href="SignUp">
            <Button variant="ghost">Signup</Button>
          </Link>
        </div>
      </div>
      <Button
        onClick={() => {
          setFlag(true);
        }}
      >
        change navbar
      </Button>
    </>
  );
}

export default Home;
