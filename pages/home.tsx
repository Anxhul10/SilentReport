import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SearchBar } from "../components/SearchBar";

export default function home() {
  return (
    <>
      <div className="navBar">
        <Link href="/">
          <Button variant="ghost">SilentReport</Button>
        </Link>
        <div className="navSearch"></div>
        <SearchBar></SearchBar>

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
    </>
  );
}
