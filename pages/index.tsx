import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Homepage } from "@/components/Homepage";
import { SearchBar } from "@/components/SearchBar";

function Home() {
  return (
    <>
      <div className="navBar">
        <Link href="/">
          <Button variant="ghost">SilentReport</Button>
        </Link>
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
      <Homepage></Homepage>
    </>
  );
}

export default Home;
