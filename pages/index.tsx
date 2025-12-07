import Link from "next/link";
import { Button } from "@/components/ui/button";

function Home() {
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
    </>
  );
}

export default Home;
