import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { DropDownNotification, DropDownAccount } from "../components/DropDowns";

function Home() {
  const [log, setLog] = useState(false);
  // useEffect(() => {
  //   fetch("/api/hello")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log(data);
  //     });
  // }, []);
  if (log) {
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
            setLog(false);
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
          <Link
            href={{
              pathname: "Login",
              query: {
                search: "search",
              },
            }}
          >
            <Button variant="ghost">Login</Button>
          </Link>
          <Link href="SignUp">
            <Button variant="ghost">Signup</Button>
          </Link>
        </div>
      </div>
      <Button
        onClick={() => {
          setLog(true);
        }}
      >
        change navbar
      </Button>
    </>
  );
}

export default Home;
